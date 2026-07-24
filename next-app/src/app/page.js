'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '@/redux/store';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const { sections, loading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  if (loading && Object.keys(sections).length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0b1329',
        color: '#10b981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        fontWeight: '700'
      }}>
        Connecting to Express API & Microservice DB...
      </div>
    );
  }

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(11, 19, 41, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        height: '70px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '800'
            }}>
              RC
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc' }}>
              RenewCred
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="#about" style={{ color: '#cbd5e1', fontWeight: '600', fontSize: '0.95rem' }}>About</a>
            <a href="#services" style={{ color: '#cbd5e1', fontWeight: '600', fontSize: '0.95rem' }}>Services</a>
            <a href="#projects" style={{ color: '#cbd5e1', fontWeight: '600', fontSize: '0.95rem' }}>Projects</a>
            <a href="#faq" style={{ color: '#cbd5e1', fontWeight: '600', fontSize: '0.95rem' }}>FAQ</a>
            
            <Link
              href="/admin/login"
              className="btn btn-emerald"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
            >
              Admin Dashboard <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ marginTop: '70px' }}>
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services data={sections.services} />
        <Projects data={sections.projects} />
        <FAQ data={sections.faq} />
      </main>

      <Footer data={sections.footer} />
    </div>
  );
}
