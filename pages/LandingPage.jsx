import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import HostelCard from "../src/components/HostelCard";
import { API_URL } from "../src/config.js";
import { FaSearch, FaWhatsapp, FaBalanceScale } from "react-icons/fa";

const STEPS = [
  {
    icon: <FaSearch className="text-[#4d31c7]"/>,
    title: "Search",
    text: "Filter by location, budget, room type and facilities.",
  },
  {
    icon: <FaBalanceScale className="text-[#4d31c7]"/>,
    title: "Compare",
    text: "See photos, rent and what each place offers, all in one spot.",
  },
  {
    icon: <FaWhatsapp className="text-[#4d31c7] stroke-2"/>,
    title: "Message the agent",
    text: "Like a place? Chat the agent on WhatsApp and arrange an inspection.",
  },
];

const textVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const LandingPage = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/api/hostels`);
        const json = await res.json();
        if (json.success) setFeatured(json.data.slice(0, 3));
        console.log(json.data);
      } catch {
        // the landing page still works without the featured row
      }
    };
    loadFeatured();
  }, []);
  return (
    <div>
      {/* Hero */}
      <section className="bg-linear-to-br from-[rgb(35,30,72)] via-[rgb(69,60,141)] to-[rgb(110,98,200)] text-white min-h-dvh">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 font-poppins text-xs font-semibold backdrop-blur"
          >
            Student accommodation, simplified
          </motion.p>
          <motion.h1
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="text-4xl font-extrabold leading-tight sm:text-6xl"
          >
            Find a place you
            <br />
            can call home.
          </motion.h1>
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="mx-auto max-sm:text-sm font-poppins mt-5 max-w-xl text-md text-white/80"
          >
            Stop chasing agents across WhatsApp groups. Browse hostels near your
            campus, compare rent and facilities, then reach the agent directly.
          </motion.p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <motion.button
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              onClick={() => navigate("/hostels")}
              className="w-full font-poppins text-sm hover:-translate-y-1 cursor-pointer rounded-xl bg-white px-8 py-3 font-bold text-[rgb(69,60,141)] transition hover:bg-gray-100 sm:w-auto"
            >
              Browse hostels
            </motion.button>
            <motion.button
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.9 }}
              onClick={() => navigate("/list")}
              className="w-full font-poppins text-sm rounded-xl border hover:shadow-pink-400 hover:shadow-md cursor-pointer border-white/40 px-8 py-3 font-bold text-white transition hover:bg-white/10 hover:-translate-y-1 sm:w-auto"
            >
              I'm an agent, list a hostel
            </motion.button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 1, once: true }}
          className="text-center font-poppins text-3xl font-bold text-gray-900"
        >
          How it works
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 1, once: true }}
              key={step.title}
              className="rounded-2xl cursor-pointer hover:shadow-lg bg-white p-6 text-center shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(69,60,141)]/10 text-2xl">
                {step.icon}
              </div>
              <p className="mt-4 font-jakarta text-xs font-bold uppercase tracking-wide text-[rgb(69,60,141)]">
                Step {index + 1}
              </p> 
              <h3 className="mt-1 font-poppins text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 font-poppins text-sm text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl max-sm:text-2xl font-bold font-poppins text-gray-900">
              Featured hostels
            </h2>
            <Link
              to="/hostels"
              className="text-sm font-poppins font-semibold text-[#453c8d] hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((hostel) => (
              <HostelCard key={hostel._id} hostel={hostel} />
            ))}
          </div>
        </section>
      )}

      {/* Agent CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-3xl bg-[rgb(69,60,141)]/10 px-6 py-12 text-center">
          <h2 className="text-2xl font-poppins font-bold text-gray-900 sm:text-3xl">
            Got a vacant house or room?
          </h2>
          <p className="mx-auto mt-2 font-poppins text-sm max-w-lg text-gray-600">
            List it in a minute and let students reach you directly on WhatsApp.
          </p>
          <Link
            to="/list"
            className="mt-6 inline-block font-poppins text-sm rounded-xl bg-[rgb(69,60,141)] px-8 py-3 font-bold text-white transition hover:bg-[rgb(55,48,115)]"
          >
            List a hostel
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
