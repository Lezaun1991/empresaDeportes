// Navbar.js
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { ProductoContext } from "../../producto/context/ProductoContext";
import logoEmpresa from "../../images/logoEmpresa.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "../../css/navbar.css";

export const Navbar = () => {
    const { login, handlerLogout } = useContext(AuthContext);
    const { categorias, buscarProductosPorCategoria,buscarProductos } = useContext(ProductoContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const toggleCategoriesDropdown = () => {
        setCategoriesDropdownOpen(!categoriesDropdownOpen);
    };

    const closeCategoriesDropdown = () => {
        setCategoriesDropdownOpen(false);
    };

    const handleCatalogoClick = async () => {
        await buscarProductos(); // Llamada a la función para obtener todos los productos
        navigate("/catalogo");
    };

    const handleCategoryClick = (categoriaId) => {
        buscarProductosPorCategoria(categoriaId);
        closeCategoriesDropdown();
        navigate(`/catalogo?categoria=${categoriaId}`);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logoEmpresa} alt="Logo de la empresa" width="30" height="30" className="d-inline-block align-top" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown navbar-categories-dropdown">
                                <button
                                    className="nav-link btn btn-link dropdown-toggle"
                                    onClick={toggleCategoriesDropdown}
                                    aria-expanded={categoriesDropdownOpen ? "true" : "false"}
                                >
                                    Categorías
                                </button>
                                <ul className={`dropdown-menu ${categoriesDropdownOpen ? 'show' : ''}`} aria-labelledby="categoriesDropdown">
                                    {categorias.map((categoria) => (
                                        <li key={categoria.id}>
                                            <button className="dropdown-item" onClick={() => handleCategoryClick(categoria.id)}>
                                                {categoria.nombre}
                                            </button>
                                            <hr className="dropdown-divider" />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/catalogo" onClick={handleCatalogoClick}>Catalogo</NavLink>
                            </li>
                            {login.isAuth && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cart">Carrito</NavLink>
                                </li>
                            )}
                            {!login.isAuth && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Inicio Sesion</NavLink>
                                </li>
                            )}
                        </ul>
                        {login.isAuth && (
                            <div className="nav-item dropdown custom-dropdown">
                                <button
                                    className="btn btn-outline-success dropdown-toggle custom-dropdown-button"
                                    onClick={toggleDropdown}
                                    aria-expanded={dropdownOpen ? "true" : "false"}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                                <ul className={`dropdown-menu custom-dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="/detalles-pedido" onClick={closeDropdown}>Detalles de Pedido</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" to="/actualizar-correo" onClick={closeDropdown}>Actualizar Correo</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" to="/actualizar-username" onClick={closeDropdown}>Actualizar Username</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li> 
                                    <li><NavLink className="dropdown-item" to="/actualizar-datos-generales" onClick={closeDropdown}>Actualizar Datos Generales</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={() => { handlerLogout(); closeDropdown(); }}>Logout</button></li>
                                </ul>
                            </div>
                        )}
                        <span className="nav-item nav-link text-primary mx-3">
                            {login.user?.username}
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};
