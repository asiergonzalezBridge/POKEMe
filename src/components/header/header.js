import { getLoggedUser, logout as storageLogout } from "../../infrastructure/storageManager.js";

export function renderHeader(currentPage) {
  const container = document.getElementById("header");
  if (!container) return;

  const user = getLoggedUser();

  container.innerHTML = `
  <header class="app-header">
    <h1 class="logo">POKEMe</h1>

    <nav class="nav-buttons">
      <button id="go-dashboard" class="poke-btn ${currentPage === "dashboard" ? "active-btn" : ""}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="poke-icon">
        Dashboard
      </button>

      <button id="go-profile" class="poke-btn ${currentPage === "profile" ? "active-btn" : ""}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="poke-icon">
        Perfil
      </button>

      ${user ? `
        <button id="logout" class="poke-btn">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="poke-icon">
          Cerrar Sesión
        </button>
      ` : ""}
    </nav>
  </header>
`;

  initHeaderEvents();
}

function initHeaderEvents() {
  const dashboardBtn = document.getElementById("go-dashboard");
  const profileBtn = document.getElementById("go-profile");
  const logoutBtn = document.getElementById("logout");

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
      window.location.href = "../../pages/dashboard/dashboard.html";
    });
  }

  if (profileBtn) {
    profileBtn.addEventListener("click", () => {
      window.location.href = "../../pages/profile/profile.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      storageLogout();
      window.location.href = "../../../index.html";
    });
  }
}