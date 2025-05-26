const REPLACERS = [
  { re: /\bnot\b/gi, js: "!" },
  { re: /\band\b/gi, js: "&&" },
  { re: /\bor\b/gi, js: "||" },
  { re: /\bxor\b/gi, js: "^" }
];

export function normalise(raw: string) {
  let s = String(raw);
  REPLACERS.forEach(({ re, js }) => (s = s.replace(re, ` ${js} `)));
  return s.replace(/\s+/g, " ").trim();
}

export function extractVars(expr: string) {
  const vars = new Set();
  expr.split(/[\s!&|^()]+/)
      .filter(Boolean)
      .forEach(tok => {
        if (!/^(true|false)$/i.test(tok)) vars.add(tok);
      });
  return [...vars];
}

export function generateTruthTable(expr: string) {
  const stdExpr = normalise(expr);
  const variables = extractVars(stdExpr);
  const xor = (a: boolean, b: boolean) => a !== b;
  const jsExpr = stdExpr.replace(/\^/g, " xor ");
  const fn = new Function("xor", ...(variables as string[]), `return Boolean(${jsExpr});`);

  const rows = [];
  const combos = 1 << variables.length;
  for (let mask = 0; mask < combos; mask++) {
    const row: { [key: string]: boolean | number } = {};
    const args: boolean[] = [];
    (variables as string[]).forEach((v, idx) => {
      const val = Boolean(mask & (1 << (variables.length - 1 - idx)));
      row[v] = val;
      args.push(val);
    });
    row.result = fn(xor, ...args);
    rows.push(row);
  }
  return { variables, rows };
}
