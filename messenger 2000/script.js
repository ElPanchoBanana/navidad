/* MSN Messenger Navidad 2000 */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ----- Reloj bandeja -----
  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    $("#clock").textContent = `${h}:${m} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // ----- Nieve -----
  function makeSnow() {
    const layer = $("#snow");
    for (let i = 0; i < 40; i++) {
      const flake = document.createElement("span");
      flake.className = "flake";
      flake.textContent = Math.random() > 0.5 ? "❄" : "❅";
      flake.style.left = Math.random() * 100 + "%";
      flake.style.fontSize = 8 + Math.random() * 14 + "px";
      flake.style.animationDuration = 8 + Math.random() * 12 + "s";
      flake.style.animationDelay = Math.random() * 10 + "s";
      flake.style.opacity = 0.4 + Math.random() * 0.5;
      layer.appendChild(flake);
    }
  }
  makeSnow();

  // ----- Arrastrar ventanas -----
  function makeDraggable(win, handle) {
    let ox = 0, oy = 0, dragging = false;

    handle.addEventListener("mousedown", (e) => {
      if (e.target.closest(".tb-btn, .spam-x")) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      ox = e.clientX - rect.left;
      oy = e.clientY - rect.top;
      bringToFront(win);
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const x = Math.max(0, Math.min(e.clientX - ox, window.innerWidth - 80));
      const y = Math.max(0, Math.min(e.clientY - oy, window.innerHeight - 60));
      win.style.left = x + "px";
      win.style.top = y + "px";
      win.style.right = "auto";
      win.style.transform = "none";
    });

    document.addEventListener("mouseup", () => {
      dragging = false;
    });
  }

  let zCounter = 30;
  function bringToFront(win) {
    zCounter += 1;
    win.style.zIndex = zCounter;
  }

  makeDraggable($("#msn-window"), $("#msn-titlebar"));
  makeDraggable($("#chat-window"), $("#chat-titlebar"));
  makeDraggable($("#wishlist-window"), $("#wishlist-titlebar"));
  makeDraggable($("#spam-popup"), $(".spam-titlebar", $("#spam-popup")));
  makeDraggable($("#spam-popup-2"), $(".spam-titlebar", $("#spam-popup-2")));

  $$(".win").forEach((w) => {
    w.addEventListener("mousedown", () => bringToFront(w));
  });

  // ----- Grupos colapsables -----
  $$(".group-header").forEach((h) => {
    h.addEventListener("click", () => {
      const items = h.nextElementSibling;
      const open = items.style.display !== "none";
      items.style.display = open ? "none" : "";
      h.textContent = h.textContent.replace(open ? "▼" : "►", open ? "►" : "▼");
    });
  });

  // ----- Conversaciones predefinidas -----
  const chats = {
    Yaser: [
      { who: "them", text: "ola Ernesto" },
      { who: "them", text: "ya armaste tu lista de deseos?" },
      { who: "me", text: "casi, le falta un rato :P" },
      { who: "them", text: "jaja ok, luego la vemos 🎁" },
    ],
    Yetzrai: [
      { who: "them", text: "weeeey Ernesto" },
      { who: "them", text: "traes la PS2 el finde o q" },
      { who: "me", text: "si la llevo, lleva los juegos" },
      { who: "them", text: "va, ahi nos vemos :D" },
    ],
    Adrian: [
      { who: "them", text: "que onda" },
      { who: "them", text: "vas a la posada el viernes?" },
      { who: "me", text: "si voy, llevo ponche" },
      { who: "them", text: "perfecto, yo llevo los botanas" },
    ],
    Juarez: [
      { who: "them", text: "Ernesto!!!" },
      { who: "them", text: "ya salieron las luces en la plaza" },
      { who: "me", text: "a poco? luego pasamos a verlas" },
      { who: "them", text: "va, avisas :)" },
    ],
    Luis: [
      { who: "them", text: "ola" },
      { who: "them", text: "viste el partido ayer?" },
      { who: "me", text: "si, estuvo bueno jaja" },
      { who: "them", text: "el otro dia jugamos otra vez" },
    ],
    Gabriel: [
      { who: "them", text: "erneeesto" },
      { who: "them", text: "me pasas la tarea de mates?" },
      { who: "me", text: "nsp luego te la mando, estoy en eso" },
      { who: "them", text: "ok gracias :)" },
    ],
    Ana: [
      { who: "them", text: "Hola Ernesto" },
      { who: "them", text: "Feliz Navidad!!!! ❄️🎄" },
      { who: "me", text: "Feliz Navidad Ana!!" },
      { who: "them", text: "vas a la cena familiar o con los amigos?" },
    ],
    karen: [
      { who: "them", text: "hola" },
      { who: "them", text: "ya empacaste los regalos?" },
      { who: "me", text: "todavia no jaja me falta papel" },
      { who: "them", text: "yo tengo de mas, te presto el lunes" },
    ],
  };

  const replies = [
    "jajajaja siii :D",
    "nsp luego te digo",
    "va esta bien",
    "ok ok dale",
    "Feliz Navidad!!!! 🎄",
    "ya abriste tu lista de deseos?",
    "brb mi mama me llama",
    "lololol :P",
    "conectate luego al chat",
    "ese spam de feliz navidad me salio a mi tb jaja",
    "a que hora nos juntamos?",
    "traes el CD o lo quemamos aca?",
  ];

  let currentContact = null;

  function showChat(name, avatar, status) {
    currentContact = name;
    const win = $("#chat-window");
    win.classList.remove("hidden");
    $("#task-chat").classList.remove("hidden");
    $("#task-chat").classList.add("active");
    bringToFront(win);

    $("#chat-title").textContent = `Conversación con ${name}`;
    $("#chat-peer-name").textContent = name;
    $("#chat-avatar").textContent = avatar || "👤";

    const statusMap = {
      online: "En línea",
      busy: "Ocupado",
      away: "Ausente",
      offline: "Sin conexión",
    };
    $("#chat-peer-status").textContent = statusMap[status] || "En línea";
    $("#chat-peer-status").style.color =
      status === "online" ? "#00aa00" :
      status === "busy" ? "#cc0000" :
      status === "away" ? "#cc9900" : "#999";

    const box = $("#chat-messages");
    box.innerHTML = "";
    const history = chats[name] || [
      { who: "them", text: "ola! feliz navidad :)" },
    ];
    history.forEach((m) => appendMsg(m.who, name, m.text));
    box.scrollTop = box.scrollHeight;
  }

  function appendMsg(who, name, text) {
    const box = $("#chat-messages");
    const div = document.createElement("div");
    div.className = "msg";
    const label = who === "me" ? "Ernesto" : name;
    const cls = who === "me" ? "me" : "them";
    const now = new Date();
    const t = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`;
    div.innerHTML = `<span class="who ${cls}">${label} dice:</span><span class="time">(${t})</span><br><span class="text"></span>`;
    div.querySelector(".text").innerHTML = emotify(escapeHtml(text));
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function emotify(s) {
    const map = [
      [/:\)/g, "😊"],
      [/:D/gi, "😃"],
      [/;\)/g, "😉"],
      [/:P/gi, "😛"],
      [/:\(/g, "😞"],
      [/:O/gi, "😮"],
      [/\^\^/g, "😄"],
    ];
    let out = s;
    map.forEach(([re, emo]) => {
      out = out.replace(re, emo);
    });
    return out;
  }

  // Click / doble click en contactos
  $$(".contact").forEach((c) => {
    c.addEventListener("click", () => {
      $$(".contact").forEach((x) => x.classList.remove("selected"));
      c.classList.add("selected");
    });
    c.addEventListener("dblclick", () => {
      if (c.dataset.status === "offline") {
        alert("MSN Messenger\n\n" + c.dataset.name + " no está conectado.\nNo se puede iniciar la conversación.");
        return;
      }
      showChat(c.dataset.name, c.dataset.avatar, c.dataset.status);
    });
  });

  $("#btn-send-msg").addEventListener("click", () => {
    const sel = $(".contact.selected");
    if (!sel) {
      alert("MSN Messenger\n\nSelecciona un contacto primero.");
      return;
    }
    if (sel.dataset.status === "offline") {
      alert("MSN Messenger\n\n" + sel.dataset.name + " no está conectado.");
      return;
    }
    showChat(sel.dataset.name, sel.dataset.avatar, sel.dataset.status);
  });

  $("#btn-add-contact").addEventListener("click", () => {
    const name = prompt("MSN Messenger\n\nEscribe la dirección de correo del contacto:", "amigo@hotmail.com");
    if (name) {
      alert("MSN Messenger\n\nSe ha enviado una invitación a:\n" + name + "\n\n(Simulación Navidad 2000)");
    }
  });

  // Enviar mensaje
  function sendMessage() {
    const input = $("#chat-input");
    const text = input.value.trim();
    if (!text || !currentContact) return;
    appendMsg("me", currentContact, text);
    if (!chats[currentContact]) chats[currentContact] = [];
    chats[currentContact].push({ who: "me", text });
    input.value = "";

    $("#typing-status").textContent = currentContact + " está escribiendo…";
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      appendMsg("them", currentContact, reply);
      chats[currentContact].push({ who: "them", text: reply });
      $("#typing-status").innerHTML = "&nbsp;";
    }, 800 + Math.random() * 1800);
  }

  $("#btn-send").addEventListener("click", sendMessage);
  $("#chat-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  $$(".emo-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = $("#chat-input");
      input.value += (input.value && !input.value.endsWith(" ") ? " " : "") + btn.dataset.emo + " ";
      input.focus();
    });
  });

  $("#btn-emoticons").addEventListener("click", () => {
    alert(
      "Emoticones de MSN Messenger\n\n" +
      ":)  sonrisa\n:D  risa\n;)  guiño\n:P  lengua\n:(  triste\n:O  sorpresa\n^^  feliz\n\n" +
      "También: 🎄 🎁 ❄️\n\n" +
      "Acciones:\n📳 Zumbido — sacude la ventana\n🌋 Terremoto — sacudida fuerte"
    );
  });

  // ----- Audio (zumbido / terremoto) -----
  let audioCtx = null;
  function getAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(freq, start, dur, type, vol) {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.08, ctx.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.02);
  }

  function playNudgeSound() {
    try {
      // Beep-beep clásico del zumbido
      tone(520, 0, 0.12, "square", 0.1);
      tone(380, 0.14, 0.16, "square", 0.1);
      tone(520, 0.32, 0.1, "square", 0.08);
    } catch (_) { /* sin audio */ }
  }

  function playQuakeSound() {
    try {
      // Rumble más grave y largo
      tone(90, 0, 0.35, "sawtooth", 0.12);
      tone(60, 0.15, 0.4, "sawtooth", 0.1);
      tone(120, 0.35, 0.25, "square", 0.08);
      tone(70, 0.55, 0.35, "sawtooth", 0.1);
      tone(100, 0.85, 0.3, "sawtooth", 0.07);
    } catch (_) { /* sin audio */ }
  }

  function appendSystem(text, icon) {
    const box = $("#chat-messages");
    const div = document.createElement("div");
    div.className = "msg system";
    div.innerHTML = `<span class="sys-icon">${icon || "•"}</span>${escapeHtml(text)}`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function shakeWindow(el, className, duration) {
    el.classList.remove("nudge-shake", "quake-shake");
    // quitar transform inline (del arrastre) para que la animación funcione
    const prevTransform = el.style.transform;
    el.style.transform = "";
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => {
      el.classList.remove(className);
      if (prevTransform && prevTransform !== "none") {
        el.style.transform = prevTransform;
      }
    }, duration);
  }

  let nudgeBusy = false;
  let quakeBusy = false;

  function sendNudge() {
    if (!currentContact || nudgeBusy) return;
    const win = $("#chat-window");
    if (win.classList.contains("hidden")) return;

    nudgeBusy = true;
    $("#btn-nudge").disabled = true;

    appendSystem(`Has enviado un zumbido a ${currentContact}.`, "📳");
    playNudgeSound();
    shakeWindow(win, "nudge-shake", 600);

    // A veces el amigo responde con otro zumbido
    setTimeout(() => {
      if (!currentContact) return;
      appendSystem(`${currentContact} te ha enviado un zumbido.`, "📳");
      playNudgeSound();
      shakeWindow(win, "nudge-shake", 600);
    }, 1200 + Math.random() * 900);

    setTimeout(() => {
      nudgeBusy = false;
      $("#btn-nudge").disabled = false;
    }, 4000);
  }

  function sendQuake() {
    if (!currentContact || quakeBusy) return;
    const win = $("#chat-window");
    if (win.classList.contains("hidden")) return;

    quakeBusy = true;
    $("#btn-quake").disabled = true;

    appendSystem(`¡Has causado un TERREMOTO en la conversación con ${currentContact}!`, "🌋");
    playQuakeSound();
    shakeWindow(win, "quake-shake", 1500);

    // Respuesta del amigo
    setTimeout(() => {
      if (!currentContact) return;
      const reactions = [
        "jajaja se movio toda la ventana :O",
        "weeeey el terremoto oooora",
        "paraaa que se me mueve la pantalla :D",
        "jaja casi se cae mi monitor",
      ];
      const reply = reactions[Math.floor(Math.random() * reactions.length)];
      appendMsg("them", currentContact, reply);
      if (!chats[currentContact]) chats[currentContact] = [];
      chats[currentContact].push({ who: "them", text: reply });

      setTimeout(() => {
        appendSystem(`${currentContact} te ha enviado un terremoto de vuelta.`, "🌋");
        playQuakeSound();
        shakeWindow(win, "quake-shake", 1500);
      }, 700);
    }, 1600);

    setTimeout(() => {
      quakeBusy = false;
      $("#btn-quake").disabled = false;
    }, 7000);
  }

  $("#btn-nudge").addEventListener("click", sendNudge);
  $("#btn-quake").addEventListener("click", sendQuake);

  // Cerrar ventanas
  $("#btn-close-msn").addEventListener("click", () => {
    if (confirm("¿Deseas cerrar sesión en MSN Messenger?")) {
      $("#msn-window").classList.add("hidden");
      $("#task-msn").classList.add("hidden");
    }
  });

  $("#btn-close-chat").addEventListener("click", () => {
    $("#chat-window").classList.add("hidden");
    $("#task-chat").classList.add("hidden");
  });

  $("#btn-close-wishlist").addEventListener("click", () => {
    $("#wishlist-window").classList.add("hidden");
    $("#task-wish").classList.add("hidden");
  });

  // Reabrir desde icono / taskbar
  $("#icon-messenger").addEventListener("dblclick", () => {
    $("#msn-window").classList.remove("hidden");
    $("#task-msn").classList.remove("hidden");
    bringToFront($("#msn-window"));
  });

  $("#task-msn").addEventListener("click", () => {
    const w = $("#msn-window");
    w.classList.toggle("hidden");
    if (!w.classList.contains("hidden")) bringToFront(w);
  });

  $("#task-chat").addEventListener("click", () => {
    const w = $("#chat-window");
    w.classList.toggle("hidden");
    if (!w.classList.contains("hidden")) bringToFront(w);
  });

  $("#task-wish").addEventListener("click", () => {
    const w = $("#wishlist-window");
    w.classList.toggle("hidden");
    if (!w.classList.contains("hidden")) bringToFront(w);
  });

  // ----- Lista de deseos -----
  function openWishlist() {
    const w = $("#wishlist-window");
    w.classList.remove("hidden");
    $("#task-wish").classList.remove("hidden");
    $("#task-wish").classList.add("active");
    bringToFront(w);
  }

  $("#btn-wishlist").addEventListener("click", openWishlist);

  let pendingBuy = null;

  function openBuyAlert(item) {
    pendingBuy = item;
    $("#buy-alert-text").innerHTML =
      `¿Deseas comprar <strong>${escapeHtml(item)}</strong>?<br><br>` +
      `<small>Se abrirá Internet Explorer… (56k, por favor espera)</small>`;
    $("#buy-alert").classList.remove("hidden");
    bringToFront($("#buy-alert"));
  }

  $$(".buy-btn").forEach((btn) => {
    if (btn.id === "btn-add-wish") return;
    btn.addEventListener("click", () => openBuyAlert(btn.dataset.item));
  });

  $("#btn-confirm-buy").addEventListener("click", () => {
    $("#buy-alert").classList.add("hidden");
    alert(
      "MSN Shopping\n\n¡Gracias por tu compra de \"" +
      pendingBuy +
      "\"!\n\nTu pedido llegará entre el 24 y el 26 de diciembre de 2000.\n" +
      "(Si el modem no se cae)"
    );
    pendingBuy = null;
  });

  $("#btn-cancel-buy").addEventListener("click", () => {
    $("#buy-alert").classList.add("hidden");
    pendingBuy = null;
  });

  $("#btn-close-alert").addEventListener("click", () => {
    $("#buy-alert").classList.add("hidden");
  });

  $("#btn-add-wish").addEventListener("click", () => {
    const input = $("#new-wish");
    const val = input.value.trim();
    if (!val) return;
    const tbody = $("#wish-table tbody");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="wish-ico">✨</td>
      <td>${escapeHtml(val)}</td>
      <td>MSN Shopping</td>
      <td>$??.??</td>
      <td><button class="buy-btn" data-item="${escapeHtml(val)}">Comprar</button></td>
    `;
    tbody.appendChild(tr);
    tr.querySelector(".buy-btn").addEventListener("click", () => openBuyAlert(val));
    input.value = "";
  });

  $("#new-wish").addEventListener("keydown", (e) => {
    if (e.key === "Enter") $("#btn-add-wish").click();
  });

  // ----- POPUP SPAM -----
  function showSpam() {
    const spam = $("#spam-popup");
    spam.classList.remove("hidden");
    bringToFront(spam);

    // Sonido "ding" fake con Web Audio (beep corto)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.08;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.stop(ctx.currentTime + 0.3);
    } catch (_) { /* sin audio */ }
  }

  // Aparece tras unos segundos, como el spam de la época
  setTimeout(showSpam, 2500);

  $("#spam-close").addEventListener("click", () => {
    $("#spam-popup").classList.add("hidden");
    // Clásico: cerrar uno abre otro
    setTimeout(() => {
      $("#spam-popup-2").classList.remove("hidden");
      bringToFront($("#spam-popup-2"));
    }, 400);
  });

  $("#spam-deny").addEventListener("click", () => {
    $("#spam-popup").classList.add("hidden");
    setTimeout(() => {
      $("#spam-popup-2").classList.remove("hidden");
      bringToFront($("#spam-popup-2"));
    }, 300);
  });

  $("#spam-accept").addEventListener("click", () => {
    $("#spam-popup").classList.add("hidden");
    alert(
      "★ CONGRATULACIONES ★\n\n" +
      "¡Feliz Navidad y Próspero Año Nuevo!\n\n" +
      "Tu PlayStation 2 será enviada a tu buzón de Hotmail\n" +
      "en 5-7 días hábiles del año 2000.\n\n" +
      "(Este mensaje fue aprobado por Santa.exe)"
    );
    openWishlist();
  });

  $("#spam-close-2").addEventListener("click", () => {
    $("#spam-popup-2").classList.add("hidden");
  });

  $("#spam-accept-2").addEventListener("click", () => {
    $("#spam-popup-2").classList.add("hidden");
    alert(
      "Descargando SantaAntivirus2000.bat…\n\n" +
      "████████████░░░░ 78%\n\n" +
      "ERROR 404: El reno se comió el archivo.\n\n" +
      "¡Feliz Navidad y Próspero Año Nuevo de todas formas!"
    );
  });

  // Mensaje de bienvenida al cargar
  setTimeout(() => {
    const tip = document.createElement("div");
    tip.className = "win";
    tip.id = "welcome-tip";
    tip.style.cssText = "top: 200px; left: 130px; width: 260px; z-index: 15;";
    tip.innerHTML = `
      <div class="titlebar" id="tip-titlebar">
        <div class="titlebar-left">
          <span class="app-icon">💡</span>
          <span class="title-text">Sugerencia de MSN</span>
        </div>
        <div class="titlebar-btns">
          <button class="tb-btn tb-close" id="btn-close-tip">×</button>
        </div>
      </div>
      <div style="padding:12px;background:#ffffcc;border:1px solid #ccc;margin:4px;font-size:11px;line-height:1.4;">
        <strong>¿Sabías que…?</strong><br><br>
        Puedes hacer <strong>doble clic</strong> en un contacto para chatear.<br><br>
        Usa el botón <strong>🎁 Deseos</strong> para tu lista de regalos.<br><br>
        <em>¡Feliz Navidad 2000!</em>
      </div>
    `;
    $(".desktop").appendChild(tip);
    makeDraggable(tip, $("#tip-titlebar"));
    $("#btn-close-tip").addEventListener("click", () => tip.remove());
    setTimeout(() => tip.remove(), 12000);
  }, 800);
})();
