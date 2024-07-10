"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "@/components/Paypal/styles.module.css";


const client_ID = process.env.NEXT_PUBLIC_PP_Client_ID;
export default function Paypal() {
  
  return (
    <PayPalScriptProvider options={{ clientId: client_ID }}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "black",
          label: "buynow",
          height: 48,
          shape: "pill",
        }}
        createOrder={async () => {
          const res = await fetch('/api/payment/paypal',{
            method: 'POST'
          })
          const order = await res.json()
          console.log(order)
          return order.id
        }}
        className={styles.paypalbtn}
        />
    </PayPalScriptProvider>
  );
}


// onCancel={() => {}}
// onApprove={() => {}}