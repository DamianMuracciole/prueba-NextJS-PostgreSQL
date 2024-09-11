"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import { contexto } from "@/app/(contx_grp)/productos/layout";
import { redirect } from "next/navigation";
import Image from "next/image";

import {
  clearItem,
  clearAll,
  subTotalRow,
  discountTotal,
  totalTaxes,
} from "./functions";
import { roundedPrice } from "../ProductCard/functions";

import { TbTrashX } from "react-icons/tb";
import styles from "./styles.module.css";
import MercadoPago from "@/components/MercadoPago/MP";
import Paypal from "@/components/Paypal/paypal";
import Swal from "sweetalert2";

export default function Cart({ mercadoParams }) {
  const { cartList, setCartList, onCheckout, setOnCheckout } = useContext(contexto);
  const [subtotal, setSubtotal] = useState(0);
  const [discounts, setDiscounts] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [mpSelected, setMPselected] = useState(false);
  const [ppSelected, setPPselected] = useState(false);

  //Borro un item de la lista
  const borrar = (product) => {
    if (!mpSelected && !ppSelected) setCartList(clearItem(product, cartList));
  };

  //Borrado de la lista del carro
  const borrarTodo = () => {
    setCartList(clearAll());
  };

  const selectPP = () => {
    setMPselected(false);
    setPPselected(true);
  };
  const selectMP = () => {
    setPPselected(false);
    setMPselected(true);
  };
  const cancelOrder = () => {
    setPPselected(false);
    setMPselected(false);
  };

  const errForSale = () =>
    Swal.fire({
      title: "Primero debés cancelar la orden",
      icon: "warning",
      timer: 1500,
      showConfirmButton: false,
    });

  useEffect(() => {
    const suma = roundedPrice(subTotalRow(cartList));
    setSubtotal(suma);
    // const descuentos = roundedPrice(discountTotal(cartList));
    const descuentos = roundedPrice(discountTotal(cartList));
    setDiscounts(descuentos);
    const impuestos = roundedPrice(totalTaxes(cartList));
    setTaxes(impuestos);
    const totalPrice = roundedPrice(subtotal + taxes - discounts);
    setTotal(totalPrice);
  }, [cartList, discounts, taxes, total, subtotal]);

  useEffect(() => {
    if (!mpSelected && !ppSelected) setOnCheckout(false);
    else setOnCheckout(true);
  }, [mpSelected, ppSelected, setOnCheckout]);

  // console.log(mercadoParams)
  if (
    mercadoParams.collection_status === "approved" &&
    mercadoParams.collection_id != null &&
    mercadoParams.statusMP === "approved"
  ) {
    cancelOrder();
    redirect("/productos");
  }

  return (
    <article className={styles.mainCart}>
      <h1 style={{ fontWeight: "bolder" }}>Carro de compras</h1>

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
                    priority={true}
                  />
                  <p className={styles.title}> {product.title} </p>
                  <p className={styles.price}> $ {product.price} </p>
                  <button onClick={() => borrar(product)}>
                    <TbTrashX />
                  </button>
                </div>
              ))}
            </div>
            {!ppSelected && !mpSelected && (
              <button
                className={styles.btnClearAll}
                onClick={() => borrarTodo()}
              >
                Borrar todo
              </button>
            )}
            {(ppSelected || mpSelected) && (
              <button
                className={styles.btnClearAll}
                style={{ backgroundColor: "#666" }}
                onClick={() => errForSale()}
              >
                Borrar todo
              </button>
            )}

            <div className={styles.subtotal}>
              <h2>Subtotal</h2>
              <p> $ {subtotal}</p>
            </div>
            <div className={styles.subtotal}>
              <h2>Descuentos</h2>
              <p> - $ {discounts}</p>
            </div>
            <div className={styles.impuestos}>
              <h2>Impuestos</h2>
              <p>$ {taxes}</p>
            </div>
            <div className={styles.total}>
              <h2>Total</h2>
              <p> $ {total}</p>
            </div>

            <div className={styles.subtotal}>
              <h2>Elejí el medio de pago</h2>
            </div>
            {!ppSelected && !mpSelected && (
              <div className={styles.paymantMethodContainer}>
                <button
                  onClick={() => selectPP()}
                  className={styles.btnPaymantMethod}
                  style={{ backgroundColor: "#2C2E2F" }}
                >
                  Paypal
                </button>
                <button
                  onClick={() => selectMP()}
                  className={styles.btnPaymantMethod}
                  style={{ backgroundColor: "#009EE3" }}
                >
                  Mercadopago
                </button>
              </div>
            )}
            {mpSelected && (
              <MercadoPago
                productList={cartList}
              />
            )}
            {ppSelected && (
              <Paypal
                productList={cartList}
                cancelOrder={cancelOrder}
                borrarTodo={borrarTodo}
              />
            )}
            {(mpSelected || ppSelected) && (
              <button
                onClick={() => cancelOrder()}
                className={styles.btnClearAll}
              >
                Cancelar orden
              </button>
            )}
          </div>
        </>
      )}

      {cartList.length === 0 && (
        <p className={styles.emptyCart}>No tenés productos !</p>
      )}
    </article>
  );
}
