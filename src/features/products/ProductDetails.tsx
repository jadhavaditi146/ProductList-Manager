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
    }).format(price / 100)
  }

  return (
    <div className="min-h-screen bg-pink-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center text-lg font-bold text-gray-800 hover:text-gray-500 mb-6 transition-colors"
        >
          <svg
            className="w-6 h-6 mr-2"
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

        {/* Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

          {loading && <LoadingState />}
          {!loading && error && <ErrorState error={error} />}

          {!loading && !error && product && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Product Image Section */}
              <div className="bg-gray-50 flex items-center justify-center rounded-lg p-4 border border-gray-200">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-[420px] object-contain"
                  />
                ) : (
                  <div className="text-gray-500">No Image Available</div>
                )}
              </div>

              {/* Product info Section */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <p className="text-2xl font-bold text-red-600 mb-4">
                  {formatPrice(product.price)}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full">
                    {product.category}
                  </span>

                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {product.description && (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                <div className="grid gap-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Product ID</span>
                    <span className="font-semibold text-gray-900">{product.id}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Category</span>
                    <span className="font-semibold text-gray-900">{product.category}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Availability</span>
                    <span className="font-semibold text-gray-900">
                      {product.inStock ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}
