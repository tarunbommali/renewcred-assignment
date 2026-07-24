'use client';
import React from 'react';
import { Cpu, Globe, Coins, ShieldAlert } from 'lucide-react';
import BlockRenderer from './BlockRenderer';

const serviceIcons = [Coins, Cpu, Globe, ShieldAlert];

const Services = ({ data }) => {
  const servicesList = Array.isArray(data?.content) ? data.content : [];

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--surface-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }} className="gradient-heading">
            Our Core Services
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Empowering renewable projects with digital verification & seamless liquidity.
          </p>
        </div>

        {servicesList.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {servicesList.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <div key={service.id || index} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{service.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No services available.</p>
        )}

        {data?.blocks && data.blocks.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <BlockRenderer blocks={data.blocks} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
