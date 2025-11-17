import { Routes, Route, Link } from 'react-router-dom'
import { ProductList } from './features/products/ProductList'
import { ProductDetails } from './features/products/ProductDetails'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              aria-label="Home"
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Listings Manager
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  )
}