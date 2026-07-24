'use client';
import React from 'react';
import BlockRenderer from './BlockRenderer';

const About = ({ data }) => {
  const content = data?.content || {
    title: 'About RenewCred',
    description: 'RenewCred connects climate projects directly to carbon markets.'
  };

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }} className="gradient-heading">
            {content.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.7' }}>
            {content.description}
          </p>
        </div>

        {data?.blocks && data.blocks.length > 0 && (
          <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <BlockRenderer blocks={data.blocks} />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
