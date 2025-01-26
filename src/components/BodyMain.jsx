import Productos from "./Productos/productos";
import "./BodyMain/ApiDataCss.css";
import QuienesSomos from "./BodyMain/QuienesSomos";
import ContainerAccion from "./BodyMain/ContainerAccion";
// import ProdcutosDestacados from "./BodyMain/ProdcutosDestacados";

const BodyMain = () =>{
    return(
        <>
        <QuienesSomos/>
        <ContainerAccion/>
        {/* <ProdcutosDestacados/> */}
        <Productos/>
        </>
    )
}

export default BodyMain;