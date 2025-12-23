import axios from "axios";

/* ===========================
   ENDPOINTS
=========================== */
const PRESTAMOS_URL =
    "https://microservicio-gestionprestamo-fmcxb0gvcshag6av.brazilsouth-01.azurewebsites.net/api/prestamos/";

const USUARIOS_URL =
    "https://microservicio-usuarios-gsbhdjavc9fjf9a8.brazilsouth-01.azurewebsites.net/api/v1/usuarios/";

const INVENTARIO_URL =
    "https://microservicio-gestioninventario-e7byadgfgdhpfyen.brazilsouth-01.azurewebsites.net/api/equipos/";

/* ===========================
   HEADERS
=========================== */
const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ===========================
   HELPERS
=========================== */
const getUsuario = async (id) => {
    if (!id) return null;
    try {
        const r = await axios.get(`${USUARIOS_URL}${id}/`, {
            headers: authHeaders(),
        });
        return r.data;
    } catch {
        return null;
    }
};

const getEquipo = async (id) => {
    if (!id) return null;
    try {
        const r = await axios.get(`${INVENTARIO_URL}${id}/`, {
            headers: authHeaders(),
        });
        return r.data;
    } catch {
        return null;
    }
};

/* ===========================
   MAIN
=========================== */
export const obtenerHistorialPrestamos = async () => {
    let prestamos = [];

    try {
        const r = await axios.get(PRESTAMOS_URL, {
            headers: authHeaders(),
        });
        prestamos = Array.isArray(r.data) ? r.data : r.data.results ?? [];
    } catch (e) {
        console.error("❌ Error obteniendo préstamos", e);
        return [];
    }

    return Promise.all(
        prestamos.map(async (p) => {
            const estudianteData = await getUsuario(p.usuario_id);
            const docenteData = await getUsuario(p.registrado_por_id);
            const equipoData = await getEquipo(p.equipo_id);

            return {
                id: p.id,

                // 🔹 NOMBRES (YA FUNCIONABAN – NO SE TOCAN)
                estudiante: estudianteData
                    ? `${estudianteData.first_name} ${estudianteData.last_name}`
                    : "N/D",

                docente: docenteData
                    ? `${docenteData.first_name} ${docenteData.last_name}`
                    : "N/D",

                equipo: equipoData?.nombre ?? "Equipo no disponible",

                // 🔹 FECHAS (AQUÍ ESTABA EL ERROR)
                fecha_inicio: p.fecha_inicio ?? null,
                fecha_compromiso: p.fecha_compromiso ?? null, // 🔥 ESTA LÍNEA FALTABA

                estado: p.estado ?? "N/D",
            };
        })
    );
};

/* ===========================
   ELIMINAR PRÉSTAMO + DEVOLUCIÓN
=========================== */

const DEVOLUCIONES_URL =
    "https://microservicio-gestiondevolucion-ddbychb0a8anbwc8.brazilsouth-01.azurewebsites.net/devoluciones/";

export const eliminarPrestamoCompleto = async (prestamoId) => {
    // 🔹 eliminar devolución asociada (si existe)
    try {
        await axios.delete(`${DEVOLUCIONES_URL}?prestamo_id=${prestamoId}`, {
            headers: authHeaders(),
        });
    } catch (e) {
        console.warn("ℹ️ No existía devolución para este préstamo");
    }

    // 🔹 eliminar préstamo
    await axios.delete(`${PRESTAMOS_URL}${prestamoId}/`, {
        headers: authHeaders(),
    });
};