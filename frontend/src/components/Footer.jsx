import React from 'react';
import { Zap, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#1E2021',
      color: 'rgba(250,247,242,0.65)',
      padding: '56px 24px 32px',
      borderTop: '1px solid rgba(216,166,106,0.15)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{
                width: '34px', height: '34px', borderRadius: '9px',
                background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(196,106,59,0.35)',
              }}>
                <Zap size={16} color="#fff" fill="#fff" />
              </span>
              <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600, fontSize: '18px', color: '#FAF7F2' }}>
                MemberPass<span style={{ color: '#C46A3B' }}> AI</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '220px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Intelligent membership information and AI-powered assistance for modern organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FAF7F2', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[{ l: 'Home', id: 'home' }, { l: 'About', id: 'about' }, { l: 'Features', id: 'features' }, { l: 'AI Assistant', id: 'assistant' }].map(({ l, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      fontSize: '14px', color: 'rgba(250,247,242,0.6)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#D8A66A'}
                    onMouseLeave={e => e.target.style.color = 'rgba(250,247,242,0.6)'}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#FAF7F2', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <Mail size={14} color="#D8A66A" />
                <span>hello@memberpass.ai</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <Phone size={14} color="#D8A66A" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(250,247,242,0.08)',
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '12px', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            © {year} MemberPass AI. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Thendral Yoga Loft, Coimbatore, India
          </p>
        </div>
      </div>
    </footer>
  );
}

