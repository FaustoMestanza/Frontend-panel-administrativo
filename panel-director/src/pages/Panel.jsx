import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Inventario from "./Inventario";
import Prestamos from "./Prestamos";

function Panel() {
    const [vista, setVista] = useState("inventario");

    return (
        <div style={{ display: "flex" }}>
            <Sidebar setVista={setVista} />

            <div
                style={{
                    flex: 1,
                    padding: "30px",
                    backgroundColor: "#f4f6f9",
                    minHeight: "100vh",
                }}
            >
                {vista === "inventario" && <Inventario />}
                {vista === "prestamos" && <Prestamos />}
            </div>
        </div>
    );
}

export default Panel;
