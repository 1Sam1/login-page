import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const menuContainer = document.querySelector(".nav-links");

function updateMenu(user) {
  if (!menuContainer) return;

  menuContainer.innerHTML = ""; // Clear existing menu

  // Common menu items
  const items = [
    { name: "Home", href: "index.html" },
    { name: "About", href: "about.html" },
    { name: "Services", href: "services.html" },
    { name: "Contact", href: "contact.html" },
    { name: "Privacy Policy", href: "privacy.html" },
  ];

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.href}">${item.name}</a>`;
    menuContainer.appendChild(li);
  });

  if (user) {
    // Logged in: My Account + Logout
    const li1 = document.createElement("li");
    li1.innerHTML = `<a href="profile.html">My Account</a>`;
    menuContainer.appendChild(li1);

    const li2 = document.createElement("li");
    li2.innerHTML = `<a href="#" id="logoutLink">Logout</a>`;
    menuContainer.appendChild(li2);

    // Logout click
    const logoutLink = document.getElementById("logoutLink");
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.href = "login.html";
      });
    });

  } else {
    // Not logged in: show Login / Register
    const li = document.createElement("li");
    li.innerHTML = `<a href="login.html">Login</a>`;
    menuContainer.appendChild(li);
  }
}

// Listen for auth changes
onAuthStateChanged(auth, (user) => {
  updateMenu(user);
});
