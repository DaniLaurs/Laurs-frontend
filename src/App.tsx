import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import CreateStore from "./pages/CreateStore";
import Store from "./pages/Store";
import EditProduct from "./pages/EditProduct"
import MyStore from "./pages/MyStore";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartProvider";
import Cart from "./pages/Cart";
import DashboardLayout from "../src/components/Layout/DashboardLayout";
import  Search  from "./pages/Search";
import OrderDetails from "./pages/OrderDetails";


function App() {
  return (
    <CartProvider>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

          <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route
          path="products"
          element={<Products />}
        />

        <Route
          path="orders"
          element={<Orders />}
        />

        
          <Route
            path="orders/:id"
            element={<OrderDetails />}
          />

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>


   
    
      <Route
          path="/dashboard/admin"
          element={<Admin />}
        />

        <Route
          path="/dashboard/create-store"
          element={<CreateStore />}
        />

        <Route
          path="/store/:slug"
          element={<Store />}
        />

       <Route
        path="/dashboard/products/edit/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />
         <Route
          path="/dashboard/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
/>
       <Route 
        path="/my-store" 
        element={<MyStore />} 
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />


      <Route
        path="/search"
        element={<Search />}
      />

        </Routes>
        </CartProvider>


    
  );
}

export default App;