'use client'
import Link from 'next/link';
import './index.css';
import { useUserStore } from '@/store/user-store';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserStore(); 

  return (
      <div className={`login-layout`}>
        <Link className='absolute top-7 left-7' href={'/'}>
          {`<- Pagina Inicial`}
        </Link>
        {children}
        <button onClick={() => console.log(user)}>
            Imprimir Usuario
          </button>
      </div>
  );
}
