import Link from "next/link"
export default function NotFound() {
  return (
    <>
      <h1>404!</h1>
      <h2>Página no encontrada!!!</h2>
      <Link href='/'>Volver</Link>
    </>
  )
}