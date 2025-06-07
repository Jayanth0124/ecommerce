import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react';
import { HeroPhone } from '../components/3d/HeroPhone';
import { PhoneCard } from '../components/ui/PhoneCard';
import { phones } from '../data/phones';

export const Home: React.FC = () => {
  const featuredPhones = phones.slice(0, 4);
  const topRatedPhones = phones.filter(phone => phone.rating >= 4.5).slice(0, 3);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-950 to-secondary-900/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full px-4 py-2"
                >
                  <Zap className="w-4 h-4 text-primary-400" />
                  <span className="text-primary-400 text-sm font-medium">Premium Mobile Experience</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold"
                >
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Future of
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                    Mobile Tech
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 max-w-md leading-relaxed"
                >
                  Discover cutting-edge smartphones with premium features, exceptional performance  .
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/phones"
                  className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105"
                >
                  <span>Explore Phones</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  to="/phones?category=flagship"
                  className="inline-flex items-center justify-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  <span>View Flagship</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { label: 'Premium Brands', value: '10+' },
                  { label: 'Latest Models', value: '100+' },
                  { label: 'Happy Customers', value: '50K+' },
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* 3D Phone */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-[600px]"
            >
              <HeroPhone />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Aurora Mobile Hub?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience premium mobile shopping with unmatched service and quality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Authentic Products',
                description: 'All phones are genuine with official warranty and quality assurance.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Free shipping on orders above $500 with express delivery options.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Star,
                title: 'Expert Support',
                description: '24/7 customer support with technical assistance and guidance.',
                color: 'from-purple-500 to-pink-500'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Phones */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Featured Collection</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Handpicked premium smartphones with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPhones.map((phone, index) => (
              <PhoneCard key={phone.id} phone={phone} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/phones"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105"
            >
              <span>View All Phones</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Top Rated Phones</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Customer favorites with exceptional ratings and reviews
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {topRatedPhones.map((phone, index) => (
              <PhoneCard key={phone.id} phone={phone} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};