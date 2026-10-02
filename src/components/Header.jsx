import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
        {/* Logo */}
        <motion.button
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate("/")}
          className="shrink-0 cursor-pointer text-base font-extrabold text-[rgb(69,60,141)] sm:text-xl"
        >
          <span className="sm:inline ml-5">HostelHub</span>
        </motion.button>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Home */}
          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/")}
            className="cursor-pointer px-1 text-xs font-semibold font-poppins transition hover:text-[rgb(69,60,141)] sm:px-2 sm:text-sm"
          >
            Home
          </motion.button>

          {/* Saved */}
          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/saved")}
            className="cursor-pointer px-1 text-xs font-semibold font-poppins transition hover:text-[rgb(69,60,141)] sm:px-2 sm:text-sm"
          >
            Saved
          </motion.button>

          {/* List hostel */}
          <motion.button
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/list")}
            className="cursor-pointer rounded-lg bg-[rgb(69,60,141)] px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-[rgb(55,48,115)] sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
          >
            List a hostel
          </motion.button>
        </nav>

        
      </div>
    </header>
  );
};

export default Header;
