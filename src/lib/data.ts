import { GalleryImage, Product, SiteSettings, Testimonial } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p1",
    name: "Michelin Pilot Sport 4S",
    category: "Tires",
    brand: "Michelin",
    size: "255/35R19",
    specs: "Ultra High Performance Summer",
    price: 469,
    inStock: true,
    featured: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "Car",
    seasonal: "Summer"
  },
  {
    id: "p2",
    name: "Rotiform RSE Forged",
    category: "Custom Rims",
    brand: "Rotiform",
    size: "20x10.5",
    specs: "Forged Mono Block, Satin Graphite",
    price: 1299,
    inStock: true,
    featured: true,
    onSale: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "SUV",
    seasonal: "All Season"
  },
  {
    id: "p3",
    name: "Fuel Off-Road Assault",
    category: "Custom Rims",
    brand: "Fuel",
    size: "18x9",
    specs: "Matte Black Milled",
    price: 799,
    inStock: false,
    featured: false,
    onSale: false,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "Truck",
    seasonal: "All Season"
  },
  {
    id: "p4",
    name: "Winter Grip Elite Package",
    category: "Packages",
    brand: "Formula 19",
    size: "235/55R18 + 18x8",
    specs: "Winter Tire + Alloy Bundle",
    price: 1849,
    inStock: true,
    featured: true,
    onSale: true,
    image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "SUV",
    seasonal: "Winter"
  },
  {
    id: "p5",
    name: "Pirelli Scorpion ATR",
    category: "Seasonal Deals",
    brand: "Pirelli",
    size: "275/60R20",
    specs: "All-Terrain, 3PMSF Rated",
    price: 389,
    inStock: true,
    featured: false,
    onSale: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "Truck",
    seasonal: "All Season"
  },
  {
    id: "p6",
    name: "HRE P101 Satin Silver",
    category: "Custom Rims",
    brand: "HRE",
    size: "21x10",
    specs: "Performance Forged Series",
    price: 1849,
    inStock: true,
    featured: true,
    onSale: false,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80",
    vehicleType: "Car",
    seasonal: "Summer"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dylan M.",
    rating: 5,
    quote: "The fitment, balance, and finish are unreal. Formula 19 transformed my RS5 in one afternoon.",
    vehicle: "Audi RS5"
  },
  {
    id: "t2",
    name: "Priya S.",
    rating: 5,
    quote: "Booked winter setup and installation in minutes. Premium service with honest recommendations.",
    vehicle: "Tesla Model Y"
  },
  {
    id: "t3",
    name: "Jake R.",
    rating: 5,
    quote: "Best tire and wheel shop in Kelowna. Fast turnaround and the gallery-worthy result speaks for itself.",
    vehicle: "Ford F-150"
  }
];

export const gallery: GalleryImage[] = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
    title: "Night Garage Detail",
    caption: "Cinematic gloss finish under red ambient lights."
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    title: "Performance Coupe Build",
    caption: "Custom rim installation and torque-calibrated balancing."
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6fd?auto=format&fit=crop&w=1400&q=80",
    title: "SUV Upgrade",
    caption: "20-inch forged setup with all-season package."
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1400&q=80",
    title: "Workshop Precision",
    caption: "Laser balancing and TPMS calibration in-house."
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
    title: "Truck Off-Road Setup",
    caption: "Aggressive tread and custom off-road rims."
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1400&q=80",
    title: "Wheel Texture Closeup",
    caption: "Premium machining details and metallic depth."
  }
];

export const defaultSettings: SiteSettings = {
  heroHeadline: "Premium Tires & Custom Wheels",
  heroSubheadline: "Performance. Style. Reliability.",
  phone: "778-999-8473",
  whatsapp: "17789998473",
  email: "formula19tires@gmail.com",
  address: "Unit 1, 715 Evans Ct, Kelowna, BC V1X 6G4",
  instagram: "https://instagram.com/formula19",
  facebook: "https://facebook.com/formula19",
  twitter: "https://x.com/formula19"
};
