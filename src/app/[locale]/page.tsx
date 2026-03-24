import {setRequestLocale} from 'next-intl/server';
import {HeroSection} from '@/components/sections/HeroSection';
import {SectionDivider} from '@/components/sections/SectionDivider';
import {CollaboratorsSection} from '@/components/sections/CollaboratorsSection';
import {TimelineSection} from '@/components/sections/TimelineSection';
import {ProjectsSection} from '@/components/sections/ProjectsSection';
import {getProjects} from '@/lib/content';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const projects = getProjects();

  return (
    <>
      <HeroSection />
      <SectionDivider />
      <CollaboratorsSection />
      <SectionDivider />
      <TimelineSection />
      <SectionDivider />
      <ProjectsSection projects={projects} />
    </>
  );
}
