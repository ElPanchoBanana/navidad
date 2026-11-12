(() => {
  const STORAGE_KEY = "club-penguin-wishlist-2000";

  /* —— Snow —— */
  const snow = document.getElementById("snow");
  if (snow) {
    const count = window.matchMedia("(max-width: 640px)").matches ? 28 : 48;
    for (let i = 0; i < count; i += 1) {
      const flake = document.createElement("span");
      flake.className = "flake";
      const size = 3 + Math.random() * 6;
      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
      flake.style.animationDuration = `${7 + Math.random() * 12}s`;
      flake.style.animationDelay = `${-Math.random() * 12}s`;
      flake.style.opacity = String(0.45 + Math.random() * 0.5);
      snow.appendChild(flake);
    }
  }

  /* —— Rooms —— */
  const status = document.getElementById("room-status");
  const rooms = document.querySelectorAll(".room");
  const phrases = [
    "¡Entraste a {room}! Hay pingüinos jugando por todos lados.",
    "Bienvenido a {room}. Se escucha música lejana y nieve cayendo.",
    "Estás en {room}. Un puffle pasó corriendo… ¡síguelo!",
    "{room} te recibe con luces navideñas y amigos nuevos.",
  ];

  rooms.forEach((btn) => {
    btn.addEventListener("click", () => {
      rooms.forEach((r) => r.classList.remove("is-active"));
      btn.classList.add("is-active");
      const room = btn.dataset.room || "la isla";
      const phrase = phrases[Math.floor(Math.random() * phrases.length)].replace("{room}", room);
      if (status) status.textContent = phrase;
    });
  });

  /* —— Wishlist —— */
  const form = document.getElementById("wish-form");
  const input = document.getElementById("wish-input");
  const list = document.getElementById("wish-list");
  const empty = document.getElementById("wish-empty");

  function loadWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveWishes(wishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }

  function render() {
    if (!list || !empty) return;
    const wishes = loadWishes();
    list.innerHTML = "";
    empty.classList.toggle("is-hidden", wishes.length > 0);

    wishes.forEach((text, index) => {
      const li = document.createElement("li");
      li.className = "wish-item";

      const label = document.createElement("span");
      label.textContent = text;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Quitar";
      remove.setAttribute("aria-label", `Quitar deseo: ${text}`);
      remove.addEventListener("click", () => {
        const next = loadWishes().filter((_, i) => i !== index);
        saveWishes(next);
        render();
      });

      li.append(label, remove);
      list.appendChild(li);
    });
  }

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      const wishes = loadWishes();
      wishes.push(value);
      saveWishes(wishes);
      input.value = "";
      input.focus();
      render();
    });
  }

  render();
})();
