const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = {
  // 1. Obtener Token
  async login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.access_token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", data.access_token);
      }
    }
    return data;
  },

  getHeaders() {
    let token = "";
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("token") || "";
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  },

  // 2. Obtener Ventas Históricas
  async getSales() {
    const res = await fetch(`${API_URL}/sales`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error("No autorizado");
    return res.json();
  },

  // 3. Pronóstico Predictivo ML
  async predictSales(dateStr: string) {
    const res = await fetch(`${API_URL}/predict-sales?date_str=${dateStr}`, {
      headers: this.getHeaders(),
    });
    return res.json();
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
};
