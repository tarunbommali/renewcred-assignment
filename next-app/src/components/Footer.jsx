'use client';
import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Footer = ({ data }) => {
  const content = data?.content || {
    companyName: 'RenewCred Technologies Inc.',
    email: 'contact@renewcred.com',
    phone: '+1 (800) 555-RENEW',
    copyright: '© 2026 RenewCred Technologies Inc. All rights reserved.'
  };

  return (
    <footer style={{
      backgroundColor: '#070c1a',
      padding: '4rem 0 2rem 0',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                RC
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#f8fafc' }}>
                {content.companyName}
              </h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '400px' }}>
              Building digital trust and automated telemetry for high-impact carbon offset & renewable energy projects worldwide.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <li><a href="#about">About Platform</a></li>
              <li><a href="#services">Core Services</a></li>
              <li><a href="#projects">Climate Projects</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc', marginBottom: '1rem' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#10b981" /> {content.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#10b981" /> {content.phone}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <Link href="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
                  Admin Portal <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.875rem'
        }}>
          {content.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
