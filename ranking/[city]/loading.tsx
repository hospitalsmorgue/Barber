import { ListSkeleton } from "@/components/skeleton-block";
export default function Loading() { return <div className="page-shell inner-page"><div className="skeleton skeleton-title" /><div className="skeleton skeleton-line" /><ListSkeleton rows={8} /></div>; }
