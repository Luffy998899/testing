export type ProductCategory = "Tires" | "Custom Rims" | "Packages" | "Seasonal Deals";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  size: string;
  specs: string;
  price: number;
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
  image: string;
  vehicleType: "Car" | "SUV" | "Truck";
  seasonal: "All Season" | "Summer" | "Winter";
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  quote: string;
  vehicle: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  title: string;
  caption: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroSubheadline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
}
