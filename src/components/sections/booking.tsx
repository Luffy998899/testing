"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const bookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  vehicle: z.string().min(2),
  tireSize: z.string().min(2),
  appointmentDate: z.string().min(1),
  notes: z.string().optional()
});

type Booking = z.infer<typeof bookingSchema>;

export function BookingSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Booking>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (values: Booking) => {
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    reset();
  };

  return (
    <section id="contact" className="px-4 py-20 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-red-300">Booking</p>
          <h2 className="font-display text-3xl text-metal">Book Tire Installation</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Full Name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-300">Name is required.</p>}
            <Input placeholder="Phone" {...register("phone")} />
            <Input placeholder="Vehicle (Year / Make / Model)" {...register("vehicle")} />
            <Input placeholder="Tire Size" {...register("tireSize")} />
            <Input type="date" {...register("appointmentDate")} />
            <Textarea rows={4} placeholder="Extra notes" {...register("notes")} />
            <Button disabled={isSubmitting} className="w-full">
              Request Appointment
            </Button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-7">
          <h3 className="font-display text-2xl text-metal">Visit Formula 19</h3>
          <p className="mt-2 text-slate-300">Unit 1, 715 Evans Ct, Kelowna, BC V1X 6G4</p>
          <p className="mt-1 text-slate-300">Phone: 778-999-8473</p>
          <p className="text-slate-300">Email: formula19tires@gmail.com</p>
          <iframe
            title="Formula 19 Map"
            src="https://maps.google.com/maps?q=715%20Evans%20Ct%20Kelowna&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="mt-5 h-72 w-full rounded-xl border border-white/15"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
