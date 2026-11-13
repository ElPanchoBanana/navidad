/**
 * Cada pin: cambia `photo` por tu imagen (jpg/png/webp/svg).
 * Ejemplos: "photos/yaser.jpg" o una URL absoluta.
 * Coordenadas en lat/lng; MapLibre usa [lng, lat] por debajo.
 */
const places = [
  {
    id: "yetz",
    name: "Yetzrai",
    label: "Yetzrai",
    lat: 20.667888,
    lng: -103.270144,
    photo: "photos/yetz.png",
    href: "https://navida-lovat.vercel.app/",
  },
  {
    id: "yaser",
    name: "Yaser",
    label: "Yaser",
    lat: 20.668251,
    lng: -103.312812,
    photo: "photos/yaser.png",
    href: "/emo-sponge/",
  },
  {
    id: "luis-avalos",
    name: "L-Avalos",
    label: "L-Avalos",
    lat: 20.593646,
    lng: -103.372316,
    photo: "photos/luis-avalos.png",
    href: "/navidad-otaku/",
  },
  {
    id: "luis-juarez",
    name: "L-Juarez",
    label: "L-Juarez",
    lat: 20.77686,
    lng: -103.399438,
    photo: "photos/luis-juarez.png",
    href: "/thefacebook/",
  },
  {
    id: "ernesto",
    name: "Ernesto",
    label: "Ernesto",
    lat: 20.76096,
    lng: -103.3968,
    photo: "photos/ernesto.png",
    href: "/messenger-2000/",
  },
  {
    id: "adrian",
    name: "Adrian",
    label: "Adrian",
    lat: 20.798961,
    lng: -103.474481,
    photo: "photos/adrian.png",
    href: "/x-men-navideno/",
  },
];

function seedSnow() {
  const layer = document.getElementById("snow");
  const count = Math.min(36, Math.floor(window.innerWidth / 28));
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("span");
    flake.className = "flake";
    flake.textContent = i % 4 === 0 ? "❄" : "·";
    flake.style.left = Math.random() * 100 + "%";
    flake.style.animationDuration = 8 + Math.random() * 12 + "s";
    flake.style.animationDelay = -Math.random() * 12 + "s";
    flake.style.fontSize = 0.45 + Math.random() * 0.9 + "rem";
    layer.appendChild(flake);
  }
}

function makeMarkerElement(place) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "person-marker";
  el.title = place.label || place.name;
  el.setAttribute("aria-label", place.label || place.name);
  el.dataset.placeId = place.id;

  const tag = document.createElement("span");
  tag.className = "person-marker__label";
  tag.textContent = place.label || place.name;
  el.appendChild(tag);

  const img = document.createElement("img");
  img.className = "person-marker__img";
  img.src = place.photo;
  img.alt = place.label || place.name;
  img.decoding = "async";
  img.addEventListener("error", () => {
    el.classList.add("is-fallback");
    img.remove();
    const fallback = document.createElement("span");
    fallback.className = "person-marker__fallback";
    fallback.textContent = (place.label || place.name).slice(0, 2).toUpperCase();
    el.appendChild(fallback);
  });
  el.appendChild(img);

  el.addEventListener("click", () => {
    if (place.href) window.location.href = place.href;
  });

  return el;
}

function addPlaces(map) {
  const bounds = new maplibregl.LngLatBounds();

  places.forEach((place) => {
    const el = makeMarkerElement(place);
    const popupHtml = place.href
      ? `<strong>${place.name}</strong><br><span class="popup-link">Abrir página →</span>`
      : `<strong>${place.name}</strong><br><span class="popup-muted">Página pendiente</span>`;

    new maplibregl.Marker({ element: el, anchor: "center" })
      .setLngLat([place.lng, place.lat])
      .setPopup(
        new maplibregl.Popup({ offset: 32, closeButton: false }).setHTML(popupHtml)
      )
      .addTo(map);

    bounds.extend([place.lng, place.lat]);
  });

  if (places.length) {
    map.fitBounds(bounds, {
      padding: { top: 120, bottom: 64, left: 48, right: 48 },
      maxZoom: 12.5,
      duration: 900,
      pitch: 28,
      bearing: -8,
    });
  }
}

/**
 * Cambia el icono de un pin en vivo:
 * setPlacePhoto("yaser", "photos/mi-foto.jpg")
 */
function setPlacePhoto(id, photoUrl) {
  const place = places.find((p) => p.id === id);
  if (!place) return false;
  place.photo = photoUrl;
  const btn = document.querySelector(`.person-marker[data-place-id="${id}"]`);
  if (!btn) return true;
  btn.classList.remove("is-fallback");
  let img = btn.querySelector(".person-marker__img");
  if (!img) {
    btn.textContent = "";
    img = document.createElement("img");
    img.className = "person-marker__img";
    img.alt = place.name;
    btn.appendChild(img);
  }
  img.src = photoUrl;
  return true;
}

function initMap() {
  const map = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/fiord",
    center: [-103.3496, 20.6597],
    zoom: 10.5,
    pitch: 28,
    bearing: -12,
    attributionControl: true,
  });

  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
  map.addControl(new maplibregl.ScaleControl({ maxWidth: 120 }), "bottom-left");

  map.on("load", () => {
    addPlaces(map);
  });

  window.navidadMap = map;
  window.navidadPlaces = places;
  window.setPlacePhoto = setPlacePhoto;
}

function initHubMusic() {
  const theme = new Audio("assets/hub-theme.mp3");
  theme.loop = true;
  theme.preload = "auto";
  theme.volume = 0.65;

  const gate = document.getElementById("music-gate");
  const startBtn = document.getElementById("music-start");
  let unlocked = false;

  const lockMap = () => {
    unlocked = false;
    if (gate) {
      gate.classList.remove("is-gone");
      gate.setAttribute("aria-hidden", "false");
    }
    if (startBtn) {
      startBtn.disabled = false;
      startBtn.textContent = "► ESCUCHAR BURRITO SABANERO ◄";
    }
    document.body.classList.add("music-locked");
  };

  const unlockMap = () => {
    unlocked = true;
    if (gate) {
      gate.classList.add("is-gone");
      gate.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("music-locked");
  };

  const startMusic = () => {
    if (startBtn) {
      startBtn.disabled = true;
      startBtn.textContent = "CARGANDO…";
    }
    const p = theme.play();
    const fail = () => {
      if (startBtn) {
        startBtn.disabled = false;
        startBtn.textContent = "► ESCUCHAR BURRITO SABANERO ◄";
      }
      lockMap();
    };
    if (p && typeof p.then === "function") {
      return p
        .then(() => {
          unlockMap();
          if (startBtn) startBtn.textContent = "► ESCUCHAR BURRITO SABANERO ◄";
          return true;
        })
        .catch(fail);
    }
    if (!theme.paused) unlockMap();
    else fail();
    return Promise.resolve(unlocked);
  };

  // Obligatorio: el mapa queda bloqueado hasta que suene la canción
  lockMap();

  if (startBtn) {
    startBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      startMusic();
    });
  }

  theme.addEventListener("playing", unlockMap);
  theme.addEventListener("pause", () => {
    // Si deja de sonar, el mapa se bloquea otra vez
    if (!theme.ended) lockMap();
  });

  window.hubTheme = theme;
}

seedSnow();
initMap();
initHubMusic();
