const hideWaterJug = (waterJug) => { waterJug.classList.add("hide"); };
const appearWaterJug = (waterJug) => { setTimeout(() => { waterJug.classList.remove("hide"); }, 1000); };

const createLogoutButton = () => {
  const logoutButton = document.createElement("a");
  logoutButton.innerText = "Logout";
  logoutButton.classList.add("button");
  logoutButton.setAttribute("href", "/logout");
  return logoutButton;
};

const createLoginButton = () => {
  const loginButton = document.createElement("a");
  loginButton.innerText = "Login";
  loginButton.classList.add("button");
  loginButton.setAttribute("href", "/login");
  return loginButton;
};

const displayLogoutButton = (username) => {
  const headerElement = document.querySelector("header");
  const logoutContainer = document.createElement("div");
  const logoutButton = createLogoutButton();

  logoutContainer.innerText = `Welcome ${username}`;
  logoutContainer.classList.add("black");
  logoutContainer.append(logoutButton);
  headerElement.append(logoutContainer);
};

const displayLoginButton = () => {
  const headerElement = document.querySelector("header");
  const loginButton = createLoginButton();
  headerElement.append(loginButton);
};

const validateUser = () => {
  const cookie = document.cookie;
  const username = new URLSearchParams(cookie).get("username");

  if (username) {
    displayLogoutButton(username);
    return;
  }

  displayLoginButton();
};

const main = () => {
  const waterJug = document.querySelector("#water-jug");
  validateUser();

  waterJug.onclick = () => {
    hideWaterJug(waterJug);
    appearWaterJug(waterJug);
  };

};

window.onload = main;