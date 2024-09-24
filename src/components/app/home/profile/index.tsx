'use client'
import { useContext } from 'react';
import { UserContext } from '@/context/User/user-context';
import './index.css';
import Image from 'next/image';

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return null;
    }

    return (
        <div className="container-profile">
            <div className='banner' />

            <div className='description'>
                <div className='photo-user'>
                    {user.photoURL &&
                        <Image alt='img profile' className='rounded-full' src={user.photoURL} width={100} height={100} />
                    }
                </div>
                <button className='button-edit'>
                    Editar perfil
                </button>

                <div className='info'>
                    <div className='info-children'>
                        {
                            user.displayName &&

                            <div>
                                <h3>NOME EXIBIDO</h3>
                                <p>{user.displayName}</p>
                            </div>
                        }
                        <div>
                            <h3>E-MAIL</h3>
                            <p>{user.email}</p>
                        </div>
                        {
                            user.phoneNumber &&

                            <div>
                                <h3>TELEFONE</h3>
                                <p>{user.phoneNumber}</p>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}