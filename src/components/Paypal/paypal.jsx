"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { dataObjectForPaypal } from './functions'
import Swal from "sweetalert2";
import styles from "@/components/Paypal/styles.module.css";


const client_ID = process.env.NEXT_PUBLIC_PP_Client_ID;
export default function Paypal({ productList , cancelOrder , borrarTodo}) {
  const data = dataObjectForPaypal(productList);
  // console.log('data: ==>>    ',data.data)

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
          return order.id
        }}
        onApprove={(data,actions)=> {
          actions.order.capture();
          Swal.fire({
            title: "Se ha concretado el pago el pago",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          cancelOrder();
          borrarTodo();
        }}
        onCancel={(data)=> {
          Swal.fire({
            title: "Se ha cancelado el pago",
            icon: "info",
            timer: 1500,
            showConfirmButton: false,
          });
        }}
        className={styles.paypalbtn}
        />
    </PayPalScriptProvider>
  );
}