"use client";
import { createContext, useState, useEffect} from "react";
import "@/app/globals.css";

export const contexto = createContext();

export default function RootLayout({ children }) {
  //con el valor devuelto lo cargo en el estado
  const [cartList, setCartList] = useState([]);
  const [onCheckout, setOnCheckout] = useState(false);

  // leo el listado cargado en el local storage
  useEffect(()=> {
    const localSTG = JSON.parse(localStorage.getItem("listado")) ?? [];
    setCartList(localSTG)
  },[])
  
  return (
    <div>
      <contexto.Provider value={{ cartList, setCartList , onCheckout, setOnCheckout}}>
        {children}
      </contexto.Provider>
    </div>
  );
}
