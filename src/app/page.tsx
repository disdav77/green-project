import { HeroCover } from '@/features/home/HeroCover';
import { ProjectsShowcase } from '@/features/home/ProjectsShowcase';
import { FlagshipUnits } from '@/features/home/FlagshipUnits';
import { EngineeringSpecs } from '@/features/home/EngineeringSpecs';
import { PublicCertificates } from '@/features/home/PublicCertificates';

export default function HomePage() {
  return (
    <>
      <HeroCover />
      <ProjectsShowcase />
      <FlagshipUnits />
      <EngineeringSpecs />
      <PublicCertificates />
    </>
  );
}
