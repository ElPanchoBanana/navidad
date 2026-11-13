(function () {
  var gate = document.getElementById("gate");
  var enterBtn = document.getElementById("enter-btn");
  var cnt = document.getElementById("cnt");
  var snow = document.getElementById("snow");

  function seedSnow() {
    if (!snow) return;
    var count = Math.min(42, Math.floor(window.innerWidth / 24));
    for (var i = 0; i < count; i++) {
      var flake = document.createElement("span");
      flake.className = "flake";
      flake.textContent = i % 5 === 0 ? "❄" : "·";
      flake.style.left = Math.random() * 100 + "%";
      flake.style.animationDuration = 7 + Math.random() * 14 + "s";
      flake.style.animationDelay = -Math.random() * 14 + "s";
      flake.style.fontSize = 0.4 + Math.random() * 1.1 + "rem";
      snow.appendChild(flake);
    }
  }

  function runCounter() {
    if (!cnt) return;
    var c = 0;
    var target = 97000 + Math.floor(Math.random() * 2000);
    var timer = setInterval(function () {
      c += Math.floor(Math.random() * 3500) + 800;
      if (c >= target) {
        c = target;
        clearInterval(timer);
      }
      cnt.textContent = String(c).padStart(6, "0");
    }, 55);
  }

  function openSite() {
    if (gate) gate.classList.add("gone");
    runCounter();
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", openSite);
  }

  // Skip gate if user already entered this session
  try {
    if (sessionStorage.getItem("xmen-entered") === "1") {
      openSite();
    } else if (enterBtn) {
      enterBtn.addEventListener(
        "click",
        function () {
          sessionStorage.setItem("xmen-entered", "1");
        },
        { once: true }
      );
    }
  } catch (e) {
    /* ignore */
  }

  seedSnow();
})();
