import { HeroCover } from '@/features/home/HeroCover';
import { ProjectsShowcase } from '@/features/home/ProjectsShowcase';
import { FlagshipUnits } from '@/features/home/FlagshipUnits';
import { PortalNavBento } from '@/features/home/PortalNavBento';

export default function HomePage() {
  return (
    <>
      <HeroCover />
      <ProjectsShowcase />
      <FlagshipUnits />
      <PortalNavBento />
    </>
  );
}

