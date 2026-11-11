import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export default function Navbar({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home',     id: 'home' },
    { label: 'About',    id: 'about' },
    { label: 'Features', id: 'features' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(250, 247, 242, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(216, 166, 106, 0.2)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(41,43,44,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* ---- Logo ---- */}
          <button
            onClick={() => scrollTo('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}
          >
            <span style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(196,106,59,0.35)',
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </span>
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600, fontSize: '20px', color: '#292B2C', letterSpacing: '-0.3px' }}>
              MemberPass<span style={{ color: '#C46A3B' }}> AI</span>
            </span>
          </button>

          {/* ---- Desktop Nav ---- */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-nav">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '8px 16px', borderRadius: '8px',
                  fontSize: '14px', fontWeight: 500, color: '#3E4244',
                  transition: 'color 0.2s, background 0.2s',
                  fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                }}
                onMouseEnter={e => { e.target.style.color = '#C46A3B'; e.target.style.background = 'rgba(196,106,59,0.07)'; }}
                onMouseLeave={e => { e.target.style.color = '#3E4244'; e.target.style.background = 'transparent'; }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={onGetStarted}
              style={{
                marginLeft: '8px',
                padding: '10px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                border: 'none', cursor: 'pointer',
                fontSize: '14px', fontWeight: 600,
                color: '#fff',
                boxShadow: '0 6px 20px rgba(196,106,59,0.35)',
                transition: 'opacity 0.2s, transform 0.2s',
                fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Get Started
            </button>
          </nav>

          {/* ---- Mobile Hamburger ---- */}
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            {menuOpen ? <X size={22} color="#292B2C" /> : <Menu size={22} color="#292B2C" />}
          </button>
        </div>

        {/* ---- Mobile Dropdown ---- */}
        {menuOpen && (
          <div style={{
            padding: '16px 0 20px',
            borderTop: '1px solid rgba(216,166,106,0.2)',
            display: 'flex', flexDirection: 'column', gap: '4px',
          }}>
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '12px 16px', borderRadius: '8px', textAlign: 'left',
                  fontSize: '15px', fontWeight: 500, color: '#3E4244',
                  fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={onGetStarted}
              style={{
                margin: '8px 16px 0',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                border: 'none', cursor: 'pointer',
                fontSize: '15px', fontWeight: 600, color: '#fff',
                fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
              }}
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Mobile nav hide via CSS */}
      <style>{`
        @media (min-width: 769px) { .mobile-menu { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </header>
  );
}

