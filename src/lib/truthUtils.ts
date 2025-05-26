/* ---------- operator lookup ------------------------------------------------ */

export const logicOperators = {
  "&&": (a: boolean, b: boolean) => a && b,   // AND
  "||": (a: boolean, b: boolean) => a || b,   // OR
  "!":  (a: boolean)    => !a,       // NOT (unary)
  "==": (a: boolean, b: boolean) => a === b,  // EQUALS
  "!=": (a: boolean, b: boolean) => a !== b,  // NOT-EQUAL
  ">":  (a: boolean, b: boolean) => a >  b,
  "<":  (a: boolean, b: boolean) => a <  b,
  ">=": (a: boolean, b: boolean) => a >= b,
  "<=": (a: boolean, b: boolean) => a <= b,
  "^":  (a: boolean, b: boolean) => a !== b,  // XOR   (JS boolean xor helper)
  "nand": (a: boolean, b: boolean) => !(a && b)
};

/* ---------- extra spellings / symbols -------------------------------------- */

const ALIAS_TABLE = [
  // English words - more comprehensive
  { re: /\bnot\b/gi,     js: "!" },
  { re: /\band\b/gi,     js: "&&" },
  { re: /\bor\b/gi,      js: "||" },
  { re: /\bbut\b/gi,     js: "&&" },   // "A but B"  ≅  "A and B"
  { re: /\bequals?\b/gi, js: "==" },
  { re: /\bis\s+equal\s+to\b/gi, js: "==" },
  { re: /\bis\s+not\s+equal\s+to\b/gi, js: "!=" },
  { re: /\bless\s+than\b/gi, js: "<" },
  { re: /\bgreater\s+than\b/gi, js: ">" },
  { re: /\bless\s+than\s+or\s+equal\s+to\b/gi, js: "<=" },
  { re: /\bgreater\s+than\s+or\s+equal\s+to\b/gi, js: ">=" },
  { re: /\bxor\b/gi, js: "^" },
  { re: /\bexclusive\s+or\b/gi, js: "^" },

  // Logic / philosophy symbols first (before single character replacements)
  { re: /¬/g, js: "!"  },
  { re: /∧/g, js: "&&" },
  { re: /∨/g, js: "||" },
  { re: /⊻|⊕/g, js: "^"   },   // XOR
  { re: /→/g, js: " IMPLIES " },    // A → B  is  !A || B  (handled later)
  { re: /↔/g, js: " == " },     // A ↔ B  is  A == B
  { re: /⊼/g, js: " nand " },   // NAND

  // 1-character shorthands (after symbols to avoid conflicts)
  { re: /&(?!&)/g,  js: " && " },  // & but not && - add spaces
  // bare "=" **not** followed by "="  →  '=='
  { re: /=(?!=)/g, js: " == " }   // add spaces
];

/* ---------- normalisation helper ------------------------------------------ */

export function normalise(raw = "") {
  let s = String(raw).trim();

  // First, translate the obvious replacements
  ALIAS_TABLE.forEach(({ re, js }) => {
    s = s.replace(re, js);
  });

  // Handle implication: A IMPLIES B becomes (!A || B)
  s = s.replace(/([^()!&|<>=]+)\s+IMPLIES\s+([^()!&|<>=]+)/gi, "(!$1 || $2)");

  // Clean up multiple spaces and normalize spacing around operators
  s = s.replace(/\s+/g, " ")
       .replace(/\s*&&\s*/g, " && ")
       .replace(/\s*\|\|\s*/g, " || ")
       .replace(/\s*==\s*/g, " == ")
       .replace(/\s*!=\s*/g, " != ")
       .replace(/\s*\^\s*/g, " ^ ")
       .replace(/\s*nand\s*/g, " nand ")
       .trim();

  return s;
}

/* ---------- public helpers ------------------------------------------------- */

export function extractVariables(expression: string) {
  const std = normalise(expression);
  const reserved = [
    ...Object.keys(logicOperators),
    "nand", "true", "false", "TRUE", "FALSE"
  ];

  // Extract potential variable names (letters, numbers, underscore)
  const matches = std.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
  
  return [
    ...new Set(
      matches.filter(
        (token) => !reserved.includes(token.toLowerCase()) && 
                  !reserved.includes(token) &&
                  isNaN(Number(token))
      )
    )
  ];
}

export function generateCombinations(variables: string[]) {
  const combos = [];
  const n = variables.length;
  for (let i = 0; i < 1 << n; i++) {
    const combo: { [key: string]: boolean } = {};
    for (let j = 0; j < n; j++) {
      combo[variables[j]] = Boolean(i & (1 << j));
    }
    combos.push(combo);
  }
  return combos;
}

export function substituteVariables(expression: string, vars: { [key: string]: boolean }) {
  let expr = normalise(expression);
  
  // Replace variables with their boolean values
  for (const [key, value] of Object.entries(vars)) {
    const re = new RegExp(`\\b${key}\\b`, "g");
    expr = expr.replace(re, value ? "true" : "false");
  }
  
  return expr;
}

// Safe evaluation function
function safeEval(expression: string): boolean {
  try {
    // Clean up the expression and handle special operators
    let jsExpr = expression
      .replace(/\s+/g, " ")
      .trim();

    // Handle XOR (^) - convert to JavaScript expression
    jsExpr = jsExpr.replace(/(\w+|true|false)\s*\^\s*(\w+|true|false)/g, "($1 !== $2)");
    
    // Handle NAND - convert to JavaScript expression  
    jsExpr = jsExpr.replace(/(\w+|true|false)\s+nand\s+(\w+|true|false)/gi, "!(($1) && ($2))");
    
    // Convert true/false strings to proper boolean literals
    jsExpr = jsExpr.replace(/\btrue\b/gi, "true")
                   .replace(/\bfalse\b/gi, "false");

    // Use Function constructor for safer evaluation
    const func = new Function(`
      try {
        return Boolean(${jsExpr});
      } catch (e) {
        return false;
      }
    `);
    
    return func();
  } catch (error) {
    console.warn("Evaluation error:", error, "for expression:", expression);
    return false;
  }
}

export function generateTruthTable(expr: string) {
  const stdExpr = normalise(expr);
  const variables = extractVariables(stdExpr);
  
  const rows = [];
  const numCombos = 1 << variables.length;
  
  for (let mask = 0; mask < numCombos; mask++) {
    const row: { [key: string]: boolean } = {};
    
    // Generate variable assignments for this combination
    variables.forEach((v, idx) => {
      const val = Boolean(mask & (1 << (variables.length - 1 - idx)));
      row[v] = val;
    });
    
    // Substitute variables and evaluate
    const substituted = substituteVariables(stdExpr, row);
    const result = safeEval(substituted);
    
    row.result = result;
    rows.push(row);
  }
  
  return { variables, rows };
}