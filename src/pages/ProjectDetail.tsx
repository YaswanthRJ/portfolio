import { useEffect } from 'react';
import type { SVGProps } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import VideoPlayer from '../components/VideoPlayer';
import PageLayout from '../components/PageLayout';

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.6 2.29 6.65 5.47 7.72.4.08.55-.17.55-.39 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.22 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.2-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.2-.36-1.03.08-2.15 0 0 .67-.22 2.2.84a7.42 7.42 0 0 1 4 0c1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.15.51.57.82 1.29.82 2.19 0 3.12-1.87 3.82-3.65 4.02.29.26.54.75.54 1.53 0 1.11-.01 1.99-.01 2.27 0 .22.15.48.55.39A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
  </svg>
);

const ArrowUpRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden="true" {...props}>
    <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    document.title = project
      ? `${project.name} — Your Name`
      : 'Project not found — Your Name';
  }, [project]);

  if (!project) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-xl font-semibold text-ink">Project not found</h1>
          <p className="mt-3 text-[15px] text-muted">
            There's no project at this address. It may have been renamed or
            removed.
          </p>
          <Link
            to="/"
            className="mt-8 inline-block text-[14px] text-accent underline underline-offset-4"
          >
            Back to projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  const paragraphs = project.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Narrowed locals (rather than plain booleans) so TypeScript knows
  // these are defined everywhere they're used below.
  const highlights = project.highlights && project.highlights.length > 0 ? project.highlights : null;
  const images = project.images && project.images.length > 0 ? project.images : null;
  const video = project.video ?? null;
  const demoLink = project.links.demo ?? null;

  return (
    <PageLayout>
      <div className="mx-auto max-w-prose">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-150 hover:text-ink"
      >
        <span aria-hidden="true">&larr;</span> Back to projects
      </Link>

      <header className="mt-10">
        <p className="font-mono text-[12px] text-faint">{project.year}</p>
        <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-ink sm:text-[30px]">
          {project.name}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">
          {project.tagline}
        </p>
        <p className="mt-5 font-mono text-[12.5px] tracking-tight text-faint">
          {project.stack.join('  /  ')}
        </p>
      </header>

      <div className="mt-10 border-t border-hairline" />

      <article className="mt-10 space-y-5">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </article>

      {highlights && (
        <section className="mt-10" aria-label="Highlights">
          <ul className="space-y-3">
            {highlights.map((point, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {video && (
        <section className="mt-12" aria-label="Demo video">
          <VideoPlayer
            src={video.src}
            label={project.name}
          />
        </section>
      )}

      {images && (
        <section className="mt-12 space-y-4" aria-label="Screenshots">
          {images.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              loading="lazy"
              className="w-full rounded-lg border border-hairline"
            />
          ))}
        </section>
      )}

      <footer className="mt-12 flex flex-wrap items-center gap-6 border-t border-hairline pt-8">
        <a
          href={project.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-[14px] text-ink transition-colors duration-150 hover:text-accent"
        >
          <GithubIcon />
          View repository
        </a>
        {demoLink && (
          <a
            href={demoLink}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[14px] text-ink transition-colors duration-150 hover:text-accent"
          >
            Live demo
            <ArrowUpRightIcon />
          </a>
        )}
      </footer>
      </div>
    </PageLayout>
  );
}
