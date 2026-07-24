'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, logout } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Info, 
  Briefcase, 
  FolderKanban, 
  HelpCircle, 
  PanelBottom, 
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Globe,
  ShieldCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, admin } = useSelector((state) => state.auth);
  const { sections, loading } = useSelector((state) => state.content);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      dispatch(fetchContent());
    }
  }, [isAuthenticated, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin/login');
  };

  const refreshStatus = () => {
    dispatch(fetchContent());
  };

  const sectionConfig = [
    { title: 'Hero Section', slug: 'hero', icon: Sparkles, color: '#10b981', desc: 'Hero heading, subtext and CTA button' },
    { title: 'About Us', slug: 'about', icon: Info, color: '#3b82f6', desc: 'Company vision, mission & rich markdown' },
    { title: 'Services', slug: 'services', icon: Briefcase, color: '#8b5cf6', desc: 'Manage list of core services offered' },
    { title: 'Climate Projects', slug: 'projects', icon: FolderKanban, color: '#f59e0b', desc: 'Manage biochar & solar carbon projects' },
    { title: 'FAQ', slug: 'faq', icon: HelpCircle, color: '#ec4899', desc: 'Frequently asked questions & answers' },
    { title: 'Footer', slug: 'footer', icon: PanelBottom, color: '#64748b', desc: 'Company details, email, phone & copyright' }
  ];

  if (!isAuthenticated) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      {/* Top Navbar */}
      <header style={{
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '800' }}>RenewCred CMS Admin</h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Logged in as {admin?.email || 'admin@renewcred.com'}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" target="_blank" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <Globe size={16} /> View Public Website
          </Link>
          <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="container" style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>CMS Control Center</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Manage dynamic content across all website sections with real-time updates.
            </p>
          </div>

          <button onClick={refreshStatus} className="btn btn-secondary">
            <RefreshCw size={16} /> Refresh API Content
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {sectionConfig.map((sec) => {
            const Icon = sec.icon;
            const sectionData = sections[sec.slug];
            const isConfigured = !!sectionData;

            return (
              <div key={sec.slug} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#1e293b' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: `${sec.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: sec.color
                    }}>
                      <Icon size={24} />
                    </div>
                    <span className={`badge ${isConfigured ? 'badge-active' : 'badge-draft'}`}>
                      {isConfigured ? 'Live API' : 'Pending'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.4rem' }}>{sec.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{sec.desc}</p>

                  {sectionData && (
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="#10b981" /> Updated: {new Date(sectionData.updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>

                <Link href={`/admin/editor/${sec.slug}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Edit Content <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
