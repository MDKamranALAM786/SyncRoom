import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/LandingPage.css';

/* ── SVG Icons ─────────────────────────────────────── */
const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const MonitorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const MessageCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const LinkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);
const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const OnlineIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

/* ── Navbar ────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container">
        <Link to="/" className="nav-logo" id="nav-logo">
          <span className="nav-logo-icon"><Logo /></span>
          SyncRoom
        </Link>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <div className="nav-actions">
          <Link to="/signin" className="btn-outline" id="nav-signin-btn">Sign In</Link>
          <Link to="/signup" className="btn-primary" id="nav-get-started-btn">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero Chat Card ────────────────────────────────── */
function HeroChatCard() {
  return (
    <div className="hero-visual">
      <div className="hero-chip hero-chip-1">
        <span style={{ color: '#22c55e' }}><OnlineIcon /></span>
        247 online now
      </div>
      <div className="hero-card">
        <div className="hero-card-header">
          <div className="hero-card-header-left">
            <div className="hero-card-avatar">R</div>
            <div className="hero-card-info">
              <span>Room 7F3K9</span>
              <span>4 members · Active</span>
            </div>
          </div>
          <div className="hero-card-badge">LIVE</div>
        </div>
        <div className="hero-messages">
          <div className="hero-msg">
            <span className="hero-msg-name">Alex</span>
            <div className="hero-msg-bubble">Hey everyone! 👋</div>
            <span className="hero-msg-time">10:22 AM</span>
          </div>
          <div className="hero-msg">
            <span className="hero-msg-name">Sarah</span>
            <div className="hero-msg-bubble">This room is awesome! 🎉</div>
            <span className="hero-msg-time">10:23 AM</span>
          </div>
          <div className="hero-msg mine">
            <div className="hero-msg-bubble">Glad to be here!</div>
            <span className="hero-msg-time">10:23 AM</span>
          </div>
          <div className="typing-indicator">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
        <div className="hero-card-input">
          <input type="text" placeholder="Type a message..." readOnly />
          <button className="hero-card-send" aria-label="Send">
            <SendIcon />
          </button>
        </div>
      </div>
      <div className="hero-chip hero-chip-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        Instant delivery
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="container">
        <div className="hero-content animate-slide-up">
          <div className="hero-badge">
            <span /> Real-time · Room-based · Simple
          </div>
          <h1 className="hero-title">
            <span>Chat Together,</span>
            <span>Stay in <span className="gradient-text">Sync</span></span>
          </h1>
          <p className="hero-desc">
            SyncRoom is a real-time chat application where you can create or join rooms,
            connect with people, and chat instantly — no complicated setup, no hassle.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary" id="hero-create-btn">
              Create a Room
            </Link>
            <Link to="/signin" className="btn-outline" id="hero-join-btn">
              Join a Room
            </Link>
          </div>
          <p className="hero-note">
            <CheckIcon />
            Get started in seconds. No account required to join a room.
          </p>
        </div>
        <HeroChatCard />
      </div>
    </section>
  );
}

/* ── Features ──────────────────────────────────────── */
const FEATURES = [
  {
    icon: <ZapIcon />,
    title: 'Real-time Messaging',
    desc: 'Instantly send and receive messages in your room with zero latency.',
  },
  {
    icon: <UsersIcon />,
    title: 'Room Based',
    desc: 'Create or join rooms with unique room IDs shared with your friends.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Secure & Reliable',
    desc: 'Your conversations stay private and protected at all times.',
  },
  {
    icon: <MonitorIcon />,
    title: 'Access Anywhere',
    desc: 'Works smoothly on desktop and mobile devices with a responsive UI.',
  },
];

function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Why SyncRoom?</span>
          <h2 className="section-title">Everything You Need to Chat</h2>
          <p className="section-desc">
            Everything you need for a seamless real-time chatting experience.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ──────────────────────────────────── */
const STEPS = [
  {
    num: '1',
    icon: <LinkIcon />,
    title: 'Create or Join a Room',
    desc: 'Start a new room or enter a room ID to join an existing one.',
  },
  {
    num: '2',
    icon: <UsersIcon />,
    title: 'Connect with Others',
    desc: 'Share the room ID with your friends and get connected instantly.',
  },
  {
    num: '3',
    icon: <MessageCircle />,
    title: 'Start Chatting',
    desc: 'Send messages, share ideas, and stay in sync in real-time.',
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Get Started in 3 Steps</h2>
          <p className="section-desc">Get started in just a few simple steps.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div className="step-card" key={s.num}>
              <div className="step-number">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="cta-section" id="about">
      <div className="container">
        <div className="cta-card">
          <h2>Ready to Get Started?</h2>
          <p>
            Create your room now and start chatting with your friends,
            colleagues, or community.
          </p>
          <div className="cta-actions">
            <Link to="/signup" className="btn-primary" id="cta-create-btn">
              Create a Room
            </Link>
            <Link to="/signin" className="btn-outline-white" id="cta-signin-btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <span className="nav-logo-icon" style={{ width: 28, height: 28 }}><Logo /></span>
          SyncRoom
        </div>
        <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <p className="footer-copy">© 2025 SyncRoom. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ── Page ────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
