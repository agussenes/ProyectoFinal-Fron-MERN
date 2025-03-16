
import "./BodyMain/ApiDataCss.css";
import QuienesSomos from "./BodyMain/QuienesSomos";
import ContainerAccion from "./BodyMain/ContainerAccion";
import ApiData from "./BodyMain/ApiData";
// import ProdcutosDestacados from "./BodyMain/ProdcutosDestacados";

const BodyMain = () =>{
    return(
        <>
        <QuienesSomos/>
        <ContainerAccion/>
        {/* <ProdcutosDestacados/> */}

        

        <ApiData/>

        </>
    )
}

export default BodyMain;