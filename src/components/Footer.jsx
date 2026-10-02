const Footer = () => {
  return (
    <footer className="mt-16 bg-[rgb(35,30,72)] text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-lg font-poppins font-bold text-white">HostelHub</p>
          <p className="text-xs font-poppins">Find a place you can call home.</p>
        </div>
        <p className="text-sm font-poppins text-gray-400">
          © {new Date().getFullYear()} HostelHub. Built for students.
        </p>
      </div>
    </footer>
  );
};

export default Footer;