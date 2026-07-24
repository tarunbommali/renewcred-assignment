'use client';
import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';
import BlockRenderer from './BlockRenderer';

const Hero = ({ data }) => {
  const content = data?.content || {
    heading: 'Accelerating Climate Action',
    subHeading: 'Measure, Verify and Earn Carbon Credits.',
    buttonText: 'Learn More'
  };

  return (
    <header className="section" style={{
      paddingTop: '7rem',
      paddingBottom: '6rem',
      position: 'relative',
      background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(11, 19, 41, 1) 70%)'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '30px',
          color: '#10b981',
          fontSize: '0.875rem',
          fontWeight: '700',
          marginBottom: '1.75rem'
        }}>
          <Leaf size={16} /> Web3 & IoT Powered Carbon MRV
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          lineHeight: '1.15',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }} className="gradient-heading">
          {content.heading}
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          marginBottom: '2.5rem',
          lineHeight: '1.6'
        }}>
          {content.subHeading}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="#projects" className="btn btn-emerald">
            {content.buttonText} <ArrowRight size={18} />
          </a>
        </div>

        {data?.blocks && data.blocks.length > 0 && (
          <div style={{ marginTop: '3rem', textAlign: 'left' }}>
            <BlockRenderer blocks={data.blocks} />
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginTop: '4rem',
          paddingTop: '2.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <ShieldCheck color="#10b981" size={24} />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: '600' }}>IoT Telemetry Verified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <TrendingUp color="#10b981" size={24} />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: '600' }}>100% High-Integrity Offsets</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <Leaf color="#10b981" size={24} />
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontWeight: '600' }}>Direct Developer Payouts</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
