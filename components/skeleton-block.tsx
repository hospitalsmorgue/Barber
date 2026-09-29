export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return <div className="list-skeleton" role="status" aria-label="Carregando lista">{Array.from({ length: rows }, (_, index) => <div className="skeleton skeleton-row" key={index}><i className="skeleton skeleton-thumb" /><span><i className="skeleton skeleton-title" /><i className="skeleton skeleton-line" /></span></div>)}</div>;
}
