'use client'
import Paypal from '@/components/Paypal/paypal';
import MercadoPago from '@/components/MercadoPago/MP';
import styles from '@/app/payment/styles.module.css'


export default function Payment() {

  return (
    <div>
      <h1 className={styles.parrafo}>Métodos de pago</h1>
      <h2 className={styles.subtitulo}> Paypal</h2>
      <Paypal />
      <h2 className={styles.subtitulo}> Mercadopago</h2>
      <MercadoPago />
    </div>
  );
} 