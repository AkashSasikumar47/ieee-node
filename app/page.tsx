"use client";

import React from 'react';
import Head from 'next/head';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import '../app/globals.css';

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>AR-ONE | Lead Management</title>
        <meta name="description" content="Streamline your corporate catering workflow with AR-ONE, the ultimate SaaS solution for managing leads, tracking performance, sending mass emails, and boosting conversions. Import your data seamlessly and grow your business with ease." />
        <meta name="keywords" content="AR-ONE, corporate catering, lead management, SaaS, analytics, email marketing, workflow automation, catering software" />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>

      <Navbar />
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;