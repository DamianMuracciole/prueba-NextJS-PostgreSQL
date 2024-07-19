"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { dataObjectForPaypal } from './functions'
import styles from "@/components/Paypal/styles.module.css";


const client_ID = process.env.NEXT_PUBLIC_PP_Client_ID;
export default function Paypal(productList) {
  const data = dataObjectForPaypal(productList);
  console.log('data: ==>>    ',data.data)

  const datas = [
    {
      name: "pantalon",
      description: "pantalon de ejercicio",
      quantity: "1",
      unit_amount: {
        currency_code: 'USD',
        value: '0.25'
      }
    },
    {
      name: "remera",
      description: "remera de poliester",
      quantity: "1",
      unit_amount: {
        currency_code: 'USD',
        value: '0.15'
      }
    },
  ]

  return (
    <PayPalScriptProvider options={{ clientId: client_ID }}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          color: "black",
          label: "buynow",
          height: 42,
          shape: "pill",
        }}
        createOrder={async () => {
          const res = await fetch('/api/payment/paypal',{
            method: "POST",
            body: JSON.stringify(data.data),
            headers: {
              "Content-Type": "application/json",
            },
          })
          const order = await res.json();
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