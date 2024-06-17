import React from 'react';

export const TipoVia = ({ register, errors }) => {
    const tiposVia = [
        "Calle", "Avenida", "Plaza", "Carretera", "Paseo",
        "Camino", "Boulevard", "Rambla", "Ronda", "Travesía",
        "Pasaje", "Rúa", "Alameda", "Vía", "Autopista",
        "Calzada", "Vereda", "Cuesta", "Colonia", "Glorieta"
    ];

    return (
        <div>
            <select id="tipoVia" className="form-control custom-select" {...register("tipoVia", { required: "Debe seleccionar un tipo de vía" })}>
                <option value="">Seleccionar tipo de vía...</option>
                {tiposVia.map((tipo, index) => (
                    <option key={index} value={tipo}>{tipo}</option>
                ))}
            </select>
            {errors.tipoVia && <p className="text-danger">{errors.tipoVia.message}</p>}
        </div>
    );
};
