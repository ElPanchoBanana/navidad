import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feliz Navidad ~ Lista de Regalos MySpace Emo" },
      { name: "description", content: "Lista de regalos navideña estilo MySpace emo con Bob Esponja." },
      { property: "og:title", content: "Feliz Navidad ~ Lista de Regalos MySpace" },
      { property: "og:description", content: "Lista de regalos navideña estilo MySpace emo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/myspace.html"
      title="MySpace Navidad"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0 }}
    />
  );
}
