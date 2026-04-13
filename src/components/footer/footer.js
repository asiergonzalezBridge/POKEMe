export function renderFooter() {
  const container = document.getElementById("footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="app-footer">
      <p>© 2026 POKEMe</p>
      <p>Hecho por Asier González</p>
    </footer>
  `;
}