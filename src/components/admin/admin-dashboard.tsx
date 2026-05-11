"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GalleryImage, Product, SiteSettings, Testimonial } from "@/lib/types";

type Analytics = {
  products: number;
  bookings: number;
  inquiries: number;
  conversionRate: number;
  monthlyLeads: number;
};

export function AdminDashboard({
  initialProducts,
  initialSettings,
  initialGallery,
  initialTestimonials
}: {
  initialProducts: Product[];
  initialSettings: SiteSettings;
  initialGallery: GalleryImage[];
  initialTestimonials: Testimonial[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [settings, setSettings] = useState(initialSettings);
  const [galleryItems, setGalleryItems] = useState(initialGallery);
  const [testimonialItems, setTestimonialItems] = useState(initialTestimonials);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "Custom Rims",
    brand: "",
    size: "",
    specs: "",
    price: 0,
    inStock: true,
    featured: false,
    onSale: false,
    image: "",
    vehicleType: "Car",
    seasonal: "All Season"
  });

  const [newGalleryItem, setNewGalleryItem] = useState({
    image: "",
    title: "",
    caption: ""
  });

  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    rating: 5,
    quote: "",
    vehicle: ""
  });

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data.data));
  }, []);

  async function refreshProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.data || []);
  }

  async function refreshGallery() {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setGalleryItems(data.data || []);
  }

  async function refreshTestimonials() {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonialItems(data.data || []);
  }

  async function toggleFeatured(id: string, featured: boolean) {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured })
    });
    await refreshProducts();
  }

  async function addProduct() {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });
    setNewProduct({
      name: "",
      category: "Custom Rims",
      brand: "",
      size: "",
      specs: "",
      price: 0,
      inStock: true,
      featured: false,
      onSale: false,
      image: "",
      vehicleType: "Car",
      seasonal: "All Season"
    });
    await refreshProducts();
  }

  async function updateProduct(id: string, payload: Partial<Product>) {
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    await refreshProducts();
  }

  async function deleteProduct(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await refreshProducts();
  }

  async function addGalleryItem() {
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGalleryItem)
    });
    setNewGalleryItem({ image: "", title: "", caption: "" });
    await refreshGallery();
  }

  async function updateGalleryItem(id: string, payload: Partial<GalleryImage>) {
    await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    await refreshGallery();
  }

  async function deleteGalleryItem(id: string) {
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    await refreshGallery();
  }

  async function addTestimonial() {
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTestimonial)
    });
    setNewTestimonial({ name: "", rating: 5, quote: "", vehicle: "" });
    await refreshTestimonials();
  }

  async function updateTestimonial(id: string, payload: Partial<Testimonial>) {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    await refreshTestimonials();
  }

  async function deleteTestimonial(id: string) {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    await refreshTestimonials();
  }

  async function saveSettings() {
    setIsSavingSettings(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });
    setIsSavingSettings(false);
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Products", analytics?.products ?? 0],
          ["Bookings", analytics?.bookings ?? 0],
          ["Inquiries", analytics?.inquiries ?? 0],
          ["Conversion", `${analytics?.conversionRate ?? 0}%`],
          ["Monthly Leads", analytics?.monthlyLeads ?? 0]
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-bold text-metal">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
        <h2 className="font-display text-2xl text-metal">Product Management</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-4">
          <Input placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))} />
          <Input placeholder="Brand" value={newProduct.brand} onChange={(e) => setNewProduct((prev) => ({ ...prev, brand: e.target.value }))} />
          <Input placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct((prev) => ({ ...prev, image: e.target.value }))} />
          <Input placeholder="Specs" value={newProduct.specs} onChange={(e) => setNewProduct((prev) => ({ ...prev, specs: e.target.value }))} />
          <Input placeholder="Size" value={newProduct.size} onChange={(e) => setNewProduct((prev) => ({ ...prev, size: e.target.value }))} />
          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number(e.target.value || 0) }))}
          />
          <select
            className="rounded-md border border-white/20 bg-white/5 px-3"
            value={newProduct.category}
            onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value as Product["category"] }))}
          >
            <option value="Tires">Tires</option>
            <option value="Custom Rims">Custom Rims</option>
            <option value="Packages">Packages</option>
            <option value="Seasonal Deals">Seasonal Deals</option>
          </select>
          <select
            className="rounded-md border border-white/20 bg-white/5 px-3"
            value={newProduct.vehicleType}
            onChange={(e) => setNewProduct((prev) => ({ ...prev, vehicleType: e.target.value as Product["vehicleType"] }))}
          >
            <option value="Car">Car</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
          </select>
          <select
            className="rounded-md border border-white/20 bg-white/5 px-3"
            value={newProduct.seasonal}
            onChange={(e) => setNewProduct((prev) => ({ ...prev, seasonal: e.target.value as Product["seasonal"] }))}
          >
            <option value="All Season">All Season</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={newProduct.inStock} onChange={(e) => setNewProduct((prev) => ({ ...prev, inStock: e.target.checked }))} /> In stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={newProduct.featured} onChange={(e) => setNewProduct((prev) => ({ ...prev, featured: e.target.checked }))} /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={newProduct.onSale} onChange={(e) => setNewProduct((prev) => ({ ...prev, onSale: e.target.checked }))} /> On sale
          </label>
          <Button onClick={addProduct}>Add Product</Button>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2">Product</th>
                <th className="py-2">Brand</th>
                <th className="py-2">Price</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Featured</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5">
                  <td className="py-3">
                    <Input
                      value={product.name}
                      onChange={(e) => setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, name: e.target.value } : item)))}
                    />
                  </td>
                  <td>
                    <Input
                      value={product.brand}
                      onChange={(e) => setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, brand: e.target.value } : item)))}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={product.price}
                      onChange={(e) => setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, price: Number(e.target.value || 0) } : item)))}
                    />
                  </td>
                  <td>{product.inStock ? "In" : "Out"}</td>
                  <td>
                    <button
                      className={`rounded-full px-3 py-1 text-xs ${product.featured ? "bg-accent/20 text-red-300" : "bg-white/10"}`}
                      onClick={() => toggleFeatured(product.id, product.featured)}
                    >
                      {product.featured ? "Featured" : "Set Featured"}
                    </button>
                  </td>
                  <td className="space-x-2">
                    <Button variant="outline" onClick={() => updateProduct(product.id, product)}>
                      Save
                    </Button>
                    <Button variant="ghost" onClick={() => deleteProduct(product.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
        <h2 className="font-display text-2xl text-metal">CMS Settings Editor</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input
            value={settings.heroHeadline}
            onChange={(e) => setSettings((prev) => ({ ...prev, heroHeadline: e.target.value }))}
            placeholder="Hero headline"
          />
          <Input
            value={settings.heroSubheadline}
            onChange={(e) => setSettings((prev) => ({ ...prev, heroSubheadline: e.target.value }))}
            placeholder="Hero subheadline"
          />
          <Input value={settings.phone} onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))} />
          <Input value={settings.email} onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))} />
          <Input value={settings.whatsapp} onChange={(e) => setSettings((prev) => ({ ...prev, whatsapp: e.target.value }))} />
          <Input value={settings.instagram} onChange={(e) => setSettings((prev) => ({ ...prev, instagram: e.target.value }))} />
          <Input value={settings.facebook} onChange={(e) => setSettings((prev) => ({ ...prev, facebook: e.target.value }))} />
          <Input value={settings.twitter} onChange={(e) => setSettings((prev) => ({ ...prev, twitter: e.target.value }))} />
          <Input value={settings.address} onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))} className="md:col-span-2" />
        </div>
        <Button className="mt-4" onClick={saveSettings} disabled={isSavingSettings}>
          {isSavingSettings ? "Saving..." : "Save CMS Settings"}
        </Button>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
          <h3 className="font-display text-xl text-metal">Gallery Management</h3>
          <p className="mt-1 text-sm text-slate-400">Upload, edit, and remove landing-page gallery images.</p>
          <div className="mt-4 grid gap-2">
            <Input placeholder="Image URL" value={newGalleryItem.image} onChange={(e) => setNewGalleryItem((prev) => ({ ...prev, image: e.target.value }))} />
            <Input placeholder="Title" value={newGalleryItem.title} onChange={(e) => setNewGalleryItem((prev) => ({ ...prev, title: e.target.value }))} />
            <Input placeholder="Caption" value={newGalleryItem.caption} onChange={(e) => setNewGalleryItem((prev) => ({ ...prev, caption: e.target.value }))} />
            <Button onClick={addGalleryItem}>Add Gallery Item</Button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {galleryItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2">
                <div className="grid flex-1 gap-2 md:grid-cols-3">
                  <Input value={item.title} onChange={(e) => setGalleryItems((prev) => prev.map((g) => (g.id === item.id ? { ...g, title: e.target.value } : g)))} />
                  <Input value={item.caption} onChange={(e) => setGalleryItems((prev) => prev.map((g) => (g.id === item.id ? { ...g, caption: e.target.value } : g)))} />
                  <Input value={item.image} onChange={(e) => setGalleryItems((prev) => prev.map((g) => (g.id === item.id ? { ...g, image: e.target.value } : g)))} />
                </div>
                <div className="ml-2 flex gap-2">
                  <Button variant="outline" onClick={() => updateGalleryItem(item.id, item)}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={() => deleteGalleryItem(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
          <h3 className="font-display text-xl text-metal">Testimonials Management</h3>
          <p className="mt-1 text-sm text-slate-400">Add, edit, and remove testimonials shown on landing page.</p>
          <div className="mt-4 grid gap-2">
            <Input placeholder="Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial((prev) => ({ ...prev, name: e.target.value }))} />
            <Input placeholder="Vehicle" value={newTestimonial.vehicle} onChange={(e) => setNewTestimonial((prev) => ({ ...prev, vehicle: e.target.value }))} />
            <Input placeholder="Quote" value={newTestimonial.quote} onChange={(e) => setNewTestimonial((prev) => ({ ...prev, quote: e.target.value }))} />
            <Input
              type="number"
              min={1}
              max={5}
              placeholder="Rating"
              value={newTestimonial.rating}
              onChange={(e) => setNewTestimonial((prev) => ({ ...prev, rating: Number(e.target.value || 5) }))}
            />
            <Button onClick={addTestimonial}>Add Testimonial</Button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            {testimonialItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2">
                <div className="grid flex-1 gap-2 md:grid-cols-4">
                  <Input value={item.name} onChange={(e) => setTestimonialItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, name: e.target.value } : t)))} />
                  <Input value={item.vehicle} onChange={(e) => setTestimonialItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, vehicle: e.target.value } : t)))} />
                  <Input value={item.quote} onChange={(e) => setTestimonialItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, quote: e.target.value } : t)))} />
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={item.rating}
                    onChange={(e) => setTestimonialItems((prev) => prev.map((t) => (t.id === item.id ? { ...t, rating: Number(e.target.value || 5) } : t)))}
                  />
                </div>
                <div className="ml-2 flex gap-2">
                  <Button variant="outline" onClick={() => updateTestimonial(item.id, item)}>
                    Save
                  </Button>
                  <Button variant="ghost" onClick={() => deleteTestimonial(item.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/15 bg-white/[0.02] p-5">
        <h3 className="font-display text-xl text-metal">Homepage Banners & SEO Modules</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Hero Banner Text",
            "Promotion Ribbon",
            "Section Order",
            "Meta SEO Templates",
            "Social Media Links",
            "WhatsApp Number",
            "Business Hours",
            "Call CTA Labels"
          ].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
