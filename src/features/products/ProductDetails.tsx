import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { LoadingState, ErrorState } from './components/States'
import type { Product } from '../../types'

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/products/${id}`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found')
        }
        throw new Error('Failed to fetch product details')
      }

      const data: Product = await response.json()
      setProduct(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price / 100)
  }

  const handleRetry = () => {
    fetchProduct()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </Link>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {loading && <LoadingState />}

          {!loading && error && <ErrorState error={error} onRetry={handleRetry} />}

          {!loading && !error && product && (
            <article aria-labelledby="product-heading">
              <h1 id="product-heading" className="text-3xl font-bold text-gray-900 mb-6">
                {product.name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Information */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Price</h2>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">Category</h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">
                      Stock Status
                    </h2>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {product.description && (
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 mb-1">
                        Description
                      </h2>
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Product Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-900 mb-3">
                    Product Information
                  </h2>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Product ID</dt>
                      <dd className="text-sm font-medium text-gray-900">{product.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Availability</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {product.inStock ? 'Available' : 'Unavailable'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}