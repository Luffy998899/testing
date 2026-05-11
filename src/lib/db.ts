import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultSettings, gallery, products, testimonials } from "@/lib/data";
import { GalleryImage, Product, SiteSettings, Testimonial } from "@/lib/types";

type ContentStore = {
  products: Product[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  bookings: unknown[];
  inquiries: unknown[];
};

const storePath = path.join(process.cwd(), "src", "data", "content-store.json");

const seedStore: ContentStore = {
  products,
  gallery,
  testimonials,
  settings: defaultSettings,
  bookings: [],
  inquiries: []
};

let cache: ContentStore | null = null;

async function ensureStoreFile() {
  const dir = path.dirname(storePath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(seedStore, null, 2), "utf8");
  }
}

async function loadStore() {
  if (cache) return cache;

  await ensureStoreFile();
  const raw = await fs.readFile(storePath, "utf8");
  cache = JSON.parse(raw) as ContentStore;
  return cache;
}

async function saveStore(next: ContentStore) {
  cache = next;
  await fs.writeFile(storePath, JSON.stringify(next, null, 2), "utf8");
}

export const db = {
  async listProducts() {
    const store = await loadStore();
    return store.products;
  },

  async addProduct(payload: Product) {
    const store = await loadStore();
    const next = { ...store, products: [payload, ...store.products] };
    await saveStore(next);
    return payload;
  },

  async updateProduct(id: string, payload: Partial<Product>) {
    const store = await loadStore();
    const nextProducts = store.products.map((item) => (item.id === id ? { ...item, ...payload } : item));
    const updated = nextProducts.find((item) => item.id === id) || null;
    await saveStore({ ...store, products: nextProducts });
    return updated;
  },

  async deleteProduct(id: string) {
    const store = await loadStore();
    await saveStore({ ...store, products: store.products.filter((item) => item.id !== id) });
    return true;
  },

  async listGallery() {
    const store = await loadStore();
    return store.gallery;
  },

  async addGalleryItem(payload: GalleryImage) {
    const store = await loadStore();
    const next = { ...store, gallery: [payload, ...store.gallery] };
    await saveStore(next);
    return payload;
  },

  async updateGalleryItem(id: string, payload: Partial<GalleryImage>) {
    const store = await loadStore();
    const nextGallery = store.gallery.map((item) => (item.id === id ? { ...item, ...payload } : item));
    const updated = nextGallery.find((item) => item.id === id) || null;
    await saveStore({ ...store, gallery: nextGallery });
    return updated;
  },

  async deleteGalleryItem(id: string) {
    const store = await loadStore();
    await saveStore({ ...store, gallery: store.gallery.filter((item) => item.id !== id) });
    return true;
  },

  async listTestimonials() {
    const store = await loadStore();
    return store.testimonials;
  },

  async addTestimonial(payload: Testimonial) {
    const store = await loadStore();
    const next = { ...store, testimonials: [payload, ...store.testimonials] };
    await saveStore(next);
    return payload;
  },

  async updateTestimonial(id: string, payload: Partial<Testimonial>) {
    const store = await loadStore();
    const nextTestimonials = store.testimonials.map((item) => (item.id === id ? { ...item, ...payload } : item));
    const updated = nextTestimonials.find((item) => item.id === id) || null;
    await saveStore({ ...store, testimonials: nextTestimonials });
    return updated;
  },

  async deleteTestimonial(id: string) {
    const store = await loadStore();
    await saveStore({ ...store, testimonials: store.testimonials.filter((item) => item.id !== id) });
    return true;
  },

  async addBooking(payload: unknown) {
    const store = await loadStore();
    await saveStore({ ...store, bookings: [...store.bookings, payload] });
  },

  async addInquiry(payload: unknown) {
    const store = await loadStore();
    await saveStore({ ...store, inquiries: [...store.inquiries, payload] });
  },

  async listBookings() {
    const store = await loadStore();
    return store.bookings;
  },

  async listInquiries() {
    const store = await loadStore();
    return store.inquiries;
  },

  async getSettings() {
    const store = await loadStore();
    return store.settings;
  },

  async setSettings(payload: SiteSettings) {
    const store = await loadStore();
    const next = { ...store, settings: payload };
    await saveStore(next);
    return next.settings;
  }
};
