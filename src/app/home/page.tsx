import Rooms from '@/components/app/home/rooms';
import './index.css';
import Profile from "@/components/app/home/profile";

export default async function Home() {
  return (
    <main className="container-home">
      <div className="div-home">
        <Profile />

        <section className="container-rooms">
          <div className="header-rooms">
            <div className="div-description">
              <h1>Salas de BatePapo</h1>
              <p>Venha conversar com pessoas que compartilham do mesmo interesse!</p>
            </div>

            <button className="button-create">
              CRIAR SALA
            </button>

          </div>

          <div className="rooms">
            <Rooms/>
          </div>
        </section>
      </div>
    </main>
  );
}
