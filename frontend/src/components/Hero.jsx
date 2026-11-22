export default function Hero() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero-section">
      <div className="section-container hero-container">
        {/* Left Column: Content */}
        <div className="hero-content">
          <div className="hero-brand-badge">
            <span className="hero-badge-sun">☀️</span>
            <span className="hero-badge-text">Mediterranean Coastal Wellness</span>
            <span className="hero-badge-tag">Sanctuary</span>
          </div>

          <h1 className="hero-title">
            Find Your Balance. <br />
            <span className="hero-title-highlight">Embrace Your Wellness.</span>
          </h1>

          <p className="hero-subtitle">
            Smart Membership Management Powered by AI &bull; Mediterranean Yoga Centre
          </p>

          <p className="hero-description">
            Experience serene coastal yoga sessions, mindful meditation retreats, and effortless
            digital membership access. MemberPass seamlessly unifies smart digital passes, class
            schedules, and personalized wellness journeys across the sun-drenched Mediterranean coast.
          </p>

          <div className="hero-actions">
            <a
              href="#features"
              className="btn btn-primary"
              onClick={(e) => handleScrollTo(e, '#features')}
            >
              <span>Explore Membership</span>
              <svg
                className="btn-arrow-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#how-it-works"
              className="btn btn-secondary"
              onClick={(e) => handleScrollTo(e, '#how-it-works')}
            >
              <span>Discover Our Classes</span>
            </a>
          </div>

          {/* Quick wellness highlights */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <span className="trust-num">98%</span>
              <span className="trust-text">Member Harmony</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-num">35+</span>
              <span className="trust-text">Weekly Coastal Sessions</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-num">Instant</span>
              <span className="trust-text">Digital QR Check-in</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composition with Pure CSS/SVG Elements */}
        <div className="hero-visual-wrapper">
          <div className="hero-card-frame" style={{ background: 'linear-gradient(145deg, #18382D 0%, #244B3C 100%)', borderRadius: '24px', padding: '36px', border: '1px solid rgba(197,168,120,0.35)', color: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', color: '#C5A878', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>VERIFIED DIGITAL PASS</span>
              <span style={{ background: 'rgba(197,168,120,0.2)', color: '#C5A878', padding: '4px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 700 }}>NFC ACTIVE</span>
            </div>
            <div style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '1.6rem', marginBottom: '6px' }}>Alexander Vance</div>
            <div style={{ fontSize: '0.88rem', color: '#EFEDE5', marginBottom: '24px' }}>Standard Membership &bull; 25 Sessions Active</div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.08)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#C5A878', display: 'block' }}>GATE VERIFICATION</span>
                <strong style={{ fontSize: '13px' }}>Instant 0.38s Optical Check-in</strong>
              </div>
              <span style={{ background: '#244B3C', color: '#A8B7A2', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 600 }}>CLEARED</span>
            </div>
          </div>

            {/* Floating Pass Badge */}
            <div className="floating-wellness-card member-pass-chip">
              <div className="chip-qr-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <line x1="10" y1="10" x2="14" y2="10" />
                </svg>
              </div>
              <div>
                <div className="pass-status">Verified MemberPass</div>
                <div className="pass-tier">Coastal Gold Sanctuary</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
