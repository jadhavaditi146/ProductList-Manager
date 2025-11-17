export function LoadingState() {
  return <p role="status">Loading products…</p>;
}

export function EmptyState() {
  return <p>No products match your search.</p>;
}

export function ErrorState({ message }: { message: string }) {
  return <p role="alert">Something went wrong: {message}</p>;
}
