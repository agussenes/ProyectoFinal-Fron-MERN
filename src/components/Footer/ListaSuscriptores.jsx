const ListaSuscriptores = ({suscriptores}) =>{

    const listaSuscriptores = Array.isArray (suscriptores) ? suscriptores : [];
    
    return(
        <div className="suscriptors">
            <h2>Suscriptores</h2>
                <ul>
                    {listaSuscriptores.map((correo, index ) => ( // podria ser un forEach tb
                        <li key={index}>{correo}</li>  // Si hay suscriptores te va a renderizar
                        ))}
                </ul>                
        </div>
    )
}

export default ListaSuscriptores;