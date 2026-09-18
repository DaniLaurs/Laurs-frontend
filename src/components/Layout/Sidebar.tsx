import { Link, useLocation } from "react-router-dom";
import logoPequena from "../../assets/logo/logo-laurspeq.png";

import {
  Home,
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Settings,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";


interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}



function Sidebar({
  open,
  setOpen
}: SidebarProps) {

  const location = useLocation();


  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Minha Loja",
      path: "/my-store",
      icon: Store,
    },
    {
      name: "Produtos",
      path: "/dashboard/products",
      icon: Package,
    },
    {
      name: "Pedidos",
      path: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      name: "Configurações",
      path: "/dashboard/settings",
      icon: Settings,
    },
    {
      name: "Admin",
      path: "/dashboard/admin",
      icon: ShieldCheck,
    },
  ];


      return (
          <>
          <button
      onClick={() => setOpen(!open)}
    className="
      md:hidden
      fixed
      top-4
      left-4
      z-50
      bg-surface
      p-2
      rounded-lg
      shadow-sm
    "
    >
      {open ? (
        <X size={24}/>
      ) : (
        <Menu size={24}/>
      )}
    </button>

    <aside className="
      w-64
      bg-surface
      border-r
      border-border
      p-6
      shadow-sm
    ">
      <Link
        to="/dashboard"
        className="flex justify-center mb-10"
      >
        <img
          src={logoPequena}
          alt="Laurs"
          className="h-14 w-auto"
        />
      </Link>


      <hr className="border-border mb-6" />

      <nav className="flex flex-col gap-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
          className={`
          flex 
          items-center 
          gap-3
          p-3
          rounded-xl
          transition
          ${
            location.pathname === item.path
            ? "bg-secondary text-primary font-semibold border-l-4 border-primary"
              : "text-text hover:bg-secondary hover:text-primary"
          }
         `}
            >

              <Icon 
                size={20}
                strokeWidth={2.2}
              />

              <span>
                {item.name}
              </span>

            </Link>
          );

        })}

      </nav>

    </aside>
      </>
  );
}

export default Sidebar;