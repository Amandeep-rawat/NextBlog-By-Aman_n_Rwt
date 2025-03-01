import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Welcome to NextBlog</h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
            A dynamic and feature-rich blogging platform built with Next.js, empowering users to create, edit, and engage with content effortlessly.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold">Start Your Blogging Journey Today</h2>
          <p className="mt-2 max-w-lg mx-auto text-lg">Join our community and share your thoughts with the world.</p>
         <Link href={'/dashboard'}>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button>
         </Link>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: '✍️',
    title: 'Create & Edit Blogs',
    description: 'Easily write, edit, and format articles with our rich text editor.',
  },
  {
    icon: '💬',
    title: 'Engage with Comments',
    description: 'Interact with your readers through a dynamic commenting system.',
  },
  {
    icon: '❤️',
    title: 'Like & Share',
    description: 'Show appreciation for great content and share it with others.',
  },
  {
    icon: '🔒',
    title: 'Secure Authentication',
    description: 'Sign up and log in securely with authentication features.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Track your blog’s performance with insightful analytics.',
  },
  {
    icon: '📂',
    title: 'Organized Content',
    description: 'Categorize and manage articles efficiently for better discoverability.',
  },
];

export default AboutPage;
