function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 py-10 px-6">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div>
          <h2 className="text-2xl font-bold">Laurs</h2>

          <p className="text-gray-500 mt-2">
          © 2026 LaurS. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-8 text-gray-500">
          <a href="#" className="hover:text-black transition">
            Recursos
          </a>

          <a href="#" className="hover:text-black transition">
            Preços
          </a>

          <a href="#" className="hover:text-black transition">
            Login
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;