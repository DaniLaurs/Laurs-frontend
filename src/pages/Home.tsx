import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardPreview from "../components/DashboardPreview";
import Benefits from "../components/Benefits";
import Footer from "../components/Footer";


function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#f5f7ff] ">
      
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-cyan-400 opacity-20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-400 opacity-20 blur-[150px] rounded-full"></div>

      <Navbar />
      <Hero />
      <DashboardPreview /> 
      <Benefits />
      <Footer />
    </div>
  );
}

export default Home;