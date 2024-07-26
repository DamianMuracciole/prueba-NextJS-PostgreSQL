import { Inter , Ubuntu , Mulish , Josefin_Slab , Montserrat , Poppins , Noto_Sans , ABeeZee } from 'next/font/google'
import NavBar from "@/components/NavBar/navBar";

const mainFont = ABeeZee({ 
  weight: ['400'],
    style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Sol de otoño',
  description: 'Creado por DAmian MUracciole',
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mainFont.className}>
      <body style={{padding:'0', margin:'0'}}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
