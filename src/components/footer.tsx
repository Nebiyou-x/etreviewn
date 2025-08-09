import Link from "next/link";
import { Film } from "lucide-react";
export const Footer = () => {
    return (
<>
<footer className="border-t border-accent py-8 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Film className="h-6 w-6 text-accent" />
                <h4 className="text-xl font-bold text-secondary">Ethio<span className="text-accent">Flix</span></h4>
              </div>
              <div className="flex space-x-6">
                <Link href="/about" className="text-secondary hover:text-accent transition-colors">About</Link>
                <Link href="/privacy" className="text-secondary hover:text-accent transition-colors">Privacy</Link>
                <Link href="/terms" className="text-secondary hover:text-accent transition-colors">Terms</Link>
                <Link href="/contact" className="text-secondary hover:text-accent transition-colors">Contact</Link>
              </div>
            </div>
            <p className="text-center text-secondary mt-8">
              © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
            </p>
          </div>
        </footer>
</>
    )
}