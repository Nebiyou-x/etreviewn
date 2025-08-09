import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from 'lucide-react';
import { Navbar } from "@/components/Navbar";


export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-primary">
      <Navbar />
      {/* Navigation */}
      

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/">
          <Button variant="outline" className="mb-8 text-accent border-accent bg-primary hover:bg-accent hover:text-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-accent mb-8">About EthioFlix</h1>
        
        <div className="prose prose-invert max-w-none text-secondary space-y-6">
          <p className="text-lg">
            EthioFlix is the premier destination for Ethiopian cinema enthusiasts. We are dedicated to celebrating, 
            preserving, and promoting the rich tradition of Ethiopian filmmaking.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Our Mission</h2>
          <p>
            To create a comprehensive platform where Ethiopian movies can be discovered, reviewed, and appreciated 
            by audiences worldwide. We believe in the power of storytelling and the unique perspective that 
            Ethiopian cinema brings to the global film landscape.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Comprehensive database of Ethiopian movies</li>
            <li>User reviews and ratings</li>
            <li>Latest news from the Ethiopian film industry</li>
            <li>Information about directors, actors, and crew</li>
            <li>Community-driven content and discussions</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you. Reach out to us at{" "}
            <a href="mailto:info@ethioflix.com" className="text-accent hover:underline">
              info@ethioflix.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-accent py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-accent" />
              <h4 className="text-xl font-bold text-secondary">Ethio<span className="text-accent">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-accent font-bold">About</Link>
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
    </div>
  );
}
