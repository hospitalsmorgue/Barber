import { SearchExperience } from "@/components/search-experience";

export default function SearchPage({ searchParams }: { searchParams: { q?: string; badge?: string } }) {
  return <SearchExperience initialQuery={searchParams.q ?? ""} initialBadge={searchParams.badge === "1"} />;
}
