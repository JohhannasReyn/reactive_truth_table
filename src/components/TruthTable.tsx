import { Card, CardContent } from "@/components/ui/card";
import {
  extractVariables,
  generateCombinations,
  substituteVariables
} from "../lib/truthUtils.ts";
import "./TruthTable.css";

// Define proper types
type VariableCombo = Record<string, boolean>;
type Row = {
  result: boolean | string;
  [key: string]: boolean | string;
};

// Define component props interface
interface TruthTableProps {
  expression?: string;
}

export default function TruthTable({ expression = "" }: TruthTableProps) {
  // --- parse ----------------------------------------------
  const variables = extractVariables(expression);
  const combinations = generateCombinations(variables);
  
  // Process combinations into rows with results
  const rows: Row[] = combinations.map((combo: VariableCombo) => {
    const subExpr = substituteVariables(expression, combo);
    let result: boolean | string;
    
    try {
      // Replace eval with safer Function constructor
      // This is still not 100% safe but better than eval
      const func = new Function('return ' + subExpr);
      const evalResult = func();
      result = Boolean(evalResult);
    } catch {
      result = "Error";
    }
    
    return { ...combo, result };
  });

  // --- render ----------------------------------------------
  return (
    <Card className="tt-card">
      <CardContent className="p-0 overflow-x-auto">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              {variables.map((v: string) => <th key={v}>{v}</th>)}
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: Row, i: number) => {
              return (
                <tr key={i}>
                  {variables.map((v: string) => (
                    <td key={v}>{row[v] ? "T" : "F"}</td>
                  ))}
                  <td>{typeof row.result === 'boolean' ? (row.result ? "T" : "F") : row.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}