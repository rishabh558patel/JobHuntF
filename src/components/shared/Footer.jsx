import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-black">Job<span className="text-purple-600">Portal</span></h2>
          <p className="text-sm text-gray-500 mt-1">Find your dream job today</p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="/about" className="hover:text-purple-600 transition">About</a>
          <a href="/privacy" className="hover:text-purple-600 transition">Privacy</a>
          <a href="/terms" className="hover:text-purple-600 transition">Terms</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5 text-gray-500">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
            <FaGithub className="hover:text-purple-600" size={18} />
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
            <FaLinkedin className="hover:text-purple-600" size={18} />
          </a>
          <a href="mailto:youremail@example.com">
            <FaEnvelope className="hover:text-purple-600" size={18} />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}
