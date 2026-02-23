/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck,
  CheckCircle2, 
  Thermometer, 
  Settings, 
  FileText, 
  Users, 
  ArrowRight, 
  Menu, 
  X, 
  ChevronRight,
  ClipboardCheck,
  Activity,
  Award,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Logo = ({ className = "h-10", isScrolled = false }: { className?: string, isScrolled?: boolean }) => {
  return (
    <div className={`flex items-center group cursor-pointer ${className}`}>
      <svg viewBox="0 0 400 220" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {/* 3x3 Grid of rounded squares */}
        <rect x="10" y="35" width="35" height="35" rx="6" fill="#7BAFD4" />
        <rect x="55" y="35" width="35" height="35" rx="6" fill="#95B9D9" />
        <rect x="100" y="35" width="35" height="35" rx="6" fill="#E31E24" />
        
        <rect x="10" y="80" width="35" height="35" rx="6" fill="#2D6BA3" />
        <rect x="55" y="80" width="35" height="35" rx="6" fill="#3B5983" />
        <rect x="100" y="80" width="35" height="35" rx="6" fill="#5D7695" />
        
        <rect x="10" y="125" width="35" height="35" rx="6" fill="#0072CE" />
        <rect x="55" y="125" width="35" height="35" rx="6" fill="#002D56" />
        <rect x="100" y="125" width="35" height="35" rx="6" fill="#1D3652" />

        {/* VMS Text with Gradient */}
        <defs>
          <linearGradient id="vmsGradient" x1="145" y1="60" x2="145" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B9BD5" />
            <stop offset="100%" stopColor="#003366" />
          </linearGradient>
        </defs>
        <text x="145" y="135" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="105" letterSpacing="-4" fill="url(#vmsGradient)">VMS</text>
        
        {/* Divider Line */}
        <line x1="140" y1="155" x2="390" y2="155" stroke="#003366" strokeWidth="3" />
        
        {/* Subtext */}
        <text x="145" y="185" fontFamily="Inter, sans-serif" fontWeight="500" fontSize="26" fill="#003366">
          <tspan fill="#2D6BA3">Validation Management</tspan> <tspan fontWeight="700" fill="#002D56">Solutions</tspan>
        </text>
      </svg>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Approach', href: '#approach' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className={`transition-all duration-300 flex items-center ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}>
          <Logo className="h-10 md:h-12" isScrolled={isScrolled} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-slate-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold w-full">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Shield size={14} />
              <span>Audit-Ready Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Validation that holds up <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">under pressure.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Risk-based CQV, temperature mapping, and asset qualification for life sciences. We provide the technical expertise to ensure your facility remains compliant and efficient.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all group">
                Explore Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold transition-all">
                Our Approach
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Compliance Rate</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Assets Qualified</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Support Available</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono">vms_protocol_v2.pdf</div>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Installation Qualification (IQ)', status: 'Completed', color: 'text-green-400' },
                  { label: 'Operational Qualification (OQ)', status: 'In Progress', color: 'text-blue-400' },
                  { label: 'Performance Qualification (PQ)', status: 'Pending', color: 'text-slate-500' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-950/50 border border-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-slate-900 ${item.color}`}>
                        <ClipboardCheck size={20} />
                      </div>
                      <span className="text-sm font-medium text-slate-300">{item.label}</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Activity size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Real-time Mapping</span>
                </div>
                <div className="h-24 flex items-end gap-1">
                  {[40, 60, 45, 70, 85, 65, 50, 75, 90, 60, 40, 55].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-blue-500/40 rounded-t-sm"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'CQV Services',
      description: 'Comprehensive Commissioning, Qualification, and Validation for facilities, utilities, and equipment.',
      icon: <CheckCircle2 className="text-blue-500" />,
      features: ['IQ/OQ/PQ Protocols', 'Execution & Reporting', 'Risk Assessments']
    },
    {
      title: 'Thermal Mapping',
      description: 'Expert temperature and humidity mapping for warehouses, cold rooms, and incubators.',
      icon: <Thermometer className="text-blue-500" />,
      features: ['NIST Traceable Sensors', 'Seasonal Studies', 'Mean Kinetic Temp Analysis']
    },
    {
      title: 'Asset Qualification',
      description: 'Full lifecycle management for laboratory and manufacturing assets to ensure peak performance.',
      icon: <Settings className="text-blue-500" />,
      features: ['Legacy System Remediation', 'New Equipment Startup', 'Periodic Review']
    },
    {
      title: 'Quality Consulting',
      description: 'Strategic guidance on QMS development and audit preparation for regulated environments.',
      icon: <FileText className="text-blue-500" />,
      features: ['SOP Development', 'Gap Analysis', 'Audit Support']
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Specialized Validation Services</h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We provide end-to-end validation support tailored to the unique needs of the life sciences industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Approach = () => {
  return (
    <section id="approach" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">The VMS Way</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Risk-Based Validation Strategy</h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We don't believe in checking boxes for the sake of it. Our approach focuses on what actually matters: patient safety and product quality.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Data Integrity First', desc: 'Every protocol is designed with ALCOA+ principles at its core.', icon: <Activity className="text-blue-600" /> },
                  { title: 'Efficiency Driven', desc: 'Leveraging ASTM E2500 to reduce redundant testing and speed up startup.', icon: <Users className="text-blue-600" /> },
                  { title: 'Audit-Ready Always', desc: 'Documentation that stands up to the most rigorous regulatory inspections.', icon: <Award className="text-blue-600" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl bg-blue-600 p-8 text-white flex flex-col justify-end">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-sm font-medium opacity-80">Years of Experience</div>
                </div>
                <div className="aspect-[4/5] rounded-3xl bg-slate-900 overflow-hidden">
                  <img src="https://picsum.photos/seed/lab1/600/800" alt="Laboratory" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl bg-slate-200 overflow-hidden">
                  <img src="https://picsum.photos/seed/lab2/600/800" alt="Validation" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-3xl bg-white border border-slate-200 p-8 flex flex-col justify-center items-center text-center">
                  <Globe className="text-blue-600 mb-4" size={40} />
                  <div className="text-xl font-bold text-slate-900">Global Standards</div>
                  <div className="text-xs text-slate-500 mt-2">FDA, EMA, & WHO Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to start your next project?</h3>
              <p className="text-slate-400 text-lg mb-12">
                Contact our team of experts today for a consultation on your validation needs.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail size={20} className="text-blue-400" />
                  </div>
                  <span>hello@vms-validation.com</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Phone size={20} className="text-blue-400" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <MapPin size={20} className="text-blue-400" />
                  </div>
                  <span>Boston, MA | Research Triangle Park, NC</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-12 lg:p-20 border-l border-white/10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Needed</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                    <option className="bg-slate-900">CQV Services</option>
                    <option className="bg-slate-900">Thermal Mapping</option>
                    <option className="bg-slate-900">Asset Qualification</option>
                    <option className="bg-slate-900">Quality Consulting</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Tell us about your project..."></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="mb-6">
              <Logo className="h-12" />
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Validation Management Solutions provides expert CQV and compliance support for the life sciences industry. We ensure your critical assets are qualified and audit-ready.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Services</a></li>
              <li><a href="#about" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">About Us</a></li>
              <li><a href="#approach" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Our Approach</a></li>
              <li><a href="#contact" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Validation Management Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">About VMS</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Your Partner in Regulatory Compliance</h3>
            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
              Validation Management Solutions (VMS) was founded on the principle that compliance shouldn't be a bottleneck. We provide high-level technical expertise to the life sciences industry, ensuring that facilities, utilities, and equipment meet the most stringent regulatory requirements.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our team of specialists brings decades of combined experience in CQV, thermal mapping, and quality systems. We work as an extension of your team, providing the documentation and execution support needed to stay audit-ready 365 days a year.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                <p className="text-sm text-slate-500">To deliver risk-based validation solutions that ensure patient safety and product quality through technical excellence.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                <p className="text-sm text-slate-500">To be the most trusted validation partner for life science innovators globally.</p>
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/vms-team/800/600" alt="VMS Team" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold mb-1">15+</div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    { name: 'Pharmaceuticals', icon: <Activity size={24} /> },
    { name: 'Biotechnology', icon: <Globe size={24} /> },
    { name: 'Medical Devices', icon: <Settings size={24} /> },
    { name: 'Gene Therapy', icon: <Shield size={24} /> },
    { name: 'Clinical Labs', icon: <ClipboardCheck size={24} /> },
    { name: 'Cold Chain Logistics', icon: <Thermometer size={24} /> },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Industries Served</h2>
          <h3 className="text-4xl font-bold mb-6 tracking-tight">Compliance Across the Life Sciences</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center flex flex-col items-center gap-4 transition-all"
            >
              <div className="text-blue-400">{industry.icon}</div>
              <span className="text-sm font-semibold tracking-tight">{industry.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: 'Assessment', desc: 'We evaluate your current state and identify regulatory gaps.' },
    { title: 'Planning', desc: 'Development of risk-based protocols and project timelines.' },
    { title: 'Execution', desc: 'Hands-on testing and data collection by our expert team.' },
    { title: 'Reporting', desc: 'Final summary reports and audit-ready documentation delivery.' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Process</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">How We Deliver Results</h3>
        </div>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>
          <div className="grid lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg shadow-blue-600/30">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "VMS transformed our validation process. Their risk-based approach saved us weeks on our facility startup.",
      author: "Director of Engineering",
      company: "Top 10 Pharma Company"
    },
    {
      quote: "The most professional thermal mapping report I've seen in 20 years of quality management. Audit-ready is an understatement.",
      author: "Quality Assurance Manager",
      company: "Biotech Startup"
    },
    {
      quote: "Technical expertise combined with a deep understanding of FDA requirements. VMS is our go-to partner for all CQV needs.",
      author: "VP of Operations",
      company: "Medical Device Manufacturer"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Testimonials</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Trusted by Industry Leaders</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between"
            >
              <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.quote}"</p>
              <div>
                <div className="font-bold text-slate-900">{t.author}</div>
                <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Industries />
        <Services />
        <Process />
        <Approach />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
