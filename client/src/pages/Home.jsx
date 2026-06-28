import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchId, setSearchId] = useState('');
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fallbackAuthorities = [
    { _id: '1', name: 'John Doe', designation: 'President', description: 'Leading the foundation with a vision for a hunger-free world.', photoUrl: '/images/authority1.png' },
    { _id: '2', name: 'Jane Smith', designation: 'Secretary', description: 'Managing daily operations and volunteer coordination.', photoUrl: '/images/authority1.png' },
  ];

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authorities`);
        if (response.ok) {
          const data = await response.json();
          setAuthorities(data.length > 0 ? data : fallbackAuthorities);
        } else {
          setAuthorities(fallbackAuthorities);
        }
      } catch (error) {
        console.error('Failed to fetch authorities', error);
        setAuthorities(fallbackAuthorities);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthorities();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    navigate(`/verify/${encodeURIComponent(searchId.trim())}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Food Distribution" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1920x1080/4CAF50/ffffff?text=Annapurna+Foundation';
            }}
          />
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <motion.div
          className="relative z-10 max-w-4xl px-4 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 font-poppins leading-tight">
            Together We Can End Child Hunger
          </h1>
          <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 font-inter px-2">
            Join the Annapurna Foundation in our mission to provide nutritious meals to underprivileged children. Every hand helps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link to="/gallery" className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition text-sm sm:text-base">
              Gallery
            </Link>
            <Link to="/register" className="bg-accent text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1 text-sm sm:text-base">
              Become Volunteer
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Foundation */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 font-poppins">
                About Annapurna Foundation
              </h2>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                We believe that no child should go to bed hungry. The Annapurna Foundation is a registered non-profit organization dedicated to serving hot, nutritious meals to children in need.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-bold text-accent text-lg sm:text-xl">Our Mission</h3>
                  <p className="text-gray-600 text-sm sm:text-base">To eradicate child hunger through sustainable community-driven food distribution programs.</p>
                </div>
                <div>
                  <h3 className="font-bold text-accent text-lg sm:text-xl">Our Vision</h3>
                  <p className="text-gray-600 text-sm sm:text-base">A world where every child has access to adequate nutrition to grow, learn, and thrive.</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <img 
                src="/images/gallery1.png" 
                alt="About Us" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/4CAF50/ffffff?text=About+Us';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Authorities */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeIn} 
            className="text-2xl sm:text-3xl font-bold text-primary mb-8 sm:mb-12 font-poppins"
          >
            Our Authorities
          </motion.h2>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-cards rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 bg-gray-200"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {authorities.map((auth, index) => (
                <motion.div
                  key={auth._id || index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{ 
                    hidden: { opacity: 0, y: 20 }, 
                    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } } 
                  }}
                  className="bg-cards rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                >
                  <img 
                    src={auth.photoUrl || '/images/default-avatar.png'} 
                    alt={auth.name} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128x128/4CAF50/ffffff?text=Avatar';
                    }}
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{auth.name}</h3>
                  <p className="text-accent font-medium text-sm sm:text-base mb-3">{auth.designation}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{auth.description}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary font-poppins">Our Impact in Action</h2>
              <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Glimpses of our recent food distribution events.</p>
            </motion.div>
            <Link to="/gallery" className="mt-4 sm:mt-0 text-accent font-semibold hover:underline text-sm sm:text-base">
              View All Gallery &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[1, 2].map((item) => (
              <motion.div 
                key={item}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeIn} 
                className="bg-cards rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img 
                    src={`/images/gallery${item}.png`} 
                    alt={`Event ${item}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400/4CAF50/ffffff?text=Event+Image';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap justify-between text-xs sm:text-sm text-gray-500 mb-2">
                    <span>📍 {item === 1 ? 'City Slums' : 'Rural Village'}</span>
                    <span>📅 {item === 1 ? 'Oct 15, 2025' : 'Nov 20, 2025'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                    {item === 1 ? 'Weekend Food Drive' : 'Community Kitchen Program'}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {item === 1 
                      ? 'Provided over 500 meals to children in the local community.' 
                      : 'Served hot meals to 300+ children in remote areas.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Verification */}
      <section className="py-12 sm:py-20 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-poppins">
              Verify Volunteer
            </h2>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base px-4">
              Enter the Registration Number to verify an approved volunteer of Annapurna Foundation.
            </p>

            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto px-4">
              <input
                type="text"
                placeholder="e.g. AF/2026/1463"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="flex-grow px-4 py-3 rounded-full text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
                required
              />
              <button
                type="submit"
                className="bg-accent px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition text-sm sm:text-base"
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