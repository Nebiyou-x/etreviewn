import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Film, Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen w-full bg-primary">
      {/* Navigation */}
      <Navbar />

      {/* Contact Page Content */}

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <Link href="/">
          <Button variant="outline" className="mb-8 text-accent border-accent bg-primary hover:bg-accent hover:text-secondary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-4xl font-bold text-accent mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-accent mb-4">Get in Touch</h2>
              <p className="text-secondary mb-6">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Email</h3>
                  <p className="text-secondary/70">info@ethioflix.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Phone</h3>
                  <p className="text-secondary/70">+251 11 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-accent/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">Address</h3>
                  <p className="text-secondary/70">Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary border border-accent rounded-2xl p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Name</label>
                <Input type="text" placeholder="Your name" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                <Input type="email" placeholder="your.email@example.com" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Subject</label>
                <Input type="text" placeholder="What's this about?" className="w-full" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full rounded-full bg-primary border border-accent px-5 py-3 text-base text-secondary placeholder-secondary shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/70 focus:border-accent transition-all duration-200 resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full bg-accent text-secondary font-bold shadow-lg hover:bg-primary hover:text-accent transition-all duration-200">
                Send Message
              </Button>
            </form>
          </div>
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
              <Link href="/terms" className="text-secondary hover:text-accent transition-colors">Terms</Link>
              <Link href="/contact" className="text-accent font-bold">Contact</Link>
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
