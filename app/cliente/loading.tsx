import { BarberGridSkeleton } from "@/components/skeletons";
export default function Loading() { return <div className="page-shell inner-page"><div className="skeleton skeleton-title" /><BarberGridSkeleton count={3} /></div>; }
