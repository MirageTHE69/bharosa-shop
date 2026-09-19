import type { Metadata } from 'next';
import { FarmerAgreementView } from '@/components/FarmerAgreementView';

export const metadata: Metadata = {
  title: 'Farmer Supply & Quality Agreement | Bharosa Shop',
  description:
    "Read and download Bharosa Shop's farmer supply, quality compliance and platform agreement in English, Gujarati and Hindi.",
};

export default function FarmerAgreementPage() {
  return <FarmerAgreementView />;
}
