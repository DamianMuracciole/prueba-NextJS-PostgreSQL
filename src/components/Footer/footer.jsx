import Styles from '@/components/Footer/footer.module.css';
import Images from 'next/image';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={Styles.container}>

      <article className={Styles.marcaContainer}>
        <Image
          src='/images/logo02.png'
          width={70}
          height={70}
          alt='logo'
        />
        <Link href='/' className={Styles.brandText}>Regalería La luna</Link>
      </article>

      <article className={Styles.logosContainer}>
        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/whatsapp.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}>whatsapp</p>
        </div>

        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/facebook.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}> facebook </p>
        </div>

        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/instagram.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}>instagram</p>
        </div>

        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/phone.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}> +54 9 011 5555-5555</p>
        </div>

        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/map.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}>Carlos Pellegrini 333 - CABA - Argentina</p>
        </div>

        <div className={Styles.logoContainer}>
          <Images
            src='/images/svg/mail.svg'
            width={20}
            height={20}
            alt='logo'
            className={Styles.logo}
          />
          <p className={Styles.text}>unmail@arcano.com</p>
        </div>
      </article>

    </footer>
  )
}