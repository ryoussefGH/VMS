import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import Parser from "rss-parser";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const db = new Database("articles.db");
const parser = new Parser();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images are allowed"));
  }
});

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/uploads", express.static(uploadsDir));

  // API Routes
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  app.get("/api/news", async (req, res) => {
    const feeds = [
      'https://www.drugs.com/feeds/headline_news.xml',
      'https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/medwatch/rss.xml',
      'https://www.federalregister.gov/api/v1/documents.rss?conditions%5Bsearch_type_id%5D=3'
    ];

    try {
      const results = await Promise.allSettled(feeds.map(url => parser.parseURL(url)));
      
      const feedResults = results
        .filter((result): result is PromiseFulfilledResult<Parser.Output<any>> => result.status === 'fulfilled')
        .map(result => result.value.items.map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          source: result.value.title || 'News'
        })));

      const alternatedItems = [];
      const maxLen = Math.max(...feedResults.map(f => f.length));
      
      for (let i = 0; i < maxLen; i++) {
        for (const feed of feedResults) {
          if (feed[i]) {
            alternatedItems.push(feed[i]);
          }
        }
      }

      res.json(alternatedItems);
    } catch (error) {
      console.error("Failed to fetch news feeds", error);
      res.status(500).json({ error: "Failed to fetch news feeds" });
    }
  });

  app.get("/api/articles", (req, res) => {
    try {
      const articles = db.prepare("SELECT * FROM articles ORDER BY created_at DESC").all();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.post("/api/articles", (req, res) => {
    const { title, content, author, category, password } = req.body;
    
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized: Invalid password" });
    }

    if (!title || !content || !author || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const info = db.prepare(
        "INSERT INTO articles (title, content, author, category) VALUES (?, ?, ?, ?)"
      ).run(title, content, author, category);
      
      const newArticle = db.prepare("SELECT * FROM articles WHERE id = ?").get(info.lastInsertRowid);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(500).json({ error: "Failed to create article" });
    }
  });

  app.delete("/api/articles/:id", (req, res) => {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Unauthorized: Invalid password" });
    }

    try {
      db.prepare("DELETE FROM articles WHERE id = ?").run(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
