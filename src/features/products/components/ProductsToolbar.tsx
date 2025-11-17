type SortField = "name" | "price";
type SortDirection = "asc" | "desc";

type ProductsToolbarProps = {
  query: string;
  category: string;
  sortBy: SortField;
  sortDirection: SortDirection;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortByChange: (value: SortField) => void;
  onSortDirectionChange: (value: SortDirection) => void;
};

export function ProductsToolbar({
  query,
  category,
  sortBy,
  sortDirection,
  categories,
  onQueryChange,
  onCategoryChange,
  onSortByChange,
  onSortDirectionChange,
}: ProductsToolbarProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      alignItems: 'flex-end'
    }}>
      {/* Search */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: '1', minWidth: '240px' }}>
        <label 
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#6366f1',
            marginBottom: '0.5rem',
            letterSpacing: '0.025em'
          }} 
          htmlFor="search"
        >
          🔍 Search Products
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          style={{
            border: '2px solid #e0e7ff',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
            transition: 'all 0.3s ease',
            outline: 'none',
            color: '#1e293b'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#818cf8';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e0e7ff';
            e.target.style.transform = 'translateY(0)';
          }}
        />
      </div>

      {/* Category */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '180px' }}>
        <label 
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#8b5cf6',
            marginBottom: '0.5rem',
            letterSpacing: '0.025em'
          }} 
          htmlFor="category"
        >
          📂 Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{
            border: '2px solid #ede9fe',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
            transition: 'all 0.3s ease',
            outline: 'none',
            color: '#1e293b',
            cursor: 'pointer'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#a78bfa';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ede9fe';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: '220px' }}>
        <label 
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#f59e0b',
            marginBottom: '0.5rem',
            letterSpacing: '0.025em'
          }}
        >
          ⚡ Sort By
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortField)}
            style={{
              border: '2px solid #fef3c7',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
              transition: 'all 0.3s ease',
              outline: 'none',
              color: '#1e293b',
              flex: '1',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#fbbf24';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#fef3c7';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          <button
            type="button"
            onClick={() =>
              onSortDirectionChange(
                sortDirection === "asc" ? "desc" as SortDirection : "asc"
              )
            }
            style={{
              border: '2px solid #fef3c7',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              fontSize: '1.25rem',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: '#ffffff',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
              minWidth: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
            }}
            aria-label={`Sort ${
              sortDirection === "asc" ? "descending" : "ascending"
            }`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>
    </div>
  );
}