"use client"

import Styles from '@/components/Contacto/contacto.module.css'

export default function Contacto() {
  return (
    <section className={Styles.container}>
      <h2 className={Styles.text}>Contactate con nosotros</h2>
      <button
        onClick={() => { }}
        className={Styles.buttom}
      >
        Escribinos!
      </button>
    </section>
  )
}