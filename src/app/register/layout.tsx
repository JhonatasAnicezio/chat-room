import Link from 'next/link';
import './index.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`register-layout`}>
      <Link className='absolute top-7 left-7' href={'/'}>
        {`<- Pagina Inicial`}
      </Link>
      {children}
    </div>
  );
}
