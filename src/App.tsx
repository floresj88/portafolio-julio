import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import profilePic from './perfil.jpg';

/* ------------------------------------------------------------------ */
/*  1. DATOS — edita aquí el contenido; el diseño se actualiza solo    */
/* ------------------------------------------------------------------ */

const NAME = 'Julio Flores Salvatierra';
const HEADLINE = 'Economist, IFC – World Bank Group';
const TAGLINE = 'Private Sector Development · Public Policies · Climate Strategy · Macroeconomics';
const BIO =
  'Economist focused on unlocking private investment in emerging markets — identifying private sector opportunities, designing regulatory reforms, and structuring public-private partnerships across infrastructure, energy, and climate.';

const CONTACT = {
  email: 'jfloressalvatier@worldbankgroup.org',
  whatsappDisplay: '+1 (202) 758-6343',
  whatsappNumber: '12027586343', // solo dígitos, con código de país
  linkedin: 'https://www.linkedin.com/in/julio-flores-salvatierra-jfs2026',
};

type TabId = 'experience' | 'publications' | 'training' | 'awards' | 'education' | 'contact';

const TABS: { id: TabId; label: string }[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'training', label: 'Training' },
  { id: 'awards', label: 'Awards & Recognition' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Get in Touch' },
];

interface Role {
  title: string;
  period: string;
  location: string;
  description: string;
}

interface Position {
  organization: string;
  roles: Role[];
}

const EXPERIENCE: Position[] = [
  {
    organization: 'International Finance Corporation (IFC) — World Bank Group',
    roles: [
      {
        title: 'Economist, SME and Enterprise Development, Solutions & Impact Unit',
        period: 'July 2026 – Present',
        location: 'Washington, DC',
        description:
          'Leading the Country Private Sector Diagnostic (CPSD) work to formulate actionable policy measures, including the Mexico Renewable Energy and Battery Energy Storage Deep Dive, which assesses the updated 2025 legal framework — notably the expansion of distributed generation to 0.7 MW and self-supply up to 20 MW. I also lead solid waste management and circularity programs with Panamanian municipal associations, and structure strategic reforms for the El Salvador Cold-Chain Storage and Transport CPSD to reduce logistics costs and position the country as a regional hub, including the design of its first national cold-chain logistics survey.',
      },
      {
        title: 'Associate Economist, Climate & Sectoral Market Research Unit',
        period: 'December 2022 – July 2026',
        location: 'Washington, DC',
        description:
          'Authored mitigation strategy briefs and sector roadmaps for hard-to-abate industries — steel, cement, and aluminum — across Latin America, Asia, and Emerging Europe. Designed a cross-country methodology to identify mature investment opportunities in renewable energy and Battery Energy Storage Systems (BESS), led plastic circularity analyses, and co-authored CPSD 2.0 for infrastructure sectors in Nigeria and Paraguay. Built an internal web platform with Tableau dashboards to synthesize bespoke sector analyses.',
      },
    ],
  },
  {
    organization: 'McKinsey & Company',
    roles: [
      {
        title: 'Knowledge Specialist, Climate Unit',
        period: 'January 2022 – December 2022',
        location: 'Washington, DC',
        description:
          "Developed strategies and prioritization methodologies for blue economy opportunities in aquaculture and plastic recycling, which led to a Blue Credit for Produbanco in Ecuador. Led a decarbonization simulation to identify operational emission reductions in the built environment across the United States, Asia, and other markets, and supported Peru's private capital mobilization strategy to deliver on its Nationally Determined Contributions (NDC).",
      },
    ],
  },
  {
    organization: 'Private Investment Promotion Agency (Proinversión)',
    roles: [
      {
        title: 'Technical Advisor to the Executive Director',
        period: 'August 2021 – December 2021',
        location: 'Lima, Peru',
        description:
          'Supported the creation of the Economic Studies Unit to evaluate the ex-post impact of Public-Private Partnership (PPP) projects. Coordinated approval processes and impact evaluations for 94 PPP projects valued at US$34 billion across transport, education, and electricity.',
      },
    ],
  },
  {
    organization: "Moody's Investors Service",
    roles: [
      {
        title: 'Graduate Intern',
        period: 'June 2020 – July 2020',
        location: 'Cambridge, MA',
        description:
          'Developed a methodology to assess the impact of fiscal rules on sovereign repayment capacity and led an independent outlook analysis for the U.S. restaurant industry.',
      },
    ],
  },
  {
    organization: 'Ministry of Economy and Finance (MEF), Peru',
    roles: [
      {
        title: 'Principal Advisor on Infrastructure & Sustainability',
        period: 'November 2017 – August 2019',
        location: 'Lima, Peru',
        description:
          "Led the development of the National Competitiveness Plan and Peru's foundational National Infrastructure Plan (PNIP). Worked with sectoral roundtables to reduce regulatory barriers and design special fiscal frameworks for the Blue Economy and Biodiversity sectors, and negotiated a pivotal agreement between rice and corn producers and the Executive Branch that averted a major regional strike.",
      },
      {
        title: 'Macroeconomic Policy Director',
        period: 'March 2015 – October 2017',
        location: 'Lima, Peru',
        description:
          "Directed the team preparing the Multiannual Macroeconomic Framework (MMF) and macroeconomic policy recommendations. Designed measures to mitigate economic shocks — including the 2017 Coastal El Niño — using macroeconomic multiplier simulations, and served as Peru's representative to credit rating agencies, supporting stable sovereign ratings and US$4.36 billion in public debt issuance.",
      },
    ],
  },
  {
    organization: 'APOYO Consulting Group',
    roles: [
      {
        title: 'Senior Economic Studies Analyst',
        period: 'July 2011 – February 2015',
        location: 'Lima, Peru',
        description:
          'Developed short- and long-term macroeconomic projections and monthly reports with policy recommendations for 300+ corporate clients. Contributed to macroeconomic sustainability assessments for the Canada Pension Plan Investment Board that supported a US$600 million oil and gas investment, and led demand studies for clients including Aceros Arequipa and SABMiller Backus.',
      },
    ],
  },
];

interface Item {
  year: string;
  title: string;
  issuer?: string;
  url?: string;
}

const PUBLICATIONS: Item[] = [
  { year: '2025', title: 'The Run on Recycled Plastic', issuer: 'International Finance Corporation (IFC)', url: 'https://www.ifc.org/en/insights-reports/2025/the-run-on-recycled-plastic' },
  { year: '2025', title: 'Nigeria: Country Private Sector Diagnostic', issuer: 'International Finance Corporation (IFC)', url: 'https://www.ifc.org/en/insights-reports/2025/nigeria-private-sector-diagnostic' },
  { year: '2025', title: 'Introduction to the Malaysian Plastic Circularity Series', issuer: 'World Bank Group', url: 'https://documents1.worldbank.org/curated/en/099082525115529258/pdf/P176923-c31e9da4-27ab-4466-a557-2c27bc438e96.pdf' },
  { year: '2019', title: "Peru's National Infrastructure Plan", issuer: 'Ministry of Economy and Finance' },
  { year: '2017', title: 'Multiannual Macroeconomic Framework 2018–2021', issuer: 'Ministry of Economy and Finance, Peru', url: 'https://www.mef.gob.pe/contenidos/pol_econ/marco_macro/MMM_2018_2021.pdf' },
  { year: '2017', title: 'Macroeconomic Projections Update Report 2017–2021', issuer: 'Ministry of Economy and Finance, Peru', url: 'https://www.mef.gob.pe/contenidos/pol_econ/marco_macro/informe_actualizacion_proyecciones.pdf' },
  { year: '2017', title: 'Business Environment and Informal Competition', issuer: 'Central Reserve Bank of Peru' },
  { year: '2016', title: 'Revised Multiannual Macroeconomic Framework 2017–2019', issuer: 'Ministry of Economy and Finance, Peru', url: 'https://www.mef.gob.pe/contenidos/pol_econ/marco_macro/MMM_2017_2019_Revisado.pdf' },
  { year: '2014', title: 'Multiannual Macroeconomic Framework 2015–2017', issuer: 'Ministry of Economy and Finance, Peru', url: 'https://www.mef.gob.pe/contenidos/pol_econ/marco_macro/MMM_2015_2017.pdf' },
];

const TRAINING: Item[] = [
  { year: '2026', title: 'Development Policy Financing (DPF) Accreditation', issuer: 'World Bank Group' },
  { year: '2026', title: 'Introduction to AI for Work Certificate', issuer: 'DataCamp' },
  { year: '2025', title: 'Climate Risk, Valuation and Investing Certificate', issuer: 'CFA Institute' },
  { year: '2024', title: 'Project-Level GHG Accounting', issuer: 'GHG Management Institute' },
  { year: '2024', title: "Greenhouse Gas Protocol's Corporate Standard Training", issuer: 'Greenhouse Gas Protocol' },
  { year: '2024', title: 'Sustainable Finance Certification', issuer: 'University of Cambridge' },
  { year: '2024', title: 'Nature-Based Infrastructure Certification', issuer: 'International Institute for Sustainable Development (IISD)' },
  { year: '2024', title: 'GHG Accounting 101', issuer: 'World Bank' },
  { year: '2024', title: 'Gov 100: Governance and Climate Change', issuer: 'World Bank' },
  { year: '2023', title: 'The Carbon Market Bootcamp', issuer: 'Sustainability 101' },
  { year: '2023', title: 'IFC Credit Investment Overview', issuer: 'IFC' },
  { year: '2022', title: 'Sustainability 101', issuer: 'McKinsey & Company' },
  { year: '2021', title: 'Certificate in Management, Leadership and Decision Sciences', issuer: 'Harvard University' },
  { year: '2020', title: 'Behavioral Economics for Better Public Policies', issuer: 'Inter-American Development Bank (IDB)' },
  { year: '2020', title: 'Behavioral Finance', issuer: 'Duke University' },
  { year: '2020', title: 'Excel Financial Modelling for Credit Analysis', issuer: "Moody's" },
  { year: '2020', title: 'Data Science and Big Data Analytics', issuer: 'MIT' },
];

const AWARDS: Item[] = [
  { year: '2024', title: 'IFC Performance Award', issuer: 'International Finance Corporation' },
  { year: '2023', title: 'IFC Departmental Award', issuer: 'International Finance Corporation' },
  { year: '2022', title: 'Outstanding Performance as Macroeconomics Lecturer', issuer: 'UPC (ranked 2 of 50)' },
  { year: '2021', title: "Honorable Mention, Master's Thesis", issuer: 'Harvard University' },
  { year: '2020', title: 'Ash Center Winter Funding Award', issuer: 'Second Year Policy Analysis, Harvard Kennedy School' },
  { year: '2020', title: 'CPL Leadership Cohort', issuer: 'Center for Public Leadership, Fall 2020' },
  { year: '2019', title: 'Joint Japan/World Bank Graduate Scholarship', issuer: 'MPA/ID Program' },
  { year: '2017', title: 'IDB Scholarship', issuer: 'Specialization program, Columbia University' },
  { year: '2014', title: 'Award for Outstanding Academic Performance', issuer: "Master's in Economic Theory, PUCP" },
  { year: '2012', title: 'Award for Outstanding Work Performance', issuer: 'APOYO Consulting Group' },
  { year: '2011', title: 'Prima AFP Award', issuer: 'Top of the 2011 Economics Class' },
];

const EDUCATION: Item[] = [
  { year: '2019 – 2021', title: 'Master in Public Administration in International Development (MPA/ID)', issuer: 'Harvard University' },
  { year: '2017', title: 'Executive Program on Macro-Financial Policymaking', issuer: 'Columbia University' },
  { year: '2012 – 2013', title: 'Master in Economic Theory', issuer: 'Pontificia Universidad Católica del Perú' },
  { year: '2006 – 2011', title: 'Bachelor in Economics', issuer: 'Pontificia Universidad Católica del Perú' },
];

/* ------------------------------------------------------------------ */
/*  2. ESTILOS                                                         */
/* ------------------------------------------------------------------ */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --navy: #0f2a47;
    --blue: #1f6fb2;
    --blue-dark: #174f80;
    --blue-soft: #eaf3fb;
    --blue-line: #c7dcef;
    --ink: #1a202c;
    --text: #3c4858;
    --muted: #6b7a8c;
    --line: #e3e8ef;
    --bg: #f6f8fb;
    --card: #ffffff;
  }

  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); }

  .page {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: var(--text);
    background: var(--bg);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
  }

  /* Header */
  .hero {
    background:
      linear-gradient(rgba(255,255,255,0.88), rgba(234,243,251,0.96)),
      url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80') center / cover;
    border-bottom: 1px solid var(--line);
    padding: 48px 16px 0;
    text-align: center;
  }
  .avatar {
    width: 120px; height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 10px 25px -8px rgba(15,42,71,0.35);
    margin-bottom: 18px;
  }
  .hero h1 {
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.025em;
    margin: 0 0 6px;
  }
  .headline { font-size: clamp(1rem, 2.6vw, 1.2rem); font-weight: 600; color: var(--blue-dark); margin: 0 0 6px; }
  .tagline { font-size: 0.98rem; color: var(--muted); margin: 0; }

  /* Tabs (sticky) */
  .tabs-wrap {
    position: sticky; top: 0; z-index: 10;
    margin-top: 28px;
    padding: 12px 0;
    background: rgba(246,248,251,0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-top: 1px solid var(--line);
  }
  .tabs {
    display: flex; gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 960px; margin: 0 auto; padding: 0 16px;
  }
  .tab {
    font: inherit;
    font-size: 0.92rem; font-weight: 600;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid transparent;
    background: #edf1f6;
    color: var(--text);
    cursor: pointer;
    transition: background .2s, color .2s, box-shadow .2s;
  }
  .tab:hover { background: var(--blue-soft); color: var(--blue-dark); }
  .tab[aria-selected='true'] {
    background: var(--blue);
    color: #fff;
    box-shadow: 0 4px 10px -2px rgba(31,111,178,0.4);
  }
  .tab:focus-visible { outline: 3px solid var(--blue-line); outline-offset: 2px; }

  /* Layout */
  main { width: 100%; max-width: 920px; margin: 0 auto; padding: 44px 16px 64px; flex: 1; }
  .bio {
    font-size: 1.12rem; line-height: 1.75;
    text-align: center; color: var(--text);
    max-width: 720px; margin: 0 auto 44px;
  }
  .section-title {
    font-size: 1.6rem; font-weight: 700; color: var(--ink);
    border-bottom: 2px solid var(--line);
    padding-bottom: 12px; margin: 0 0 28px;
  }

  /* Cards */
  .card {
    background: var(--card);
    border-radius: 12px;
    border-left: 4px solid var(--blue);
    padding: 24px;
    box-shadow: 0 1px 3px rgba(15,42,71,0.06), 0 4px 12px -4px rgba(15,42,71,0.06);
    margin-bottom: 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 18px;
  }
  .grid .card {
    margin: 0;
    display: flex; flex-direction: column;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .grid .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -6px rgba(31,111,178,0.18);
  }

  /* Experience */
  .org { font-size: 1.3rem; font-weight: 700; color: var(--blue-dark); margin: 0 0 18px; }
  .roles { position: relative; }
  .role { position: relative; padding-left: 22px; }
  .role + .role { margin-top: 24px; }
  .roles.multi .role::before {
    content: ''; position: absolute; left: 3px; top: 8px;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--blue);
  }
  .roles.multi .role:not(:last-child)::after {
    content: ''; position: absolute; left: 7px; top: 20px; bottom: -22px;
    width: 1px; background: var(--blue-line);
  }
  .roles:not(.multi) .role { padding-left: 0; }
  .role h4 { font-size: 1.08rem; font-weight: 600; color: var(--ink); margin: 0 0 4px; line-height: 1.4; }
  .meta { font-size: 0.9rem; font-weight: 500; color: var(--muted); margin: 0 0 10px; }
  .desc { font-size: 1rem; line-height: 1.7; margin: 0; }

  /* Items */
  .badge {
    align-self: flex-start;
    background: var(--blue-soft); color: var(--blue-dark);
    border: 1px solid var(--blue-line);
    border-radius: 999px;
    padding: 3px 12px;
    font-size: 0.8rem; font-weight: 700;
    margin-bottom: 12px;
  }
  .item-title { font-size: 1.05rem; font-weight: 600; color: var(--ink); line-height: 1.4; margin: 0 0 6px; }
  .issuer { font-size: 0.92rem; color: var(--muted); margin: 0; }
  .doc-link {
    margin-top: auto; padding-top: 14px;
    color: var(--blue); font-weight: 600; font-size: 0.93rem;
    text-decoration: none;
  }
  .doc-link:hover { color: var(--blue-dark); text-decoration: underline; }
  .doc-note { margin-top: auto; padding-top: 14px; font-size: 0.88rem; color: var(--muted); font-style: italic; }

  /* Contact */
  .contact { text-align: center; padding: 40px 24px; }
  .contact p { font-size: 1.08rem; margin: 0 0 26px; }
  .contact-list { display: flex; flex-direction: column; gap: 18px; align-items: center; }
  .contact-link {
    display: inline-flex; align-items: center; gap: 10px;
    color: var(--blue); font-weight: 600; font-size: 1.08rem;
    text-decoration: none;
  }
  .contact-link:hover { color: var(--blue-dark); text-decoration: underline; }

  footer {
    background: var(--navy); color: #a9b8c9;
    text-align: center; padding: 28px 16px; font-size: 0.88rem;
  }
  footer p { margin: 0; }

  @media (max-width: 600px) {
    .hero { padding-top: 36px; }
    .tabs { flex-wrap: nowrap; overflow-x: auto; justify-content: flex-start; scrollbar-width: none; }
    .tabs::-webkit-scrollbar { display: none; }
    .tab { flex: 0 0 auto; }
    .card { padding: 20px; }
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; }
  }
`;

/* ------------------------------------------------------------------ */
/*  3. COMPONENTES                                                     */
/* ------------------------------------------------------------------ */

const isTab = (value: string): value is TabId => TABS.some((t) => t.id === value);

const tabFromHash = (): TabId => {
  const hash = window.location.hash.replace('#', '');
  return isTab(hash) ? hash : 'experience';
};

function ItemGrid({ items, linkLabel }: { items: Item[]; linkLabel?: string }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <article className="card" key={`${item.year}-${item.title}`}>
          <span className="badge">{item.year}</span>
          <h4 className="item-title">{item.title}</h4>
          {item.issuer && <p className="issuer">{item.issuer}</p>}
          {linkLabel &&
            (item.url ? (
              <a className="doc-link" href={item.url} target="_blank" rel="noreferrer">
                {linkLabel} &rarr;
              </a>
            ) : (
              <span className="doc-note">Available upon request</span>
            ))}
        </article>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: TabId; title: string; children: ReactNode }) {
  return (
    <section id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`}>
      <h3 className="section-title">{title}</h3>
      {children}
    </section>
  );
}

const Icon = ({ d }: { d: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

/* ------------------------------------------------------------------ */
/*  4. APP                                                             */
/* ------------------------------------------------------------------ */

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>(tabFromHash);

  useEffect(() => {
    const onHashChange = () => setActiveTab(tabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    window.history.replaceState(null, '', `#${id}`);
  };

  // Navegación con flechas del teclado entre pestañas (accesibilidad)
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    selectTab(TABS[next].id);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <div className="page">
      <style>{styles}</style>

      <header className="hero">
        <img className="avatar" src={profilePic} alt={NAME} width={120} height={120} />
        <h1>{NAME}</h1>
        <p className="headline">{HEADLINE}</p>
        <p className="tagline">{TAGLINE}</p>

        <div className="tabs-wrap">
          <nav className="tabs" role="tablist" aria-label="Portfolio sections">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                className="tab"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => selectTab(tab.id)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <p className="bio">{BIO}</p>

        {activeTab === 'experience' && (
          <Section id="experience" title="Professional Experience">
            {EXPERIENCE.map((pos) => (
              <article className="card" key={pos.organization}>
                <h3 className="org">{pos.organization}</h3>
                <div className={`roles ${pos.roles.length > 1 ? 'multi' : ''}`}>
                  {pos.roles.map((role) => (
                    <div className="role" key={role.title}>
                      <h4>{role.title}</h4>
                      <p className="meta">
                        {role.period} · {role.location}
                      </p>
                      <p className="desc">{role.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </Section>
        )}

        {activeTab === 'publications' && (
          <Section id="publications" title="Publications and Reports">
            <ItemGrid items={PUBLICATIONS} linkLabel="View document" />
          </Section>
        )}

        {activeTab === 'training' && (
          <Section id="training" title="Certifications & Specialized Courses">
            <ItemGrid items={TRAINING} />
          </Section>
        )}

        {activeTab === 'awards' && (
          <Section id="awards" title="Awards & Recognition">
            <ItemGrid items={AWARDS} />
          </Section>
        )}

        {activeTab === 'education' && (
          <Section id="education" title="Education">
            <ItemGrid items={EDUCATION} />
          </Section>
        )}

        {activeTab === 'contact' && (
          <Section id="contact" title="Get in Touch">
            <div className="card contact">
              <p>Feel free to reach out through any of the following channels:</p>
              <div className="contact-list">
                <a className="contact-link" href={`mailto:${CONTACT.email}`}>
                  <Icon d={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>} />
                  {CONTACT.email}
                </a>
                <a className="contact-link" href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer">
                  <Icon d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />} />
                  WhatsApp: {CONTACT.whatsappDisplay}
                </a>
                <a className="contact-link" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
                  <Icon d={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>} />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </Section>
        )}
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} {NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}
