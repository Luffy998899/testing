import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [products, bookings, inquiries] = await Promise.all([db.listProducts(), db.listBookings(), db.listInquiries()]);

  return NextResponse.json({
    data: {
      products: products.length,
      bookings: bookings.length,
      inquiries: inquiries.length,
      conversionRate: 18.2,
      monthlyLeads: 147
    }
  });
}
