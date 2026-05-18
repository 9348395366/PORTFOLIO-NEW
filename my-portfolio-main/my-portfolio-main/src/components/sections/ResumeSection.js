import React, { forwardRef, useRef, useMemo, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import {
  Code,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  Target,
  User,
  ArrowDown,
} from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/sections/ResumeSection.scss";
import resumePDF from "../../assets/files/Resume2026.pdf";

const RESUME_CONTENT = {
  name: "CHANDAN",
  role: "Intern | B.Tech Computer Science & Engineering",
  edition: "Edition 2026 // Portfolio",
  summary:
    "Highly motivated IT student passionate about coding, reading, and music. Strong foundation in Java, responsive web development, and Linux system administration, with a growth mindset and solid problem-solving ability for dynamic internship environments.",
  skills: [
    {
      title: "Programming Languages",
      items: ["Python", "Java"],
    },
    {
      title: "Web Technologies",
      items: ["JavaScript", "HTML", "CSS"],
    },
    {
      title: "Database & Tools",
      items: ["MySQL", "Firebase", "AWS", "Jupyter Notebook", "VS Code"],
    },
  ],
  projects: [
    {
      title: "AI Weather Prediction System",
      location: "Bhubaneswar, India",
      period: "2025 - Present",
      description:
        "Built a Python-based weather prediction solution using machine learning and Streamlit for deployment. Tracks temperature, humidity, AQI, wind speed, and precipitation with GPS-based location support.",
      tags: ["Python", "Machine Learning", "Streamlit", "GPS"],
    },
    {
      title: "Music Streaming Platform",
      location: "Bhubaneswar, India",
      period: "2025 - Present",
      description:
        "Developed a browser-based music platform with play/pause controls, AI lyrics assistant support, and a mixer mode for combining songs.",
      tags: ["JavaScript", "JSON", "HTML", "CSS"],
    },
  ],
  education: [
    {
      institution: "Centurion University of Technology and Management",
      location: "Bhubaneswar, Odisha",
      period: "2024 - Present",
      program: "B.Tech in Computer Science & Engineering | GPA: 8.38 / 10.0",
    },
    {
      institution: "Adarsha College of Engineering",
      location: "Angul, Odisha",
      period: "2022 - 2024",
      program: "Diploma | GPA: 8.01 / 10.0",
    },
    {
      institution: "Satyanaryanan ITC",
      location: "Angul, Odisha",
      period: "2018 - 2020",
      program: "Degree and Field of Study | GPA: 8.13 / 10.0",
    },
    {
      institution: "Thakurgarh High School",
      location: "Angul, Odisha",
      period: "2016",
      program: "Matriculation | GPA: 7.74 / 10.0",
    },
  ],
  strengths: [
    {
      title: "Continuous Learning",
      text: "Strong willingness to adopt and master new technologies, helping me stay effective in rapidly evolving technical environments.",
    },
    {
      title: "Collaboration & Team Spirit",
      text: "Comfortable working in groups, sharing ideas clearly, and contributing to collective goals with a positive and reliable mindset.",
    },
  ],
  contact: {
    phone: "+91 9348395366",
    email: "chandannanda345@gmail.com",
    linkedin: "linkedin.com/in/chandan-kumar-135791239",
    location: "Angul, Odisha",
  },
};

const StarBackground = () => {
  const stars = useMemo(() => {
    return [...Array(200)].map((_, i) => {
      const type = Math.random();
      return {
        id: i,
        class: type > 0.96 ? "hero" : type > 0.7 ? "mid" : "distant",
        size:
          type > 0.96
            ? Math.random() * 3 + 2
            : type > 0.7
              ? Math.random() * 2 + 1
              : Math.random() * 1 + 0.5,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
        opacity: 0.2 + Math.random() * 0.8,
      };
    });
  }, []);

  return (
    <div className="cosmic-background">
      <div className="cosmic-noise"></div>
      <div className="nebula-transition-top"></div>
      <div className="nebula-layer cloud-1"></div>
      <div className="nebula-layer cloud-2"></div>
      <div className="nebula-layer cloud-3"></div>
      <div className="electric-glow spot-main"></div>
      <div className="electric-glow spot-core core-1"></div>
      <div className="electric-glow spot-core core-2"></div>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.class}`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

const Page = forwardRef((props, ref) => {
  return (
    <div
      className={`page ${props.className || ""}`}
      ref={ref}
      data-density={props.density || "soft"}
    >
      <div className="page-content">
        {props.children}
        <div className="page-footer">{props.number}</div>
      </div>
    </div>
  );
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const ResumeSection = ({ id }) => {
  const bookRef = useRef(null);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 1050;
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextPageDirection, setNextPageDirection] = useState(null);
  const [flipStartData, setFlipStartData] = useState(null);
  const totalPages = 8;

  const onFlip = (e) => {
    setCurrentPage(e.data);
    setIsFlipping(false);
    setNextPageDirection(null);
    setFlipStartData(null);
  };

  const onFlipStart = (e) => {
    setIsFlipping(true);
    setFlipStartData(e.data);

    if (e.data === 0) {
      setNextPageDirection("next");
    } else if (e.data === totalPages - 2) {
      setNextPageDirection("next");
    } else if (e.data === totalPages - 1) {
      setNextPageDirection("prev");
    } else if (e.data === 1 && currentPage === 0) {
      setNextPageDirection("prev");
    } else {
      const direction = e.data > currentPage ? "next" : "prev";
      setNextPageDirection(direction);
    }
  };

  const onDownloadCV = () => {
    window.open(resumePDF, "_blank");
  };

  const getBookmarkState = () => {
    if (isMobile) return "is-mobile-hidden";
    if (isFlipping && nextPageDirection && flipStartData !== null) {
      let predictedPage;

      if (nextPageDirection === "next") {
        predictedPage = flipStartData + 1;
      } else {
        predictedPage = flipStartData - 1;
      }

      predictedPage = Math.max(0, Math.min(totalPages - 1, predictedPage));

      if (predictedPage === 0) return "is-front";
      if (predictedPage === totalPages - 1) return "is-back";
      return "is-open";
    }

    if (currentPage === 0) return "is-front";
    if (currentPage === totalPages - 1) return "is-back";
    return "is-open";
  };

  const getInteractiveState = () => {
    if (isFlipping && nextPageDirection && flipStartData !== null) {
      let predictedPage;

      if (nextPageDirection === "next") {
        predictedPage = flipStartData + 1;
      } else {
        predictedPage = flipStartData - 1;
      }

      predictedPage = Math.max(0, Math.min(totalPages - 1, predictedPage));

      const isPredictedFrontCover = predictedPage === 0;
      const isPredictedBackCover = predictedPage === totalPages - 1;

      return {
        isFrontCover: isPredictedFrontCover,
        isBackCover: isPredictedBackCover,
      };
    }

    return {
      isFrontCover: currentPage === 0,
      isBackCover: currentPage === totalPages - 1,
    };
  };

  const { isFrontCover, isBackCover } = getInteractiveState();
  const bookmarkState = getBookmarkState();

  const handlePrevClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isFrontCover) {
      setIsFlipping(true);
      setNextPageDirection("prev");
      setFlipStartData(currentPage);
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isBackCover) {
      setIsFlipping(true);
      setNextPageDirection("next");
      setFlipStartData(currentPage);
      bookRef.current.pageFlip().flipNext();
    }
  };

  useEffect(() => {
    if (isMobile) return;
    const bookElement = document.querySelector(".stellar-book");
    if (!bookElement) return;

    const handlePageMouseDown = (e) => {
      const pageElement = e.target.closest(".page");
      if (pageElement) {
        const pageIndex = Array.from(
          bookElement.querySelectorAll(".page"),
        ).indexOf(pageElement);
        if (pageIndex !== -1) {
          setIsFlipping(true);
          setFlipStartData(pageIndex);

          if (pageIndex === 0) {
            setNextPageDirection("next");
          } else if (pageIndex === totalPages - 2) {
            setNextPageDirection("next");
          } else if (pageIndex === totalPages - 1) {
            setNextPageDirection("prev");
          } else if (pageIndex === 1 && currentPage === 0) {
            setNextPageDirection("prev");
          }
        }
      }
    };

    bookElement.addEventListener("mousedown", handlePageMouseDown);

    return () => {
      bookElement.removeEventListener("mousedown", handlePageMouseDown);
    };
  }, [currentPage, isMobile]);

  const scrollToSocials = () => {
    const socialsSection = document.getElementById("socials-section");
    if (socialsSection) {
      socialsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id={id} className="resume-section">
      <StarBackground />

      {isMobile ? (
        <motion.div
          key="mobile-view"
          className="mobile-resume-view"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          <div className="mobile-card">
            <div className="icon-circle">
              <Code size={40} className="mobile-icon" />
            </div>
            <h1 className="mobile-title">{RESUME_CONTENT.name}</h1>
            <p className="mobile-subtitle">{RESUME_CONTENT.role}</p>

            <div className="mobile-divider"></div>

            <p className="mobile-desc">{RESUME_CONTENT.summary}</p>

            <button className="mobile-download-btn" onClick={onDownloadCV}>
              <Download size={20} />
              <span>Download Resume (PDF)</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="desktop-view"
          className={`book-wrapper ${isMobile ? "mobile-mode" : ""}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.button
            type="button"
            variants={itemVariants}
            className={`nav-arrow left ${isFrontCover ? "disabled" : ""}`}
            onClick={(e) => handlePrevClick(e)}
            disabled={isFrontCover}
            style={{
              cursor: isFrontCover ? "default" : "pointer",
              pointerEvents: isFrontCover ? "none" : "auto",
              opacity: isFrontCover ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={isMobile ? 30 : 45} />
          </motion.button>

          <motion.div className="book-container" variants={itemVariants}>
            {!isMobile && (
              <div
                className={`bookmark-tab ${bookmarkState}`}
                onClick={
                  !isFrontCover && !isBackCover ? onDownloadCV : undefined
                }
                style={{
                  cursor: isFrontCover || isBackCover ? "default" : "pointer",
                  pointerEvents: isFrontCover || isBackCover ? "none" : "auto",
                }}
              >
                <Download
                  size={18}
                  className="bookmark-icon"
                  style={{ opacity: isFrontCover || isBackCover ? 0 : 1 }}
                />
                <span
                  className="bookmark-text"
                  style={{ opacity: isFrontCover || isBackCover ? 0 : 1 }}
                >
                  Resume
                </span>
              </div>
            )}
            <HTMLFlipBook
              width={450}
              height={600}
              size="fixed"
              minWidth={450}
              maxWidth={450}
              minHeight={600}
              maxHeight={600}
              showCover={true}
              useMouseEvents={true}
              className="stellar-book"
              ref={bookRef}
              onFlip={onFlip}
              onFlipStart={onFlipStart}
              flippingTime={900}
              usePortrait={false}
              startPage={0}
              autoSize={true}
              showPageCorners={true}
              drawShadow={true}
              maxShadowOpacity={0.5}
            >
              {/* Page 0: Cover */}
              <Page number="" className="is-cover page-right" density="hard">
                <div className="cover-content">
                  <div className="corner-ornament top-left"></div>
                  <div className="corner-ornament top-right"></div>
                  <div className="corner-ornament bottom-left"></div>
                  <div className="corner-ornament bottom-right"></div>

                  <div className="cover-main-visual">
                    <div className="seal-container">
                      <Code size={40} strokeWidth={1.5} className="seal-icon" />
                    </div>
                    <div className="gold-line-v"></div>
                  </div>

                  <div className="cover-text-group">
                    <h1 className="book-title">{RESUME_CONTENT.name}</h1>
                    <div className="title-separator">
                      <span className="dot"></span>
                      <span className="line"></span>
                      <span className="dot"></span>
                    </div>
                    <div className="edition-badge">{RESUME_CONTENT.edition}</div>
                  </div>
                </div>
              </Page>

              {/* Page 1: Professional Profile */}
              <Page number="1" className="page-left">
                <div className="page-inner-centered">
                  <h2 className="page-header">
                    <User size={18} /> Professional Summary
                  </h2>
                  <div className="section-content">
                    <p className="summary-text">{RESUME_CONTENT.summary}</p>
                  </div>
                </div>
              </Page>

              {/* Page 2: Core Skills */}
              <Page number="2" className="page-right">
                <div className="page-inner">
                  <h2 className="page-header">
                    <Code size={18} /> Core Skills
                  </h2>
                  <div className="section-content">
                    {RESUME_CONTENT.skills.map((skillGroup, index) => (
                      <div
                        key={skillGroup.title}
                        className="goal-section"
                        style={{ marginTop: index === 0 ? 0 : "18px" }}
                      >
                        <h4 className="subtitle-gold">{skillGroup.title}</h4>
                        <p>{skillGroup.items.join(" • ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Page>

              {/* Page 3: Projects */}
              <Page number="3" className="page-left">
                <div className="page-inner">
                  <h2 className="page-header">
                    <Briefcase size={22} /> Projects
                  </h2>
                  <div className="section-content">
                    {RESUME_CONTENT.projects.map((project, index) => (
                      <div key={project.title} style={{ marginTop: index === 0 ? 0 : "20px" }}>
                        <span className="year-label">{project.period}</span>
                        <h3>{project.title}</h3>
                        <p className="subtitle-text">{project.location}</p>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Page>

              {/* Page 4: Education */}
              <Page number="4" className="page-right">
                <div className="page-inner">
                  <h2 className="page-header">
                    <GraduationCap size={22} /> Education
                  </h2>
                  <div className="section-content">
                    {RESUME_CONTENT.education.map((item, index) => (
                      <div
                        key={`${item.institution}-${item.period}`}
                        style={{ marginTop: index === 0 ? 0 : "16px" }}
                      >
                        <span className="year-label">{item.period}</span>
                        <h3>{item.institution}</h3>
                        <p className="subtitle-text">{item.location}</p>
                        <p>{item.program}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Page>

              {/* Page 5: Strengths & Objective */}
              <Page number="5" className="page-left">
                <div className="page-inner">
                  <h2 className="page-header">
                    <Target size={18} /> Strengths & Objective
                  </h2>
                  <div className="section-content">
                    <div className="highlight-box">
                      <strong>Internship Objective:</strong> Apply my technical
                      foundation and adaptability to contribute to real-world IT
                      projects while growing through hands-on experience.
                    </div>

                    {RESUME_CONTENT.strengths.map((strength, index) => (
                      <div
                        key={strength.title}
                        className="goal-section"
                        style={{ marginTop: index === 0 ? "20px" : "14px" }}
                      >
                        <h4 className="subtitle-gold">{strength.title}</h4>
                        <p>{strength.text}</p>
                      </div>
                    ))}

                    <div className="tech-tags-container">
                      <span>Problem Solving</span>
                      <span>Adaptability</span>
                      <span>Team Collaboration</span>
                      <span>Communication</span>
                    </div>
                  </div>
                </div>
              </Page>

              {/* Page 6: Closing Page */}
              <Page number="6" className="page-right">
                <div className="page-inner-back">
                  <div className="closing-content">
                    <Code size={40} className="faded-icon" />
                    <h3>Thank you for your time</h3>
                    <div className="divider-small"></div>
                    <p className="sub-text">
                      Open to internship opportunities where I can contribute to
                      meaningful projects and continue learning in software
                      development.
                    </p>
                    <p className="sub-text">
                      <strong>Phone:</strong> {RESUME_CONTENT.contact.phone}
                      <br />
                      <strong>Email:</strong> {RESUME_CONTENT.contact.email}
                      <br />
                      <strong>LinkedIn:</strong> {RESUME_CONTENT.contact.linkedin}
                      <br />
                      <strong>Location:</strong> {RESUME_CONTENT.contact.location}
                    </p>
                    <div className="goal-section">
                      <h4 className="subtitle-gold">Project Highlights</h4>
                      <p>
                        AI Weather Prediction System and Music Streaming Platform
                        with practical work across Python, JavaScript, HTML, CSS,
                        and deployment tooling.
                      </p>
                    </div>
                    <button
                      className="download-btn-styled"
                      onClick={onDownloadCV}
                    >
                      <Download size={16} /> Download Resume (PDF)
                    </button>
                    <p
                      className="scroll-hint"
                      onClick={scrollToSocials}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "15px",
                      }}
                    >
                      Discover my socials below
                      <ArrowDown size={18} />
                    </p>
                  </div>
                </div>
              </Page>

              {/* Page 7: Back Cover */}
              <Page
                number=""
                className="is-cover is-back-cover page-left"
                density="hard"
              >
                <div className="cover-content">
                  <div className="corner-ornament top-left"></div>
                  <div className="corner-ornament top-right"></div>
                  <div className="corner-ornament bottom-left"></div>
                  <div className="corner-ornament bottom-right"></div>
                  <div className="back-cover-content">
                    <div className="back-seal">
                      <Code
                        size={55}
                        strokeWidth={1}
                        className="back-logo-icon"
                      />
                    </div>
                    <div className="back-text-group">
                      <div className="title-separator small">
                        <span className="line"></span>
                        <span className="dot"></span>
                        <span className="line"></span>
                      </div>
                      <p className="copyright">© 2026 Chandan Kumar Nanda</p>
                      <div className="tech-badge">Built with React</div>
                    </div>
                  </div>
                </div>
              </Page>
            </HTMLFlipBook>
          </motion.div>

          <motion.button
            type="button"
            variants={itemVariants}
            className={`nav-arrow right ${isBackCover ? "disabled" : ""}`}
            onClick={(e) => handleNextClick(e)}
            disabled={isBackCover}
            style={{
              cursor: isBackCover ? "default" : "pointer",
              pointerEvents: isBackCover ? "none" : "auto",
              opacity: isBackCover ? 0.3 : 1,
            }}
          >
            <ChevronRight size={45} />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default ResumeSection;
