import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-4 z-[60] grid gap-3 md:right-8">
      <a
        href="https://wa.me/17789998473"
        target="_blank"
        rel="noreferrer"
        className="grid h-12 w-12 place-items-center rounded-full bg-green-500 text-white shadow-[0_8px_26px_rgba(34,197,94,0.5)]"
      >
        <MessageCircle size={20} />
      </a>
      <a
        href="tel:+17789998473"
        className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-[0_8px_26px_rgba(217,0,0,0.5)]"
      >
        <Phone size={20} />
      </a>
    </div>
  );
}
