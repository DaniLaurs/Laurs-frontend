import { createContext } from "react";


export interface CartItem {
  id: string;
  storeId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;

  variant?: {
    id: string;
    color?: string;
    size?: string;
  };
}


interface CartContextType {
  cartItems: CartItem[];

  addToCart: (item: CartItem) => void;
  
  increaseQuantity: (item: CartItem) => void;

  decreaseQuantity: (item: CartItem) => void;

  removeFromCart: (item: CartItem) => void;

  clearCart: () => void;
}


export const CartContext = createContext<CartContextType | undefined>(
  undefined
);