/**
 * Learning Hub, project and career cards — visual foundation only (see AcademicCards.tsx).
 */
import { FileText, FolderGit2, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { EntityCard } from "./EntityCard";

interface BaseCardProps {
  href?: string;
  selected?: boolean;
  className?: string;
}

export interface ResourceCardProps extends BaseCardProps {
  title: string;
  /** e.g. "Notes", "Reference", "Video" */
  type?: string;
  source?: string;
}

export function ResourceCard({ title, type, source, ...rest }: ResourceCardProps) {
  return (
    <EntityCard
      section="learning-hub"
      icon={FileText}
      eyebrow={type ? <Tag section="learning-hub">{type}</Tag> : undefined}
      title={title}
      subtitle={source}
      {...rest}
    />
  );
}

export interface ProjectCardProps extends BaseCardProps {
  title: string;
  domain?: string;
  level?: string;
}

export function ProjectCard({ title, domain, level, ...rest }: ProjectCardProps) {
  return (
    <EntityCard
      section="learning-hub"
      icon={FolderGit2}
      eyebrow={level ? <Tag section="learning-hub">{level}</Tag> : undefined}
      title={title}
      subtitle={domain}
      {...rest}
    />
  );
}

export interface CareerCardProps extends BaseCardProps {
  title: string;
  sector?: string;
  skills?: string[];
}

export function CareerCard({ title, sector, skills, ...rest }: CareerCardProps) {
  return (
    <EntityCard
      section="careers"
      icon={Rocket}
      title={title}
      subtitle={sector}
      badges={
        skills && skills.length > 0
          ? skills.map((skill) => (
              <Badge key={skill} variant="section" section="careers">
                {skill}
              </Badge>
            ))
          : undefined
      }
      {...rest}
    />
  );
}
