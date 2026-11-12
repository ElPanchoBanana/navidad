import { useMemo } from "react";
import WelcomeMessage from "@/components/WelcomeMessage";
import RetroCountdown from "@/components/RetroCountdown";
import BackgroundMusic from "@/components/BackgroundMusic";

const gifts = [
  {
    title: "Afilador De Navaja Leatherman", note: "Afilar mi navaja", link: "https://leatherman.com.mx/products/afilador-de-navaja-leatherman?variant=41898005758007", image: "https://leatherman.com.mx/cdn/shop/files/LEA-019-001_all_1200x1200.jpg?v=1779984278"
  },
  { title: "Pinzas de corte ", note: "klein tools", link: "https://www.amazon.com.mx/Klein-1025-Pinzas-Pelacables-Multiusos/dp/B0FH3BFDS7?ref_=ast_sto_dp&th=1", image: "https://m.media-amazon.com/images/I/5102tA+WDlL._AC_SX679_.jpg" },
  { title: "Brujas: Historia de una persecución ", note: "Libro", link: "https://www.amazon.com.mx/Brujas-Historia-Persecuci%C3%B3n-Fractales-Mexicanos/dp/6071441064/ref=sr_1_35?dib=eyJ2IjoiMSJ9.84Ua9L41gvze1NmoBIomeUHSbTXiL_0yhK9yFcT625ZPyZBwFOzJKXfbFRgaBKYFShVg6_Z8At_xBLVmSsbVa5VDVDd7sD6k4O4ar921dG7PeO4fWv0PBbvdh9g9pkZckU84UbQJPU7S8Im7olat0tlx2wxtmJAos2H9VQwcbjy_sDWGQBJ9y8M3ERBthWWtfjiq29u8JB7baNGWF_-cDxWDPPgsbEQ8TsU-jRCykqB0VMGdu4CgRJ-PPpbfZtVCaoyd0JjKxWk4OQD0nJd02Lg4qetVBzrh_obudyKeJ0c.iAY1gOO9Wiieh-svVCxXboyOGAFWbnaOAIVIKgXNSak&dib_tag=se&keywords=libros&qid=1794494963&sr=8-35&ufe=app_do%3Aamzn1.fos.de93fa6a-174c-4df7-be7c-5bc8e9c5a71b", image: "https://m.media-amazon.com/images/I/81MPVsbYeFL._SY466_.jpg" },
  { title: "Guantes Nivel De Corte A4 ", note: "Guantes de protección", link: "https://a.co/d/0czQhJyZ", image: "https://m.media-amazon.com/images/I/71wbvCk6NcL._SX522_.jpg" },
];

const ads = [
  { title: "¡Santa Online 98!", body: "Envía tu carta a Santa por e-mail. ¡Respuesta en 3 a 5 días hábiles!", cta: "¡Haz clic aquí!" },
  { title: "Rompope de la Abuela", body: "El sabor de diciembre desde 1952. Ahora con 10% más canela.", cta: "Más info" },
  { title: "Esferas Glitter 2000", body: "Paquete de 24 esferas que brillan en la oscuridad. ¡Edición Y2K!", cta: "Comprar" },
];

const Box = ({ title, edit, children }: { title: string; edit?: boolean; children: React.ReactNode }) => (
  <section className="win-bevel mb-3 bg-card">
    <div className="flex justify-between bg-secondary px-2 py-1 font-bold text-secondary-foreground">
      <span>{title}</span>{edit && <span className="font-normal">[ edit ]</span>}
    </div>
    <div className="p-2">{children}</div>
  </section>
);

const Row = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="grid grid-cols-[120px_1fr] gap-2 py-0.5 border-b border-dotted border-border"><span className="text-muted-foreground">{k}</span><span className="text-primary">{v}</span></div>
);

const Index = () => {
  const flakes = useMemo(() => Array.from({ length: 30 }, (_, i) => ({ left: Math.random() * 100, dur: 6 + Math.random() * 8, delay: -Math.random() * 10, ch: i % 3 ? "❄" : "*" })), []);
  return (
    <div className="min-h-screen py-4">
      <WelcomeMessage />
      <div className="sleigh" aria-hidden><span style={{ display: "inline-block", transform: "scaleX(-1)" }}>🦌🦌🦌🛷🎅</span></div>
      <BackgroundMusic />
      {flakes.map((f, i) => <span key={i} className="retro-snow" style={{ left: `${f.left}%`, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>{f.ch}</span>)}

      <div className="site-frame mx-auto max-w-[800px] bg-card">
        <header className="flex items-end justify-between bg-primary px-3 pb-1 pt-3 text-primary-foreground">
          <div className="logo-chrome">[ thefaceboock ] <span className="text-base">🎄</span></div>
          <nav className="flex flex-wrap justify-end gap-3 text-[11px]">{["home", "search", "global", "navidad", "invite", "faq", "logout"].map((n) => <a key={n} href="#" className="text-primary-foreground hover:underline">{n}</a>)}</nav>
        </header>

        <div className="construction-stripe px-2 py-0.5 text-center text-[10px]">
          ★★★ SITIO EN CONSTRUCCIÓN ★★★ — last updated: 12/24/1999 — MIDI autoplay ON
        </div>

        <div className="marquee-track bg-accent px-0 py-0.5 text-accent-foreground">
          <span>
            <span className="blink">★</span> ¡Feliz Navidad 1999! Faltan pocos días para el intercambio &nbsp;·&nbsp;
            Welcome to my homepage &nbsp;·&nbsp; Y2K ready ✔ &nbsp;·&nbsp; Guest book open &nbsp;·&nbsp;
            <span className="blink">★</span> ¡Haz clic en un regalo y envíamelo! &nbsp;&nbsp;&nbsp;
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-[130px_1fr_150px]">
          <aside>
            <div className="mb-2">
              <input className="retro-input w-full" placeholder="quick search" />
              <button className="retro-btn mt-1">go</button>
            </div>
            <ul className="space-y-0.5 text-primary">
              {["My Profile [ edit ]", "My Friends", "My Wishlist 🎁", "My Messages", "My Privacy", "Guestbook"].map((l) => (
                <li key={l}><a href="#" className="hover:underline">» {l}</a></li>
              ))}
            </ul>
            <div className="mt-4 win-bevel bg-festive p-2 text-center text-festive-foreground">
              🎅 Mejor visto en Netscape Navigator 4.0 a 800x600
            </div>
            <div className="mt-3 text-center">
              <div className="mb-1 text-muted-foreground">visitors since 1999</div>
              <div className="hit-counter inline-block">0001337</div>
            </div>
            <div className="under-construction mt-3 text-center text-xs">
              <div className="rainbow-text">~*~ under construction ~*~</div>
              <div className="mt-1">🚧 🚧 🚧</div>
            </div>
          </aside>

          <main>
            <div className="mb-3 bg-primary px-2 py-1 font-bold text-primary-foreground">
              Profile (This is you) — Intercambio Navideño <span className="neon-pulse float-right font-normal">● ONLINE</span>
            </div>
            <Box title="Cuenta regresiva">
              <RetroCountdown />
            </Box>
            <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
              <div>
                <Box title="Picture" edit>
                  <div className="win-inset flex h-40 items-center justify-center bg-muted text-6xl">🎅</div>
                  <p className="mt-1 text-center text-muted-foreground">no photo uploaded.exe</p>
                </Box>
                <Box title="Connection"><p className="text-center">Este es mi perfil de regalos.</p></Box>
                <Box title="Mood"><p className="text-center rainbow-text">Festivo ☃️</p></Box>
              </div>
              <div>
                <Box title="Information" edit>
                  <b>Account Info:</b>
                  <Row k="Name:" v="Luis Alberto" />
                  <Row k="Member Since:" v="December 1, 1999" />
                  <Row k="Status:" v={<span className="blink">Esperando a Santa</span>} />
                  <Row k="Looking For:" v="Regalos de intercambio" />
                  <Row k="Interests:" v="La vida es muy corta" />
                  <Row k="AIM:" v="luisnavidad99" />
                </Box>
                <Box title={`My Wishlist (${gifts.length} regalos)`} edit>
                  <p className="mb-2 text-muted-foreground">Haz clic en un perfil para regalármelo:</p>
                  {gifts.map((g) => (
                    <a key={g.title} href={g.link} target="_blank" rel="noopener noreferrer" className="win-bevel mb-2 flex gap-2 p-2 hover:bg-highlight">
                      <img src={g.image} alt={g.title} className="win-inset h-16 w-16 bg-white object-contain" />
                      <div>
                        <div className="font-bold text-primary underline">🎁 {g.title}</div>
                        <div className="text-muted-foreground">{g.note}</div>
                        <div className="text-accent">» Ver regalo</div>
                      </div>
                    </a>
                  ))}
                </Box>
              </div>
            </div>
          </main>

          <aside>
            <div className="mb-1 text-center text-muted-foreground">- publicidad -</div>
            {ads.map((a) => (
              <div key={a.title} className="ad-blink-border mb-3 border-2 border-dashed bg-highlight p-2 text-center">
                <div className="font-bold text-accent">{a.title}</div>
                <p className="my-1">{a.body}</p>
                <span className="retro-btn inline-block cursor-pointer underline">{a.cta}</span>
              </div>
            ))}
            <div className="win-bevel mt-2 bg-muted p-2 text-center text-[10px]">
              <div className="blink font-bold text-accent">FREE MIDI DOWNLOAD</div>
              <div className="mt-1">jingle_bells_8bit.mid</div>
            </div>
          </aside>
        </div>
        <footer className="border-t border-border p-2 text-center text-muted-foreground">
          about · contact · jobs · privacy · webring → next → random
          <br />
          a Mark Zuckerberg production 🎄 thefaceboock © 1999 — best experienced at 56k
        </footer>
      </div>
    </div>
  );
};
export default Index;
