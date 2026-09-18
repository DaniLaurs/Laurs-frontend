import { Link, useNavigate } from "react-router-dom";
import {ShoppingCart, Search, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/useCart";
import logo from "../../assets/logo/logo-laurs.png"
import { useState } from "react";

function Navbar() {

  const { user, logout } = useAuth();
  console.log("USER:", user);

  const { cartItems } = useCart();
const navigate = useNavigate();

const [search, setSearch] = useState("");

const totalItems = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
  
  return (
    <nav className="
          w-full
          flex
          items-center
          justify-between
          px-12
          py-5
          bg-white/80
          backdrop-blur-xl
          border-b
          border-border
          sticky
          top-0
          z-50
          ">

     <Link to="/">
        <img
          src={logo}
          alt="Laurs"
          className="h-14 w-auto cursor-pointer"
        />
      </Link>


          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              bg-secondary
              px-4
              py-2
              rounded-2xl
            "
          >

            <Search
              size={20}
              className="text-primary"
            />

                <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(
                  `/search?q=${encodeURIComponent(search)}`
                );
              }
                }}
                className="
                  bg-transparent
                  outline-none
                  text-text
                  placeholder:text-textLight
                  w-64
                "
              />

          </div>

      <div className="flex items-center gap-8">

      <button
          onClick={() => navigate("/cart")}
          className="
            relative
            text-text
            hover:text-primary
            hover:scale-110
            transition-all
            duration-300
          "
        >
          <ShoppingCart size={28} />

          {totalItems > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                bg-primary
                text-white
                text-xs
                font-bold
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
                border-white
              "
            >
              {totalItems}
            </span>
          )}

</button>

       

        
      {user ? (

  <div className="flex items-center gap-4">

    <div className="flex items-center gap-3">
      
      <div className="
  w-10 
  h-10 
  rounded-full 
  bg-primary 
  text-white 
  flex 
  items-center 
  justify-center 
  font-semibold
">
        {user.name.charAt(0)}
      </div>

      <span className="font-semibold text-text"> 
        {user.name}
      </span>

    </div>

  <button
        onClick={logout}
        className="
      flex
      items-center
      gap-2
     text-danger
     hover:text-dangerHover
      transition-all
      duration-300
      "
      >
    <LogOut size={18} />
     Sair
    </button>

  </div>

) : (

  <>
    <Link
      to="/login"
      className="
      text-text
      font-medium
      hover:text-primary
      transition-colors
      duration-300
      "
    >
      Login
    </Link>

<Link
  to="/register"
  className="
    bg-gradient-to-r from-primary to-primaryHover
    text-white
    px-5 py-3
    rounded-2xl
    transition-all
    duration-300
    ease-out
    hover:scale-105
    hover:shadow-primary
    active:scale-95
  "
>
  Criar loja
</Link>

 
  </>

)}
      </div>
    </nav>
  );
}

export default Navbar;