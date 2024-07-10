"use client";
import { createContext, useReducer, useState, useEffect} from "react";
// import { cartActions } from "@/components/CartActios/cartActions";
import "@/app/globals.css";

export const contexto = createContext();

export default function RootLayout({ children }) {
  //con el valor devuelto lo cargo en el estado
  const [cartList, setCartList] = useState([]);

  // leo el listado cargado en el local storage
  useEffect(()=> {
    const localSTG = JSON.parse(localStorage.getItem("listado")) ?? [];
    setCartList(localSTG)
  },[])
  
  return (
    <div>
      <contexto.Provider value={{ cartList, setCartList }}>
        {children}
      </contexto.Provider>
    </div>
  );
}
