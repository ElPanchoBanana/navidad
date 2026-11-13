const gifts = [
  {
    title: "Afilador De Navaja Leatherman",
    note: "Afilar mi navaja",
    link: "https://leatherman.com.mx/products/afilador-de-navaja-leatherman?variant=41898005758007",
    image: "https://leatherman.com.mx/cdn/shop/files/LEA-019-001_all_1200x1200.jpg?v=1779984278",
  },
  {
    title: "Pinzas de corte ",
    note: "klein tools",
    link: "https://www.amazon.com.mx/Klein-1025-Pinzas-Pelacables-Multiusos/dp/B0FH3BFDS7?ref_=ast_sto_dp&th=1",
    image: "https://m.media-amazon.com/images/I/5102tA+WDlL._AC_SX679_.jpg",
  },
  {
    title: "Brujas: Historia de una persecución ",
    note: "Libro",
    link: "https://www.amazon.com.mx/Brujas-Historia-Persecuci%C3%B3n-Fractales-Mexicanos/dp/6071441064/ref=sr_1_35?dib=eyJ2IjoiMSJ9.84Ua9L41gvze1NmoBIomeUHSbTXiL_0yhK9yFcT625ZPyZBwFOzJKXfbFRgaBKYFShVg6_Z8At_xBLVmSsbVa5VDVDd7sD6k4O4ar921dG7PeO4fWv0PBbvdh9g9pkZckU84UbQJPU7S8Im7olat0tlx2wxtmJAos2H9VQwcbjy_sDWGQBJ9y8M3ERBthWWtfjiq29u8JB7baNGWF_-cDxWDPPgsbEQ8TsU-jRCykqB0VMGdu4CgRJ-PPpbfZtVCaoyd0JjKxWk4OQD0nJd02Lg4qetVBzrh_obudyKeJ0c.iAY1gOO9Wiieh-svVCxXboyOGAFWbnaOAIVIKgXNSak&dib_tag=se&keywords=libros&qid=1794494963&sr=8-35&ufe=app_do%3Aamzn1.fos.de93fa6a-174c-4df7-be7c-5bc8e9c5a71b",
    image: "https://m.media-amazon.com/images/I/81MPVsbYeFL._SY466_.jpg",
  },
  {
    title: "Kit de 10 puntas intercambiables",
    note: "Leatherman",
    link: "https://leatherman.com.mx/products/kit-de-10-puntas-intercambiables?variant=41898008903735",
    image: "https://leatherman.com.mx/cdn/shop/files/LEA-017-018_2_negro.jpg?v=1759275454",
  },
  {
    title: "Insertos cortadores",
    note: "Leatherman",
    link: "https://leatherman.com.mx/products/insertos-cortadores?variant=41898015096887",
    image: "https://leatherman.com.mx/cdn/shop/products/LEA-017-003_plata.png?v=1759257206",
  },
];

function nextDate(month, day) {
  const now = new Date();
  let t = new Date(now.getFullYear(), month, day);
  if (t.getTime() <= now.getTime()) t = new Date(now.getFullYear() + 1, month, day);
  return t;
}

function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function renderCountdown() {
  const root = document.getElementById("countdown");
  const items = [
    { label: "🎄 Navidad (25 dic)", target: nextDate(11, 25) },
    { label: "🎆 Año Nuevo (1 ene)", target: nextDate(0, 1) },
  ];

  function paint() {
    const now = Date.now();
    root.innerHTML = items
      .map((item) => {
        const p = parts(item.target.getTime() - now);
        return (
          '<div class="border border-border bg-muted p-2 text-center">' +
          '<div class="font-bold text-primary">' +
          item.label +
          "</div>" +
          '<div class="font-mono text-lg text-accent">' +
          p.d +
          " días</div>" +
          '<div class="font-mono">' +
          String(p.h).padStart(2, "0") +
          ":" +
          String(p.m).padStart(2, "0") +
          ":" +
          String(p.s).padStart(2, "0") +
          "</div></div>"
        );
      })
      .join("");
  }

  paint();
  setInterval(paint, 1000);
}

function renderWishlist() {
  const root = document.getElementById("wishlist");
  gifts.forEach((g) => {
    const a = document.createElement("a");
    a.href = g.link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "win-bevel mb-2 flex gap-2 p-2 hover:bg-highlight";
    a.innerHTML =
      '<img src="' +
      g.image +
      '" alt="' +
      g.title.replace(/"/g, "&quot;") +
      '" class="win-inset h-16 w-16 bg-white object-contain" />' +
      "<div>" +
      '<div class="font-bold text-primary underline">🎁 ' +
      g.title +
      "</div>" +
      '<div class="text-muted-foreground">' +
      g.note +
      "</div>" +
      '<div class="text-accent">» Ver regalo</div>' +
      "</div>";
    root.appendChild(a);
  });
}

function renderSnow() {
  const snow = document.getElementById("snow");
  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");
    span.className = "retro-snow";
    span.textContent = i % 3 ? "❄" : "*";
    span.style.left = Math.random() * 100 + "%";
    span.style.animationDuration = 6 + Math.random() * 8 + "s";
    span.style.animationDelay = -Math.random() * 10 + "s";
    snow.appendChild(span);
  }
}

function setupWelcome() {
  const overlay = document.getElementById("welcome-overlay");
  const close = () => {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
  };
  document.getElementById("welcome-x").addEventListener("click", close);
  document.getElementById("welcome-ok").addEventListener("click", close);
}

function setupMusic() {
  const audio = document.getElementById("bg-music");
  const playAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener("click", playAudio);
  };
  document.addEventListener("click", playAudio);
}

renderSnow();
renderCountdown();
renderWishlist();
setupWelcome();
setupMusic();
