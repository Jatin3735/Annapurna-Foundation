import React from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaUtensils,
  FaUsers,
  FaBullseye,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:.6}}
            className="text-4xl md:text-5xl font-bold font-poppins"
          >
            About Annapurna Foundation
          </motion.h1>

          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            Annapurna Foundation is a non-profit organization dedicated to
            eliminating hunger by providing nutritious meals to
            underprivileged children and families while encouraging community
            participation through volunteer service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <FaBullseye className="text-accent text-5xl mb-5" />
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>

            <p className="text-gray-600 leading-8">
              To ensure that no child sleeps hungry by providing nutritious
              meals, creating awareness, and encouraging people to contribute
              towards building a hunger-free society.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <FaHandsHelping className="text-accent text-5xl mb-5" />
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>

            <p className="text-gray-600 leading-8">
              We envision a world where every individual has access to healthy
              food, equal opportunities, and compassionate support from the
              community.
            </p>
          </div>

        </div>
      </section>

      {/* What We Do */}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            What We Do
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

              <FaUtensils className="text-5xl text-accent mx-auto mb-5"/>

              <h3 className="font-bold text-xl mb-3">
                Food Distribution
              </h3>

              <p className="text-gray-600">
                Regular distribution of healthy meals to children and
                underprivileged families.
              </p>

            </div>

            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

              <FaUsers className="text-5xl text-accent mx-auto mb-5"/>

              <h3 className="font-bold text-xl mb-3">
                Volunteer Programs
              </h3>

              <p className="text-gray-600">
                Encouraging youth and citizens to participate in community
                service through volunteering.
              </p>

            </div>

            <div className="shadow-lg rounded-xl p-8 text-center hover:shadow-xl transition">

              <FaHandsHelping className="text-5xl text-accent mx-auto mb-5"/>

              <h3 className="font-bold text-xl mb-3">
                Community Support
              </h3>

              <p className="text-gray-600">
                Supporting families with food drives and awareness campaigns.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Statistics */}

      <section className="py-20 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            <div>
              <h2 className="text-5xl font-bold text-primary">500+</h2>
              <p className="mt-3 text-gray-600">Volunteers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-primary">10K+</h2>
              <p className="mt-3 text-gray-600">Meals Served</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-primary">50+</h2>
              <p className="mt-3 text-gray-600">Food Drives</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-primary">100%</h2>
              <p className="mt-3 text-gray-600">Community Support</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;