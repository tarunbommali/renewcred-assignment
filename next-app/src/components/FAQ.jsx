'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import BlockRenderer from './BlockRenderer';

const FAQ = ({ data }) => {
  const faqList = Array.isArray(data?.content) ? data.content : [];
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--surface-bg)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }} className="gradient-heading">
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Everything you need to know about digital carbon credits and RenewCred telemetry.
          </p>
        </div>

        {faqList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqList.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id || index}
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'transparent',
                      color: '#f8fafc',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <HelpCircle size={20} color="#10b981" /> {faq.question}
                    </span>
                    {isOpen ? <ChevronUp size={20} color="#10b981" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.5rem 3.25rem',
                      color: '#cbd5e1',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>No FAQ items loaded.</p>
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

export default FAQ;
