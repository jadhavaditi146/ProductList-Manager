import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../../../types"; 

type Params = {
  query: string;
  category: string;
  page: number;
  limit: number;
};

export function useProducts({ query, category, page, limit }: Params) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      query,
      category,
      page: String(page),
      limit: String(limit),
    });

    fetch(`/products?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const json: ProductsResponse = await res.json(); 
        setProducts(json.data);
        setTotal(json.total);

        const uniqueCategories = Array.from(
          new Set(json.data.map((p: Product) => p.category))
        ) as string[];

        setCategories(uniqueCategories);
      })
      .catch((err) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, category, page, limit]);

  return { products, total, categories, loading, error };
}
