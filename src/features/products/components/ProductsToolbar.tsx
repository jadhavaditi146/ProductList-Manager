interface ProductsToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  sortOrder: 'asc' | 'desc'
  onSortOrderToggle: () => void
}

const categories = ['All Categories', 'Electronics', 'Home', 'Clothing', 'Books']
const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'price', label: 'Price' },
]

export function ProductsToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
}: ProductsToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* Search Input */}
      <div className="flex-1 min-w-64">
        <label htmlFor="search" className="block text-sm font-medium text-white mb-2">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name..."
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
          aria-label="Search products by name"
        />
      </div>

      {/* Category Filter */}
      <div className="min-w-48 w-full sm:w-auto">
        <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
          aria-label="Filter by category"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === 'All Categories' ? '' : cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Controls */}
      <div className="min-w-48 w-full sm:w-auto">
        <label htmlFor="sort" className="block text-sm font-medium text-white mb-2">
          Sort by
        </label>
        <div className="flex gap-2">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            aria-label="Sort products by"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={onSortOrderToggle}
            className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors flex items-center justify-center"
            aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            title={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
          >
            {sortOrder === 'asc' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}