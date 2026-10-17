import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../public/styles/AuthPage.css';

/* ── Icons ─────────────────────────────────────────── */
const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);
const ZapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const UsersIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ── Left Panel (reused pattern) ─────────────────────── */
function AuthLeft() {
  return (
    <div className="auth-left">
      <div className="auth-topbar">
        <div className="auth-topbar-brand">
          <div className="auth-brand-icon"><Logo /></div>
          SyncRoom
        </div>
        <div className="auth-topbar-right">
          Already have an account?<Link to="/signin"> Sign In</Link>
        </div>
      </div>

      <div className="auth-left-content">
        <div className="auth-chat-mockup" style={{ marginBottom: 36 }}>
          <div className="auth-chat-row">
            <div className="auth-chat-av">J</div>
            <div className="auth-chat-bubble">Just created my room! 🎉</div>
          </div>
          <div className="auth-chat-row right">
            <div className="auth-chat-av">M</div>
            <div className="auth-chat-bubble">Joining now! See you inside</div>
          </div>
          <div className="auth-chat-row">
            <div className="auth-chat-av">K</div>
            <div className="auth-chat-bubble">Let's get synced! ⚡</div>
          </div>
        </div>

        <h2>Join SyncRoom</h2>
        <p>
          Create your account and start chatting in real-time with your friends.
        </p>

        <div className="auth-features">
          <div className="auth-feature-item">
            <div className="auth-feature-icon"><ZapIcon /></div>
            Instant room creation & joining
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon"><ShieldIcon /></div>
            End-to-end secure messaging
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon"><UsersIcon /></div>
            Collaborate with anyone, anywhere
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sign Up Form ───────────────────────────────────── */
function SignUpForm() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up auth logic
    console.log('Sign up:', form);
  };

  return (
    <div className="auth-right">
      <div className="auth-right-inner animate-slide-up">
        <div className="auth-header">
          <h1>Sign Up</h1>
          <p>Create your account to get started.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} id="signup-form">
          <div className="input-group">
            <label htmlFor="signup-name">Full Name</label>
            <div className="input-wrap">
              <UserIcon />
              <input
                id="signup-name"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signup-email">Email Address</label>
            <div className="input-wrap">
              <EmailIcon />
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="signup-password">Password</label>
            <div className="input-wrap">
              <LockIcon />
              <input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
          </div>

          <button type="submit" className="auth-submit" id="signup-submit-btn">
            Sign Up
          </button>

          <div className="divider">or</div>

          <button type="button" className="btn-google" id="signup-google-btn">
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="auth-terms">
            By creating an account, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </form>

        <p className="auth-redirect" style={{ marginTop: 20 }}>
          Already have an account?
          <Link to="/signin" id="signup-to-signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

/* ── Sign Up Page ───────────────────────────────────── */
export default function SignUpPage() {
  return (
    <div className="auth-page">
      <AuthLeft />
      <SignUpForm />
    </div>
  );
}
