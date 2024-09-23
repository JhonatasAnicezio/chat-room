import Link from "next/link";
import './index.css';

export default function Home() {
  const arr = new Array(1).fill(0);

  return (
    <main className="container-home">
      <div className="div-home">
        <div className="container-profile" />

        <section className="container-rooms">
          <div className="div-description">
            <h1>Salas de BatePapo</h1>
            <p>Venha conversar com pessoas que compartilham do mesmo interesse!</p>

          </div>

          <div className="rooms">
            {arr.map((_e, index) => (
              <Link key={index} href={'/chat/chatemconstrução'} className="flex flex-col gap-1 w-[19.5%]">
                <div className="py-1 w-full h-[165px] bg-black"></div>

                <h2 className="font-semibold">Sala aleatoria! Sala de bate papo aleatora</h2>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
