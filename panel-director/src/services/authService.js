const LOGIN_URL =
    "https://microservicio-usuarios-gsbhdjavc9fjf9a8.brazilsouth-01.azurewebsites.net/api/v1/auth/login/";

export async function login(cedula, password) {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cedula: cedula,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error("Credenciales incorrectas");
    }

    return response.json();
}
