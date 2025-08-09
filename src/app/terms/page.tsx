import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Film } from 'lucide-react';
import { Navbar } from "@/components/Navbar";

export default function TermsPage() {
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
        
        <h1 className="text-4xl font-bold text-accent mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-secondary space-y-6">
          <p className="text-sm text-secondary/70 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using EthioFlix, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">User Accounts</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">User Content</h2>
          <p>
            Users may post reviews, ratings, and comments. By posting content, you grant us 
            a non-exclusive license to use, modify, and display such content on our platform.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Prohibited Uses</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Posting offensive, defamatory, or inappropriate content</li>
            <li>Attempting to gain unauthorized access to our systems</li>
            <li>Using the service for any illegal purposes</li>
            <li>Spamming or harassing other users</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Limitation of Liability</h2>
          <p>
            EthioFlix shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your use of the service.
          </p>
          
          <h2 className="text-2xl font-bold text-accent mt-8 mb-4">Contact Us</h2>
          <p>
            If you have questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@ethioflix.com" className="text-accent hover:underline">
              legal@ethioflix.com
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
              <Link href="/privacy" className="text-secondary hover:text-accent transition-colors">Privacy</Link>
              <Link href="/terms" className="text-accent font-bold">Terms</Link>
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
