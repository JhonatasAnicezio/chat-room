'use client'
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/User/user-context';

import './index.css';
import { useRouter } from 'next/navigation';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useContext(UserContext);
    const router = useRouter();

    if (user) {
        router.push('/');
    }

    return (
        <div className={`auth-layout`}>
            <Link className='absolute top-7 left-7' href={'/'}>
                {`<- Pagina Inicial`}
            </Link>
            {children}
        </div>
    );
}
