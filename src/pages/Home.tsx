import Navbar from "../components/Layout/Navbar";
import Hero from "../components/Home/Hero";
import DashboardPreview from "../components/Home/DashboardPreview";
import Benefits from "../components/Home/Benefits";
import Footer from "../components/Layout/Footer";



function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#f5f7ff] ">
      
      <div
  className="
    absolute
    top-[-200px]
    left-[-200px]
    w-[500px]
    h-[500px]
    bg-primary
    opacity-15
    blur-[150px]
    rounded-full
  "
></div>

    <div
  className="
    absolute
    bottom-[-200px]
    right-[-200px]
    w-[500px]
    h-[500px]
    bg-primary
    opacity-15
    blur-[150px]
    rounded-full
  "
></div>
      
      
      <Navbar />
      <Hero />
      <DashboardPreview /> 
      <Benefits />
      <Footer />
    </div>
  );
}

export default Home;