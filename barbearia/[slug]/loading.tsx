import { ListSkeleton } from "@/components/skeleton-block";
export default function Loading() { return <div className="page-shell inner-page"><div className="skeleton skeleton-image" /><div className="skeleton skeleton-title" /><ListSkeleton rows={4} /></div>; }
