"use client";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { MercadoPagoConfig } from "mercadopago";
import styles from "./styles.module.css";

const cliente = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default function MercadoPago() {
  const [preferenceId, setPreferenceId] = useState(null);
  const producto = {
    title: "Notebook",
    price: 100,
    quantity: 1,
  };

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
        <button onClick={() => sendData(producto)}>
          realizar pago por Mercadopago
        </button>
      )}
      {preferenceId && (
        <>
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            customization={customization}
          />
        </>
      )}
    </div>
  );
}
