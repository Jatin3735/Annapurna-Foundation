import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchId, setSearchId] = useState('');
  const [authorities, setAuthorities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch authorities
    const fetchAuthorities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/authorities');
        if (response.ok) {
          const data = await response.json();
          // Fallback if no authorities in DB yet
          if (data.length === 0) {
            setAuthorities([
              { _id: '1', name: 'John Doe', designation: 'President', description: 'Leading the foundation with a vision for a hunger-free world.', photoUrl: '/images/authority1.png' },
              { _id: '2', name: 'Jane Smith', designation: 'Secretary', description: 'Managing daily operations and volunteer coordination.', photoUrl: '/images/authority1.png' },
            ]);
          } else {
            setAuthorities(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch authorities', error);
      }
    };
    fetchAuthorities();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchId) return;
    navigate(`/verify/${encodeURIComponent(searchId)}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero.png" alt="Food Distribution" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <motion.div
          className="relative z-10 max-w-4xl px-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-poppins">
            Together We Can End Child Hunger
          </h1>
          <p className="text-xl text-gray-200 mb-8 font-inter">
            Join the Annapurna Foundation in our mission to provide nutritious meals to underprivileged children. Every hand helps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/gallery" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition">
              Gallery
            </Link>
            <Link to="/register" className="bg-accent text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1">
              Become Volunteer
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Foundation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-bold text-primary mb-6 font-poppins">About Annapurna Foundation</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that no child should go to bed hungry. The Annapurna Foundation is a registered non-profit organization dedicated to serving hot, nutritious meals to children in need.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-accent text-xl">Our Mission</h3>
                  <p className="text-gray-600">To eradicate child hunger through sustainable community-driven food distribution programs.</p>
                </div>
                <div>
                  <h3 className="font-bold text-accent text-xl">Our Vision</h3>
                  <p className="text-gray-600">A world where every child has access to adequate nutrition to grow, learn, and thrive.</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <img src="/images/gallery1.png" alt="About Us" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Authorities */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-3xl font-bold text-primary mb-12 font-poppins">
            Our Authorities
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {authorities.map((auth, index) => (
              <motion.div
                key={auth._id || index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } } }}
                className="bg-cards rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <img src={auth.photoUrl} alt={auth.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100" />
                <h3 className="text-xl font-bold text-primary mb-1">{auth.name}</h3>
                <p className="text-accent font-medium mb-3">{auth.designation}</p>
                <p className="text-gray-600 text-sm">{auth.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-3xl font-bold text-primary font-poppins">Our Impact in Action</h2>
              <p className="text-gray-600 mt-2">Glimpses of our recent food distribution events.</p>
            </motion.div>
            <Link to="/gallery" className="hidden sm:inline-block text-accent font-semibold hover:underline">View All Gallery &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hardcoded preview cards as per requirement */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-cards rounded-2xl overflow-hidden shadow-lg group">
              <div className="relative h-64 overflow-hidden">
                <img src="/images/gallery1.png" alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>📍 City Slums</span>
                  <span>📅 Oct 15, 2025</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Weekend Food Drive</h3>
                <p className="text-gray-600">Provided over 500 meals to children in the local community.</p>
              </div>
            </motion.div>
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/gallery" className="text-accent font-semibold hover:underline">View All Gallery &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Volunteer Verification */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6 font-poppins">Verify Volunteer</h2>
            <p className="text-white mb-8">Enter the Registration Number to verify an approved volunteer of Annapurna Foundation.</p>

            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="text"
                placeholder="e.g. AF/2026/1463"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="bg-accent px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
              >
                Verify
              </button>
            </form>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
