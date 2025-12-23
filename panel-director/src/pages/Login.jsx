import { useState } from "react";
import { login } from "../services/authService";
import logo from "../assets/logo.png";

function Login() {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await login(cedula, password);

            const rol = data.user?.rol?.toLowerCase();
            if (rol !== "director") {
                setError("Acceso permitido solo para el Director");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.access);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.reload();
        } catch (err) {
            setError("Credenciales incorrectas o error de conexión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f4f6f9",
            }}
        >
            <div
                className="card shadow-lg p-5"
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    borderRadius: "14px",
                }}
            >
                {/* TITULOS */}
                <h2 className="text-center fw-bold mb-2">
                    Panel Administrativo
                </h2>
                <h5 className="text-center mb-1">
                    Gestión de Inventarios y Préstamos
                </h5>
                <p className="text-center text-muted mb-4">
                    Patrick Elementary School
                </p>

                {/* LOGO */}
                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="Logo Institucional"
                        style={{ width: "120px" }}
                    />
                </div>

                {/* ERROR */}
                {error && (
                    <div className="alert alert-danger text-center">
                        {error}
                    </div>
                )}

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Cédula
                        </label>
                        <input
                            className="form-control form-control-lg"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="btn btn-primary btn-lg w-100"
                        disabled={loading}
                    >
                        {loading ? "Verificando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="text-center text-muted mt-4" style={{ fontSize: "13px" }}>
                    Acceso exclusivo para personal autorizado
                </p>
            </div>
        </div>
    );
}

export default Login;
