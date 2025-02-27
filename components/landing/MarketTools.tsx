'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, LineChart, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function MarketTools() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Everything in one place</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            All your financial insights, tools, and data in one place. Track assets, explore
            trends, and make data-driven investment decisions with ease.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-[#1c1c1c] rounded-2xl p-8 overflow-hidden"
          >
            <div className="grid grid-cols-5 gap-4 mb-8">
              <button className="text-white bg-[#252525] px-4 py-2 rounded-lg hover:bg-[#303030] transition-colors">
                Markets
              </button>
              <button className="text-gray-400 px-4 py-2 hover:text-white transition-colors">
                Calendars
              </button>
              <button className="text-gray-400 px-4 py-2 hover:text-white transition-colors">
                Data
              </button>
              <button className="text-gray-400 px-4 py-2 hover:text-white transition-colors">
                Community
              </button>
              <button className="text-gray-400 px-4 py-2 hover:text-white transition-colors">
                Portfolio
              </button>
            </div>

            <div className="relative h-[600px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=2000&q=80"
                alt="Market Dashboard"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#252525]/80 backdrop-blur-sm p-6 rounded-xl">
                    <Globe className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Global Markets</h3>
                    <p className="text-gray-400">Track markets worldwide with real-time data and analysis</p>
                  </div>
                  <div className="bg-[#252525]/80 backdrop-blur-sm p-6 rounded-xl">
                    <LineChart className="w-8 h-8 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced Charts</h3>
                    <p className="text-gray-400">Powerful charting tools with technical indicators</p>
                  </div>
                  <div className="bg-[#252525]/80 backdrop-blur-sm p-6 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-purple-500 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Market Analysis</h3>
                    <p className="text-gray-400">Deep insights and analytics for informed decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}