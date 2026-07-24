'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Atom } from 'lucide-react';

const BlockRenderer = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

  const sortedBlocks = [...blocks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="blocks-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {sortedBlocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={index} style={{ fontSize: '1.75rem', fontWeight: '800', color: '#f8fafc' }}>
                {block.data?.text}
              </h2>
            );

          case 'paragraph':
            return (
              <p key={index} style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: '1.7' }}>
                {block.data?.text}
              </p>
            );

          case 'markdown':
            return (
              <div key={index} className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {block.data?.markdown || ''}
                </ReactMarkdown>
              </div>
            );

          case 'equation':
            return (
              <div key={index} style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <Atom size={32} color="#10b981" />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Scientific Carbon Formula Block
                  </span>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', marginTop: '0.2rem' }}>
                    {block.data?.latex || block.data?.text}
                  </div>
                </div>
              </div>
            );

          case 'list':
            return (
              <ul key={index} style={{ paddingLeft: '1.5rem', color: '#cbd5e1' }}>
                {block.data?.items?.map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    {typeof item === 'string' ? item : `${item.question ? item.question + ': ' : ''}${item.answer || item.text}`}
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={index} style={{ overflowX: 'auto' }}>
                <table className="markdown-body">
                  <thead>
                    <tr>
                      {block.data?.headers?.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data?.rows?.map((row, rIndex) => (
                      <tr key={rIndex}>
                        {row.map((cell, cIndex) => <td key={cIndex}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
