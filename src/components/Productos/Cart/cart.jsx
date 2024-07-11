"use client";
import { useContext, useEffect, useState } from "react";
import { contexto } from "@/app/(contx_grp)/productos/layout";
import Image from "next/image";

import { clearItem, clearAll, subTotal , discountTotal , totalTaxes } from "./functions";

import { TbTrashX } from "react-icons/tb";
import styles from "./styles.module.css";
import Swal from 'sweetalert2';

export default function Cart() {
  const { cartList, setCartList } = useContext(contexto);
  const [subtotal, setSubtotal] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total,setTotal] = useState(0);
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
    const suma = subTotal(cartList);
    setSubtotal(suma);
    const descuentos = discountTotal(cartList);
    setDiscounts(descuentos)
    const impuestos = totalTaxes(cartList);
    setTaxes(impuestos)

    setTotal(suma + impuestos - descuentos);
  }, [cartList,discounts, impuestos]);

  return (
    <article className={styles.mainCart}>
      <h1 style={{fontWeight:'bolder'}}>Carro de compras</h1 >

      {cartList.length !== 0 && (
        <>
          <div className={styles.cartContainer}>
            <div className={styles.productsContainer}>
              {cartList.map((product, id) => (
                <div key={id} className={styles.card}>
                  <Image
                    src={product.image}
                    width={40}
                    height={40}
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
            <div className={styles.subtotal}>
              <h2>Descuentos</h2>
              <p> $ {discounts}</p>
            </div>
            <div className={styles.impuestos}>
              <h2>Impuestos</h2>
              <p>$ {taxes}</p>
            </div>
            <div className={styles.total}>
              <h2>Total</h2>
              <p> $ {total}</p>
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
