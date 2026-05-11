import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappProductMessage(params: {
  name: string;
  size: string;
  price: string;
}) {
  const text = `Hi Formula 19, I'm interested in:%0AProduct: ${params.name}%0ASize: ${params.size}%0APrice: ${params.price}`;
  return `https://wa.me/17789998473?text=${text}`;
}

export function whatsappSimpleMessage(message: string) {
  return `https://wa.me/17789998473?text=${encodeURIComponent(message)}`;
}
