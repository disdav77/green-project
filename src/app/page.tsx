import { HeroCover } from '@/features/home/HeroCover';
import { FlagshipUnits } from '@/features/home/FlagshipUnits';
import { PortalNavBento } from '@/features/home/PortalNavBento';

export default function HomePage() {
  return (
    <>
      <HeroCover />
      <FlagshipUnits />
      <PortalNavBento />
    </>
  );
}

