import React from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import "../css/compraConfirmada.css";
import logoEmpresa from "../images/logoEmpresa.jpg";

export const CompraConfirmada = () => {
    const location = useLocation();
    const { factura } = location.state || {};

    if (!factura) {
        return <div>Información de la factura no disponible.</div>;
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        // Añadir logo de la empresa
        doc.addImage(logoEmpresa, 'JPEG', 160, 4, 40, 40); // Ajusta las coordenadas y el tamaño según tus necesidades

        // Add company logo and information
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Nombre de la Empresa', 10, 20);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Dirección de la Empresa', 10, 30);
        doc.text('Teléfono: 123-456-789', 10, 35);
        doc.text('Email: empresa@example.com', 10, 40);

        // Add a line separator
        doc.line(10, 45, 200, 45);

        // Add customer details
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Datos del Cliente', 10, 55);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre Completo: ${factura.nombreCliente || ''} ${factura.primerApellidoCliente || ''} ${factura.segundoApellidoCliente || ''}`, 10, 65);
        doc.text(`Dirección: ${factura.tipoVia || ''}, ${factura.domicilio || ''} ${factura.numero || ''}, ${factura.piso || ''} ${factura.ciudad || ''} (${factura.codigoPostal || ''})`, 10, 70);
        doc.text(`Teléfono: ${factura.telefonoCliente || ''}`, 10, 75);
        doc.text(`Email: ${factura.emailCliente || ''}`, 10, 80);

        // Add payment details
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Datos de Pago', 10, 90);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Titular de la tarjeta: ${factura.nombreCompletoTitular || ''}`, 10, 100);
        doc.text(`Número de tarjeta: ${factura.numeroTarjeta || ''}`, 10, 105);
        doc.text(`Fecha de vencimiento: ${factura.fechaExpiracion || ''}`, 10, 110);

        // Add order summary
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Resumen del Pedido', 10, 120);

        const tableColumn = ["Producto", "Precio", "Cantidad", "Subtotal"];
        const tableRows = [];

        factura.carrito.forEach(producto => {
            const productoData = [
                producto.nombre,
                `${producto.precio?.toFixed(2) || 'N/A'}€`,
                producto.cantidad || 'N/A',
                `${producto.precio && producto.cantidad ? (producto.precio * producto.cantidad).toFixed(2) : 'N/A'}€`,
            ];
            tableRows.push(productoData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 130,
            styles: { fontSize: 12 },
            headStyles: { fillColor: [22, 160, 133] },
            margin: { top: 10 },
        });

        const finalY = doc.previousAutoTable.finalY;

        // Add total summary
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: ${factura.total?.toFixed(2) || 'N/A'}€`, 10, finalY + 15);

        doc.save('factura.pdf');
    };

    return (
        <div className="compra-confirmada-container">
            <h1>Muchas gracias por realizar su compra con nosotros</h1>
            <h3>Hemos mandado toda la información relativa al pedido a su correo electrónico.</h3>
            <p>Si lo desea puede descargar su factura aqui</p>
            <button className="button-download" onClick={handleDownloadPDF}>Descargar PDF</button>

            <div id="factura" style={{ display: 'none' }}>
                <h2>Factura</h2>
                <h3>Datos del cliente</h3>
                <p><strong>Nombre Completo:</strong> {`${factura.nombreCliente || ''} ${factura.primerApellidoCliente || ''} ${factura.segundoApellidoCliente || ''}`}</p>
                <p><strong>Dirección:</strong> {`${factura.tipoVia || ''}, ${factura.domicilio || ''} ${factura.numero || ''}, ${factura.piso || ''} ${factura.ciudad || ''} (${factura.codigoPostal || ''})`}</p>
                <p><strong>Teléfono:</strong> {factura.telefonoCliente || ''}</p>
                <p><strong>Email:</strong> {factura.emailCliente || ''}</p>
                <h3>Datos de pago</h3>
                <p><strong>Titular de la tarjeta:</strong> {factura.nombreCompletoTitular || ''}</p>
                <p><strong>Número de tarjeta:</strong> {factura.numeroTarjeta || ''}</p>
                <p><strong>Fecha de vencimiento:</strong> {factura.fechaExpiracion || ''}</p>
                <h3>Resumen del pedido</h3>
                <table className="compra-confirmada-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {factura.carrito && factura.carrito.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio?.toFixed(2) || 'N/A'}€</td>
                                <td>{producto.cantidad || 'N/A'}</td>
                                <td>{producto.precio && producto.cantidad ? (producto.precio * producto.cantidad).toFixed(2) : 'N/A'}€</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3"><strong>Total</strong></td>
                            <td><strong>{factura.total?.toFixed(2) || 'N/A'}€</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
