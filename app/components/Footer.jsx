'use client';
import { FaLinkedin, FaTwitter, FaGithub, FaStackoverflow } from "react-icons/fa";
import { SiWritedotas } from "react-icons/si";

export default function Footer() {
  
    return (
    <footer className = "mt-16 border-t border-green-400/30 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <span className="text-lg font-matrix text-gray-300">
                        {new Date().getFullYear()} © Suryateja Duvvuri
                    </span>
                    <div className="text-sm font-matrix text-green-400 mt-1">
                        Happy Coding 😊
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <a
                        href="https://www.linkedin.com/in/suryateja-duvvuri-22b377162/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-green-400"
                    >
                        <span className="font-matrix text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            LinkedIn
                        </span>
                        <FaLinkedin size="24" />
                    </a>
                    
                    <a
                        href="https://twitter.com/SuryatejaDuvvu1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-green-400"
                    >
                        <span className="font-matrix text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Twitter
                        </span>
                        <FaTwitter size="24" />
                    </a>
                    
                    <a
                        href="https://github.com/SuryatejaDuvvuri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-green-400"
                    >
                        <span className="font-matrix text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            GitHub
                        </span>
                         <FaGithub size="24" />
                    </a>
                     <a
                        href="https://blogproject-three.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 hover:scale-110 transition-all duration-300 text-gray-400 hover:text-green-400"
                    >
                        <span className="font-matrix text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Blog
                        </span>
                        <SiWritedotas size="24" />
                    </a>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-400/20">
                <p className="text-center text-xs font-matrix text-gray-500">
                    Built with Matrix vibes 💚
                </p>
            </div>
    
    </footer>
     
    );
  }
  