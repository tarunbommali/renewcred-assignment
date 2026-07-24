'use client';
import React, { useEffect, useState, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, updateSection } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ContentEditorPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { slug } = params;

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { sections } = useSelector((state) => state.content);

  const [formData, setFormData] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    dispatch(fetchContent());
  }, [isAuthenticated, dispatch, router]);

  useEffect(() => {
    if (sections[slug]) {
      const secData = sections[slug];
      setFormData(JSON.stringify(secData.content || {}, null, 2));
      const mdBlock = secData.blocks?.find(b => b.type === 'markdown');
      if (mdBlock?.data?.markdown) {
        setMarkdownContent(mdBlock.data.markdown);
      }
    }
  }, [sections, slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      let parsedContent;
      try {
        parsedContent = JSON.parse(formData);
      } catch {
        alert('Invalid JSON structure in Content field');
        setSaving(false);
        return;
      }

      const existingBlocks = sections[slug]?.blocks || [];
      let updatedBlocks = [...existingBlocks];

      if (markdownContent) {
        const mdIndex = updatedBlocks.findIndex(b => b.type === 'markdown');
        if (mdIndex >= 0) {
          updatedBlocks[mdIndex] = { ...updatedBlocks[mdIndex], data: { markdown: markdownContent } };
        } else {
          updatedBlocks.push({ type: 'markdown', data: { markdown: markdownContent }, order: updatedBlocks.length + 1 });
        }
      }

      await dispatch(updateSection({
        sectionKey: slug,
        data: {
          title: slug.toUpperCase() + ' Section',
          content: parsedContent,
          blocks: updatedBlocks
        }
      })).unwrap();

      setMessage('Section updated successfully!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      alert('Failed to save section: ' + (err || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2.5rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/admin/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Sparkles size={28} color="#10b981" />
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', textTransform: 'capitalize' }}>
              Edit {slug} Section
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Update JSON structure and rich markdown content for public display
            </p>
          </div>
        </div>

        {message && (
          <div style={{
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#34d399',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={18} /> {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ backgroundColor: '#1e293b' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem' }}>Section Content (JSON)</h2>
            <textarea
              rows="10"
              style={{ fontFamily: 'monospace', fontSize: '0.9rem', width: '100%', padding: '1rem', backgroundColor: '#0f172a', color: '#34d399', border: '1px solid #334155', borderRadius: '8px' }}
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              required
            />
          </div>

          <div className="card" style={{ backgroundColor: '#1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} color="#10b981" /> Rich Markdown / Blocks
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Supports Headings, Lists, Tables & Math Equations</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.4rem', color: '#94a3b8' }}>
                  MARKDOWN INPUT
                </label>
                <textarea
                  rows="10"
                  style={{ fontFamily: 'monospace', fontSize: '0.9rem', width: '100%', padding: '1rem', backgroundColor: '#0f172a', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px' }}
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Enter markdown..."
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.4rem', color: '#94a3b8' }}>
                  LIVE PREVIEW
                </label>
                <div style={{
                  height: 'calc(100% - 24px)',
                  minHeight: '220px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '1rem',
                  overflowY: 'auto',
                  fontSize: '0.9rem'
                }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent || '*Preview will render here*'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} className="btn btn-primary">
              <Save size={18} /> {saving ? 'Saving...' : 'Save Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
