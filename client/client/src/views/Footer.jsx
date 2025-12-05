const Footer = () => (
  <footer className="bg-gray-900 text-white p-8 text-center mt-8">
    &copy; {new Date().getFullYear()} StartupCommunity. All rights reserved. |
    <span className="ml-2">
      Follow us on{" "}
      <a href="#" className="text-blue-400 ml-1">Twitter</a>,
      <a href="#" className="text-blue-400 ml-1">LinkedIn</a>
    </span>
  </footer>
);

export default Footer;
