import React from 'react';
import '../../css/footer.css';

export const Footer = () => {
    return (
        <footer className="footer bg-dark text-white mt-5 p-4 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Sobre nosotros</h5>
                        <p>
                            Somos una empresa dedicada a ofrecer los mejores productos deportivos.
                            Nuestra misión es promover un estilo de vida saludable y activo.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5>Enlaces útiles</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Inicio</a></li>
                            <li><a href="/catalogo" className="text-white">Catálogo</a></li>
                            <li><a href="/contacto" className="text-white">Contacto</a></li>
                            <li><a href="/acerca" className="text-white">Acerca de</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Síguenos</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://instagram.com" className="text-white" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://linkedin.com" className="text-white" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom mt-3">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Deportes. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
