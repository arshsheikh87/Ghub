import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="text-[10rem] font-black leading-none bg-clip-text text-transparent bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] mb-4">
          404
        </div>
        <h1 className="text-3xl font-black text-white mb-4">Page Not Found</h1>
        <p className="text-white/60 mb-10 text-lg">
          Looks like you wandered off the map. Let&apos;s get you back to the game.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-sm font-bold text-white bg-[linear-gradient(135deg,#8b5cf6,#00d4ff)] hover:brightness-110 transition-all">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/booking" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl text-sm font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            Book a Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
