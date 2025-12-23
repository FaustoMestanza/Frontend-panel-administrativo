import logo from "../assets/logo.png";

function Sidebar({ setVista }) {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div
            style={{
                width: "250px",
                backgroundColor: "#2c3e50",
                color: "white",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ width: "90px" }} />

                <h6 className="mt-2 mb-0">
                    Patrick Elementary School
                </h6>

                <small style={{ color: "#dcdde1" }}>
                    {user?.first_name} {user?.last_name}
                </small>
            </div>

            <hr style={{ borderColor: "#7f8c8d" }} />

            <button
                className="btn btn-link text-start text-white w-100"
                onClick={() => setVista("inventario")}
            >
                📦 Inventario
            </button>

            <button
                className="btn btn-link text-start text-white w-100"
                onClick={() => setVista("prestamos")}
            >
                🔄 Préstamos
            </button>

            <hr style={{ borderColor: "#7f8c8d" }} />

            <button
                className="btn btn-danger w-100 mt-3"
                onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }}
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Sidebar;
