import { CartContext, type CartItem } from "./CartContext";
import { useEffect, useState, type ReactNode } from "react";


export function CartProvider({
  children
}: {
  children: ReactNode;
}) {

  

const [cartItems, setCartItems] = useState<CartItem[]>(() => {

  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return [];

});

useEffect(() => {

  console.log("CARRINHO ATUALIZADO:", cartItems);

  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

}, [cartItems]);

function addToCart(item: CartItem) {
  console.log("CHEGOU NO CART PROVIDER:", item);

  setCartItems((currentItems) => {
    console.log("CARRINHO ATUAL:", currentItems);

    const existingItem = currentItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.variant?.id === item.variant?.id
    );

    if (existingItem) {
      return currentItems.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.variant?.id === item.variant?.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            }
          : cartItem
      );
    }

    return [...currentItems, item];
  });
}



function increaseQuantity(item: CartItem) {

  setCartItems((currentItems) =>
    currentItems.map((cartItem) =>
      cartItem.id === item.id &&
      cartItem.variant?.id === item.variant?.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    )
  );

}

function decreaseQuantity(item: CartItem) {

  setCartItems((currentItems) =>
    currentItems.flatMap((cartItem) => {

      if (
        cartItem.id !== item.id ||
        cartItem.variant?.id !== item.variant?.id
      ) {
        return cartItem;
      }

      if (cartItem.quantity === 1) {
        return [];
      }

      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };

    })
  );

}

function removeFromCart(item: CartItem) {

  setCartItems((currentItems) =>
    currentItems.filter(
      (cartItem) =>
        cartItem.id !== item.id ||
        cartItem.variant?.id !== item.variant?.id
    )
  );

}

function clearCart() {

  setCartItems([]);

}


  return (
      <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}