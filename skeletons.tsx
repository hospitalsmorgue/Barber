export function BarberCardSkeleton() {
  return <div className="barber-skeleton" aria-hidden="true"><div className="skeleton skeleton-image" /><div className="skeleton skeleton-title" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-meta" /></div>;
}

export function BarberGridSkeleton({ count = 6 }: { count?: number }) {
  return <div className="barber-grid" role="status" aria-label="Carregando barbearias">{Array.from({ length: count }, (_, index) => <BarberCardSkeleton key={index} />)}</div>;
}
