import { getPokemonByType, getPokemonByName } from "../../js/services/api.js";
import { getLoggedUser, syncUser, logout as storageLogout } from "../../infrastructure/storageManager.js";

export function initButtons({ renderAvatar, renderTeam, renderStats, generateRandomTeam }) {

  // CHANGE TEAM
  const changeTeamBtn = document.getElementById("change-team");

  if (changeTeamBtn) {
    changeTeamBtn.addEventListener("click", async () => {
      const user = getLoggedUser();
      if (!user) return;

      user.pokeTeam = generateRandomTeam();
      syncUser(user);

      const teamPokemons = await Promise.all(
        user.pokeTeam.map(id => getPokemonByName(id))
      );

      renderTeam(teamPokemons);
      renderStats(teamPokemons);
    });
  }

  // CHANGE AVATAR
  const changeAvatarBtn = document.getElementById("change-avatar");

  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener("click", async () => {
      const user = getLoggedUser();
      if (!user) return;

      const names = await getPokemonByType(user.pokeType);
      const randomIndex = Math.floor(Math.random() * names.length);

      user.avatar = names[randomIndex];
      syncUser(user);

      const avatarPokemon = await getPokemonByName(user.avatar);

      if (!avatarPokemon) {
        console.error("Pokemon no encontrado:", user.avatar);
        return;
      }

      renderAvatar(avatarPokemon);
    });
  }

  // LOGOUT
  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      storageLogout();
      window.location.href = "../../index.html";
    });
  }
  // GO TO PROFILE
const profileBtn = document.getElementById("go-profile");

if (profileBtn) {
  profileBtn.addEventListener("click", () => {
    window.location.href = "../../pages/profile/profile.html";
  });
}
}