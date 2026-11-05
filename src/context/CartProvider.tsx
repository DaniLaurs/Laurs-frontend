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
  setCartItems((currentItems) => {
    const existingItem = currentItems.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.variant?.id === item.variant?.id
    );

    const currentQuantity = existingItem
      ? existingItem.quantity
      : 0;

    const newQuantity = currentQuantity + item.quantity;

const availableStock = item.variant
  ? item.variant.stock
  : item.stock;

    if (
      availableStock !== undefined &&
      newQuantity > availableStock
    ) {
     alert(
      `Limite de estoque atingido!\n\nVocê já adicionou todas as unidades disponíveis deste produto ao carrinho.\n\nEstoque disponível: ${availableStock} unidade(s).`
    );
      return currentItems;
    }

    if (existingItem) {
      return currentItems.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.variant?.id === item.variant?.id
          ? {
              ...cartItem,
              quantity: newQuantity,
            }
          : cartItem
      );
    }

    return [...currentItems, item];
  });
}





function increaseQuantity(item: CartItem) {
  setCartItems((currentItems) =>
    currentItems.map((cartItem) => {
      const isSameItem =
        cartItem.id === item.id &&
        cartItem.variant?.id === item.variant?.id;

      if (!isSameItem) {
        return cartItem;
      }
      
      const availableStock = cartItem.variant
        ? cartItem.variant.stock
        : cartItem.stock;

      if (
        availableStock !== undefined &&
        cartItem.quantity >= availableStock
      ) {
        alert(
          `Limite de estoque atingido!\n\nVocê já adicionou todas as unidades disponíveis deste produto ao carrinho.\n\nEstoque disponível: ${availableStock} unidade(s).`
        );
        return cartItem;
      }
      return {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      };
    })
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