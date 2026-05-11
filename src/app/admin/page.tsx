import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { db } from "@/lib/db";

export default async function AdminPage() {
  const [initialProducts, initialSettings, initialGallery, initialTestimonials] = await Promise.all([
    db.listProducts(),
    db.getSettings(),
    db.listGallery(),
    db.listTestimonials()
  ]);

  return (
    <AdminDashboard
      initialProducts={initialProducts}
      initialSettings={initialSettings}
      initialGallery={initialGallery}
      initialTestimonials={initialTestimonials}
    />
  );
}
