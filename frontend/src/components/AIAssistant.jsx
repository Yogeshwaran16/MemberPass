import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Bot, User, Loader2, AlertTriangle, XCircle, CheckCircle2, Zap } from 'lucide-react';
import { sendAssistantQuery, checkFastApiHealth } from '../services/aiService';

function LoadingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#D8A66A', display: 'inline-block',
            animation: `dot-bounce 1.2s infinite ${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes dot-bounce {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'online' | 'offline'
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Check backend on mount
  useEffect(() => {
    (async () => {
      const result = await checkFastApiHealth();
      setBackendStatus(result.connected ? 'online' : 'offline');
    })();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const q = input.trim();
    if (!q || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const result = await sendAssistantQuery(q, messages);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', text: result.answer },
      ]);
      setBackendStatus('online');
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: 'error', text: err.message },
      ]);
      if (backendStatus !== 'online') setBackendStatus('offline');
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  const statusConfig = {
    checking: { color: '#D8A66A', icon: <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} />, label: 'Connecting…' },
    online: { color: '#22c55e', icon: <CheckCircle2 size={12} />, label: 'AI Online' },
    offline: { color: '#ef4444', icon: <XCircle size={12} />, label: 'Backend Offline' },
  };
  const st = statusConfig[backendStatus];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
      background: '#fff',
      borderRadius: '20px',
      border: '1px solid rgba(216,166,106,0.25)',
      boxShadow: '0 20px 60px -16px rgba(41,43,44,0.1)',
      overflow: 'hidden',
    }}>

      {/* ---- Header ---- */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 24px',
        background: 'linear-gradient(135deg, #292B2C 0%, #323537 100%)',
        borderBottom: '1px solid rgba(216,166,106,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '11px',
            background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(196,106,59,0.4)',
          }}>
            <Bot size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 600, fontSize: '16px', color: '#FAF7F2' }}>
              MemberPass AI
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span style={{ color: st.color, display: 'flex', alignItems: 'center' }}>{st.icon}</span>
              <span style={{ fontSize: '11px', color: st.color, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500 }}>{st.label}</span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            title="Clear conversation"
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px', padding: '7px 12px',
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'rgba(250,247,242,0.65)', cursor: 'pointer', fontSize: '12px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <Trash2 size={13} />
            Clear
          </button>
        )}
      </div>

      {/* ---- Messages Area ---- */}
      <div
        ref={scrollRef}
        className="chat-scroll"
        style={{
          flex: 1, overflowY: 'auto', padding: '20px 20px 8px',
          display: 'flex', flexDirection: 'column', gap: '16px',
          background: '#FAFAF9',
        }}
      >
        {/* Welcome state */}
        {messages.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px',
              background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 12px 32px rgba(196,106,59,0.28)',
            }}>
              <Zap size={28} color="#fff" fill="#fff" />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', fontWeight: 600, color: '#292B2C', margin: '0 0 10px' }}>
              Ask MemberPass AI
            </h3>
            <p style={{ fontSize: '14px', color: '#575A5D', lineHeight: 1.6, maxWidth: '340px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Ask anything about your membership — benefits, renewal, plans, access, or policies.
            </p>
            {backendStatus === 'offline' && (
              <div style={{
                marginTop: '20px', padding: '12px 18px', borderRadius: '12px',
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                maxWidth: '380px', textAlign: 'left',
              }}>
                <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '3px' }}>AI Backend Offline</div>
                  <div style={{ fontSize: '11px', color: '#7f8c8d', lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    The FastAPI AI server at <code style={{ background: 'rgba(0,0,0,0.05)', padding: '1px 4px', borderRadius: '4px', fontSize: '10px' }}>localhost:8000</code> is not running.
                    Start your backend server and refresh.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="msg-enter"
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: '10px',
              alignItems: 'flex-start',
            }}
          >
            {/* AI / Error Avatar */}
            {msg.sender !== 'user' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                background: msg.sender === 'error'
                  ? 'rgba(239,68,68,0.12)'
                  : 'linear-gradient(135deg, #C46A3B, #D8A66A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: msg.sender === 'error' ? '1px solid rgba(239,68,68,0.3)' : 'none',
                marginTop: '2px',
              }}>
                {msg.sender === 'error'
                  ? <AlertTriangle size={16} color="#ef4444" />
                  : <Bot size={16} color="#fff" />
                }
              </div>
            )}

            {/* Bubble */}
            <div style={{
              maxWidth: '72%',
              padding: '12px 16px',
              borderRadius: msg.sender === 'user'
                ? '18px 18px 4px 18px'
                : '18px 18px 18px 4px',
              background: msg.sender === 'user'
                ? 'linear-gradient(135deg, #C46A3B, #D8A66A)'
                : msg.sender === 'error'
                  ? 'rgba(239,68,68,0.06)'
                  : '#fff',
              color: msg.sender === 'user' ? '#fff' : msg.sender === 'error' ? '#c0392b' : '#292B2C',
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              border: msg.sender === 'ai' ? '1px solid rgba(216,166,106,0.2)' : msg.sender === 'error' ? '1px solid rgba(239,68,68,0.2)' : 'none',
              boxShadow: msg.sender === 'user'
                ? '0 4px 12px rgba(196,106,59,0.28)'
                : '0 2px 8px rgba(41,43,44,0.06)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {msg.text}
            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                background: '#F4EBDD',
                border: '1px solid rgba(196,106,59,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: '2px',
              }}>
                <User size={16} color="#C46A3B" />
              </div>
            )}
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
              background: 'linear-gradient(135deg, #C46A3B, #D8A66A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={16} color="#fff" />
            </div>
            <div style={{
              padding: '12px 18px', borderRadius: '18px 18px 18px 4px',
              background: '#fff', border: '1px solid rgba(216,166,106,0.2)',
              boxShadow: '0 2px 8px rgba(41,43,44,0.06)',
            }}>
              <LoadingDots />
            </div>
          </div>
        )}
      </div>

      {/* ---- Input Area ---- */}
      <div style={{
        padding: '16px 20px',
        background: '#fff',
        borderTop: '1px solid rgba(216,166,106,0.18)',
      }}>
        <div style={{
          display: 'flex', gap: '10px', alignItems: 'flex-end',
          background: '#FAF7F2',
          border: '1.5px solid rgba(196,106,59,0.25)',
          borderRadius: '14px',
          padding: '8px 8px 8px 16px',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = '#C46A3B'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(196,106,59,0.25)'}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your membership, benefits, renewal…"
            disabled={loading}
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '14px',
              color: '#292B2C',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              lineHeight: '1.5',
              maxHeight: '100px',
              overflowY: 'auto',
              paddingTop: '4px',
              paddingBottom: '4px',
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            style={{
              width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
              background: (!input.trim() || loading)
                ? 'rgba(196,106,59,0.25)'
                : 'linear-gradient(135deg, #C46A3B, #D8A66A)',
              border: 'none', cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              boxShadow: (!input.trim() || loading) ? 'none' : '0 4px 12px rgba(196,106,59,0.35)',
            }}
            onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {loading
              ? <Loader2 size={17} color={(!input.trim()) ? '#C46A3B' : '#fff'} style={{ animation: 'spin 1s linear infinite' }} />
              : <Send size={17} color={!input.trim() ? '#C46A3B' : '#fff'} />
            }
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#8E9196', textAlign: 'center', marginTop: '8px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Press <kbd style={{ background: '#F0EBE3', border: '1px solid rgba(196,106,59,0.2)', borderRadius: '4px', padding: '1px 5px', fontSize: '10px' }}>Enter</kbd> to send · <kbd style={{ background: '#F0EBE3', border: '1px solid rgba(196,106,59,0.2)', borderRadius: '4px', padding: '1px 5px', fontSize: '10px' }}>Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}

