"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Testimonial } from "@/lib/types";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data.data || []));
  }, []);

  return (
    <section id="testimonials" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.22em] text-red-300">Testimonials</p>
        <h2 className="font-display text-3xl text-metal md:text-5xl">Loved by Kelowna Drivers</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 4200 }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          className="mt-8"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="glass rounded-2xl p-8">
                <p className="mb-4 text-red-300">{"★".repeat(item.rating)}</p>
                <p className="text-xl leading-relaxed text-slate-100">“{item.quote}”</p>
                <p className="mt-5 text-slate-300">
                  {item.name} • {item.vehicle}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
