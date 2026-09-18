import {
  Search,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


interface DashboardHeaderProps {
  onMenuClick: () => void;
}


function DashboardHeader({
  onMenuClick
}: DashboardHeaderProps) {

  const { user, logout } = useAuth();


  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-6
      "
    >

      {/* Menu mobile */}
      <button
      onClick={onMenuClick}
        className="
          md:hidden
          p-2
          rounded-lg
          hover:bg-gray-100
        "
      >
        <Menu size={24}/>
      </button>


      {/* Busca */}
      <div
        className="
          hidden
          md:flex
          items-center
          gap-3
          bg-gray-100
          rounded-xl
          px-4
          py-2
          w-96
        "
      >

        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Buscar produtos..."
          className="
            bg-transparent
            outline-none
            w-full
          "
        />

      </div>


      {/* Usuário */}
      <div className="flex items-center gap-5">


        <button
          className="
            relative
            text-gray-600
            hover:text-purple-600
          "
        >
          <Bell size={22}/>
        </button>



        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-purple-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
            {user?.name?.charAt(0)}
          </div>


          <div className="hidden md:block">

            <p className="font-semibold text-gray-800">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              Loja
            </p>

          </div>

        </div>


        <button
          onClick={logout}
          className="
            text-gray-500
            hover:text-red-500
            transition
          "
        >
          <LogOut size={20}/>
        </button>


      </div>


    </header>
  );
}


export default DashboardHeader;