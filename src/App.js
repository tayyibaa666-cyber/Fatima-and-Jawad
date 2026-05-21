import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./App.css";

// ─── SVG Icon Library ─────────────────────────────────────────────────────────
const Icons = {
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 15.5" />
    </svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Car: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  Utensils: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <line x1="7" y1="2" x2="7" y2="11" />
      <path d="M21 2a9 9 0 0 0-9 9v10h2V11a7 7 0 0 1 7-7V2z" />
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Mosque: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V10l7-7 7 7v11" />
      <path d="M9 21v-5a3 3 0 0 1 6 0v5" />
      <path d="M12 3V1" />
      <path d="M10 3a2 2 0 0 0 4 0" />
    </svg>
  ),
  Leaf: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Rings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="14" r="5" />
      <circle cx="16" cy="10" r="5" />
    </svg>
  ),
  Phone: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Diamond: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 22 9 18 20 6 20 2 9" />
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Flower: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
      <path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
      <path d="M2 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
      <path d="M14 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
    </svg>
  ),
};

// ─── Scroll-triggered reveal wrapper ─────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Decorative Divider ───────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="divider">
      <span className="divider-line" />
      <span className="divider-gem"><Icons.Diamond /></span>
      <span className="divider-line" />
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function Petals() {
  const petals = Array.from({ length: 18 });
  return (
    <div className="petals-container" aria-hidden="true">
      {petals.map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${(i * 5.7 + 3) % 100}%`,
            animationDelay: `${(i * 0.9) % 12}s`,
            animationDuration: `${10 + (i * 1.3) % 10}s`,
            width: `${10 + (i * 2) % 14}px`,
            height: `${10 + (i * 2) % 14}px`,
            opacity: 0.3 + (i * 0.02) % 0.3,
            color: i % 3 === 0 ? "#c9a96e" : i % 3 === 1 ? "#e8d5b0" : "#b08850",
          }}
        >
          {i % 3 === 0 ? (
            <svg viewBox="0 0 12 12" width="100%" height="100%" fill="currentColor">
              <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,10.5 6,8.5 2.5,10.5 3.5,7 1,4.5 4.5,4.5" />
            </svg>
          ) : i % 3 === 1 ? (
            <svg viewBox="0 0 12 12" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="6" cy="6" r="4" />
              <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" width="100%" height="100%" fill="currentColor">
              <path d="M6 1 L7 5 L11 6 L7 7 L6 11 L5 7 L1 6 L5 5 Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y }}>
        <img src="/img1-train.png" alt="background" className="hero-img" />
        <div className="hero-overlay" />
      </motion.div>

      <Petals />

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 2, delay: 0.3 }}
        >
          — WEDDING INVITATION —
        </motion.p>

        <motion.div
          className="hero-names"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-name">Fatima</span>
          <span className="hero-and-icon"><Icons.Rings /></span>
          <span className="hero-name">Jawad</span>
        </motion.div>

        <motion.div
          className="hero-ornament"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
        >
          ─────────────────────
        </motion.div>

        <motion.p
          className="hero-date"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          29th May 2026 &nbsp;·&nbsp; Multan, Pakistan
        </motion.p>

        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span>Scroll to explore</span>
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Icons.ChevronDown />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── INVITATION SECTION ───────────────────────────────────────────────────────
function InvitationSection() {
  return (
    <section className="section invitation-section">
      <div className="section-bg" style={{ backgroundImage: "url(/img2-candles.png)" }} />
      <div className="section-overlay dark-overlay" />

      <div className="invitation-card">
        <Reveal delay={0.1}>
          <p className="bismillah-arabic">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        </Reveal>

        <Reveal delay={0.25}>
          <Divider />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="invite-from">
            Mr. &amp; Mrs. <strong>Saeed Ahmed Dogar</strong>
          </p>
          <p className="invite-request">
            request the pleasure of your presence<br />
            at the Wedding Ceremony of their beloved Daughter
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <p className="invite-bride">Fatima Batool</p>
          <p className="invite-with">with</p>
          <p className="invite-groom">Adv. Jawad Khalil</p>
        </Reveal>

        <Reveal delay={0.7}>
          <Divider />
          <p className="invite-courtesy">
            With the kind courtesy of<br />
            <strong>Mr. &amp; Mrs. Salamat Ali Dogar</strong>
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="invite-rsvp">
            <p className="rsvp-label">R.S.V.P.</p>
            <p className="rsvp-names">Abid Hussain Dogar &nbsp;·&nbsp; Saadat Ali Dogar &nbsp;·&nbsp; Prof. Ghulam Irtaza</p>
            <p className="invite-looking">Looking Forward: All Family Members</p>
            <div className="invite-contact">
              <span className="contact-icon"><Icons.Phone /></span>
              <span>0314-6256572 &nbsp;&nbsp;&nbsp; 0334-4143637</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── MEHNDI SECTION ───────────────────────────────────────────────────────────
// ─── BARAT SECTION ────────────────────────────────────────────────────────────
function BaratSection() {
  return (
    <section className="section barat-section">
      <div className="section-bg" style={{ backgroundImage: "url(/img4-floral.png)" }} />
      <div className="section-overlay dark-overlay" />

      <div className="event-card barat-card">
        <Reveal delay={0.1}>
          <p className="inshallah-text">اِنْ شَاءَ اللہ</p>
          <div className="event-icon-big"><Icons.Mosque /></div>
          <h2 className="event-title gold-title">Baraat</h2>
        </Reveal>

        <Reveal delay={0.25}>
          <Divider />
          <p className="detail-value center-text">Friday, 29th May 2026</p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="barat-timeline">
            <BaratRow time="01:30 PM" label="Reception of Baraat" icon={<Icons.Car />} isLast={false} />
            <BaratRow time="02:30 PM" label="Lunch" icon={<Icons.Utensils />} isLast={false} />
            <BaratRow time="04:00 PM" label="Rukhsati" icon={<Icons.Heart />} isLast={true} />
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <Divider />
          <p className="venue-name-big">Shangrilla Royal Orchard Marquee</p>
          <a
            href="https://www.google.com/maps?q=30.2480556,71.553333"
            target="_blank"
            rel="noreferrer"
            className="map-btn"
          >
            <span className="map-btn-icon"><Icons.MapPin /></span>
            View on Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function BaratRow({ time, label, icon, isLast }) {
  return (
    <div className="barat-row">
      <div className="barat-time-col">
        <span className="barat-time">{time}</span>
      </div>
      <div className="barat-spine-col">
        <div className="barat-dot-outer"><div className="barat-dot-inner" /></div>
        {!isLast && <div className="barat-spine-line" />}
      </div>
      <div className="barat-info-col">
        <span className="barat-icon-el">{icon}</span>
        <span className="barat-label">{label}</span>
      </div>
    </div>
  );
}

// ─── CLOSING SECTION ──────────────────────────────────────────────────────────
function Closing() {
  return (
    <section className="section closing-section">
      <div className="section-bg" style={{ backgroundImage: "url(/img2-candles.png)" }} />
      <div className="section-overlay closing-overlay" />
      <Reveal>
        <div className="closing-content">
          <p className="closing-arabic">جَزَاكَ اللهُ خَيْرًا</p>
          <p className="closing-text">
            We look forward to celebrating<br />this joyous occasion with you.
          </p>
          <Divider />
          <p className="closing-names">Fatima &amp; Jawad</p>
          <p className="closing-date">29th May 2026</p>
          <div className="closing-city-row">
            <span className="closing-moon-icon"><Icons.Moon /></span>
            <p className="closing-city">Multan, Pakistan</p>
          </div>
          <div className="footer-ornament">
            <span className="footer-diamond"><Icons.Diamond /></span>
            <span className="footer-diamond"><Icons.Diamond /></span>
            <span className="footer-diamond"><Icons.Diamond /></span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!loaded) {
    return (
      <div className="preloader">
        <motion.div
          className="preloader-content"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <p className="preloader-bismillah">بِسْمِ اللهِ</p>
          <p className="preloader-names">Fatima &amp; Jawad</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="app">
      <Hero />
      <InvitationSection />
      <BaratSection />
      <Closing />
    </div>
  );
}