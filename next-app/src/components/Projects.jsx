'use client';
import React from 'react';
import { MapPin, Tag } from 'lucide-react';
import BlockRenderer from './BlockRenderer';

const Projects = ({ data }) => {
  const projectsList = Array.isArray(data?.content) ? data.content : [];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }} className="gradient-heading">
            Featured Climate Projects
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            High-integrity carbon sequestration initiatives monitored live.
          </p>
        </div>

        {data?.blocks && data.blocks.length > 0 && (
          <div style={{ maxWidth: '750px', margin: '0 auto 3rem auto' }}>
            <BlockRenderer blocks={data.blocks} />
          </div>
        )}

        {projectsList.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {projectsList.map((proj, index) => (
              <div key={proj.id || index} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: '#10b981',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '20px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <Tag size={12} /> {proj.category || 'Climate'}
                    </span>

                    {proj.location && (
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} /> {proj.location}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem' }}>{proj.name}</h3>
                  <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}>{proj.description}</p>
                </div>

                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ color: '#94a3b8' }}>Status</span>
                  <span style={{ color: '#34d399', fontWeight: '700' }}>● {proj.status || 'Active'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No active climate projects listed.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
