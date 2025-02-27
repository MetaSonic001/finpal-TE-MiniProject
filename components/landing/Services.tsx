'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LineChart, Wallet, Shield, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <LineChart className="w-12 h-12 text-blue-600" />,
      title: "Financial Analytics",
      description: "Get detailed insights into your business finances with our advanced analytics tools.",
      features: ["Real-time tracking", "Custom reports", "Trend analysis"]
    },
    {
      icon: <Wallet className="w-12 h-12 text-blue-600" />,
      title: "Payment Processing",
      description: "Secure and efficient payment processing solutions for your business needs.",
      features: ["Multiple currencies", "Instant transfers", "Low fees"]
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Security First",
      description: "Bank-grade security measures to protect your financial data and transactions.",
      features: ["End-to-end encryption", "Fraud detection", "24/7 monitoring"]
    }
  ];

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
    <section id="services" className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Powerful Financial Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience comprehensive financial management tools designed to streamline your business operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-6 p-3 bg-blue-50 rounded-2xl inline-block">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Learn more <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}