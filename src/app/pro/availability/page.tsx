import type { Metadata } from 'next';
import AvailabilityForm from './AvailabilityForm';

export const metadata: Metadata = {
  title: "Set your availability",
  description:
    "Set your weekly availability as a Lenny's Cleaning professional. Choose your hours, accept jobs on your schedule.",
};

export default function AvailabilityPage() {
  return <AvailabilityForm />;
}
