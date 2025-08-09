import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from 'lucide-react';
import { Navbar } from "@/components/Navbar";


export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full bg-primary">
      {/* Navigation */}
      <Navbar/>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/">
          <Button variant="outline" className="mb-8 text-accent border-accent bg-primary hover:bg-accent hover:text-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-accent mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-secondary space-y-6">
          <p className="text-sm text-secondary/70 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, 
            write reviews, or contact us for support.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To provide and maintain our services</li>
            <li>To personalize your experience</li>
            <li>To communicate with you about updates and features</li>
            <li>To improve our platform and user experience</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@ethioflix.com" className="text-accent hover:underline">
              privacy@ethioflix.com
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
              <Link href="/about" className="text-secondary hover:text-accent transition-colors">About</Link>
              <Link href="/privacy" className="text-accent font-bold">Privacy</Link>
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
