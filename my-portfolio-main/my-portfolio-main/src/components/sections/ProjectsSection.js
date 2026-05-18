import React, { useMemo, memo, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import {
  Music,
  Star,
  Moon,
  Zap,
  Orbit,
  Component,
  Play,
  SkipForward,
  SkipBack,
  X,
} from "lucide-react";
import "../../styles/sections/ProjectsSection.scss";
import aiWeatherCoverImg from "../../assets/images/AIWeatherCover.png";
import flutterImg from "../../assets/images/VrijeTeid.png";
import weatherVideo from "../../assets/videos/weather-forecast-ai-demo.mp4";

const WEATHER_VIDEO_PLACEHOLDER = weatherVideo;

const ProjectsSection = ({ id }) => {
  const { t } = useTranslation();
  const projects = useMemo(() => [
    {
      id: 1,
      title: "AI Wether prediction app",
      subtitle: "Python • Streamlit • API",
      description: t('project_items.p1.desc'),
      videoUrl: WEATHER_VIDEO_PLACEHOLDER,
      image: aiWeatherCoverImg,
      color: "#ffbd7a",
      year: "2024",
      context: t('project_items.p1.context'), 
    },
    {
      id: 2,
      title: "Vrije Teid!", 
      subtitle: "Flutter • Dart • Firebase",
      description: t('project_items.p2.desc'), 
      videoUrl: "",
      image: flutterImg,
      color: "#a5f3fc",
      year: "2024",
      context: t('project_items.p2.context'), 
    },
    {
      id: 3,
      title: t('project_items.p3.title'), 
      subtitle: "OpenSearch • Docker • Vue • .NET",
      description: t('project_items.p3.desc'),
      videoUrl: "",
      isClassified: true,
      color: "#e9d5ff",
      year: "2025",
      context: t('project_items.p3.context'), 
    },
  ], [t]);

  const [videoPopup, setVideoPopup] = useState({
    isOpen: false,
    url: "",
    title: "",
  });

  const closeVideoPopup = useCallback(() => {
    setVideoPopup({
      isOpen: false,
      url: "",
      title: "",
    });
  }, []);

  const openVideoPopup = useCallback((project) => {
    if (!project.videoUrl) return;
    setVideoPopup({
      isOpen: true,
      url: project.videoUrl,
      title: project.title,
    });
  }, []);

  useEffect(() => {
    if (!videoPopup.isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeVideoPopup();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [videoPopup.isOpen, closeVideoPopup]);

  const videoSource = useMemo(() => {
    const rawUrl = videoPopup.url?.trim();
    if (!rawUrl) return { type: "none", src: "" };

    if (rawUrl.includes("youtu.be/")) {
      const id = rawUrl.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return id
        ? { type: "youtube", src: `https://www.youtube.com/embed/${id}?autoplay=1` }
        : { type: "video", src: rawUrl };
    }

    if (rawUrl.includes("youtube.com/watch")) {
      try {
        const parsed = new URL(rawUrl);
        const id = parsed.searchParams.get("v");
        return id
          ? { type: "youtube", src: `https://www.youtube.com/embed/${id}?autoplay=1` }
          : { type: "video", src: rawUrl };
      } catch (_error) {
        return { type: "video", src: rawUrl };
      }
    }

    return { type: "video", src: rawUrl };
  }, [videoPopup.url]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,   
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    },
  };
  const doodleField = useMemo(() => {
    const icons = [Music, Star, Moon, Zap, Orbit, Component];
    const colors = ["#a5f3fc", "#e9d5ff", "#ffbd7a"];

    return [...Array(12)].map((_, i) => {
      const zones = [
        { t: [5, 15], l: [5, 15] },
        { t: [5, 15], l: [85, 95] },
        { t: [40, 60], l: [2, 8] },
        { t: [40, 60], l: [92, 98] },
        { t: [80, 90], l: [10, 20] },
        { t: [80, 90], l: [80, 90] },
      ];
      const zone = zones[i % zones.length];
      const clr = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        Icon: icons[Math.floor(Math.random() * icons.length)],
        top: `${zone.t[0] + Math.random() * (zone.t[1] - zone.t[0])}%`,
        left: `${zone.l[0] + Math.random() * (zone.l[1] - zone.l[0])}%`,
        size: Math.random() * 7 + 10,
        color: clr,
        textShadow: `0 0 12px white, 0 0 6px ${clr}`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 5,
      };
    });
  }, []);

  const stars = useMemo(() => {
    return [...Array(160)].map((_, i) => {
      const size = i % 10 === 0 ? 3 : i % 5 === 0 ? 2 : 1;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        duration: Math.random() * 3 + 2 + "s",
        delay: Math.random() * 5 + "s",
        opacity:
          size === 1 ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.3,
        blur: i % 15 === 0 ? "1px" : "0px",
      };
    });
  }, []);

  return (
    <section id={id} className="projects-section">
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              "--duration": star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {doodleField.map((d) => (
        <motion.div
          key={d.id}
          className="sparkle-doodle"
          initial={{ opacity: 0.18, scale: 0.7 }}
          animate={{
            opacity: [0.18, 0.6, 0.18],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            color: d.color,
            filter: `drop-shadow(0 0 8px ${d.color})`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <d.Icon size={d.size} strokeWidth={2.1} />
        </motion.div>
      ))}

      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title">
          <span className="title-glow">{t('projects')}</span>
        </h2>
        <div className="title-underline"></div>
      </motion.div>

      <div className="section-content">
        <motion.div 
          className="projects-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} 
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              className="music-card"
              variants={cardVariants}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 } 
              }}
            >
              <div className="card-hardware">
                <div className="album-art">
                  {project.isClassified ? (
                    <div className="classified-overlay">
                      <span>{t('classified')}</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="art-img"
                      />
                      <div className="screen-glare"></div>{" "}
                    </>
                  )}
                </div>
                <div className="card-info">
                  <h3 className="project-name">{project.title}</h3>

                  <div className="project-tech-stack">
                    {project.subtitle.split(" • ").map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag"
                        style={{ color: project.color }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="project-desc">{project.description}</p>
                </div>
                <div className="playback-unit">
                  <div className="playback-bar">
                    <div className="progress-bg">
                      <motion.div
                        className="progress-fill"
                        style={{
                          backgroundColor: project.color,
                          boxShadow: `0 0 10px ${project.color}`,
                        }}
                      />
                    </div>
                    <div className="time-info">
                      <span>{project.context}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <div className="player-controls">
                    <SkipBack size={18} />
                    <motion.button
                      type="button"
                      className="main-play-btn"
                      whileTap={{ scale: 0.9 }}
                      style={{ backgroundColor: project.color }}
                      onClick={() => openVideoPopup(project)}
                      aria-label={`Play ${project.title} video`}
                      disabled={!project.videoUrl}
                    >
                      <Play size={18} fill="#1a1a2e" color="#1a1a2e" />
                    </motion.button>
                    <SkipForward size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {videoPopup.isOpen && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideoPopup}
          >
            <motion.div
              className="video-modal-rgb-shell"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="video-modal-content">
                <button
                  type="button"
                  className="video-modal-close"
                  onClick={closeVideoPopup}
                  aria-label="Close video window"
                >
                  <X size={18} />
                </button>

                <p className="video-modal-title">{videoPopup.title}</p>

                <div className="video-frame">
                  {videoSource.type === "youtube" ? (
                    <iframe
                      src={videoSource.src}
                      title={videoPopup.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoSource.src}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="audio-visualizer">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="bar"
            initial={{ height: 0 }}
            whileInView={{ height: [5, 30, 15, 35, 5] }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: i * 0.05 
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(ProjectsSection);


