'use client'
import { useContext } from 'react';
import { UserContext } from '@/context/User/user-context';
import './index.css';
import Image from 'next/image';
import { DialogEdit } from './dialog-edit';
import DialogRegister from './dialog-register';

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return null;
    }

    return (
        <>
            {user.name ?
                <div className="container-profile">
                    <div className='banner' />
                    <div className='description'>
                        <div className='photo-user'>
                            {false &&
                                <Image alt='img profile' className='rounded-full' src={'foto'} width={100} height={100} />
                            }
                        </div>
                        <DialogEdit />

                        <div className='info'>
                            <div className='info-children'>
                                {
                                    user.name &&

                                    <div>
                                        <h3>NOME EXIBIDO</h3>
                                        <p>{user.name}</p>
                                    </div>
                                }
                                <div>
                                    <h3>E-MAIL</h3>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                :

                <DialogRegister />
            }
        </>
    )
}