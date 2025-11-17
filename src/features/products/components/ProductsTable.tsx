import { Link } from "react-router-dom";
import type { Product } from "../../../types";
type ProductRow = {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};

// Sample data for demonstration
const sampleProducts: ProductRow[] = [
  { id: "1", name: "Wireless Headphones", price: 99.99, category: "Electronics", inStock: true },
  { id: "2", name: "Coffee Maker", price: 79.50, category: "Home & Kitchen", inStock: true },
  { id: "3", name: "Running Shoes", price: 129.99, category: "Sports", inStock: false },
  { id: "4", name: "Laptop Stand", price: 49.99, category: "Accessories", inStock: true },
  { id: "5", name: "Yoga Mat", price: 34.99, category: "Sports", inStock: true },
];

function ProductsTable({ products }: { products: ProductRow[] }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full" aria-label="Products">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr 
                key={p.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <a 
                    href={`#/products/${p.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-150"
                  >
                    {p.name}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      p.inStock 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.inStock ? "In stock" : "Out of stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Browse our product inventory</p>
        </div>
        <ProductsTable products={sampleProducts} />
      </div>
    </div>
  );
}