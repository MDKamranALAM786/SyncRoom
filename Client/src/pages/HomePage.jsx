import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../../public/styles/HomePage.css';

/* ── Colour palette for room avatars ──────────────────── */
const ROOM_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];
const roomColor = (i) => ROOM_COLORS[i % ROOM_COLORS.length];

/* ── Mock data ────────────────────────────────────────── */
const RECENT_ROOMS = [
  { id: 'R', name: 'Room 7F3K9', members: 4 },
  { id: 'T', name: 'Tech Talk', members: 3 },
  { id: 'S', name: 'Study Group', members: 5 },
  { id: 'R2', name: 'Random', members: 2 },
];

const YOUR_ROOMS = [
  { initial: 'R', name: 'Room 7F3K9', members: 4, status: 'active', time: 'Active now', preview: 'Hey everyone! 👋' },
  { initial: 'T', name: 'Tech Talk', members: 3, status: 'inactive', time: '2h ago', preview: 'Great discussion today!' },
  { initial: 'S', name: 'Study Group', members: 5, status: 'inactive', time: '4h ago', preview: "Let's keep going!" },
  { initial: 'R', name: 'Random', members: 2, status: 'inactive', time: '1d ago', preview: 'This is fun! 😄' },
];

/* ── Icons ─────────────────────────────────────────────── */
const Logo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const HashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const ZapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const HelpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Top Navbar ────────────────────────────────────────── */
function HomeNav({ username, handleLogout }) {
  const initial = username ? username[0].toUpperCase() : 'U';
  return (
    <nav className="home-nav" id="home-navbar">
      <div className="home-nav-brand">
        <div className="home-nav-brand-icon"><Logo /></div>
        SyncRoom
      </div>
      <div className="nav-actions">
        <button className="nav-actions-btn btn-primary" onClick={handleLogout}>Logout</button>
      </div>
      <div className="home-nav-user" id="home-user-menu">
        <div className="home-nav-avatar">{initial}</div>
        {username || 'User'}
        <ChevronDownIcon />
      </div>
    </nav>
  );
}

/* ── Left Sidebar ──────────────────────────────────────── */
function HomeSidebar() {
  return (
    <aside className="home-sidebar" id="home-sidebar">
      <nav className="home-sidebar-nav">
        <button className="home-sidebar-item active" id="sidebar-home">
          <HomeIcon /> Home
        </button>
        <button className="home-sidebar-item" id="sidebar-my-rooms">
          <GridIcon /> My Rooms
        </button>
        <button className="home-sidebar-item" id="sidebar-create-room">
          <PlusIcon /> Create Room
        </button>
        <button className="home-sidebar-item" id="sidebar-join-room">
          <HashIcon /> Join Room
        </button>
      </nav>

      <div className="home-sidebar-section">
        <p className="home-sidebar-section-title">Recent Rooms</p>
        {RECENT_ROOMS.map((room, i) => (
          <div className="home-recent-room" key={room.id + i} id={`sidebar-room-${i}`}>
            <div className="home-recent-room-av" style={{ background: roomColor(i) }}>
              {room.initial || room.name[0]}
            </div>
            <div className="home-recent-room-info">
              <div className="home-recent-room-name">{room.name}</div>
              <div className="home-recent-room-meta">{room.members} members</div>
            </div>
            <div className="home-recent-room-arrow"><ChevronRightIcon /></div>
          </div>
        ))}
      </div>

      <div className="home-status">
        <div className="home-status-dot" />
        You're online
      </div>
    </aside>
  );
}

/* ── Hero Banner ──────────────────────────────────────── */
function HomeHero({ username }) {
  return (
    <section className="home-hero" id="home-hero">
      <div className="home-hero-text">
        <div className="home-hero-badge">
          <span>👋</span> Welcome back, {username || 'there'}!
        </div>
        <h1>
          Your conversations,<br />
          your rooms, <span className="hero-accent">your space.</span>
        </h1>
        <p>
          Create a room, join with a code, and start chatting
          in real-time with your friends, team or community.
        </p>
        <div className="home-hero-actions">
          <button className="home-hero-btn-primary" id="hero-create-room-btn">
            <PlusIcon /> Create Room
          </button>
          <button className="home-hero-btn-outline" id="hero-join-room-btn">
            <HashIcon /> Join Room
          </button>
        </div>
      </div>

      {/* Chat illustration */}
      <div className="home-hero-illustration" aria-hidden="true">
        <div className="hero-bubble-wrap">
          <div className="hero-bubble-main">
            <div className="hero-bubble-line" />
            <div className="hero-bubble-line" />
            <div className="hero-bubble-line" />
          </div>
          <div className="hero-bubble-secondary">
            <div className="hero-bubble-line" />
            <div className="hero-bubble-line" />
          </div>
          <div className="hero-avatar-a">A</div>
          <div className="hero-avatar-b">B</div>
        </div>
      </div>
    </section>
  );
}

/* ── Your Rooms ───────────────────────────────────────── */
function YourRooms() {
  return (
    <section id="home-your-rooms">
      <div className="home-section-header">
        <h2 className="home-section-title">Your Rooms</h2>
        <span className="home-view-all" id="view-all-rooms-btn">
          View all <ArrowRightIcon />
        </span>
      </div>
      <div className="home-rooms-grid">
        {YOUR_ROOMS.map((room, i) => (
          <div className="home-room-card" key={i} id={`room-card-${i}`}>
            <div className="home-room-card-header">
              <div className="home-room-av" style={{ background: roomColor(i) }}>
                {room.initial}
              </div>
              <span className="home-room-menu">···</span>
            </div>
            <div className="home-room-name">{room.name}</div>
            <div className="home-room-meta">
              {room.members} members
              <span className="home-room-meta-dot" />
              <span className={`home-room-meta-dot ${room.status === 'active' ? '' : 'inactive'}`} />
              {room.time}
            </div>
            <div className="home-room-preview">{room.preview}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Quick Actions ────────────────────────────────────── */
const QUICK_ACTIONS = [
  {
    icon: <PlusIcon />,
    color: '#6366f1',
    bg: '#ede9fe',
    title: 'Create a Room',
    desc: 'Start a new room and share the ID with your friends.',
    id: 'quick-create-room',
  },
  {
    icon: <HashIcon />,
    color: '#8b5cf6',
    bg: '#f3e8ff',
    title: 'Join a Room',
    desc: 'Enter a room ID and jump into the conversation.',
    id: 'quick-join-room',
  },
  {
    icon: <UsersIcon />,
    color: '#06b6d4',
    bg: '#e0f7fa',
    title: 'My Rooms',
    desc: 'View and manage all your joined rooms.',
    id: 'quick-my-rooms',
  },
  {
    icon: <MonitorIcon />,
    color: '#10b981',
    bg: '#d1fae5',
    title: 'Device Friendly',
    desc: 'Chat seamlessly across all your devices.',
    id: 'quick-device',
  },
];

function QuickActions() {
  return (
    <section id="home-quick-actions">
      <div className="home-section-header">
        <h2 className="home-section-title">Quick Actions</h2>
      </div>
      <div className="home-quick-grid">
        {QUICK_ACTIONS.map((action) => (
          <div className="home-quick-card" key={action.id} id={action.id}>
            <div
              className="home-quick-icon"
              style={{ background: action.bg, color: action.color }}
            >
              {action.icon}
            </div>
            <div>
              <div className="home-quick-title">{action.title}</div>
              <div className="home-quick-desc">{action.desc}</div>
            </div>
            <div className="home-quick-arrow"><ArrowRightIcon /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Main Export ──────────────────────────────────────── */
export default function HomePage() {
  const router = useNavigate();

  const { user, isAuthenticated, handleLogout } = useContext(AuthContext);
  const username = user?.username || 'John Doe';

  useEffect(() => {
    if (!isAuthenticated) {
      router("/signin");
    }
  }, []);

  return (
    <div className="home-shell" id="home-page">
      <HomeNav username={username} handleLogout={handleLogout} />
      <div className="home-body">
        <HomeSidebar />
        <main className="home-main">
          <HomeHero username={username} />
          <YourRooms />
          <QuickActions />
        </main>
      </div>
    </div>
  );
}
