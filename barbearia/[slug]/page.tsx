import { notFound } from "next/navigation";
import { BarberProfile } from "@/components/barber-profile";
import { barbers } from "@/lib/barbers";

export function generateStaticParams() {
  return barbers.map((barber) => ({ slug: barber.slug }));
}

export default function BarberPage({ params }: { params: { slug: string } }) {
  const barber = barbers.find((item) => item.slug === params.slug);
  if (!barber) notFound();
  return <BarberProfile barber={barber} />;
}
