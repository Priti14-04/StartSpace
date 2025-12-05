import Navbar from "./views/Navbar";
import Footer from "./views/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar should be at the top */}
      <Navbar />

      <div className="grow mt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idea" element={<AllIdea />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {/* Footer ALWAYS visible */}
      <Footer />
    </div>
  );
}

export default App;
