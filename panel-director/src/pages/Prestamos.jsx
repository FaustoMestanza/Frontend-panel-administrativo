import { useEffect, useState } from "react";
import "./Prestamos.css";
import {
    obtenerHistorialPrestamos,
    eliminarPrestamoCompleto,
} from "../services/prestamosService";

/* ===========================
   FORMATEO FECHA
=========================== */
const formatearFecha = (fecha) => {
    if (!fecha || fecha === "—") return "—";
    const d = new Date(fecha);
    return d.toLocaleString("es-EC", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function Prestamos() {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEquipo, setFiltroEquipo] = useState("");

    /* ===========================
       CARGA DATOS
    =========================== */
    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerHistorialPrestamos();
                setPrestamos(data);
            } catch (e) {
                console.error("❌ Error cargando préstamos", e);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    /* ===========================
       ELIMINAR PRÉSTAMO
    =========================== */
    const eliminar = async (id) => {
        if (!window.confirm("¿Está seguro de eliminar este préstamo?")) return;

        try {
            await eliminarPrestamoCompleto(id);
            setPrestamos((prev) => prev.filter((p) => p.id !== id));
        } catch (e) {
            alert("❌ Error eliminando el préstamo");
        }
    };

    /* ===========================
       FILTRO POR EQUIPO
    =========================== */
    const prestamosFiltrados = prestamos.filter((p) =>
        p.equipo?.toLowerCase().includes(filtroEquipo.toLowerCase())
    );

    if (loading) {
        return <p style={{ padding: 20 }}>Cargando historial…</p>;
    }

    return (
        <div className="tabla-container">
            <h1>Historial de Préstamos</h1>

            {/* 🔍 FILTRO */}
            <input
                type="text"
                placeholder="Buscar por nombre de equipo..."
                value={filtroEquipo}
                onChange={(e) => setFiltroEquipo(e.target.value)}
                style={{
                    marginBottom: 15,
                    padding: 8,
                    width: 300,
                }}
            />

            <table className="tabla">
                <thead>
                    <tr>
                        <th>Equipo</th>
                        <th>Estudiante</th>
                        <th>Docente (recibe)</th>
                        <th>Fecha inicio</th>
                        <th>Fecha compromiso</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {prestamosFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No hay préstamos registrados
                            </td>
                        </tr>
                    ) : (
                        prestamosFiltrados.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    {p.equipo !== "N/D"
                                        ? p.equipo
                                        : "Equipo no disponible"}
                                </td>
                                <td>{p.estudiante}</td>
                                <td>{p.docente}</td>
                                <td>{formatearFecha(p.fecha_inicio)}</td>
                                <td>{formatearFecha(p.fecha_compromiso)}</td>
                                <td>{p.estado}</td>
                                <td>
                                    <button
                                        onClick={() => eliminar(p.id)}
                                        style={{
                                            background: "#e74c3c",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 10px",
                                            borderRadius: 4,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
