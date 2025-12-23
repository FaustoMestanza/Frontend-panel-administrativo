import { useEffect, useState } from "react";
import {
    listarInventario,
    actualizarEquipo,
    eliminarEquipo,
} from "../services/inventarioService";

function Inventario() {
    const [equipos, setEquipos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        codigo: "",
        nombre: "",
        categoria: "",
        estado: "",
        ubicacion: "",
    });

    useEffect(() => {
        cargarInventario();
    }, []);

    const cargarInventario = async () => {
        const data = await listarInventario();
        setEquipos(data);
    };

    const iniciarEdicion = (e) => {
        setEditandoId(e.id);
        setForm({
            codigo: e.codigo,
            nombre: e.nombre,
            categoria: e.categoria,
            estado: e.estado,
            ubicacion: e.ubicacion,
        });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setForm({
            codigo: "",
            nombre: "",
            categoria: "",
            estado: "",
            ubicacion: "",
        });
    };

    const guardarCambios = async (id) => {
        await actualizarEquipo(id, {
            codigo: form.codigo,
            nombre: form.nombre,
            categoria: form.categoria,
            estado: form.estado,
            ubicacion: form.ubicacion,
        });

        cancelarEdicion();
        cargarInventario();
    };

    const eliminar = async (id) => {
        const ok = window.confirm(
            "¿Está seguro de dar de baja este equipo?"
        );
        if (!ok) return;

        await eliminarEquipo(id);
        cargarInventario();
    };

    const equiposFiltrados = equipos.filter((e) =>
        `${e.codigo} ${e.nombre}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <h3 className="mb-3">Inventario</h3>

            <input
                className="form-control mb-3"
                placeholder="Buscar por código o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <table className="table table-bordered table-hover">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {equiposFiltrados.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.codigo}</td>

                            <td>
                                {editandoId === e.id ? (
                                    <input
                                        className="form-control"
                                        value={form.nombre}
                                        onChange={(ev) =>
                                            setForm({ ...form, nombre: ev.target.value })
                                        }
                                    />
                                ) : (
                                    e.nombre
                                )}
                            </td>

                            <td>{e.categoria}</td>

                            <td>
                                {editandoId === e.id ? (
                                    <select
                                        className="form-select"
                                        value={form.estado}
                                        onChange={(ev) =>
                                            setForm({ ...form, estado: ev.target.value })
                                        }
                                    >
                                        <option value="Disponible">Disponible</option>
                                        <option value="Prestado">Prestado</option>
                                        <option value="Baja">Baja</option>
                                    </select>
                                ) : (
                                    e.estado
                                )}
                            </td>

                            <td>
                                {editandoId === e.id ? (
                                    <input
                                        className="form-control"
                                        value={form.ubicacion}
                                        onChange={(ev) =>
                                            setForm({ ...form, ubicacion: ev.target.value })
                                        }
                                    />
                                ) : (
                                    e.ubicacion
                                )}
                            </td>

                            <td>
                                {editandoId === e.id ? (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => guardarCambios(e.id)}
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={cancelarEdicion}
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => iniciarEdicion(e)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminar(e.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Inventario;
