import { HeroCover } from '@/features/home/HeroCover';
import { SetlQuickFilter } from '@/features/home/SetlQuickFilter';
import { ProjectsShowcase } from '@/features/home/ProjectsShowcase';
import { FlagshipUnits } from '@/features/home/FlagshipUnits';
import { PortalNavBento } from '@/features/home/PortalNavBento';

export default function HomePage() {
  return (
    <>
      <HeroCover />
      <SetlQuickFilter />
      <ProjectsShowcase />
      <FlagshipUnits />
      <PortalNavBento />
    </>
  );
}
