import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TruthTable from "../components/TruthTable";

export default function ExpressionForm() {
  const [expr, setExpr] = useState("");
  const [submitted, setSubmitted] = useState("");

  return (
    <>
      <Input
        placeholder='Enter logic:  a && !b || c'
        value={expr}
        onChange={e => setExpr(e.target.value)}
      />
      <Button className="mt-2" onClick={() => setSubmitted(expr.trim())}>
        Generate Truth Table
      </Button>

      {/* only render when we actually have text */}
      {submitted && <TruthTable expression={submitted} />}
    </>
  );
}

