"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Film,HomeIcon,BookOpen,X,Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        fetch("/api/auth/status")
          .then((res) => res.json())
          .then((data) => {
            setIsAuthenticated(data.isAuthenticated);
            if (data.isAuthenticated && data.user) {
              setUserData(data.user);
            }
          })
          .catch(() => setIsAuthenticated(false));
      }, []);

      const handleSignOut = () => {
    fetch("/api/auth/signout", { method: "POST" })
      .then(() => {
        setIsAuthenticated(false);
        setUserData(null);
        // Optional: redirect to home page
        window.location.href = "/";
      })
      .catch(console.error);
  };

    return (
        <nav className="border-b border-accent bg-primary">
                  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Film className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                      <Link href="/" className="text-xl sm:text-2xl font-bold text-secondary">
                        Ethio<span className="text-accent">Flix</span>
                      </Link>
                    </div>
                    
                    {/* Centered Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                      <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-1 text-accent font-bold">
                          <HomeIcon className="h-4 w-4" />
                          <span>Home</span>
                        </Link>
                        <Link href="/movies" className="flex items-center space-x-1 text-secondary hover:text-accent transition-colors">
                          <Film className="h-4 w-4" />
                          <span>Movies</span>
                        </Link>
                        <Link href="/stories" className="flex items-center space-x-1 text-secondary hover:text-accent transition-colors">
                          <BookOpen className="h-4 w-4" />
                          <span>News</span>
                        </Link>
                      </div>
                    </div>
        
                    {/* Desktop Auth Links */}
                   <div className="hidden md:flex items-center space-x-4">
                               {!session && (
                                 <>
                                   <Link href="/auth/login" className="text-accent font-bold hover:underline">Sign In</Link>
                              
                                 </>
                               )}
                               {session && (
                                 <Link href="/auth/logout" className="text-accent font-bold hover:underline">
                                   Log Out
                                 </Link>
                               )}
                             </div>
        
                    {/* Mobile Menu Button */}
                    <button
                      className="md:hidden p-2 text-secondary hover:text-accent transition-colors"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
        
                  {/* Mobile Navigation */}
                  {mobileMenuOpen && (
                    <div className="md:hidden border-t border-accent bg-primary">
                      <div className="px-4 py-2 space-y-2">
                        <Link 
                          href="/" 
                          className="flex items-center space-x-2 text-accent font-bold py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <HomeIcon className="h-4 w-4" />
                          <span>Home</span>
                        </Link>
                        <Link 
                          href="/movies" 
                          className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Film className="h-4 w-4" />
                          <span>Movies</span>
                        </Link>
                        <Link 
                          href="/stories" 
                          className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors py-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>News</span>
                        </Link>
                        {isAuthenticated ? (
                          <>
                            {userData && (
                              <Link 
                                href="/profile" 
                                className="flex items-center space-x-2 text-accent font-bold py-2"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-secondary font-bold text-sm">
                                  {userData.name.charAt(0).toUpperCase()}
                                </div>
                                <span>Profile</span>
                              </Link>
                            )}
                            <button 
                              onClick={() => {
                                handleSignOut();
                                setMobileMenuOpen(false);
                              }}
                              className="flex items-center space-x-2 text-accent font-bold py-2 w-full text-left"
                            >
                              <span>Sign Out</span>
                            </button>
                          </>
                        ) : (
                          <Link 
                            href="/auth/login" 
                            className="flex items-center space-x-2 text-accent font-bold py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>Sign In</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </nav>
    );
}