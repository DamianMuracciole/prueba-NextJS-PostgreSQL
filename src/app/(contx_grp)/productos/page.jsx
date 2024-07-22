"use client";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contexto } from "@/app/(contx_grp)/productos/layout";

import { productos } from "@/components/Productos/listadoProductos";
import Producto from "@/components/Productos/ProductCard/product";
import Cart from "@/components/Productos/Cart/cart";

import { BsCart2, BsXCircle } from "react-icons/bs";

import styles from "@/app/(contx_grp)/productos/styles.module.css";
import {
  showCart,
  hiddenCart,
  showIconCart,
  hiddenIconCart,
} from "./functionStyles";

export default function Products() {
  const { cartList, setCartList } = useContext(contexto);
  const [style01, setStyle01] = useState(hiddenCart);
  const [styleBTN, setStyleBTN] = useState(showIconCart);
  const [genre, setGenre] = useState("");

  // Algunos parámetros enviados por MercadpPago cuando se realiza una transaccion
  // collection_id=83320463906
  // collection_status=approved
  // payment_id=83320463906
  // status=approved
  // external_reference=null
  // payment_type=account_money
  // merchant_order_id=20978001763
  // preference_id=1879176555-beb822ea-6f51-48e2-9191-d130da50939e
  // site_id=MLA&&processing_mode=aggregator
  // merchant_account_id=null
  const searchParams = useSearchParams();
  const collection_status = searchParams.get("collection_status");
  const collection_id = searchParams.get("collection_id");
  const statusMP = searchParams.get("status");
  const mercadoParams = { collection_status, collection_id,statusMP }
  
  function openCart2() {
    setStyle01(showCart);
    setStyleBTN(hiddenIconCart);
  }

  const closeCart2 = () => {
    setStyle01(hiddenCart);
    setStyleBTN(showIconCart);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          onClick={() => openCart2()}
          className={styles.btnOpenCart}
          style={styleBTN}
        >
          <BsCart2 />
          {cartList.length > 0 && (
            <span className={styles.counterProdutsCart}>{cartList.length}</span>
          )}
        </button>
      </div>

      <main className={styles.mainOurServices}>
        <div style={{ display: "flex" }}>
          <h1 className={styles.mainOurServicesTitle}>Nuestros Productos</h1>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              marginRight: "15%",
              height: "2rem",
              marginTop: "2rem",
              border: "1px solid #ccc",
              borderRadius: "3px",
              backgroundColor: "#f802",
            }}
          >
            <option value="">Todos</option>
            <option value="woman">Mujeres</option>
            <option value="child">Niños</option>
            <option value="man">Hombres</option>
            <option value="gift">Regalos</option>
          </select>
        </div>
        <article>
          <section className={styles.productsContainer}>
            {productos.map(
              (item) =>
                (item.genre == genre || genre == "") && (
                  <Producto
                    product={item}
                    key={item.id}
                    list={cartList}
                    setList={setCartList}
                  />
                )
            )}
          </section>

          <section className={styles.cartContainer} style={style01}>
            <Cart mercadoParams={mercadoParams}/>
            <button
              onClick={() => closeCart2()}
              className={styles.btnCloseCart}
            >
              <BsXCircle />
            </button>
          </section>
        </article>
      </main>
    </>
  );
}
