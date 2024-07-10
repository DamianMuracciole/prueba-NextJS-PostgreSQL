import Image from 'next/image';

export default async function Home() {
  return (
    <main>
      <div>
        <h1>HomePage</h1>
        <Image
          src='/images/defaultImage-1.png'
          width={180}
          height={180}
          alt='default image'
          priority={true}
        />
      </div>
    </main>
  )
}
