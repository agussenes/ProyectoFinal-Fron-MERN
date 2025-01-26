import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const FooterButton = () => {
    const [buttonBottom, setButtonBottom] = useState('20px');
    const [isCatalog, setIsCatalog] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Verifica se a URL atual é a seção de catálogo
        const checkSection = () => {
            const currentPath = location.pathname;
            setIsCatalog(currentPath.includes('/Catalogo'));
        };

        checkSection(); // Verifica ao montar o componente

        const handleScroll = () => {
            const footer = document.querySelector('footer');
            const button = document.querySelector('.personalizaProducto');

            if (footer && button) {
                const footerTop = footer.getBoundingClientRect().top;
                const buttonHeight = button.offsetHeight;

                if (footerTop < window.innerHeight) {
                    // Ajusta a posição do botão para que se detenga ao chegar ao footer
                    setButtonBottom(Math.max(20, window.innerHeight - footerTop + 20) + 'px');
                } else {
                    setButtonBottom('20px'); 
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('popstate', checkSection); // Verifica ao navegar

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('popstate', checkSection);
        };
    }, [location]); // Adiciona location como dependência para verificar mudanças de rota

    if (!isCatalog) {
        return null; // Não renderiza o botão se não estiver na seção de catálogo
    }

    return (
        <button className="personalizaProducto" style={{ bottom: buttonBottom }}>
            <h3>Personalizá tu producto</h3>
            <p>Click <span>"AQUI"</span> para crear su producto</p>
        </button>
    );
};

export default FooterButton;