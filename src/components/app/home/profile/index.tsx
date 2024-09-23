import './index.css';

export default function Profile() {
    return (
        <div className="container-profile">
            <div className='banner' />

            <div className='description'>
                <div className='photo-user' />
                <button className='button-edit'>
                    Editar perfil
                </button>

                <div className='info'>
                    <div className='info-children'>
                        <div>
                            <h3>NOME EXIBIDO</h3>
                            <p>Photosynthesis</p>
                        </div>
                        <div>
                            <h3>E-MAIL</h3>
                            <p>jhonatasanic@hotmail.com</p>
                        </div>
                        <div>
                            <h3>TELEFONE</h3>
                            <p>(16)992219948</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}