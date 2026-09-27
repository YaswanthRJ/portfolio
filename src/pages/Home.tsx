import { useEffect } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import PageLayout from '../components/PageLayout';

const ArrowUpRightIcon = () => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden="true">
    <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const profileLinks = {
  resume: import.meta.env.VITE_RESUME_URL || '/resume.pdf',
  github: import.meta.env.VITE_GITHUB_URL || 'https://github.com/yourname',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/yourname',
};

export default function Home() {
  useEffect(() => {
    document.title = 'Yaswanth Raj: Software Engineer';
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col gap-16 sm:gap-8">
      <header className="flex max-w-prose flex-col gap-3">
        <h1 className="text-lg font-semibold tracking-tight text-ink">
          Yaswanth Raj
        </h1>
        <p className="leading-relaxed text-muted">
          Full-stack engineer with professional experience in CRM, e-commerce applications, and microservice applications.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={profileLinks.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[14px] text-ink transition-colors duration-150 hover:text-accent"
          >
            Resume
            <ArrowUpRightIcon />
          </a>
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[14px] text-ink transition-colors duration-150 hover:text-accent"
          >
            GitHub
            <ArrowUpRightIcon />
          </a>
          <a
            href={profileLinks.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[14px] text-ink transition-colors duration-150 hover:text-accent"
          >
            LinkedIn
            <ArrowUpRightIcon />
          </a>
        </div>
        <section className="flex flex-col gap-3" aria-labelledby="education-heading">
          <h2 id="education-heading" className="text-[13px] font-medium uppercase tracking-[0.12em] text-faint">
            Education
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            B.Tech in Computer Science, 2025
            <br />
            Model Engineering College, Thrikkakkara
          </p>
        </section>
      </header>

      <section aria-label="Projects">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      </div>
    </PageLayout>
  );
}
