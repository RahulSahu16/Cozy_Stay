function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold mb-3">CozyStay</h2>
          <p className="text-gray-400 text-sm">
            Find your perfect stay anywhere in India.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Explore</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">Email: support@cozystay.com</p>
          <p className="text-gray-400 text-sm mt-2">Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © 2026 CozyStay. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;