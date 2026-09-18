import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-32 px-6">
      
        <h1 className="text-6xl font-bold max-w-4xl leading-tight">
        Com a  {""}
        <span className="text-primary">Laurs</span>{" "}
        você pode
        <br />

        <span className="text-primary">
          <Typewriter
            words={[
              "criar sua loja",
              "vender online",
              "gerenciar pedidos",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </span>
      </h1>

      <p className="text-textLight text-xl mt-6 max-w-2xl">
        Venda produtos com sua própria vitrine online de forma simples,
        moderna e profissional.
      </p>

      <Link
          to="/dashboard/create-store"
          className="
          mt-10
          bg-gradient-to-r
          from-primary
          to-primaryHover
          text-white
          px-8
          py-4
          rounded-2xl
          text-lg
          transition-all
          duration-300
          ease-out
          hover:scale-105
          hover:shadow-primary
          active:scale-95
        "
        >
          Criar minha loja
      </Link>
    </section>
  );
}

export default Hero;