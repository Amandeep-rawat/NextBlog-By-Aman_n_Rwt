import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

const BlogFooter = () => {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 py-6 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        {/* Branding Section */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">NextBlog</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            Your go-to platform for insightful articles and analytics.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
          <nav className="flex flex-col space-y-1">
            <Link href="/articles" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Articles
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              About
            </Link>
            <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </Link>
            <Link href="/createarticle" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Create Article
            </Link>
            <Link href="/comments" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Comments
            </Link>
            <Link href="/analytics" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} NextBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default BlogFooter;