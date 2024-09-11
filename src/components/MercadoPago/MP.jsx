"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoConfig } from "mercadopago";
import { roundedPrice } from '../Productos/ProductCard/functions'
import styles from "./styles.module.css";

const cliente = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default function MercadoPago({productList}) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    const listado = productList.map((el) => {
      const finalPrice = roundedPrice(el.price*(1-el.discount)*(1+el.taxes));
      return {
        id: el.id,
        title: el.title,
        price: finalPrice,
        description: el.description,
        quantity: 1,
      };
    });
    setFinalList(listado);
  }, [productList]);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_KEY_MP, { locale: "es-AR" });
  }, []);

  const customization = {
    texts: { valueProp: "smart_option" },
    checkout: {
      theme: {
        elementsColor: "#FFFFFF",
        headerColor: "#4287F5",
      },
    },
    visual: {
      // buttonBackground: "#ff8800",
      borderRadius: "24px",
      horizontalPadding: "0px",
      // verticalPadding: "0px",
      // valuePropColor: "blue",
      buttonHeight: "48px",
    },
  };

  const sendData = async (datas) => {
    try {
      const res = await fetch("/api/payment/mercadoPago", {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // respuesta desde el back
      const { id } = await res.json();
      if (id) setPreferenceId(id);
    } catch (error) {
      console.log("hay errores: =>  ", error);
    }
  };

  return (
    <div id="wallet_container" className={styles.mpbtn}>
      {!preferenceId && (
        <>
          <button
            onClick={() => sendData(finalList)}
            className={styles.btnCheckuot}
          >
            Realizar Pago Por Mercadopago
          </button>
          {/* <p className={styles.mpText}>Por Mercadopago</p> */}
        </>
      )}
      {preferenceId && (
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={customization}
          />
      )}
    </div>
  );
}
