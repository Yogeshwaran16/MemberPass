import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'
import PlansSection from './components/PlansSection'
import DigitalPassCard from './components/DigitalPassCard'
import Icon from './components/Icon'
import { getStoredUser, authApi } from './services/api'

// Lazy-loaded components to optimize initial landing page bundle and eliminate unused JS
const StaffDashboard = lazy(() => import('./components/StaffDashboard'))
const MemberDashboard = lazy(() => import('./components/MemberDashboard'))
const AuthModal = lazy(() => import('./components/AuthModal'))
const QRPassModal = lazy(() => import('./components/QRPassModal'))

// Lightweight, accessible loading fallback matching the Sanctuary aesthetic
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
      <div style={{ width: '36px', height: '36px', border: '3px solid rgba(36, 75, 60, 0.15)', borderTopColor: '#244B3C', borderRadius: '50%', animation: 'rotateSlow 1s linear infinite' }} />
      <span style={{ fontSize: '0.85rem', color: '#777970', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}>Loading...</span>
    </div>
  </div>
)

export default function App() {
  const [currentUser, setCurrentUser] = useState(getStoredUser())
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState('login')
  const [qrModalOpen, setQrModalOpen] = useState(false)
  const [currentView, setCurrentView] = useState('landing') // 'landing' | 'dashboard'

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('tiers')
  const [selectedPlanToast, setSelectedPlanToast] = useState(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleLogout = async () => {
    await authApi.logout()
    setCurrentUser(null)
    setCurrentView('landing')
    setSelectedPlanToast('You have securely signed out of MemberPass.')
  }

  const handleAuthSuccess = (user) => {
    setCurrentUser(user)
    setCurrentView('dashboard')
    setSelectedPlanToast(`Welcome back, ${user.name}! Access credentials authenticated.`)
  }

  const handlePaymentSuccess = (data) => {
    setCurrentView('dashboard')
    setSelectedPlanToast(
      `Payment received for ${data.plan}! Your membership activation is pending confirmation.`
    )
  }

  // Handle header blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-dismiss plan selection toast after 4s
  useEffect(() => {
    if (selectedPlanToast) {
      const timer = setTimeout(() => setSelectedPlanToast(null), 4200)
      return () => clearTimeout(timer)
    }
  }, [selectedPlanToast])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => setContactSubmitted(false), 5000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="med-app">
      {/* Toast Notification */}
      {selectedPlanToast && (
        <div className="toast-notification" role="status" aria-live="polite">
          <div className="toast-icon">🌊</div>
          <div className="toast-body">
            <strong>Yoga Sanctuary Update</strong>
            <p>{selectedPlanToast}</p>
          </div>
          <button className="toast-close" onClick={() => setSelectedPlanToast(null)} aria-label="Close notification">×</button>
        </div>
      )}

      {/* =========================================================================
          1. FULL-WIDTH CLEAN WHITE NAVBAR
          ========================================================================= */}
      <header className={`med-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a
            href="#home"
            className="brand-logo"
            aria-label="MemberPass Intelligent Membership Platform"
            onClick={(e) => {
              e.preventDefault()
              setCurrentView('landing')
              scrollToTop()
            }}
          >
            <span className="coastal-emblem">
              <svg viewBox="0 0 40 40" fill="none" className="emblem-svg">
                <rect width="40" height="40" rx="10" fill="#F7F6F2" stroke="#C5A878" strokeWidth="1.5" />
                <path d="M11 28V12L18 21L25 12V28" stroke="#244B3C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 14H29C30.6569 14 32 15.3431 32 17C32 18.6569 30.6569 20 29 20H25" stroke="#C5A878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="28" r="1.5" fill="#C5A878" />
              </svg>
            </span>
            <div className="brand-text">
              <span className="brand-name">Member<span className="brand-accent">Pass</span></span>
              <span className="brand-tag">MEMBERSHIP PLATFORM</span>
            </div>
          </a>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                setCurrentView('landing')
                setMobileMenuOpen(false)
                scrollToTop()
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              About
            </a>
            <a
              href="#plans"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Membership
            </a>
            <a
              href="#features"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Wellness
            </a>
            <a
              href="#contact"
              onClick={() => {
                if (currentView !== 'landing') setCurrentView('landing')
                setMobileMenuOpen(false)
              }}
            >
              Contact
            </a>

            {currentUser ? (
              <>
                <button
                  className="nav-link-btn"
                  onClick={() => {
                    setCurrentView('dashboard')
                    setMobileMenuOpen(false)
                  }}
                >
                  {['staff', 'admin'].includes(currentUser.role) ? 'Staff Portal' : 'My Dashboard'}
                </button>
                {!['staff', 'admin'].includes(currentUser.role) && (
                  <button
                    className="nav-link-btn"
                    onClick={() => {
                      setQrModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    My QR Pass
                  </button>
                )}
              </>
            ) : null}

            <div className="mobile-cta-wrap">
              {currentUser ? (
                <button className="btn-primary btn-sm" onClick={handleLogout}>
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  className="btn-primary btn-sm"
                  onClick={() => {
                    setAuthModalMode('signup')
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <span>Explore Membership</span>
                  <span className="btn-arrow">→</span>
                </button>
              )}
            </div>
          </nav>

          <div className="nav-actions">
            {currentUser ? (
              <div className="nav-auth-group">
                <button
                  className="nav-user-pill"
                  onClick={() => setCurrentView('dashboard')}
                  title={['staff', 'admin'].includes(currentUser.role) ? 'Open Staff Portal' : 'Open Member Dashboard'}
                >
                  <div className="nav-avatar-mini">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'MP'}
                  </div>
                  <span className="nav-user-name">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'Member'}
                    {['staff', 'admin'].includes(currentUser.role) ? ' (Staff)' : ''}
                  </span>
                </button>
                <button className="btn-signout" onClick={handleLogout} title="Sign Out">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="nav-auth-group">
                <button
                  className="btn-outline btn-sm"
                  onClick={() => {
                    setAuthModalMode('login')
                    setAuthModalOpen(true)
                  }}
                >
                  Sign In
                </button>
                <button
                  className="btn-primary desktop-cta"
                  onClick={() => {
                    setAuthModalMode('signup')
                    setAuthModalOpen(true)
                  }}
                >
                  <span>Explore Membership</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            )}

            <button
              className={`hamburger-toggle ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {currentView === 'dashboard' && currentUser ? (
        <main className="main-viewport">
          <Suspense fallback={<LoadingFallback />}>
            {['staff', 'admin'].includes(currentUser.role) ? (
              <StaffDashboard
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <MemberDashboard
                currentUser={currentUser}
                onLogout={handleLogout}
                onNavigateToPlans={() => {
                  setCurrentView('landing')
                  setTimeout(() => {
                    const el = document.getElementById('plans')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }, 120)
                }}
                onOpenQRModal={() => setQrModalOpen(true)}
              />
            )}
          </Suspense>
        </main>
      ) : (
        <main className="main-viewport">
          {/* =========================================================================
            2. HERO SECTION - ASYMMETRIC SAAS HERO (NO IMAGES / PURE UI COMPOSITION)
            ========================================================================= */}
          <section className="hero-section" id="home">
            <div className="hero-grid">
              {/* LEFT SIDE: Brand Label, Headline, Paragraph, CTAs, Trust Indicators */}
              <div className="hero-text-content">
                <div className="coastal-eyebrow">
                  <span className="eyebrow-text">✦ NEXT-GENERATION MEMBERSHIP PLATFORM</span>
                </div>

                <h1 className="hero-headline">
                  Membership,
                  <br />
                  <span className="serif-highlight">Reimagined.</span>
                </h1>

                <p className="hero-subheading">One seamless experience for every member.</p>
                <p className="hero-description">
                  Manage memberships, digital passes, member engagement and intelligent assistance through one elegant platform.
                </p>

                <div className="hero-ctas">
                  <a href="#plans" className="btn-primary btn-lg">
                    <span>Explore Membership</span>
                    <span className="btn-arrow">→</span>
                  </a>
                  <a href="#features" className="btn-secondary btn-lg">
                    <span>View Capabilities</span>
                    <span className="btn-chevron">▾</span>
                  </a>
                </div>

                <div className="hero-trust-bar">
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>Instant Digital QR Passes</span>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>2,400+ Active Members</span>
                  </div>
                  <div className="trust-divider"></div>
                  <div className="trust-pill">
                    <span className="pill-check">✓</span>
                    <span>Sub-Second Verification</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Custom UI Composition (Pure Frontend Elements - NO IMAGES) */}
              <div className="hero-visual-col">
                <div className="hero-ui-stage">
                  {/* Subtle Geometric Background Shapes & Radial Gradients */}
                  <div className="hero-grid-mesh" />
                  <div className="hero-ambient-orb orb-primary" />
                  <div className="hero-ambient-orb orb-gold" />
                  <div className="hero-geo-ring ring-outer" />
                  <div className="hero-geo-ring ring-inner" />

                  {/* Floating Digital Pass Card */}
                  <div className="floating-card-wrapper">
                    <DigitalPassCard />
                  </div>

                  {/* Floating Live Telemetry Badge 1: Instant Optical Scan */}
                  <div className="floating-ui-badge badge-scan">
                    <span className="status-pulse-dot" />
                    <div className="badge-text-group">
                      <span className="badge-title">Optical Verification</span>
                      <span className="badge-subtitle">0.38s Latency &bull; Gate Authorized</span>
                    </div>
                    <span className="badge-chip-ok">CLEARED</span>
                  </div>

                  {/* Floating Live Telemetry Badge 2: AI Retention Forecast */}
                  <div className="floating-ui-badge badge-ai">
                    <span className="badge-ai-sparkle">✦</span>
                    <div className="badge-text-group">
                      <span className="badge-title">AI Retention Forecast</span>
                      <span className="badge-subtitle">98.4% Monthly Retention &bull; 38 Renewals Queued</span>
                    </div>
                  </div>

                  {/* Floating Live Telemetry Badge 3: Session Utilization */}
                  <div className="floating-ui-badge badge-usage">
                    <div className="usage-meter-ring">
                      <span className="usage-val">72%</span>
                    </div>
                    <div className="badge-text-group">
                      <span className="badge-title">Standard Tier Usage</span>
                      <span className="badge-subtitle">18 of 25 Sessions Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            STATS STRIP
            ========================================================================= */}
          <section className="stats-strip">
            <div className="stats-inner">
              <div className="stat-card">
                <span className="stat-number">2,400+</span>
                <span className="stat-label">Active Members</span>
                <p className="stat-detail">Engaged members utilizing digital NFC passes and contactless QR check-ins</p>
              </div>
              <div className="stat-divider-vertical"></div>
              <div className="stat-card">
                <span className="stat-number">18,500+</span>
                <span className="stat-label">Verified Sessions</span>
                <p className="stat-detail">Seamless entrance verifications logged with sub-second gate validation</p>
              </div>
              <div className="stat-divider-vertical"></div>
              <div className="stat-card">
                <span className="stat-number">15+</span>
                <span className="stat-label">Membership Capabilities</span>
                <p className="stat-detail">Custom tiers, automated reminders, absentee alerts, and AI co-pilot insights</p>
              </div>
              <div className="stat-divider-vertical"></div>
              <div className="stat-card">
                <span className="stat-number">99.4%</span>
                <span className="stat-label">Member Satisfaction</span>
                <p className="stat-detail">Consistently rated for frictionless onboarding and rapid mobile entry poise</p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            3. ABOUT SECTION - MODERN SAAS ARCHITECTURE (NO PHOTOS)
            ========================================================================= */}
          <section className="section-padding about-section" id="about">
            <div className="section-header text-center">
              <span className="section-kicker">ABOUT MEMBERPASS</span>
              <h2 className="section-heading">Built for Intelligent Membership Operations</h2>
              <p className="section-subtext">
                Traditional studios and clubs are encumbered by paper sign-in sheets, fragmented rosters,
                and manual headcounts. MemberPass combines intelligent assistance with organized
                membership information, creating a simple, modern and efficient digital operating experience.
              </p>
            </div>

            {/* Pure CSS & SVG Architecture Blueprint / Process Diagram (NO PHOTOS) */}
            <div className="about-architecture-card">
              <div className="arch-header">
                <div className="arch-header-left">
                  <span className="arch-badge">SYSTEM ARCHITECTURE</span>
                  <h3 className="arch-title">Unified Membership Operating Pipeline</h3>
                  <p className="arch-desc">From mobile credential issuance to gate check-in and automated retention intelligence.</p>
                </div>
                <div className="arch-telemetry-pills">
                  <span className="arch-pill"><Icon className="fa-solid fa-bolt" size={14} /> &lt; 400ms Verification</span>
                  <span className="arch-pill"><Icon className="fa-solid fa-shield-halved" size={14} /> AES-256 Token Encryption</span>
                  <span className="arch-pill"><Icon className="fa-solid fa-server" size={14} /> 99.98% Gateway Uptime</span>
                </div>
              </div>

              <div className="arch-flow-diagram">
                <div className="flow-node">
                  <div className="node-icon"><Icon className="fa-solid fa-mobile-screen" size={20} /></div>
                  <span className="node-step">STAGE 01</span>
                  <strong className="node-name">Member Pass</strong>
                  <span className="node-desc">Mobile NFC &amp; Dynamic QR</span>
                </div>
                <div className="flow-connector"><span className="connector-line"></span><span className="connector-arrow">→</span></div>

                <div className="flow-node">
                  <div className="node-icon"><Icon className="fa-solid fa-key" size={20} /></div>
                  <span className="node-step">STAGE 02</span>
                  <strong className="node-name">Cryptographic Auth</strong>
                  <span className="node-desc">Zero-Trust Identity Engine</span>
                </div>
                <div className="flow-connector"><span className="connector-line"></span><span className="connector-arrow">→</span></div>

                <div className="flow-node active-node">
                  <div className="node-icon"><Icon className="fa-solid fa-qrcode" size={20} /></div>
                  <span className="node-step">STAGE 03</span>
                  <strong className="node-name">Optical Reader</strong>
                  <span className="node-desc">Sub-Second Gate Clearance</span>
                </div>
                <div className="flow-connector"><span className="connector-line"></span><span className="connector-arrow">→</span></div>

                <div className="flow-node">
                  <div className="node-icon"><Icon className="fa-solid fa-chart-line" size={20} /></div>
                  <span className="node-step">STAGE 04</span>
                  <strong className="node-name">AI Retention Core</strong>
                  <span className="node-desc">Automated Renewal Signals</span>
                </div>
              </div>
            </div>

            <div className="about-grid">
              <div className="about-feature-box">
                <div className="box-icon">
                  <Icon className="fa-solid fa-gem" size={22} />
                </div>
                <h3 className="box-title">Frictionless Digital Passes</h3>
                <p className="box-desc">
                  Elevate member touchpoints from their very first visit. Deliver serene,
                  contactless digital QR passes that reflect modern design excellence.
                </p>
              </div>

              <div className="about-feature-box">
                <div className="box-icon">
                  <Icon className="fa-solid fa-brain" size={22} />
                </div>
                <h3 className="box-title">AI-Powered Member Intelligence</h3>
                <p className="box-desc">
                  Our embedded machine learning model detects attendance trends early, triggers automated
                  renewal invitations, and provides actionable metrics to operations directors.
                </p>
              </div>

              <div className="about-feature-box">
                <div className="box-icon">
                  <Icon className="fa-solid fa-shield-halved" size={22} />
                </div>
                <h3 className="box-title">Encrypted Enterprise Security</h3>
                <p className="box-desc">
                  Member records, sensitive profile attributes, and attendance logs are strictly protected
                  with zero-trust cryptographic verification and granular role-based administrative controls.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            4. FEATURES SECTION
            ========================================================================= */}
          <section className="section-padding features-section" id="features">
            <div className="section-header text-center">
              <span className="section-kicker">CURATED CAPABILITIES</span>
              <h2 className="section-heading">Designed for Modern Yoga Centre Operations</h2>
              <p className="section-subtext">
                Every tool within MemberPass is crafted to reduce friction, eliminate paper sign-in sheets,
                and empower yoga studio directors with deep operational clarity.
              </p>
            </div>

            <div className="features-quad-grid">
              {/* Feature 1 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <Icon className="fa-solid fa-sliders" size={24} />
                </div>
                <span className="card-sub-tag">TIER ALLOCATION</span>
                <h3 className="feature-card-title">Smart Membership Management</h3>
                <p className="feature-card-desc">
                  Effortlessly manage Basic, Standard, and Premium yoga membership plans with custom session caps,
                  validity windows, and automated renewal workflows.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Flexible Yoga Membership Plans</li>
                  <li><span className="check-bullet">✓</span> Automated Validity &amp; Expiry Triggers</li>
                  <li><span className="check-bullet">✓</span> One-Click Plan Upgrades &amp; Renewals</li>
                </ul>
              </article>

              {/* Feature 2 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <Icon className="fa-solid fa-robot" size={24} />
                </div>
                <span className="card-sub-tag">AI WELLNESS CO-PILOT</span>
                <h3 className="feature-card-title">AI Yoga Assistant</h3>
                <p className="feature-card-desc">
                  An intelligent conversational co-pilot for yoga studio owners and practitioners. Obtain instantaneous
                  attendance telemetry, renewal forecasting, and class capacity metrics.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Predictive Renewal &amp; Retention Alerts</li>
                  <li><span className="check-bullet">✓</span> Conversational Query Resolution</li>
                  <li><span className="check-bullet">✓</span> Real-Time Class Attendance Insights</li>
                </ul>
              </article>

              {/* Feature 3 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <Icon className="fa-solid fa-address-book" size={24} />
                </div>
                <span className="card-sub-tag">PRACTITIONER DIRECTORY</span>
                <h3 className="feature-card-title">Member Information Management</h3>
                <p className="feature-card-desc">
                  A unified, encrypted directory. Maintain practitioner dossiers, emergency contacts,
                  wellness preferences, and class visit history with instant filtering.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Centralized Practitioner Profiles</li>
                  <li><span className="check-bullet">✓</span> Instant Tag &amp; Class History Search</li>
                  <li><span className="check-bullet">✓</span> High-Standard Member Data Privacy</li>
                </ul>
              </article>

              {/* Feature 4 */}
              <article className="feature-royal-card">
                <div className="card-header-icon">
                  <Icon className="fa-solid fa-chart-line" size={24} />
                </div>
                <span className="card-sub-tag">REAL-TIME CHECK-IN</span>
                <h3 className="feature-card-title">Class &amp; Attendance Tracking</h3>
                <p className="feature-card-desc">
                  Monitor real-time studio verifications, class session limits, peak studio hours,
                  and upcoming renewal horizons via an intuitive, live dashboard.
                </p>
                <ul className="feature-checklist">
                  <li><span className="check-bullet">✓</span> Sub-Second QR Optical Pass Scanning</li>
                  <li><span className="check-bullet">✓</span> Automatic Session Balance Deductions</li>
                  <li><span className="check-bullet">✓</span> Live Studio Class Attendance Feeds</li>
                </ul>
              </article>
            </div>

            {/* Interactive Feature Demo Panel */}
            <div className="interactive-console-wrap">
              <div className="console-header">
                <div className="console-title">
                  <span className="console-icon">🌊</span>
                  <span>Interactive Sanctuary Console</span>
                </div>
                <div className="console-tabs" role="tablist">
                  <button
                    className={`tab-btn ${activeTab === 'tiers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tiers')}
                    role="tab"
                    aria-selected={activeTab === 'tiers'}
                  >
                    Yoga Tiers
                  </button>
                  <button
                    className={`tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('telemetry')}
                    role="tab"
                    aria-selected={activeTab === 'telemetry'}
                  >
                    Studio Telemetry
                  </button>
                </div>
              </div>

              <div className="console-body">
                {activeTab === 'tiers' && (
                  <div className="tab-pane-content fade-in">
                    <div className="pane-split">
                      <div className="pane-narrative">
                        <h4>Class Allocation &amp; Tier Governance</h4>
                        <p>
                          Calibrate automated session allowances and validity periods. Practitioners view real-time
                          class usage and remaining sessions on their digital pass.
                        </p>
                        <div className="console-code-badge">
                          <code>RULE: Plan == 'Standard' → 25 Yoga Sessions Included (30-Day Validity)</code>
                        </div>
                      </div>

                      <div className="pane-widget">
                        <div className="tier-pill-row">
                          <div className="tier-chip chip-classic">
                            <span className="chip-name">Basic</span>
                            <span className="chip-desc">10 Classes</span>
                          </div>
                          <div className="tier-chip chip-royale active-chip">
                            <span className="chip-name">Standard</span>
                            <span className="chip-desc">25 Classes</span>
                          </div>
                          <div className="tier-chip chip-sovereign">
                            <span className="chip-name">Premium</span>
                            <span className="chip-desc">Unlimited</span>
                          </div>
                        </div>

                        <div className="progress-box">
                          <div className="progress-header">
                            <span>Class Utilization: Maya Lin</span>
                            <span className="text-ocean"><strong>18 / 25 Classes</strong> (72%)</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-bar" style={{ width: '72%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'telemetry' && (
                  <div className="tab-pane-content fade-in">
                    <div className="pane-split">
                      <div className="pane-narrative">
                        <h4>Live Studio Verification &amp; Check-In Stream</h4>
                        <p>
                          Sub-second telemetry captured across studio entrance turnstiles, private meditation rooms,
                          and seaside open-air decks.
                        </p>
                        <div className="status-online-pill">
                          <span className="pulsing-emerald"></span>
                          <span>Stream Live &amp; Encrypted</span>
                        </div>
                      </div>

                      <div className="pane-widget">
                        <div className="telemetry-feed">
                          <div className="feed-row">
                            <span className="feed-status-check">✓</span>
                            <div className="feed-details">
                              <strong>Maya Lin (Standard Plan)</strong>
                              <p>Verified for Morning Vinyasa Flow • 14s ago</p>
                            </div>
                            <span className="feed-badge-ok">VERIFIED</span>
                          </div>

                          <div className="feed-row">
                            <span className="feed-status-check">✓</span>
                            <div className="feed-details">
                              <strong>Arun Kumar (Basic Plan)</strong>
                              <p>Verified for Gentle Hatha Yoga • 2m ago</p>
                            </div>
                            <span className="feed-badge-ok">VERIFIED</span>
                          </div>

                          <div className="feed-row warning-row">
                            <span className="feed-status-warn">!</span>
                            <div className="feed-details">
                              <strong>Priya Devi (Standard Plan)</strong>
                              <p>2 classes remaining; pass expires in 3 days • Renewal notice queued</p>
                            </div>
                            <span className="feed-badge-warn">EXPIRING</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =========================================================================
            5. MEMBERSHIP PLANS SECTION (DYNAMIC M2 & RAZORPAY INTEGRATION)
            ========================================================================= */}
          <PlansSection
            currentUser={currentUser}
            onRequireAuth={() => {
              setAuthModalMode('login')
              setAuthModalOpen(true)
            }}
            onPaymentSuccess={handlePaymentSuccess}
          />

          {/* =========================================================================
            6. TESTIMONIAL & TRUST SECTION
            ========================================================================= */}
          <section className="section-padding testimonials-section">
            <div className="section-header text-center">
              <span className="section-kicker">WELLNESS COMMUNITY</span>
              <h2 className="section-heading">Trusted by Leading Yoga Sanctuaries</h2>
              <p className="section-subtext">
                Discover how leading yoga studios, wellness retreats, and practitioners elevate class retention
                with MemberPass.
              </p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  MemberPass brought seamless poise to our seaside yoga studio check-ins.
                  Our students love having a serene digital QR pass on their phones,
                  and front-desk check-in time dropped from minutes to mere seconds.
                </p>
                <div className="author-row">
                  <div className="author-avatar">AS</div>
                  <div className="author-meta">
                    <strong>Ananya Sharma</strong>
                    <span>Founder &amp; Lead Instructor, Prana Coastal Sanctuary</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  The class utilization tracking and automated renewal reminders helped us increase student
                  retention by 35%. Our practitioners always know exactly how many sessions remain on their pass.
                </p>
                <div className="author-row">
                  <div className="author-avatar">DC</div>
                  <div className="author-meta">
                    <strong>David Chen</strong>
                    <span>Studio Director, Mindful Movement Shala</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="quote-mark">“</div>
                <p className="testimonial-quote">
                  The Mediterranean aesthetic of MemberPass aligns impeccably with our wellness values.
                  Our students appreciate the calm, instant digital experience, and our teachers love the accurate attendance logs.
                </p>
                <div className="author-row">
                  <div className="author-avatar">ER</div>
                  <div className="author-meta">
                    <strong>Elena Rostova</strong>
                    <span>Operations Lead, Lotus Blossom Yoga Collective</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
            7. HOW IT WORKS SECTION (5-STEP WELLNESS JOURNEY)
            ========================================================================= */}
          <section className="section-padding workflow-section" id="workflow">
            <div className="section-header text-center">
              <span className="section-kicker">THE WELLNESS JOURNEY</span>
              <h2 className="section-heading">Your Pathway in Five Mindful Steps</h2>
              <p className="section-subtext">
                A serene, modern pathway from discovering your sanctuary to enjoying your daily practice.
              </p>
            </div>

            <div className="workflow-steps-grid workflow-5-steps">
              <div className="workflow-step">
                <div className="step-numeral">01</div>
                <div className="step-icon">
                  <Icon className="fa-solid fa-compass" size={24} />
                </div>
                <h3 className="step-title">Discover Membership</h3>
                <p className="step-desc">
                  Explore our sanctuary tiers and select the path that aligns with your practice.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">02</div>
                <div className="step-icon">
                  <Icon className="fa-solid fa-layer-group" size={24} />
                </div>
                <h3 className="step-title">Choose Your Plan</h3>
                <p className="step-desc">
                  Select Basic (10 sessions), Standard (25 sessions), or Premium unlimited immersion.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">03</div>
                <div className="step-icon">
                  <Icon className="fa-solid fa-shield-halved" size={24} />
                </div>
                <h3 className="step-title">Activate Your Membership</h3>
                <p className="step-desc">
                  Complete seamless, secure online membership onboarding with instant confirmation.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">04</div>
                <div className="step-icon">
                  <Icon className="fa-solid fa-qrcode" size={24} />
                </div>
                <h3 className="step-title">Access Your Digital Pass</h3>
                <p className="step-desc">
                  Instantly receive your personalized cryptographic QR pass on your mobile device.
                </p>
              </div>

              <div className="workflow-step">
                <div className="step-numeral">05</div>
                <div className="step-icon">
                  <Icon className="fa-solid fa-spa" size={24} />
                </div>
                <h3 className="step-title">Enjoy Your Wellness Journey</h3>
                <p className="step-desc">
                  Scan in effortlessly at studio check-in, attend your yoga sessions, and flourish.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
            8. CONTACT SECTION
            ========================================================================= */}
          <section className="section-padding contact-section" id="contact">
            <div className="contact-container">
              <div className="contact-info-col">
                <span className="section-kicker">CONNECT WITH US</span>
                <h2 className="contact-headline">Begin Your Wellness Journey</h2>
                <p className="contact-description">
                  Our studio wellness advisors are prepared to assist you with yoga memberships,
                  class schedules, or group retreat onboarding.
                </p>

                <div className="contact-meta-list">
                  <div className="contact-meta-item">
                    <div className="meta-icon"><Icon className="fa-solid fa-envelope" size={18} /></div>
                    <div>
                      <span className="meta-caption">CONCIERGE &amp; INQUIRIES</span>
                      <a href="mailto:wellness@memberpass.co" className="meta-link">wellness@memberpass.co</a>
                    </div>
                  </div>

                  <div className="contact-meta-item">
                    <div className="meta-icon"><Icon className="fa-solid fa-location-dot" size={18} /></div>
                    <div>
                      <span className="meta-caption">SANCTUARY LOCATION</span>
                      <span className="meta-static">Costa Brava Bay &bull; Mediterranean Coast</span>
                    </div>
                  </div>

                  <div className="contact-meta-item">
                    <div className="meta-icon"><Icon className="fa-solid fa-clock" size={18} /></div>
                    <div>
                      <span className="meta-caption">STUDIO HOURS</span>
                      <span className="meta-static">Monday &ndash; Sunday: 06:30 &ndash; 20:30 CET</span>
                    </div>
                  </div>
                </div>

                <div className="contact-sanctuary-pill">
                  <span className="pill-dot"></span>
                  <span>Mindful Concierge: We respond to all inquiries within 24 hours.</span>
                </div>
              </div>

              <div className="contact-form-col">
                <div className="form-card">
                  <h3 className="form-card-title">Request Sanctuary Consultation</h3>
                  <p className="form-card-sub">Inquire regarding personalized yoga memberships, private sessions, or studio enrollment.</p>

                  {contactSubmitted ? (
                    <div className="form-success-banner">
                      <span className="success-icon">✓</span>
                      <div>
                        <strong>Namaste! Your Inquiry Has Been Received</strong>
                        <p>Our wellness coordinator will reach out to you within one business day.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="med-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="name">Full Name <span className="req">*</span></label>
                          <input type="text" id="name" required placeholder="e.g. Elena Rossi" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email Address <span className="req">*</span></label>
                          <input type="email" id="email" required placeholder="e.g. elena@wellness.com" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="organization">Studio or Organization</label>
                        <input type="text" id="organization" placeholder="e.g. Coastal Shala or Individual Practitioner" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="interest">Tier of Interest</label>
                        <select id="interest" defaultValue="Standard Yoga Plan">
                          <option value="Basic Yoga Plan">Basic Yoga Pass (₹1,500 / 30 Days)</option>
                          <option value="Standard Yoga Plan">Standard Yoga Pass (₹3,000 / 30 Days)</option>
                          <option value="Premium Yoga Plan">Premium Yoga Pass (₹7,500 / 90 Days)</option>
                          <option value="Corporate / Private Wellness">Corporate / Private Wellness Group</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Message or Requirements <span className="req">*</span></label>
                        <textarea id="message" rows="3" required placeholder="Share your wellness goals, preferred class schedule, or yoga membership questions..."></textarea>
                      </div>

                      <button type="submit" className="btn-primary btn-block">
                        <span>Submit Inquiry</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          9. PREMIUM EDITORIAL SANCTUARY FOOTER
          ========================================================================= */}
      <footer className="med-footer">
        <div className="footer-inner">
          <div className="footer-top-row">
            <div className="footer-brand-col">
              <a href="#home" className="brand-logo footer-logo" onClick={scrollToTop}>
                <span className="coastal-emblem light">
                  <svg viewBox="0 0 40 40" fill="none" className="emblem-svg">
                    <rect width="40" height="40" rx="10" fill="#18382D" stroke="#C5A878" strokeWidth="1.5" />
                    <path d="M11 28V12L18 21L25 12V28" stroke="#C5A878" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M25 14H29C30.6569 14 32 15.3431 32 17C32 18.6569 30.6569 20 29 20H25" stroke="#C5A878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="28" r="1.5" fill="#C5A878" />
                  </svg>
                </span>
                <div className="brand-text">
                  <span className="brand-name light">Member<span className="brand-accent light">Pass</span></span>
                  <span className="brand-tag light">MEMBERSHIP PLATFORM</span>
                </div>
              </a>
              <p className="footer-tagline">
                The premier digital identity, pass tracking, and membership operating platform for modern fitness, wellness, and membership organizations.
              </p>
              <div className="footer-sanctuary-status">
                <span className="status-live-dot"></span>
                <span>System Gateway Live &amp; Encrypted</span>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-col-links">
                <li><a href="#home" onClick={scrollToTop}>Home Sanctuary</a></li>
                <li><a href="#about">About MemberPass</a></li>
                <li><a href="#features">Curated Capabilities</a></li>
                <li><a href="#plans">Membership Plans</a></li>
                <li><a href="#workflow">Wellness Journey</a></li>
                <li><a href="#contact">Contact &amp; Inquiries</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Membership Passes</h4>
              <ul className="footer-col-links">
                <li><a href="#plans">Basic Pass (10 Classes)</a></li>
                <li><a href="#plans">Standard Pass (25 Classes)</a></li>
                <li><a href="#plans">Premium Unlimited Pass</a></li>
                <li><a href="#contact">Private &amp; Corporate Wellness</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Sanctuary Standards</h4>
              <p className="footer-col-text">
                Certified sub-second optical QR check-in. Real-time class capacity management and encrypted member data protection.
              </p>
              <div className="footer-pill-badge">
                <span>PREMIUM WELLNESS SANCTUARY • ISO 27001</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="copyright-text">
              © 2026 <strong>MemberPass</strong>. All rights reserved. Premium Yoga &amp; Wellness Membership Platform.
            </p>
            <div className="footer-legal-links">
              <a href="#home">Privacy Policy</a>
              <span className="dot-sep">•</span>
              <a href="#home">Terms of Sanctuary</a>
              <span className="dot-sep">•</span>
              <button onClick={scrollToTop} className="back-top-link">
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Authentication Modal - Lazy loaded on demand */}
      {authModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
            initialMode={authModalMode}
          />
        </Suspense>
      )}

      {/* Fullscreen Digital QR Pass Scanner Modal - Lazy loaded on demand */}
      {qrModalOpen && (
        <Suspense fallback={null}>
          <QRPassModal
            isOpen={qrModalOpen}
            onClose={() => setQrModalOpen(false)}
            currentUser={currentUser}
          />
        </Suspense>
      )}
    </div>
  )
}
