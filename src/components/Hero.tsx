import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-32 px-6">
      
      <h1 className="text-6xl font-bold max-w-4xl leading-tight">
        <Typewriter
          words={[
            "Crie sua loja em minutos",
            "Venda online facilmente",
            "Gerencie pedidos rapidamente",
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={2000}
        />
      </h1>

      <p className="text-gray-500 text-xl mt-6 max-w-2xl">
        Venda produtos com sua própria vitrine online de forma simples,
        moderna e profissional.
      </p>

      <button className="mt-10 bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition duration-300">
        Criar minha loja
      </button>
    </section>
  );
}

export default Hero;