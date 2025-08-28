"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Shield,
  Heart,
  Star,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Send,
  CheckCircle,
  Clock,
  Target,
  Zap,
  BookOpen,
  Calendar,
  Building,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Settings,
  Database,
  Monitor,
  BarChart3,
  Lock,
  UserCheck,
  ClipboardList,
  Briefcase,
  Scale,
  Factory,
  UserCog,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const TruvedaWebsite = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    services: "",
    contactNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Get all sections
      const sections = ['home', 'about', 'services', 'technology', 'contact'];
      
      // Find which section is currently in view
      let currentSection = 'home';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          const elementHeight = rect.height;
          
          // Check if section is in viewport (with some offset for better UX)
          if (currentScrollY >= elementTop - 200 && currentScrollY < elementTop + elementHeight - 200) {
            currentSection = sectionId;
          }
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Send all fields including service to your API
      const payload = {
        name: formData.fullName,
        email: formData.email,
        subject: formData.companyName,
        message: formData.message,
        service: formData.services, // <-- send service
        contactNumber: formData.contactNumber,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", companyName: "", services: "", contactNumber: "", message: "" });
        setTimeout(() => setSubmitStatus(""), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const NavLink = ({ href, children, active }) => (
    <button
      onClick={() => scrollToSection(href)}
      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
        active ? "text-blue-600" : "text-gray-700"
      }`}
    >
      {children}
      {active && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-white shadow-lg border-b border-blue-100"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-800">Truveda</span>
                <div className="text-xs text-gray-600 font-medium">Compliance Solutions</div>
              </div>
            </div>

            {/* Nav links + CTA, right aligned */}
            <div className="flex items-center ml-auto space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <NavLink href="home" active={activeSection === "home"}>Home</NavLink>
                <NavLink href="about" active={activeSection === "about"}>About</NavLink>
                <NavLink href="services" active={activeSection === "services"}>Services</NavLink>
                <NavLink href="technology" active={activeSection === "technology"}>Technology</NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>Get in Touch</NavLink>
              </div>
              <div className="hidden lg:block">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started Today
                </button>
              </div>
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
              <div className="flex flex-col space-y-4">
                <NavLink href="home" active={activeSection === "home"}>Home</NavLink>
                <NavLink href="about" active={activeSection === "about"}>About</NavLink>
                <NavLink href="services" active={activeSection === "services"}>Services</NavLink>
                <NavLink href="technology" active={activeSection === "technology"}>Technology</NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>Get in Touch</NavLink>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold"
                >
                  Get Started Today
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-24 pb-8 relative"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #18181b99, #18181b99), url('/hero-section.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-8">
              <div>
                <span className="px-4 py-2 bg-blue-900 bg-opacity-70 text-white rounded-full text-sm font-semibold border border-blue-200">
                  Future-Ready Solutions
                </span>
              </div>
              <h1 className="text-5xl lg:text-5xl font-bold text-white leading-tight">
                Future-Ready
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Consulting
                </span>
                Solutions
              </h1>
              <p className="text-xl text-white leading-relaxed">
                Helping businesses stay compliant, efficient, and ahead of the curve with tailored 
                workforce compliance and technology-driven solutions. At Truveda, we partner with 
                businesses to simplify complex compliance challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("services")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-200">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-gray-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-gray-200">Compliance Rate</div>
                </div>
              </div>
            </div>
            {/* Right: Contact Form */}
            <div>
              <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-6">Get Started Today</h3>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-blue-800">Thank you!</div>
                      <div className="text-sm text-blue-700">We&apos;ll contact you within 24 hours.</div>
                    </div>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-red-800 font-semibold">Error sending message. Please call us directly.</div>
                  </div>
                )}
                <form onSubmit={submitForm} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white  mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-sm text-white bg-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white  mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-sm text-white bg-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white  mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-sm text-white bg-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white  mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-sm text-white bg-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold !text-white  mb-2">Select Services</label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-white bg-transparent"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" className="text-white bg-blue-900">Select a service</option>
                      <option value="payroll" className="text-black bg-white">Payroll Compliance</option>
                      <option value="end-to-end" className="text-black bg-white">End-to-End Compliance</option>
                      <option value="contract-labor" className="text-black bg-white">Contract Labor Compliance</option>
                      <option value="factory" className="text-black bg-white">Factory Compliance</option>
                      <option value="statutory" className="text-black bg-white">Statutory Registrations</option>
                      <option value="other" className="text-black bg-white">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white  mb-2">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none placeholder-white text-sm text-white bg-transparent"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Contact Us
                      </>
                    )}
                  </button>
                  <p className="text-xs text-white  text-center">
                    By submitting, you agree to receive communication from Truveda about your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          {/* <div className="flex flex-col items-center">
            <div className="text-sm text-gray-200 mb-2">Discover More</div>
            <ChevronDown className="w-6 h-6 text-white" />
          </div> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              About Truveda
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Your Trusted
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Compliance Partner
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Truveda is a trusted compliance and workforce consulting company helping businesses navigate 
              the ever-evolving regulatory landscape. We deliver end-to-end compliance solutions, 
              technology-driven tools, and personalized strategies that make managing compliance effortless.
            </p>
          </div>

          {/* Leadership Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Leadership</h3>
                  <div className="mb-6">
                    <h4 className="text-2xl font-bold text-blue-800 mb-2">Mr. Raju Thoutam</h4>
                    <div className="text-blue-600 font-semibold mb-4">Founder & CEO</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    With extensive experience in compliance consulting and workforce management, 
                    Mr. Raju Thoutam has been at the forefront of helping organizations navigate 
                    complex labor laws and regulatory frameworks. His leadership philosophy focuses 
                    on innovation, transparency, and customer-centric solutions.
                  </p>
                  <blockquote className="text-xl italic text-blue-700 border-l-4 border-blue-500 pl-6">
                    &quot;Compliance shouldn&apos;t be a burden; it should be a strategic advantage.&quot;
                  </blockquote>
                </div>
                <div>
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
                        RT
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Leadership Excellence</h4>
                      <p className="text-gray-600">Guiding businesses to sustainable growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted partner for organizations by delivering innovative, reliable, 
                and future-ready compliance solutions that enable sustainable business growth.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                We aim to simplify compliance through cutting-edge technology, expert guidance, 
                and customer-first strategies that empower businesses to focus on growth while 
                staying fully compliant.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Innovation",
                description: "Cutting-edge technology solutions for modern compliance challenges.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Heart,
                title: "Transparency",
                description: "Open communication and honest guidance in all our partnerships.",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                icon: Users,
                title: "Customer-First",
                description: "Your success is our priority. We tailor solutions to your needs.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: TrendingUp,
                title: "Excellence",
                description: "Delivering superior results through expertise and dedication.",
                color: "from-cyan-500 to-cyan-600"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Comprehensive Compliance Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              End-to-End Solutions
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                For Your Business
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Keep your business compliant, secure, and future-ready with our comprehensive compliance management solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Payroll Compliance",
                description: "Ensure accurate payroll processing, statutory deductions, and timely submissions.",
                icon: ClipboardList,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "End-to-End Compliance",
                description: "A complete compliance management solution tailored to your organization's needs.",
                icon: Shield,
                color: "from-indigo-500 to-indigo-600"
              },
              {
                title: "Contract Labor Compliance",
                description: "Navigate legal frameworks smoothly and manage third-party contractor obligations seamlessly.",
                icon: UserCheck,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Factory Compliance",
                description: "Stay up to date with factory regulations, inspections, and documentation requirements.",
                icon: Factory,
                color: "from-cyan-500 to-cyan-600"
              },
              {
                title: "Inspection Handling",
                description: "Let our experts manage complex inspection procedures with ease and efficiency.",
                icon: FileCheck,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Compliance Calendar",
                description: "Never miss deadlines with our smart compliance calendar and automated reminders.",
                icon: Calendar,
                color: "from-red-500 to-red-600"
              },
              {
                title: "Records & Returns",
                description: "Simplify filing statutory records, returns, and related documentation.",
                icon: Database,
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Statutory Registrations",
                description: "Hassle-free registration services for PF, ESIC, GST, PT, and other statutory requirements.",
                icon: Building,
                color: "from-yellow-500 to-yellow-600"
              },
              {
                title: "Social Audits",
                description: "Ensure ethical compliance standards through professional social compliance audits.",
                icon: Scale,
                color: "from-pink-500 to-pink-600"
              },
              {
                title: "Licenses & Registrations",
                description: "End-to-end licensing support for smooth and compliant business operations.",
                icon: Award,
                color: "from-teal-500 to-teal-600"
              },
              {
                title: "EPF & ESIC Compliance",
                description: "Complete management of PF and ESIC-related compliances to avoid penalties.",
                icon: Briefcase,
                color: "from-violet-500 to-violet-600"
              },
              {
                title: "Government Liaison",
                description: "Direct coordination with government authorities for quicker and smoother approvals.",
                icon: UserCog,
                color: "from-emerald-500 to-emerald-600"
              },
              {
                title: "NAPS & NATS Apprentice Administration",
                description: "Simplify apprentice hiring and administration with our seamless compliance solutions.",
                icon: Users,
                color: "from-rose-500 to-rose-600"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Our Technology Advantage
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Innovation-Driven
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Designed for accuracy and growth with cutting-edge technology solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Streamlined Processes</h3>
                  <p className="text-gray-600">Automate manual tasks and save valuable time with our intelligent workflow automation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Platform</h3>
                  <p className="text-gray-600">Industry-grade security protocols protect your sensitive business data at all times.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Insights</h3>
                  <p className="text-gray-600">Monitor compliance health with live dashboards and comprehensive reporting tools.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-12 shadow-2xl">
                  <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                    <Monitor className="w-20 h-20 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">Technology Dashboard</h4>
                    <p className="text-gray-600">Centralized Control Hub</p>
                  </div>
                </div>
                
                {/* Floating Tech Elements */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">24/7</div>
                      <div className="text-gray-600">Monitoring</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">99.9%</div>
                      <div className="text-gray-600">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-700 font-medium">Businesses Trust Our Platform</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">99.5%</div>
                  <div className="text-gray-700 font-medium">Compliance Accuracy Rate</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-gray-700 font-medium">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-white border border-blue-200 text-blue-800 rounded-full text-sm font-semibold">
              Get Started with Truveda
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Take the First Step
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Toward Simplified Compliance
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to streamline your compliance processes? Our experts are here to guide you 
              toward smarter workforce solutions and effortless regulatory management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              {/* Contact Information */}
              <div className="space-y-8 mb-12">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-700 mb-1">+91 7032007007</p>
                    <p className="text-sm text-blue-600">Mon-Sat 9AM-7PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-700 mb-1">info@talentriya.com</p>
                    <p className="text-sm text-indigo-600">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Visit Us</h3>
                    <p className="text-gray-700 mb-1">F-G3, Nelsri Enclave Apartment, KNR Colony, Nizampet, Hyderabad-500090</p>
                    <p className="text-sm text-purple-600">Free consultation available</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Why Choose Truveda?</h3>
                <div className="space-y-4">
                  {[
                    "Expert compliance consulting team",
                    "Technology-driven solutions",
                    "24/7 customer support",
                    "Proven track record with 500+ clients",
                    "Customized solutions for your business"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get Started Today</h3>
                
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <div className="font-semibold text-blue-800">Thank you!</div>
                      <div className="text-sm text-blue-700">We&apos;ll contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-red-800 font-semibold">Error sending message. Please call us directly.</div>
                  </div>
                )}

                <form onSubmit={submitForm} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-sm text-black bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-sm text-black bg-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-sm text-black bg-white"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-sm text-black bg-white"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Services</label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-black bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="payroll">Payroll Compliance</option>
                      <option value="end-to-end">End-to-End Compliance</option>
                      <option value="contract-labor">Contract Labor Compliance</option>
                      <option value="factory">Factory Compliance</option>
                      <option value="statutory">Statutory Registrations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none placeholder-gray-400 text-sm text-black bg-white"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Contact Us
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    By submitting, you agree to receive communication from Truveda about your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                      Truveda
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed text-sm">
                  Simplifying labor law compliance through innovative solutions, 
                  technology, and deep industry expertise. Your trusted partner 
                  in workforce compliance management.
                </p>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-700 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-8 text-blue-600 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Home', section: 'home' },
                    { name: 'About Us', section: 'about' },
                    { name: 'Our Services', section: 'services' },
                    { name: 'Technology', section: 'technology' },
                    { name: 'Get a Quote', section: 'contact' },
                    { name: 'Contact Us', section: 'contact' }
                  ].map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.section)}
                      className="flex items-center text-gray-300 hover:text-blue-600 cursor-pointer transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-bold mb-8 text-blue-600 relative">
                  Services
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {[
                    'Payroll Compliance',
                    'Licenses & Registrations',
                    'Contract Labour Compliance',
                    'Factory Compliance',
                    'EPF & ESIC Compliance',
                    'Government Liaison'
                  ].map((service) => (
                    <button
                      key={service}
                      onClick={() => scrollToSection('services')}
                      className="flex items-center text-gray-300 hover:text-blue-600 cursor-pointer transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform text-sm">{service}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-8 text-blue-600 relative">
                  Contact us
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-white font-bold text-lg mb-2">Truveda Corporate Solutions</p>
                    <p className="text-gray-400 text-sm">Private Limited</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                          F-G3, Nelsri Enclave Apartment,<br />
                          KNR Colony, Nizampet,<br />
                          Hyderabad, Telangana-500090
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <a 
                        href="tel:+917032007007" 
                        className="text-gray-300 hover:text-blue-400 transition-colors text-sm group-hover:underline"
                      >
                        +91 7032007007
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <a 
                        href="mailto:info@talentriya.com" 
                        className="text-gray-300 hover:text-blue-400 transition-colors text-sm group-hover:underline"
                      >
                        info@talentriya.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-700 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-gray-400 text-sm text-center lg:text-left">
                © 2025 Truveda. All rights reserved. | Designed with ❤️ for compliance excellence
              </div>
              <div className="flex flex-wrap gap-8 text-sm">
                {[
                  { name: 'Privacy Policy', section: 'contact' },
                  { name: 'Terms of Service', section: 'contact' },
                  { name: 'Compliance Standards', section: 'services' }
                ].map((link, index) => (
                  <React.Fragment key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors hover:underline"
                    >
                      {link.name}
                    </button>
                    {index < 2 && <span className="text-gray-600">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TruvedaWebsite;