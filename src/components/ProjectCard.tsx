import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group relative flex h-full flex-col rounded-lg border border-hairline bg-surface p-6 transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-hairlineStrong hover:bg-[#141416] motion-reduce:hover:translate-y-0"
    >
      <h2 className="text-[15px] font-medium leading-snug text-ink">
        {project.name}
      </h2>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
        {project.tagline}
      </p>
      <p className="mt-4 font-mono text-[12px] tracking-tight text-faint">
        {project.stack.join('  /  ')}
      </p>
    </Link>
  );
}
