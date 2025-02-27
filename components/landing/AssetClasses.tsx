'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bitcoin, LineChart, DollarSign, BarChart4, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const assetClasses = [
  {
    title: "Crypto",
    icon: <Bitcoin className="w-8 h-8 text-white" />,
    description: "Track cryptocurrency prices, trends, and performance.",
    examples: [
      { symbol: "BTC", price: "$58,934.00" },
      { symbol: "ETH", price: "$2,678.00" }
    ],
    chartImage: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Indices",
    icon: <LineChart className="w-8 h-8 text-white" />,
    description: "Monitor global indices to gauge market health.",
    examples: [
      { symbol: "S&P 500", price: "5,648.40", change: "+0.44%" }
    ],
    chartImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "ETF's",
    icon: <BarChart4 className="w-8 h-8 text-white" />,
    description: "Analyze diverse exchange-traded funds across sectors.",
    examples: [],
    chartImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Currencies",
    icon: <DollarSign className="w-8 h-8 text-white" />,
    description: "Track currency exchange rates and trends across global markets.",
    examples: [],
    chartImage: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80"
  }
];

export default function AssetClasses() {
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
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Asset classes</h2>
          <p className="text-xl text-gray-400">
            Explore popular asset classes and get insights tailored to your investment needs.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {assetClasses.map((asset, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#1c1c1c] rounded-2xl p-6 hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-[#252525] p-3 rounded-xl">
                    {asset.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{asset.title}</h3>
                <p className="text-gray-400 mb-6">{asset.description}</p>
                {asset.examples.map((example, i) => (
                  <div key={i} className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">{example.symbol}</span>
                    <span className="text-white">{example.price}</span>
                  </div>
                ))}
                <div className="relative h-24 mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={asset.chartImage}
                    alt={`${asset.title} Chart`}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
            <button className="p-2 bg-[#252525] rounded-full text-white hover:bg-[#303030] transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
            <button className="p-2 bg-[#252525] rounded-full text-white hover:bg-[#303030] transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}