import React, { useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DigitalPassCard from './components/DigitalPassCard';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import {
  Bot,
  CreditCard,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  Zap,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

/* ============================================================
   SECTION HELPERS
   ============================================================ */

function HeroSection({ onGetStarted, onDiscover }) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(145deg, #FAF7F2 0%, #F4EBDD 55%, #FAF5ED 100%)',
        paddingTop: '72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background geometric decoration */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '8%', right: '5%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,106,59,0.07) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,166,106,0.09) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          width: '1px', height: '60%',
          background: 'linear-gradient(to bottom, transparent, rgba(196,106,59,0.08), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'center' }}>

          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(196,106,59,0.09)',
              border: '1px solid rgba(196,106,59,0.22)',
              borderRadius: '20px',
              padding: '6px 16px',
              marginBottom: '28px',
            }}>
              <Zap size={13} color="#C46A3B" fill="#C46A3B" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#C46A3B', letterSpacing: '0.08em', fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase' }}>
                AI-Powered Membership
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 700,
              color: '#292B2C',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              margin: '0 0 24px',
            }}>
              Making Every{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C46A3B 0%, #D8A66A 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Membership
              </span>{' '}
              Experience Smarter.
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '17px',
              color: '#575A5D',
              lineHeight: 1.75,
              maxWidth: '500px',
              margin: '0 0 40px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 400,
            }}>
              Discover a more intelligent way to access membership information and receive digital assistance through one connected platform.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={onGetStarted}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                  border: 'none', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600, color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  boxShadow: '0 8px 24px rgba(196,106,59,0.38)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(196,106,59,0.46)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,106,59,0.38)'; }}
              >
                Get Started
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onDiscover}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px',
                  borderRadius: '12px',
                  background: 'transparent',
                  border: '1.5px solid rgba(196,106,59,0.35)',
                  cursor: 'pointer',
                  fontSize: '15px', fontWeight: 600, color: '#C46A3B',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,106,59,0.07)'; e.currentTarget.style.borderColor = '#C46A3B'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(196,106,59,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Discover More
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[
                { icon: <CheckCircle2 size={14} color="#22c55e" />, text: 'Instant AI Responses' },
                { icon: <CheckCircle2 size={14} color="#22c55e" />, text: 'Secure & Private' },
                { icon: <CheckCircle2 size={14} color="#22c55e" />, text: 'No App Download' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#575A5D', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {icon}
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Digital Pass Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <DigitalPassCard />

            {/* Floating stats below the card */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%', maxWidth: '420px' }}>
              {[
                { value: '10K+', label: 'Members' },
                { value: '99.9%', label: 'Uptime' },
                { value: '< 1s', label: 'Responses' },
              ].map(({ value, label }) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '14px 10px', borderRadius: '12px',
                  background: '#fff',
                  border: '1px solid rgba(216,166,106,0.2)',
                  boxShadow: '0 4px 12px rgba(41,43,44,0.05)',
                }}>
                  <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#C46A3B' }}>{value}</div>
                  <div style={{ fontSize: '11px', color: '#8E9196', marginTop: '2px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '96px 24px',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(196,106,59,0.04) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>

          {/* Visual panel */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, #F4EBDD, #FAF7F2)',
              border: '1px solid rgba(216,166,106,0.25)',
              padding: '40px 36px',
              boxShadow: '0 20px 60px -16px rgba(41,43,44,0.09)',
            }}>
              {/* Large decorative icon */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '22px',
                background: 'linear-gradient(135deg, #292B2C, #3E4244)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px',
                boxShadow: '0 12px 32px rgba(41,43,44,0.2)',
              }}>
                <CreditCard size={36} color="#D8A66A" />
              </div>

              <h3 style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '24px', fontWeight: 600, color: '#292B2C',
                margin: '0 0 14px', lineHeight: 1.3,
              }}>
                One Platform, Complete Membership Experience
              </h3>
              <p style={{ fontSize: '14px', color: '#575A5D', lineHeight: 1.75, margin: 0, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                MemberPass AI brings your entire membership journey into a single, intelligent interface — from onboarding to ongoing assistance.
              </p>

              {/* Stats pills */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '28px' }}>
                {[
                  { label: 'AI-Powered', color: '#C46A3B' },
                  { label: 'Smart Queries', color: '#D8A66A' },
                  { label: 'Centralized', color: '#292B2C' },
                ].map(({ label, color }) => (
                  <span key={label} style={{
                    padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: `${color}15`, border: `1px solid ${color}35`,
                    color: color, fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.03em',
                  }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(196,106,59,0.08)',
              border: '1px solid rgba(196,106,59,0.2)',
              borderRadius: '20px', padding: '6px 16px', marginBottom: '24px',
            }}>
              <Lightbulb size={13} color="#C46A3B" />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#C46A3B', letterSpacing: '0.08em', fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase' }}>
                About
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700, color: '#292B2C',
              lineHeight: 1.2, letterSpacing: '-0.5px',
              margin: '0 0 20px',
            }}>
              Built Around Smarter Membership Experiences
            </h2>

            <p style={{ fontSize: '16px', color: '#575A5D', lineHeight: 1.8, margin: '0 0 32px', fontFamily: 'Plus Jakarta Sans, sans-serif', maxWidth: '480px' }}>
              MemberPass AI combines intelligent assistance with organized membership information, creating a simple and efficient digital experience for users.
            </p>

            {/* Key points list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Intelligent AI assistance at your fingertips',
                'Centralized membership information hub',
                'Smart automated query processing',
              ].map(point => (
                <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '7px', flexShrink: 0,
                    background: 'rgba(196,106,59,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px',
                  }}>
                    <CheckCircle2 size={13} color="#C46A3B" />
                  </div>
                  <span style={{ fontSize: '15px', color: '#3E4244', lineHeight: 1.6, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Bot size={28} color="#C46A3B" />,
      tag: 'Intelligence',
      title: 'AI-Driven Assistance',
      description: 'Get useful guidance and relevant information through an intelligent AI-powered assistance experience designed around your membership needs.',
      highlights: ['Natural language understanding', 'Context-aware answers', 'Instant responses'],
      accent: '#C46A3B',
    },
    {
      icon: <CreditCard size={28} color="#D8A66A" />,
      tag: 'Organization',
      title: 'Organized Membership Details',
      description: 'Keep essential membership-related information accessible through a centralized digital experience — always current, always available.',
      highlights: ['Digital pass management', 'Plan & tier overview', 'Renewal tracking'],
      accent: '#D8A66A',
      featured: true,
    },
    {
      icon: <MessageSquare size={28} color="#C46A3B" />,
      tag: 'Processing',
      title: 'Smart Query Processing',
      description: 'Understand user questions intelligently and provide relevant information through automated query processing that scales with demand.',
      highlights: ['Semantic search', 'Automated routing', 'Multi-turn conversations'],
      accent: '#C46A3B',
    },
  ];

  return (
    <section
      id="features"
      style={{ padding: '96px 24px', background: '#FAF7F2' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(196,106,59,0.08)',
            border: '1px solid rgba(196,106,59,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '20px',
          }}>
            <Zap size={13} color="#C46A3B" fill="#C46A3B" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#C46A3B', letterSpacing: '0.08em', fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase' }}>
              Features
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700, color: '#292B2C',
            lineHeight: 1.2, letterSpacing: '-0.5px',
            margin: '0 0 16px',
          }}>
            Everything Your Members Need
          </h2>
          <p style={{ fontSize: '16px', color: '#575A5D', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Three powerful capabilities working together to deliver a seamless membership experience.
          </p>
        </div>

        {/* Feature cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '24px',
        }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{
                padding: '32px 28px',
                borderRadius: '20px',
                background: f.featured ? 'linear-gradient(145deg, #292B2C, #3E4244)' : '#fff',
                border: f.featured
                  ? '1px solid rgba(216,166,106,0.3)'
                  : '1px solid rgba(216,166,106,0.2)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
              }}
            >
              {/* Featured badge */}
              {f.featured && (
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                  borderRadius: '20px', padding: '4px 12px',
                  fontSize: '10px', fontWeight: 700, color: '#fff',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}>
                  Popular
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: f.featured ? 'rgba(216,166,106,0.15)' : `${f.accent}12`,
                border: f.featured ? '1px solid rgba(216,166,106,0.25)' : `1px solid ${f.accent}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '22px',
              }}>
                {React.cloneElement(f.icon, { color: f.featured ? '#D8A66A' : f.accent })}
              </div>

              {/* Tag */}
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: f.featured ? 'rgba(216,166,106,0.75)' : f.accent,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                display: 'block', marginBottom: '8px',
              }}>
                {f.tag}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '22px', fontWeight: 600,
                color: f.featured ? '#FAF7F2' : '#292B2C',
                margin: '0 0 14px', lineHeight: 1.3,
              }}>
                {f.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                color: f.featured ? 'rgba(250,247,242,0.65)' : '#575A5D',
                lineHeight: 1.75, margin: '0 0 24px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}>
                {f.description}
              </p>

              {/* Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {f.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
                      background: f.featured ? '#D8A66A' : f.accent,
                    }} />
                    <span style={{
                      fontSize: '13px',
                      color: f.featured ? 'rgba(250,247,242,0.65)' : '#575A5D',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAssistantSection() {
  return (
    <section
      id="assistant"
      style={{ padding: '96px 24px', background: '#fff' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(196,106,59,0.08)',
            border: '1px solid rgba(196,106,59,0.2)',
            borderRadius: '20px', padding: '6px 16px', marginBottom: '20px',
          }}>
            <Bot size={13} color="#C46A3B" />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#C46A3B', letterSpacing: '0.08em', fontFamily: 'Plus Jakarta Sans, sans-serif', textTransform: 'uppercase' }}>
              AI Assistant
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700, color: '#292B2C',
            lineHeight: 1.2, letterSpacing: '-0.5px',
            margin: '0 0 16px',
          }}>
            Ask MemberPass AI Anything
          </h2>
          <p style={{ fontSize: '16px', color: '#575A5D', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Your questions about membership plans, benefits, renewal, and access are answered instantly.
          </p>
        </div>

        <AIAssistant />
      </div>
    </section>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const assistantRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToAssistant = () =>
    document.getElementById('assistant')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Navbar onGetStarted={scrollToAssistant} />

      <main style={{ paddingTop: 0 }}>
        <HeroSection onGetStarted={scrollToAssistant} onDiscover={scrollToAbout} />
        <AboutSection />
        <FeaturesSection />
        <AIAssistantSection />
      </main>

      <Footer />
    </>
  );
}
