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
  ChevronUp,
} from "lucide-react";

const TalentriyaWebsite = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [expandedService, setExpandedService] = useState(null);
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
    // Initialize AOS with fixed animations
    const initAOS = () => {
      if (typeof window !== "undefined") {
        const elements = document.querySelectorAll("[data-aos]");
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
              } else {
                entry.target.classList.remove("aos-animate");
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
          }
        );
        elements.forEach((el) => {
          observer.observe(el);
          el.classList.add("aos-init");
        });
      }
    };

    // Add AOS CSS styles with proper animations
    const addAOSStyles = () => {
      const style = document.createElement("style");
      style.textContent = `
        [data-aos] {
          transition-property: transform, opacity;
          transition-duration: 0.8s;
          transition-timing-function: ease-out-quad;
        }
        
        [data-aos].aos-init:not(.aos-animate) {
          opacity: 0;
        }
        
        [data-aos="fade-up"].aos-init:not(.aos-animate) {
          transform: translateY(50px);
        }
        
        [data-aos="fade-left"].aos-init:not(.aos-animate) {
          transform: translateX(-50px);
        }
        
        [data-aos="fade-right"].aos-init:not(.aos-animate) {
          transform: translateX(50px);
        }
        
        [data-aos="fade-down"].aos-init:not(.aos-animate) {
          transform: translateY(-50px);
        }
        
        [data-aos="zoom-in"].aos-init:not(.aos-animate) {
          transform: scale(0.8);
        }
        
        [data-aos="flip-left"].aos-init:not(.aos-animate) {
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
      const sections = ["home", "about", "services", "technology", "contact"];

      // Find which section is currently in view
      let currentSection = "home";

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + currentScrollY;
          const elementHeight = rect.height;

          // Check if section is in viewport (with some offset for better UX)
          if (
            currentScrollY >= elementTop - 200 &&
            currentScrollY < elementTop + elementHeight - 200
          ) {
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
        service: formData.services,
        contactNumber: formData.contactNumber,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          services: "",
          contactNumber: "",
          message: "",
        });
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
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 ${
        active ? "text-blue-600" : "text-gray-700"
      }`}
    >
      {children}
      {active && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
      )}
    </button>
  );

  const toggleServiceExpansion = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  // Service data with full descriptions
  const services = [
    {
      title: "Payroll Compliance",
      shortDescription:
        "Ensuring your business fully complies with local, national, and industry-specific payroll regulations—from accurate tax withholdings to mandated employee benefits.",
      fullDescription:
        "At Talentriya, we understand that payroll compliance extends far beyond timely and precise salary payments. It requires expert navigation of complex labor laws, tax codes, and regulatory reporting. Our comprehensive approach safeguards your business from compliance risks, ensuring operational integrity and peace of mind.",
      icon: ClipboardList,
      color: "from-blue-500 to-blue-600",
      image: "/truveda/PayrollCompliance.jpg",
    },
    {
      title: "End-to-End Compliance",
      shortDescription:
        "Delivering comprehensive solutions that cover every facet of statutory and regulatory obligations with robust, end-to-end labor compliance services.",
      fullDescription:
        "At Talentriya, we offer robust, end-to-end labor compliance services designed to meet all statutory and regulatory requirements. From employee onboarding to audit preparedness, our solutions ensure seamless compliance across jurisdictions. Leveraging deep industry expertise and advanced technology, Talentriya enables your business to operate with confidence, minimize risk, and focus on strategic growth.",
      icon: Shield,
      color: "from-indigo-500 to-indigo-600",
      image: "/truveda/EndToendCompliance.jpg",
    },
    {
      title: "Contract Labour Compliance",
      shortDescription:
        "Ensuring your operations fully comply with the Contract Labour (Regulation & Abolition) Act, fostering fair treatment, safety, and dignity for all contract workers.",
      fullDescription:
        "At Talentriya, we believe responsible workforce management starts with strict adherence to labor laws. Our Contract Labour Compliance services ensure your business operates within the legal framework established by the Contract Labour Act, 1970, promoting ethical practices and safeguarding worker welfare. Through comprehensive audit services, we provide detailed assessments of contractor compliance, helping you mitigate regulatory risks and uphold the highest standards of labor ethics.",
      icon: UserCheck,
      color: "from-purple-500 to-purple-600",
      image: "/truveda/Contractlabourcompliance-1.jpg",
    },
    {
      title: "Factory Compliance",
      shortDescription:
        "Ensuring manufacturing units fully adhere to all statutory obligations under the Factories Act and related labor, safety, and environmental regulations.",
      fullDescription:
        "At Talentriya, we recognize that compliance in manufacturing extends beyond production—it's about safeguarding your workforce, reputation, and sustainable operations. Our Factory Compliance services help you meet all legal requirements under the Factories Act, 1948, and other relevant regulations, ensuring your facility remains safe, audit-ready, and fully compliant. Whether you are establishing a new facility or managing existing operations, Talentriya provides the expertise and support needed to maintain the highest standards of regulatory compliance and workplace safety.",
      icon: Factory,
      color: "from-cyan-500 to-cyan-600",
      image: "/truveda/Factorycompliance-final.jpg",
    },
    {
      title: "Inspection Handling",
      shortDescription:
        "Expert representation during audits and inspections to ensure regulatory compliance and foster continuous improvement.",
      fullDescription:
        "At Talentriya, we view every inspection and audit as an opportunity to demonstrate our unwavering commitment to quality, compliance, and stakeholder trust. We go beyond simply meeting regulatory requirements we aim to exceed them through transparency, accountability, and a culture dedicated to ongoing enhancement. Our proactive approach ensures your organization remains compliant, resilient, and positioned for sustained success.",
      icon: FileCheck,
      color: "from-green-500 to-green-600",
      image: "/truveda/Inspectionhandling-Final.jpg",
    },
    {
      title: "Compliance Calendar",
      shortDescription:
        "A structured and proactive tool to track and meet all regulatory, legal, and industry-specific obligations punctually.",
      fullDescription:
        "At Talentriya, proactive compliance is fundamental to operational excellence. Our Compliance Calendar offers a comprehensive, forward-looking framework that ensures your business consistently meets all deadlines and regulatory requirements helping you avoid risks and maintain seamless operations.",
      icon: Calendar,
      color: "from-red-500 to-red-600",
      image: "/truveda/Compliancecalender.jpg",
    },
    {
      title: "Records & Return Compliance",
      shortDescription:
        "Ensuring accurate, transparent, and fully compliant record-keeping that remains audit-ready at all times.",
      fullDescription:
        "At Talentriya, we prioritize meticulous maintenance of records to meet and exceed regulatory standards. Our comprehensive Records & Return Compliance services guarantee that all data, documents, and registers are securely managed, easily accessible, and prepared for audits providing you with confidence and peace of mind.",
      icon: Database,
      color: "from-orange-500 to-orange-600",
      image: "/truveda/Recordsandreturns.jpg",
    },
    {
      title: "Statutory Registration & Returns",
      shortDescription:
        "Ensuring timely and accurate submission of all statutory returns through automated tracking and management systems.",
      fullDescription:
        "At Talentriya, we are committed to full compliance with statutory and regulatory requirements. By leveraging advanced automation to monitor deadlines and streamline processes, we guarantee punctual and precise filings of all statutory returns. Our comprehensive approach to Statutory Registration & Returns underscores our dedication to legal integrity and ethical business practices, minimizing risks and fostering trust with regulators, partners, and clients alike.",
      icon: Building,
      color: "from-yellow-500 to-yellow-600",
      image: "/truveda/Statutoryregistrationandreturn.jpg",
    },
    {
      title: "Licenses & Registrations",
      shortDescription:
        "Comprehensive management of all business licenses, registrations, renewals, and amendments—ensuring full compliance with applicable laws.",
      fullDescription:
        "At Talentriya, we navigate the complexities of regulatory requirements on your behalf, allowing you to focus on growing your business without the burden of administrative delays or compliance risks. Whether launching a new venture, expanding operations, or adapting to regulatory updates, our experienced team ensures timely, accurate handling of every license and registration, keeping your business fully compliant and operational.",
      icon: Award,
      color: "from-pink-500 to-pink-600",
      image: "/truveda/Licenseandregistrations.jpg",
    },
    {
      title: "EPF & ESIC Compliance",
      shortDescription:
        "Expert services to ensure full compliance with Employees' Provident Fund (EPF) and Employees' State Insurance Corporation (ESIC) regulations.",
      fullDescription:
        "Talentriya provides specialized support to help organizations across industries navigate the complexities of EPF and ESIC statutory requirements. Leveraging deep expertise in labor laws, we ensure accurate adherence to these essential social security schemes—protecting your business from regulatory risks while promoting employee welfare and statutory compliance.",
      icon: Briefcase,
      color: "from-teal-500 to-teal-600",
      image: "/truveda/ESIandEPFcompliance.jpg",
    },
    {
      title: "Government Liaison",
      shortDescription:
        "Facilitating seamless and effective engagement with government authorities across all levels.",
      fullDescription:
        "At Talentriya, we understand that proactive collaboration with regulatory bodies is vital to building a compliant and sustainable business. Our dedicated government liaison team ensures smooth communication and coordination with central, state, and local departments—helping you navigate regulatory requirements efficiently and maintain strong government relations.",
      icon: UserCog,
      color: "from-violet-500 to-violet-600",
      image: "/truveda/Liaisoning.jpg",
    },
  ];

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-white shadow-lg border-b border-blue-100"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold text-blue-800">
                  Talentriya
                </span>
                <div className="text-xs text-gray-600 font-medium">
                  {" "}
                  Consultant Services
                </div>
              </div>
            </div>

            {/* Nav links + CTA, right aligned */}
            <div className="flex items-center ml-auto space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <NavLink href="home" active={activeSection === "home"}>
                  Home
                </NavLink>
                <NavLink href="about" active={activeSection === "about"}>
                  About
                </NavLink>
                <NavLink href="services" active={activeSection === "services"}>
                  Services
                </NavLink>
                <NavLink
                  href="technology"
                  active={activeSection === "technology"}
                >
                  Technology
                </NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>
                  Contact
                </NavLink>
              </div>
              <div className="hidden lg:block">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-white rounded-2xl shadow-xl border border-blue-100 p-6">
              <div className="flex flex-col space-y-4">
                <NavLink href="home" active={activeSection === "home"}>
                  Home
                </NavLink>
                <NavLink href="about" active={activeSection === "about"}>
                  About
                </NavLink>
                <NavLink href="services" active={activeSection === "services"}>
                  Services
                </NavLink>
                <NavLink
                  href="technology"
                  active={activeSection === "technology"}
                >
                  Technology
                </NavLink>
                <NavLink href="contact" active={activeSection === "contact"}>
                  Contact
                </NavLink>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full text-base font-semibold"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-20 pb-8 relative bg-gradient-to-br from-blue-50 to-indigo-100"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #18181b99, #18181b99), url('/hero-section.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div className="space-y-6" data-aos="fade-right">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-yellow-400">Welcome to Talentriya</span>
                <span className="block text-3xl lg:text-4xl text-white">
                  Future-Ready Consulting Solutions
                </span>
              </h1>
              <p className="text-lg text-white leading-relaxed">
                At Talentriya, we take the complexity out of compliance,
                payroll, and recruitment, delivering streamlined, reliable
                solutions that empower your business to grow with confidence.
                Driven by advanced technology and deep industry expertise, we
                stand for
                <strong className="text-white">
                  {" "}
                  trust, transparency, and transformation
                </strong>
                .
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-8 py-4 border-2 border-white text-white rounded-full text-base font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Learn More
                </button>
              </div>
            </div>
            {/* Right: Contact Form */}
            <div data-aos="fade-left" data-aos-delay="200">
              <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Get Started Today
                </h3>
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <div className="text-base font-semibold text-green-800">
                        Thank you!
                      </div>
                      <div className="text-sm text-green-700">
                        We&apos;ll contact you within 24 hours.
                      </div>
                    </div>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-base text-red-800 font-semibold">
                      Error sending message. Please call us directly.
                    </div>
                  </div>
                )}
                <form onSubmit={submitForm} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Services
                    </label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="payroll">Payroll Compliance</option>
                      <option value="end-to-end">End-to-End Compliance</option>
                      <option value="contract-labor">
                        Contract Labor Compliance
                      </option>
                      <option value="factory">Factory Compliance</option>
                      <option value="statutory">Statutory Registrations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-sm"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
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
                    By submitting, you agree to receive communication from
                    Talentriya about your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: About Content */}
            <div className="space-y-8" data-aos="fade-right">
              <div>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  About Talentriya
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#0D2B4F] mt-4 mb-6">
                  About Talentriya
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Talentriya is a forward-thinking consulting partner
                    specializing in compliance, payroll, and recruitment
                    solutions designed to meet the evolving needs of modern
                    businesses.
                  </p>
                  <p>
                    With a strong foundation in process excellence and
                    regulatory expertise, we deliver results through a
                    structured, milestone-driven approach that ensures accuracy,
                    efficiency, and continuity. Our phased delivery model
                    enables seamless transitions—minimizing risk, enhancing
                    operational performance, and empowering organizations to
                    focus on strategic growth.
                  </p>
                  <p>
                    At Talentriya, we don&apos;t just provide services we build
                    long term value through trust, precision, and a commitment
                    to excellence.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Our Vision
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    To be the most trusted and innovative partner in compliance,
                    payroll, and recruitment, redefining how businesses navigate
                    regulatory and talent challenges.
                  </p>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-xl ">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    To empower businesses by delivering seamless,
                    technology-driven solutions in compliance, payroll, and
                    recruitment.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: About Image */}
            <div className="flex justify-center" data-aos="fade-left">
              <div className="relative">
                <div className=" rounded-3xl shadow-2xl">
                  <img
                    src="/truveda-about-us.avif"
                    alt="Talentriya Team"
                    className="rounded-2xl shadow-lg w-full h-auto max-w-2xl"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%23dbeafe'/%3E%3Crect x='140' y='230' width='120' height='80' fill='%23dbeafe'/%3E%3Ctext x='200' y='380' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3EAbout Talentriya Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                {/* Floating Elements */}
                {/* <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">500+</div>
                      <div className="text-gray-600">Clients</div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <div className="text-xs">
                      <div className="font-bold text-gray-800">15+</div>
                      <div className="text-gray-600">Years Exp</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Our Services
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D2B4F] mt-4 mb-6">
              Comprehensive Compliance Solutions
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We provide end-to-end compliance services tailored to your
              business needs, ensuring full regulatory adherence and operational
              excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                {/* Service Image */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23" +
                        service.color.split("-")[1].substring(0, 6) +
                        "'/%3E%3Ctext x='200' y='100' text-anchor='middle' font-family='Arial' font-size='16' fill='white'%3E" +
                        service.title +
                        "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  {/* <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div> */}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-base text-gray-600 mb-4 leading-relaxed">
                    {expandedService === index
                      ? service.fullDescription
                      : service.shortDescription}
                  </p>

                  <button
                    onClick={() => toggleServiceExpansion(index)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-50 hover:text-white-200 transition-all duration-300 flex items-center justify-center"
                  >
                    {expandedService === index ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        Read More
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-[#f5f5f0]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D2B4F] mb-4">
              Our Technology Advantage
            </h2>
            <p className="text-lg lg:text-xl font-semibold text-gray-700 mb-8">
              Innovative solutions powering your compliance management
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At Talentriya, technology is at the core of everything we do. Our
              robust software architecture, including our self-developed audit
              platform, delivers efficient, secure, and scalable compliance
              solutions tailored to the evolving needs of modern businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {/* Feature 1: Streamlined Processes */}
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-white shadow-lg rounded-2xl p-8 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Streamlined Processes
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Automated workflows that reduce manual effort and minimize
                  errors while maximizing efficiency across all compliance
                  operations.
                </p>
              </div>
            </div>

            {/* Feature 2: Secure Platform */}
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-white shadow-lg rounded-2xl p-8 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Secure Platform
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Enterprise-grade security protecting your sensitive compliance
                  data with advanced encryption and multi-layer security
                  protocols.
                </p>
              </div>
            </div>

            {/* Feature 3: Real-time Insights */}
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-white shadow-lg rounded-2xl p-8 h-full">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real-time Insights
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Dashboard with compliance status and actionable analytics
                  providing live updates and predictive compliance monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features Grid */}
          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      <div className="text-center" data-aos="zoom-in" data-aos-delay="100">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
          <div className="text-gray-700 font-medium">System Uptime</div>
        </div>
      </div>
      <div className="text-center" data-aos="zoom-in" data-aos-delay="200">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
          <div className="text-gray-700 font-medium">Monitoring</div>
        </div>
      </div>
      <div className="text-center" data-aos="zoom-in" data-aos-delay="300">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
          <div className="text-gray-700 font-medium">Active Users</div>
        </div>
      </div>
      <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">99.5%</div>
          <div className="text-gray-700 font-medium">Accuracy Rate</div>
        </div>
      </div>
    </div> */}

          {/* CTA Section */}
          {/* <div className="text-center mt-16" data-aos="fade-up">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Compliance Management?</h3>
        <p className="text-xl mb-8 opacity-90">
          Experience the power of our technology platform with a personalized demo.
        </p>
        <button
          onClick={() => scrollToSection("contact")}
          className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          Request a Demo
        </button>
      </div>
    </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="px-4 py-2 bg-white border border-blue-200 text-blue-800 rounded-full text-sm font-semibold">
              Get Started with Talentriya
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0D2B4F] mt-4 mb-6">
              Request a Consultation
              <span className="block text-[#0D2B4F] bg-clip-text ">
                For Tailored Solutions
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Ready to streamline your compliance processes? Our experts are
              here to guide you toward smarter workforce solutions and
              effortless regulatory management.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div data-aos="fade-right">
              {/* Contact Information */}
              <div className="space-y-8 mb-12">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Call Us
                    </h3>
                    <p className="text-base text-gray-700 mb-1">
                      +91 7032007007
                    </p>
                    <p className="text-sm text-blue-600">Mon-Sat 9AM-7PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Email Us
                    </h3>
                    <p className="text-base text-gray-700 mb-1">
                      info@talentriya.com
                    </p>
                    <p className="text-sm text-indigo-600">
                      Response within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      Visit Us
                    </h3>
                    <p className="text-base text-gray-700 mb-1">
                      F-G3, Ground Floor, Nelsri Enclave Apartment, KNR Colony,
                      Nizampet, Hyderabad, Telangana-500090
                    </p>
                    <p className="text-sm text-purple-600">
                      Free consultation available
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Why Choose Talentriya?
                </h3>
                <div className="space-y-4">
                  {[
                    "Expert compliance consulting team",
                    "Technology-driven solutions",
                    "24/7 customer support",
                    "Proven track record with 500+ clients",
                    "Customized solutions for your business",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-base text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div data-aos="fade-left" data-aos-delay="200">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Get Started Today
                </h3>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <div className="text-base font-semibold text-green-800">
                        Thank you!
                      </div>
                      <div className="text-sm text-green-700">
                        We&apos;ll contact you within 24 hours.
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl">
                    <div className="text-base text-red-800 font-semibold">
                      Error sending message. Please call us directly.
                    </div>
                  </div>
                )}

                <form onSubmit={submitForm} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Services
                    </label>
                    <select
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-sm"
                    >
                      <option value="">Select a service</option>
                      <option value="payroll">Payroll Compliance</option>
                      <option value="end-to-end">End-to-End Compliance</option>
                      <option value="contract-labor">
                        Contract Labor Compliance
                      </option>
                      <option value="factory">Factory Compliance</option>
                      <option value="statutory">Statutory Registrations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-sm"
                      placeholder="Tell us about your compliance needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center ${
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
                    By submitting, you agree to receive communication from
                    Talentriya about your inquiry.
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
              <div className="lg:col-span-1" data-aos="fade-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-600">
                    <span className="text-white font-bold text-2xl">T</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                      Talentriya
                    </span>
                  </div>
                </div>
                <p className="text-base text-gray-300 mb-8 leading-relaxed">
                  Empowering businesses through simplified compliance, advanced
                  technology, and industry-leading expertise. Your trusted
                  partner in workforce compliance management.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-400 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 bg-slate-700 hover:bg-gradient-to-tr hover:from-pink-500 hover:to-yellow-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-bold mb-8 text-blue-400 relative">
                  Quick Links
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Home", section: "home" },
                    { name: "About Us", section: "about" },
                    { name: "Services", section: "services" },
                    { name: "Technology", section: "technology" },
                    { name: "Contact Us", section: "contact" },
                  ].map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.section)}
                      className="flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-xl font-bold mb-8 text-blue-400 relative">
                  Our Solutions
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
                </h3>
                <div className="space-y-4">
                  {[
                    "Payroll Compliance",
                    "Licenses & Registrations",
                    "Contract Labour Compliance",
                    "Factory Compliance",
                    "EPF & ESIC Compliance",
                    "Government Liaison",
                  ].map((service) => (
                    <button
                      key={service}
                      onClick={() => scrollToSection("services")}
                      className="flex items-center text-base text-gray-300 hover:text-blue-400 transition-all duration-300 text-left group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {service}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div data-aos="fade-up" data-aos-delay="300">
                <h3 className="text-xl font-bold mb-8 text-blue-400 relative">
                  Contact Information
                  <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 rounded-full"></div>
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-lg text-white font-bold mb-2">
                      Talentriya Consultant Services
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 group">
                      <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          F-G3, Ground Floor, Nelsri Enclave Apartment,
                          <br />
                          KNR Colony, Nizampet,
                          <br />
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
                        className="text-sm text-gray-300 hover:text-blue-400 transition-colors group-hover:underline"
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
                        className="text-sm text-gray-300 hover:text-blue-400 transition-colors group-hover:underline"
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
              <div className="text-sm text-gray-400 text-center lg:text-left">
                © 2025 Talentriya. All rights reserved. | Designed for
                compliance excellence
              </div>
              <div className="flex flex-wrap gap-8 text-sm">
                {[
                  { name: "Privacy Policy", section: "contact" },
                  { name: "Terms of Service", section: "contact" },
                  { name: "Compliance Standards", section: "services" },
                ].map((link, index) => (
                  <React.Fragment key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-gray-400 hover:text-blue-400 transition-colors hover:underline"
                    >
                      {link.name}
                    </button>
                    {index < 2 && (
                      <span className="text-gray-600 hidden sm:inline">•</span>
                    )}
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
