import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../../types"; // if this errors, change to "../../types"
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "./components/States";

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`/products/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load product");
        const json: Product = await res.json();
        setProduct(json);
      })
      .catch((err) => {
        if (err instanceof Error) setError(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!product) return <EmptyState />;

  return (
    <section style={{ padding: "1.5rem" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
        ← Back to products
      </Link>

      <h1 style={{ marginBottom: "0.5rem" }}>{product.name}</h1>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Category: {product.category}</p>
      <p>Status: {product.inStock ? "In stock" : "Out of stock"}</p>
    </section>
  );
}
