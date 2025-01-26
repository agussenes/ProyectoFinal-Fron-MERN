import valoresImg from "../../imagenes/NosotrosImg/fotoParaValores.webp";
import objetivoImg from "../../imagenes/NosotrosImg/fotoParaObjetivo.webp";



const Valores = () => {
    return (
        <>
            <div className="generalArq">
                <div className="containerValoresyObjetivos">
                    <div className="contenedores">
                        <h2>Lo Que Nos Mueve</h2>
                        <p>En Cururú, nos impulsa una pasión por crear productos que combinan calidad, sostenibilidad y un toque personal de amor y dedicación. Cada pieza es cuidadosamente diseñada utilizando materiales de alta calidad y procesos sostenibles, respetando el medio ambiente y asegurando productos duraderos. Nos esforzamos por ofrecer más que objetos, brindando experiencias. Creemos en la importancia de fomentar la creatividad de los niños a través de nuestros juguetes y muebles, para que puedan expresarse libremente mientras desarrollan sus habilidades únicas y crecen en entornos inspiradores.</p>
                    </div>
                    <div className="contenedoresIMG">
                        <img src={valoresImg} alt="valoresIMG"></img>
                    </div>
                    <div className="contenedoresIMG">
                        <img src={objetivoImg} alt="objetivoIMG"></img>
                    </div>
                    <div className="contenedores">
                    <h3>Construyendo un Mundo Mejor</h3>
                    <p>
                        En Cururú, nuestros objetivos van más allá de lo material. Queremos ver un futuro verde, lleno de educación, amor, y creatividad, donde los niños crezcan rodeados de solidaridad y felicidad. Cada producto que diseñamos busca no solo cuidar del medio ambiente, sino también inspirar a las familias a fomentar valores positivos, promoviendo un entorno donde el aprendizaje y la creatividad florezcan en armonía con el respeto por la naturaleza.
                    </p>
                </div>
                </div>
                
            </div>
        </>

    )
};

export default Valores;