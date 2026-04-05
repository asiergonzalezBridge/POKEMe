const KEYS = {
  USERS: "users",
  LOGGED_USER: "loggedUser"
};

// USERS
export function getUsers() {
  return JSON.parse(localStorage.getItem(KEYS.USERS)) || [];
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

// LOGGED USER
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(KEYS.LOGGED_USER));
}

export function setLoggedUser(user) {
  localStorage.setItem(KEYS.LOGGED_USER, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(KEYS.LOGGED_USER);
}

// SYNC
export function syncUser(user) {
  setLoggedUser(user);

  let users = getUsers();

  users = users.map(u =>
    u.username === user.username ? user : u
  );

  saveUsers(users);
}