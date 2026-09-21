import { HeroCover } from '@/features/home/HeroCover';
import { AudienceGateway } from '@/features/home/AudienceGateway';
import { FlagshipUnits } from '@/features/home/FlagshipUnits';
import { EngineeringSpecs } from '@/features/home/EngineeringSpecs';
import { PublicCertificates } from '@/features/home/PublicCertificates';

export default function HomePage() {
  return (
    <div>
      <HeroCover />
      <AudienceGateway />
      <FlagshipUnits />
      <EngineeringSpecs />
      <PublicCertificates />
    </div>
  );
}
