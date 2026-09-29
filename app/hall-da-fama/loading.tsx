import { ListSkeleton } from "@/components/skeleton-block";
export default function Loading() { return <div className="page-shell inner-page"><div className="skeleton skeleton-title" /><ListSkeleton rows={8} /></div>; }
