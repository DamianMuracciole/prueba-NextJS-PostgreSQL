import Image from 'next/image';

export default async function Home() {
  return (
    <main>
      <div>
        <h1>HomePage</h1>
        <Image
          src='/images/defaultImage.png'
          width={180}
          height={180}
          alt='default image'
        />
      </div>
    </main>
  )
}
