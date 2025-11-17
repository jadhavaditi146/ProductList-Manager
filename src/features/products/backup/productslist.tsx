import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../types";

import { ProductsToolbar } from "./components/ProductsToolbar";
import ProductsTable from "./components/ProductsTable";
import { Pagination } from "./components/Pagination";
import {
  LoadingState,
  EmptyState,
  ErrorState,
} from "./components/States";
export function ProductList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const limit = 8;

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const params = new URLSearchParams({
      query,
      category,
      page: String(page),
      limit: String(limit),
    });

    setLoading(true);
    setError(null);

    fetch(`/products?${params.toString()}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch products");

        const raw = await res.json();
        console.log("API /products response", raw);

        // THE REAL FIX: items[]
        const dataArray: Product[] = Array.isArray(raw.items) ? raw.items : [];

        setProducts(dataArray);
        setTotal(typeof raw.total === "number" ? raw.total : dataArray.length);

        const uniqueCategories = Array.from(
          new Set(
            dataArray
              .map((p: any) => p?.category)
              .filter((c: any) => typeof c === "string")
          )
        ) as string[];

        setCategories(uniqueCategories);
      })
      .catch((err) => {
        if (err.name !== "AbortError" && err instanceof Error) {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, category, page, limit]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    list.sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

    if (sortDirection === "desc") list.reverse();
    return list;
  }, [products, sortBy, sortDirection]);

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '3rem 2rem'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header Section */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-block' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '0.75rem',
              letterSpacing: '-0.025em'
            }}>
              Products
            </h1>
            <div style={{
              height: '4px',
              width: '100%',
              background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
              borderRadius: '9999px'
            }}></div>
          </div>
          <p style={{
            marginTop: '1rem',
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '500'
          }}>
            Manage and organize your product inventory
          </p>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          {/* Toolbar Section */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f59e0b 100%)'
            }}></div>
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #fff5f7 100%)',
              borderBottom: '1px solid rgba(103, 126, 234, 0.1)'
            }}>
              <ProductsToolbar
                query={query}
                category={category}
                sortBy={sortBy}
                sortDirection={sortDirection}
                categories={categories}
                onQueryChange={(value) => {
                  setQuery(value);
                  setPage(1);
                }}
                onCategoryChange={(value) => {
                  setCategory(value);
                  setPage(1);
                }}
                onSortByChange={setSortBy}
                onSortDirectionChange={setSortDirection}
              />
            </div>
          </div>

          {/* Content Area */}
          <div style={{
            minHeight: '500px',
            background: '#ffffff'
          }}>
            {loading && (
              <div style={{ padding: '2rem' }}>
                <LoadingState />
              </div>
            )}
            
            {error && (
              <div style={{ padding: '2rem' }}>
                <ErrorState message={error.message} />
              </div>
            )}

            {!loading && !error && sortedProducts.length === 0 && (
              <div style={{ padding: '2rem' }}>
                <EmptyState />
              </div>
            )}

            {!loading && !error && sortedProducts.length > 0 && (
              <>
                <div style={{ padding: '2rem 2rem 1.5rem' }}>
                  <ProductsTable products={sortedProducts} />
                </div>
                
                {/* Pagination Footer */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(103, 126, 234, 0.2) 50%, transparent 100%)'
                  }}></div>
                  <div style={{
                    padding: '1.5rem 2rem',
                    background: 'linear-gradient(135deg, #fafbff 0%, #fff9fb 100%)'
                  }}>
                    <Pagination
                      page={page}
                      pageSize={limit}
                      total={total}
                      onPageChange={setPage}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.95rem',
          color: 'rgba(255, 255, 255, 0.9)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
              }}></div>
              <span style={{ fontWeight: '600' }}>{total} Total Products</span>
            </div>
            {category && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                }}></div>
                <span style={{ fontWeight: '600' }}>Category: {category}</span>
              </div>
            )}
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontWeight: '600'
          }}>
            Page {page} of {Math.ceil(total / limit) || 1}
          </div>
        </div>
      </div>
    </section>
  );
}