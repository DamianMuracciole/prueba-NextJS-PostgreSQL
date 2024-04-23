'use client'
import { signOut } from 'next-auth/react';
import { getProviders } from "next-auth/react"
import styles from '@/components/NavBar/navBar.module.css'

export default function LogOut() {
  const providers = getProviders()
  // console.log("Providers", providers)

  return (
    <button
      onClick={() => signOut()}
      className={styles.logout}
    >Logout</button>
  )
}