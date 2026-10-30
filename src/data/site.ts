// Datos del sitio: una sola fuente para header, sidebar y footer.
export const repoUrl = "https://github.com/forja-lang/forja";
export const siteTitle = "Forja";
export const siteTagline = "Lenguaje en español";

export const headerNav = [
  { title: "Curso", href: "/docs/curso/" },
  { title: "Sintaxis", href: "/docs/sintaxis/variables/" },
  { title: "Arquitectura", href: "/docs/arquitectura/pipeline/" },
  { title: "Playground", href: "/docs/playground/" },
  { title: "Blog", href: "/docs/blog/" },
];

export const footerNav = [
  {
    title: "Documentación",
    links: [
      { title: "¿Qué es Forja?", href: "/docs/" },
      { title: "Instalación", href: "/docs/instalacion/" },
      { title: "Uso (CLI)", href: "/docs/uso/" },
      { title: "Curso en 30 días", href: "/docs/curso/" },
      { title: "Ejemplos", href: "/docs/ejemplos/" },
    ],
  },
  {
    title: "Proyecto",
    links: [
      { title: "Repositorio", href: repoUrl },
      { title: "Releases", href: `${repoUrl}/releases` },
      { title: "Issues", href: `${repoUrl}/issues` },
      { title: "Roadmap", href: "/docs/roadmap/" },
      { title: "Licencia GPL-3.0", href: `${repoUrl}/blob/main/LICENSE.md` },
    ],
  },
];
