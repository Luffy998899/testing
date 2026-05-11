import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  category: z.enum(["Tires", "Custom Rims", "Packages", "Seasonal Deals"]),
  brand: z.string().min(2),
  size: z.string().min(2),
  specs: z.string().min(2),
  price: z.number().positive(),
  inStock: z.boolean(),
  featured: z.boolean(),
  onSale: z.boolean(),
  image: z.string().url(),
  vehicleType: z.enum(["Car", "SUV", "Truck"]),
  seasonal: z.enum(["All Season", "Summer", "Winter"])
});

export const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  vehicle: z.string().min(2),
  tireSize: z.string().min(2),
  appointmentDate: z.string().min(1),
  notes: z.string().optional()
});

export const settingsSchema = z.object({
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string().email(),
  address: z.string(),
  instagram: z.string().url(),
  facebook: z.string().url(),
  twitter: z.string().url()
});

export const gallerySchema = z.object({
  image: z.string().url(),
  title: z.string().min(2),
  caption: z.string().min(2)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1).max(5),
  quote: z.string().min(8),
  vehicle: z.string().min(2)
});
