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

const TalentriyaWebsite = () => {
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
    // Initialize AOS
    const initAOS = () => {
      if (typeof window !== 'undefined') {
        // AOS initialization (mimicking the library)
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
          }
        );

        elements.forEach((el) => {
          observer.observe(el);
          // Add initial classes
          el.classList.add('aos-init');
        });
      }
    };

    // Add AOS CSS styles
    const addAOSStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        [data-aos] {
          transition-property: transform, opacity;
          transition-duration: 0.8s;
          transition-timing-function: ease-out-quad;
        }
        
        [data-aos].aos-init {
          opacity: 0;
        }
        
        [data-aos="fade-up"].aos-init {
          transform: translateY(50px);
        }
        
        [data-aos="fade-left"].aos-init {
          transform: translateX(-50px);
        }
        
        [data-aos="fade-right"].aos-init {
          transform: translateX(50px);
        }
        
        [data-aos="fade-down"].aos-init {
          transform: translateY(-50px);
        }
        
        [data-aos="zoom-in"].aos-init {
          transform: scale(0.8);
        }
        
        [data-aos="flip-left"].aos-init {
          transform: rotateY(-90deg);
        }
        
        [data-aos].aos-animate {
          opacity: 1;
          transform: none;
        }
      `;
      document.head.appendChild(style);
    };

    addAOSStyles();
    setTimeout(initAOS, 100);

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
      className={`relative px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
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
    <div className="min-h-screen bg-white" >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-white shadow-lg border-b border-blue-100"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
                </div>
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-bold text-blue-800">Talentriya</span>
                <div className="text-xs sm:text-xs text-gray-600 font-medium">Consultant Services</div>
              </div>
            </div>

            {/* Nav links + CTA, right aligned */}
            <div className="flex items-center ml-auto space-x-2 sm:space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <NavLink href="home" active={activeSection === "home"}>Home</NavLink>
                <NavLink href="about" active={activeSection === "about"}>About</NavLink>
                <NavLink href="services" active={activeSection === "services"}>Services</NavLink>
                <NavLink href="technology" active={activeSection === "technology"}>Technology</NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>Get a Quote</NavLink>
              </div>
              <div className="hidden lg:block">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Request a Quote
                </button>
              </div>
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-white rounded-2xl shadow-xl border border-blue-100 p-4 sm:p-6">
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <NavLink href="home" active={activeSection === "home"}>Home</NavLink>
                <NavLink href="about" active={activeSection === "about"}>About</NavLink>
                <NavLink href="services" active={activeSection === "services"}>Services</NavLink>
                <NavLink href="technology" active={activeSection === "technology"}>Technology</NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>Get a Quote</NavLink>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm sm:text-base font-semibold"
                >
                  Request a Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 sm:pt-24 pb-8 relative"
        style={{
          backgroundImage: "linear-gradient(to bottom right, #18181b99, #18181b99), url('/hero-section.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-6 sm:space-y-8" data-aos="fade-right">
              <div>
                <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-900 bg-opacity-70 text-white rounded-full text-xs sm:text-sm font-semibold border border-blue-200">
                  Future-Ready Consulting Solutions
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Talentriya
                </span>
                Consultant Services
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed">
                At Talentriya, we take the complexity out of compliance, payroll, and recruitment, 
                delivering streamlined, reliable solutions that empower your business to grow with 
                confidence. Driven by advanced technology and deep industry expertise, we stand for 
                <strong> trust, transparency, and transformation</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => scrollToSection("services")}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Request a Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-sm sm:text-base font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Learn More
                </button>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8" data-aos="fade-up" data-aos-delay="300">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">15+</div>
                  <div className="text-xs sm:text-sm text-gray-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">99%</div>
                  <div className="text-xs sm:text-sm text-gray-200">Compliance Rate</div>
                </div>
              </div>
            </div>
            {/* Right: Contact Form */}
            <div data-aos="fade-left" data-aos-delay="200">
              <div className="max-w-md mx-auto bg-white/30 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get Started Today</h3>
                {submitStatus === "success" && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-blue-800">Thank you!</div>
                      <div className="text-xs sm:text-sm text-blue-700">We&apos;ll contact you within 24 hours.</div>
                    </div>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-sm sm:text-base text-red-800 font-semibold">Error sending message. Please call us directly.</div>
                  </div>
                )}
                <form onSubmit={submitForm} className="space-y-4 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-xs sm:text-sm text-white bg-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-xs sm:text-sm text-white bg-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-xs sm:text-sm text-white bg-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-white text-xs sm:text-sm text-white bg-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold !text-white mb-1 sm:mb-2">Select Services</label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-xs sm:text-sm text-white bg-transparent"
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
                    <label className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">Message</label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none placeholder-white text-xs sm:text-sm text-white bg-transparent"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Contact Us
                      </>
                    )}
                  </button>
                  <p className="text-xs text-white text-center">
                    By submitting, you agree to receive communication from Talentriya about your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-white" >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
              About Talentriya
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
              About Talentriya
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              Talentriya is a forward-thinking consulting partner specializing in compliance, payroll, and recruitment solutions designed to meet the evolving needs of modern businesses.<br/>
              With a strong foundation in process excellence and regulatory expertise, we deliver results through a structured, milestone-driven approach that ensures accuracy, efficiency, and continuity. Our phased delivery model enables seamless transitions—minimizing risk, enhancing operational performance, and empowering organizations to focus on strategic growth.<br/>
              At Talentriya, we don’t just provide services we build long term value through trust, precision, and a commitment to excellence.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 sm:p-8" data-aos="fade-right">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To be the most trusted and innovative partner in compliance, payroll, and recruitment, redefining how businesses navigate regulatory and talent challenges through technology, expertise, and an unwavering commitment to transparency and integrity.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl p-6 sm:p-8" data-aos="fade-left">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                To empower businesses by delivering seamless, technology-driven solutions in compliance, payroll, and recruitment, simplifying regulatory complexities with precision, reliability, and industry leading expertise.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id={"services"}>
            {[
              {
                title: "Payroll Compliance",
                description: "Ensuring your business fully complies with local, national, and industry-specific payroll regulations—from accurate tax withholdings to mandated employee benefits.",
                icon: ClipboardList,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "End-to-End Compliance",
                description: "Delivering comprehensive solutions that cover every facet of statutory and regulatory obligations with robust, end-to-end labor compliance services.",
                icon: Shield,
                color: "from-indigo-500 to-indigo-600"
              },
              {
                title: "Contract Labour Compliance",
                description: "Ensuring your operations fully comply with the Contract Labour (Regulation & Abolition) Act, fostering fair treatment, safety, and dignity for all contract workers.",
                icon: UserCheck,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Factory Compliance",
                description: "Ensuring manufacturing units fully adhere to all statutory obligations under the Factories Act and related labor, safety, and environmental regulations.",
                icon: Factory,
                color: "from-cyan-500 to-cyan-600"
              },
              {
                title: "Inspection Handling",
                description: "Expert representation during audits and inspections to ensure regulatory compliance and foster continuous improvement.",
                icon: FileCheck,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Compliance Calendar",
                description: "A structured and proactive tool to track and meet all regulatory, legal, and industry-specific obligations punctually.",
                icon: Calendar,
                color: "from-red-500 to-red-600"
              },
              {
                title: "Records & Return Compliance",
                description: "Ensuring accurate, transparent, and fully compliant record-keeping that remains audit-ready at all times.",
                icon: Database,
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Statutory Registration & Returns",
                description: "Ensuring timely and accurate submission of all statutory returns through automated tracking and management systems.",
                icon: Building,
                color: "from-yellow-500 to-yellow-600"
              },
              {
                title: "Licenses & Registrations",
                description: "Comprehensive management of all business licenses, registrations, renewals, and amendments—ensuring full compliance with applicable laws.",
                icon: Award,
                color: "from-pink-500 to-pink-600"
              },
              {
                title: "EPF & ESIC Compliance",
                description: "Expert services to ensure full compliance with Employees' Provident Fund (EPF) and Employees' State Insurance Corporation (ESIC) regulations.",
                icon: Briefcase,
                color: "from-teal-500 to-teal-600"
              },
              {
                title: "Government Liaison",
                description: "Facilitating seamless and effective engagement with government authorities across all levels.",
                icon: UserCog,
                color: "from-violet-500 to-violet-600"
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{service.description}</p>
                
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
              Our Technology Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
              Innovation-Driven
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              At Talentriya, technology drives every aspect of our service delivery. Our proprietary software 
              platform, including an advanced audit system, provides efficient, secure, and scalable compliance 
              solutions designed to meet the dynamic demands of modern businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8" data-aos="fade-right">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Streamlined Processes</h3>
                  <p className="text-sm sm:text-base text-gray-600">Automated workflows that reduce manual effort and minimize errors while maximizing efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Secure Platform</h3>
                  <p className="text-sm sm:text-base text-gray-600">Enterprise-grade security safeguarding your sensitive compliance data at all times.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Real-time Insights</h3>
                  <p className="text-sm sm:text-base text-gray-600">Interactive dashboards delivering up-to-date compliance status and actionable analytics.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="200">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8 sm:p-12 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg">
                    <Monitor className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600 mx-auto mb-3 sm:mb-4" />
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Technology Dashboard</h4>
                    <p className="text-sm sm:text-base text-gray-600">Centralized Control Hub</p>
                  </div>
                </div>
                
                {/* Floating Tech Elements */}
                <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white rounded-xl p-2 sm:p-3 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">24/7</div>
                      <div className="text-gray-600">Monitoring</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-white rounded-xl p-2 sm:p-3 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">99.9%</div>
                      <div className="text-gray-600">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6" data-aos="fade-left" data-aos-delay="300">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm sm:text-base text-gray-700 font-medium">Businesses Trust Our Platform</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-600">99.5%</div>
                  <div className="text-sm sm:text-base text-gray-700 font-medium">Compliance Accuracy Rate</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm sm:text-base text-gray-700 font-medium">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
            <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white border border-blue-200 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
              Get Started with Talentriya
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 sm:mt-4 mb-4 sm:mb-6">
              Request a Consultation
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                For Tailored Solutions
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
              Ready to streamline your compliance processes? Our experts are here to guide you 
              toward smarter workforce solutions and effortless regulatory management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div data-aos="fade-right">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-1">+91 7032007007</p>
                    <p className="text-xs sm:text-sm text-blue-600">Mon-Sat 9AM-7PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-1">info@talentriya.com</p>
                    <p className="text-xs sm:text-sm text-indigo-600">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Visit Us</h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-1">F-G3, Ground Floor, Nelsri Enclave Apartment, KNR Colony, Nizampet, Hyderabad, Telangana-500090</p>
                    <p className="text-xs sm:text-sm text-purple-600">Free consultation available</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Why Choose Talentriya?</h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Expert compliance consulting team",
                    "Technology-driven solutions",
                    "24/7 customer support",
                    "Proven track record with 500+ clients",
                    "Customized solutions for your business"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="200">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Get Started Today</h3>
                
                {submitStatus === "success" && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3" />
                    <div>
                      <div className="text-sm sm:text-base font-semibold text-blue-800">Thank you!</div>
                      <div className="text-xs sm:text-sm text-blue-700">We&apos;ll contact you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-sm sm:text-base text-red-800 font-semibold">Error sending message. Please call us directly.</div>
                  </div>
                )}

                <form onSubmit={submitForm} className="space-y-4 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-xs sm:text-sm text-black bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-xs sm:text-sm text-black bg-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-xs sm:text-sm text-black bg-white"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-xs sm:text-sm text-black bg-white"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Select Services</label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-xs sm:text-sm text-black bg-white"
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
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">Message</label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none placeholder-gray-400 text-xs sm:text-sm text-black bg-white"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Contact Us
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    By submitting, you agree to receive communication from Talentriya about your inquiry.
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
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="py-12 sm:py-16">
            <div className="grid lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-1" data-aos="fade-up">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                      Talentriya
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  Empowering businesses through simplified compliance, advanced technology, 
                  and industry-leading expertise. Your trusted partner in workforce compliance 
                  management.
                </p>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-11 sm:h-11 bg-slate-700 hover:bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-11 sm:h-11 bg-slate-700 hover:bg-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-11 sm:h-11 bg-slate-700 hover:bg-blue-700 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-11 sm:h-11 bg-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-blue-600 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { name: 'Home', section: 'home' },
                    { name: 'About Us', section: 'about' },
                    { name: 'Services', section: 'services' },
                    { name: 'Technology', section: 'technology' },
                    { name: 'Get a Quote', section: 'contact' },
                    { name: 'Contact Us', section: 'contact' }
                  ].map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.section)}
                      className="flex items-center text-sm sm:text-base text-gray-300 hover:text-blue-600 cursor-pointer transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-blue-600 relative">
                  Our Solutions
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-3 sm:space-y-4">
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
                      className="flex items-center text-sm text-gray-300 hover:text-blue-600 cursor-pointer transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-blue-600 relative">
                  Contact Information
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600 rounded-full"></div>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-base sm:text-lg text-white font-bold mb-1 sm:mb-2">Talentriya Consultant Services</p>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-2 sm:space-x-3 group">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          F-G3, Ground Floor, Nelsri Enclave Apartment,<br />
                          KNR Colony, Nizampet,<br />
                          Hyderabad, Telangana-500090
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3 group">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <a 
                        href="tel:+917032007007" 
                        className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors group-hover:underline"
                      >
                        +91 7032007007
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3 group">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <a 
                        href="mailto:info@talentriya.com" 
                        className="text-xs sm:text-sm text-gray-300 hover:text-blue-400 transition-colors group-hover:underline"
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
          <div className="border-t border-slate-700 py-6 sm:py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 sm:space-y-4 lg:space-y-0">
              <div className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">
                © 2025 Talentriya. All rights reserved. | Designed with ❤️ for compliance excellence
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm">
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
                    {index < 2 && <span className="text-gray-600 hidden sm:inline">•</span>}
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
export default TalentriyaWebsite;
