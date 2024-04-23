import Images from 'next/image'
import Styles from '@/components/Redes/redes.module.css'

export default function Footer() {
  const logoSize = 40;
  return (
    <section className={Styles.container}>
      <article>
        <h2 className={Styles.title}>Seguinos en nuestras redes</h2>
        <p  className={Styles.description}>Para que puedas acceder a nuestras novedades</p>
      </article>

      <article className={Styles.containerLogo} >

        <Images
          src='/images/svg/facebook.svg'
          width={logoSize}
          height={logoSize}
          alt='logo'
          className={Styles.logo}
        />
        <Images
          src='/images/svg/instagram.svg'
          width={logoSize}
          height={logoSize}
          alt='logo'
          className={Styles.logo}
        />
        <Images
          src='/images/svg/youtube.svg'
          width={logoSize}
          height={logoSize}
          alt='logo'
          className={Styles.logo}
        />
        <Images
          src='/images/svg/linkedin.svg'
          width={logoSize}
          height={logoSize}
          alt='logo'
          className={Styles.logo}
        />

      </article>


    </section>
  )
}