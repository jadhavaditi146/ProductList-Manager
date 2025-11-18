export type Product = {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
  description?: string
  imageUrl?: string | null;
}
export type ListResponse<T> = {
  items: T[]
  page: number
  limit: number
  total: number
}
export type ProductsResponse = {
  data: Product[];
  total: number;
};

