"use client";
import { useContext, useEffect, useState } from "react";
import { contexto } from "@/app/(contx_grp)/productos/layout";
import Image from "next/image";

import { clearItem, clearAll, sum } from "./functions";

import { TbTrashX } from "react-icons/tb";
import styles from "./styles.module.css";
import Swal from 'sweetalert2';

export default function Cart() {
  const { cartList, setCartList } = useContext(contexto);
  const [subtotal, setSubtotal] = useState(0);
  const [Total, setTotal] = useState(0);
  const impuestos = 21;
  //Borro un item de la lista
  const borrar = (product) => setCartList(clearItem(product, cartList));

  //Borrado de la lista del carro
  const borrarTodo = () => setCartList(clearAll());

  const realizarCompra = () => Swal.fire({
    icon: "warning",
    title: "Se va  a concretar la compra!",
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }
  }); ;

  useEffect(() => {
    const suma = sum(cartList);
    setSubtotal(suma);
    setTotal(suma * (1 + impuestos / 100));
  }, [cartList]);

  return (
    <article className={styles.mainCart}>
      <h1 style={{fontWeight:'bolder'}}>Carro de compras</h1 >

      {cartList.length !== 0 && (
        <>
          <div className={styles.cartContainer}>
            <div>
              {cartList.map((product, id) => (
                <div key={id} className={styles.card}>
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    alt="imagen del producto"
                    className={styles.imgProduct}
                  />
                  <p className={styles.title}> {product.title} </p>
                  <p className={styles.price}> $ {product.price} </p>
                  <button onClick={() => borrar(product)}>
                    <TbTrashX />
                  </button>
                </div>
              ))}
            </div>

            <button className={styles.btnClearAll} onClick={() => borrarTodo()}>
              {" "}
              Borrar todo{" "}
            </button>
            <div className={styles.subtotal}>
              <h2>Subtotal</h2>
              <p> $ {subtotal}</p>
            </div>
            <div className={styles.impuestos}>
              <h2>Impuestos</h2>
              <p>{impuestos} %</p>
            </div>
            <div className={styles.total}>
              <h2>Total</h2>
              <p> $ {Total}</p>
            </div>

            <button
              className={styles.btnClearAll}
              style={{ backgroundColor: "#794dff" }}
              onClick={realizarCompra}
            >
              {" "}
              Realizar compra{" "}
            </button>
          </div>
        </>
      )}

      {cartList.length === 0 && (
        <p className={styles.emptyCart}>No tenés productos !</p>
      )}
    </article>
  );
}
