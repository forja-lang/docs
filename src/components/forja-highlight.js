// Forja Syntax Highlighter
// Convierte código Forja a HTML con spans coloreados
// Misma paleta que la extensión VS Code y la documentación

const PALETA = {
  keyword:  '#f59e0b',   // fuego/amber - keywords
  type:     '#06b6d4',   // cian - tipos
  function: '#10b981',   // verde - builtins
  string:   '#fbbf24',   // gold - strings
  comment:  '#5b6a84',   // gris azulado - comments
  number:   '#818cf8',   // acero/indigo - numbers
  operator: '#ec4899',   // rosa - operators
  variable: '#e2e8f0',   // texto base - variables
};

// Regex tokens
const TOKENS = [
  { type: 'comment', regex: /\/\/.*$/gm },
  { type: 'comment', regex: /\/\*[\s\S]*?\*\//gm },
  { type: 'string',  regex: /"([^"\\]|\\.)*"/gm },
  { type: 'keyword', regex: /\b(constructor|seleccionar|implementa|coincidir|resultado|constante|importar|mientras|prestado|variable|anterior|asegura|externo|externa|funcion|recibir|repetir|romper|continuar|requiere|retornar|siempre|enviar|tiempo|cuando|clase|nuevo|rasgo|donde|canal|caso|este|hilo|otro|para|sino|tipo|unir|mut|BD|no|si|o)\b/gm },
  { type: 'type',    regex: /\b(Booleano|Decimal|Entero|Exacto|Texto|Nulo)\b/gm },
  { type: 'function',regex: /\b(escribir|leer)\b/gm },
  { type: 'keyword', regex: /\b(verdadero|falso|nulo)\b/gm },
  { type: 'number',  regex: /\b\d+\.\d+\b|\b\d+\b/gm },
  { type: 'operator',regex: /(->|=>|==|!=|>=|<=|&&|\|\||[+\-*\/<>=!&|])/gm },
];

export function highlightForja(code) {
  // Escapar HTML primero
  let html = code
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');

  // Aplicar spans de color (de más específico a menos)
  for (const token of TOKENS) {
    html = html.replace(token.regex, (match) => {
      const color = PALETA[token.type];
      return `<span style="color:${color}">${match}</span>`;
    });
  }

  // Convertir saltos de línea
  html = html.replace(/\n/g, '<br>');

  return html;
}

export function highlightForjaInline(code) {
  // Versión para inline (sin <br>)
  let html = code
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');

  for (const token of TOKENS) {
    html = html.replace(token.regex, (match) => {
      const color = PALETA[token.type];
      return `<span style="color:${color}">${match}</span>`;
    });
  }

  return html;
}
