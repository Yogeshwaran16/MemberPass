import React from 'react';
import { QrCode, Wifi, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';

export default function DigitalPassCard() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: '-8px',
        background: 'linear-gradient(135deg, #C46A3B, #D8A66A, #C46A3B)',
        borderRadius: '28px',
        filter: 'blur(20px)',
        opacity: 0.25,
        pointerEvents: 'none',
      }} />

      {/* Card body */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        background: 'linear-gradient(145deg, #292B2C 0%, #323537 55%, #1E2021 100%)',
        color: '#FAF7F2',
        padding: '28px 28px 24px',
        border: '1px solid rgba(216,166,106,0.28)',
        overflow: 'hidden',
        boxShadow: '0 32px 64px -16px rgba(41,43,44,0.5), 0 8px 24px rgba(196,106,59,0.1)',
      }}>

        {/* Background circles decoration */}
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid rgba(216,166,106,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20px', right: '20px', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(196,106,59,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '30%', width: '240px', height: '100px', background: 'linear-gradient(to top, rgba(196,106,59,0.08), transparent)', pointerEvents: 'none' }} />

        {/* Top row: Brand + NFC badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: '22px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C46A3B', display: 'inline-block' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#D8A66A', textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                MemberPass AI
              </span>
            </div>
            <p style={{ fontSize: '10px', color: 'rgba(250,247,242,0.5)', marginTop: '3px', letterSpacing: '0.15em', fontWeight: 300, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              SMART DIGITAL CREDENTIAL
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 10px', borderRadius: '20px',
            background: 'rgba(250,247,242,0.06)',
            border: '1px solid rgba(216,166,106,0.2)',
            color: '#D8A66A',
          }}>
            <Wifi size={12} style={{ transform: 'rotate(90deg)' }} />
            <span style={{ fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.15em' }}>NFC</span>
          </div>
        </div>

        {/* Chip + VIP badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: '20px' }}>
          {/* EMV Chip */}
          <div style={{
            width: '48px', height: '36px',
            background: 'linear-gradient(135deg, #D8A66A 0%, #F4EBDD 50%, #C46A3B 100%)',
            borderRadius: '6px',
            border: '1px solid rgba(41,43,44,0.3)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            padding: '5px',
            gap: '2px',
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ borderRadius: '1px', border: '0.5px solid rgba(41,43,44,0.25)', background: 'rgba(196,106,59,0.15)' }} />
            ))}
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '4px 12px', borderRadius: '20px',
            background: 'rgba(196,106,59,0.18)',
            border: '1px solid rgba(196,106,59,0.4)',
          }}>
            <Sparkles size={11} color="#D8A66A" />
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#FAF7F2', letterSpacing: '0.1em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              VIP ACCESS
            </span>
          </div>
        </div>

        {/* Cardholder name */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '22px' }}>
          <div style={{ fontSize: '9px', color: '#D8A66A', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>
            MEMBER NAME
          </div>
          <div style={{ fontSize: '20px', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600, color: '#FAF7F2', letterSpacing: '0.02em' }}>
            Alexander Vance
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(250,247,242,0.55)', marginTop: '3px', fontWeight: 300, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Thendral Wellness Club · Tier 01
          </div>
        </div>

        {/* Bottom: ID, expiry, QR */}
        <div style={{
          position: 'relative', zIndex: 1,
          paddingTop: '18px',
          borderTop: '1px solid rgba(250,247,242,0.1)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '9px', color: 'rgba(216,166,106,0.75)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>
              ID &amp; EXPIRY
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', letterSpacing: '0.12em', color: '#FAF7F2', marginBottom: '4px' }}>
              MP-8849-2026
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'rgba(250,247,242,0.75)' }}>
              <ShieldCheck size={13} color="#D8A66A" />
              <span style={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>VALID: 12 / 2027</span>
            </div>
          </div>

          {/* QR Code area */}
          <div style={{
            padding: '8px', borderRadius: '12px',
            background: '#FAF7F2',
            border: '2px solid #C46A3B',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 6px 16px rgba(196,106,59,0.25)',
          }}>
            <QrCode size={42} color="#292B2C" strokeWidth={1.5} />
            <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#C46A3B', fontWeight: 700, letterSpacing: '0.15em', marginTop: '3px' }}>
              SCAN PASS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
