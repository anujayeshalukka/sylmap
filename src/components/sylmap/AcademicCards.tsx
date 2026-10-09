/**
 * Academic entity cards. These establish the visual foundation only: each maps a small set of
 * display fields onto EntityCard. Field lists will grow with the page designs; they do not define
 * the data model.
 */
import type { ReactNode } from "react";
import { BookOpen, CalendarRange, GraduationCap, Landmark, Layers, ScrollText } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { CurriculumVersionBadge, VerificationBadge } from "./Badges";
import { EntityCard, type EntityMeta } from "./EntityCard";

interface BaseCardProps {
  href?: string;
  selected?: boolean;
  className?: string;
}

const meta = (items: Array<[string, ReactNode | undefined]>): EntityMeta[] =>
  items.filter(([, value]) => value !== undefined && value !== null && value !== "").map(([label, value]) => ({ label, value }));

export interface UniversityCardProps extends BaseCardProps {
  name: string;
  location?: string;
  meta?: EntityMeta[];
  verified?: boolean;
}

export function UniversityCard({ name, location, meta: extra, verified, ...rest }: UniversityCardProps) {
  return (
    <EntityCard
      section="universities"
      icon={Landmark}
      title={name}
      subtitle={location}
      meta={extra}
      badges={verified ? <VerificationBadge /> : undefined}
      {...rest}
    />
  );
}

export interface ProgrammeCardProps extends BaseCardProps {
  name: string;
  university?: string;
  degree?: string;
  duration?: string;
  scheme?: string;
}

export function ProgrammeCard({ name, university, degree, duration, scheme, ...rest }: ProgrammeCardProps) {
  return (
    <EntityCard
      section="programmes"
      icon={GraduationCap}
      eyebrow={degree ? <Tag section="programmes">{degree}</Tag> : undefined}
      title={name}
      subtitle={university}
      meta={meta([["Duration", duration]])}
      badges={scheme ? <CurriculumVersionBadge scheme={scheme} /> : undefined}
      {...rest}
    />
  );
}

export interface SemesterCardProps extends BaseCardProps {
  number: number | string;
  title?: string;
  credits?: number | string;
  subjectCount?: number;
}

export function SemesterCard({ number, title, credits, subjectCount, ...rest }: SemesterCardProps) {
  return (
    <EntityCard
      section="subjects"
      icon={CalendarRange}
      eyebrow={<Tag section="subjects">Semester {number}</Tag>}
      title={title ?? `Semester ${number}`}
      meta={meta([
        ["Credits", credits],
        ["Subjects", subjectCount],
      ])}
      {...rest}
    />
  );
}

export interface SubjectCardProps extends BaseCardProps {
  title: string;
  code?: string;
  credits?: number | string;
  semester?: number | string;
  description?: string;
}

export function SubjectCard({ title, code, credits, semester, description, ...rest }: SubjectCardProps) {
  return (
    <EntityCard
      section="subjects"
      icon={BookOpen}
      eyebrow={code ? <span className="text-micro font-mono font-semibold text-fg-muted">{code}</span> : undefined}
      title={title}
      subtitle={description}
      meta={meta([
        ["Semester", semester],
        ["Credits", credits],
      ])}
      {...rest}
    />
  );
}

export interface ModuleCardProps extends BaseCardProps {
  number: number | string;
  title: string;
  hours?: number | string;
  topics?: string[];
}

export function ModuleCard({ number, title, hours, topics, ...rest }: ModuleCardProps) {
  return (
    <EntityCard
      section="subjects"
      icon={Layers}
      eyebrow={<Tag section="subjects">Module {number}</Tag>}
      title={title}
      meta={meta([["Hours", hours]])}
      footer={
        topics && topics.length > 0 ? (
          <p className="text-2xs text-fg-muted leading-snug">{topics.join(" · ")}</p>
        ) : undefined
      }
      {...rest}
    />
  );
}

export interface CurriculumCardProps extends BaseCardProps {
  programme: string;
  university?: string;
  scheme: string;
  status?: "current" | "archived";
  semesters?: number;
  verified?: boolean;
}

export function CurriculumCard({
  programme,
  university,
  scheme,
  status = "current",
  semesters,
  verified,
  ...rest
}: CurriculumCardProps) {
  return (
    <EntityCard
      section="subjects"
      icon={ScrollText}
      title={programme}
      subtitle={university}
      meta={meta([["Semesters", semesters]])}
      badges={
        <>
          <CurriculumVersionBadge scheme={scheme} status={status} />
          {verified && <VerificationBadge />}
        </>
      }
      {...rest}
    />
  );
}
