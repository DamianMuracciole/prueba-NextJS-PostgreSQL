import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Logout from "@/components/logout";
import styles from "@/components/NavBar/navBar.module.css";

export default async function NavBar() {
  const logoSize = 24;
  const session = await getServerSession(authOptions);
  let urlImage;
  if (session && session.user) urlImage = session.user.image;

  return (
    <nav className={styles.container}>
      <div>
        <Link href="/" className={styles.link} style={{display:'flex', justifyContent:'center'}}>
          <Image
            src="/images/logo_redondo.png"
            width={50}
            height={50}
            alt="default image"
            priority={true}
          />
          <div style={{display:'flex',flexFlow:'column nowrap', justifyContent:'center', alignItems:'center'}}>
            <p style={{padding:'2px 5px',margin:'0'}}>Regaleria</p>
            <p style={{padding:'2px 5px',margin:'0'}}>Sol de Otoño</p>
          </div>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/about" className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link href="/productos" className={styles.link}>
              Productos
            </Link>
          </li>
          <li>
            <Link href="/payment" className={styles.link}>
              Pagos
            </Link>
          </li>
          {session && session.user ? (
            <>
              <li>
                <Link href="/auth/products" className={styles.link}>
                  Products
                </Link>
              </li>
              <li className={styles.logoUser}>
                <Link href={`/auth/user`} className={styles.link}>
                  <Image
                    src={urlImage.toString().trim()}
                    width={logoSize}
                    height={logoSize}
                    alt="logo"
                    className=""
                  />
                  <span>Hola {session.user.name}</span>
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/register" className={styles.link}>
                  Registrarse{" "}
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className={styles.link}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
