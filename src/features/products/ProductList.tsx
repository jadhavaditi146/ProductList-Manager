import { useEffect, useState } from 'react'
import { ProductsToolbar } from './components/ProductsToolbar'
import { ProductsTable } from './components/ProductsTable'
import { Pagination } from './components/Pagination'
import { LoadingState, EmptyState, ErrorState } from './components/States'
import type { Product, ListResponse } from '../../types'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters and sorting
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const limit = 8

  const totalPages = Math.ceil(totalItems / limit)

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy, sortOrder, currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      })

      if (searchQuery) params.append('query', searchQuery)
      if (selectedCategory) params.append('category', selectedCategory)

      const response = await fetch(`/products?${params.toString()}`)

      if (!response.ok) throw new Error('Failed to fetch products')

      const data: ListResponse<Product> = await response.json()

      // Client-side sorting
      let sortedProducts = [...data.items]
      sortedProducts.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else if (sortBy === 'price') {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        }
        return 0
      })

      setProducts(sortedProducts)
      setTotalItems(data.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRetry = () => {
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-red-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" id="products-heading">
            Products
          </h1>
          <p className="text-lg text-gray-700">
            Browse and manage your product listings
          </p>
        </header>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100">

          {/* Toolbar Section */}
          <div className="border-b border-red-100 bg-red-500 p-6 rounded-t-2xl">
            <ProductsToolbar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              sortOrder={sortOrder}
              onSortOrderToggle={handleSortOrderToggle}
            />
          </div>

          {/* Content Area */}
          <div className="p-6 min-h-96">
            {loading && <LoadingState />}

            {!loading && error && (
              <ErrorState error={error} onRetry={handleRetry} />
            )}

            {!loading && !error && products.length === 0 && <EmptyState />}

            {!loading && !error && products.length > 0 && (
              <div data-testid="products-list">
                <ProductsTable products={products} />
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          {!loading && !error && products.length > 0 && (
            <div className="border-t border-red-100 px-6 py-4 bg-red-500 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white font-medium">
                  Showing {products.length} of {totalItems} products
                </p>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}