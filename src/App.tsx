import ExpressionForm from "./components/ExpressionForm";

export default function App() {
  return (
    <main className="app-shell">
      <div className="w-full max-w-3xl px-4">
        <h1 className="app-title">
          <span className="text-fuchsia-400">Logic&nbsp;Checker</span> ➜
          Reactive Truth&nbsp;Table
        </h1>
        <ExpressionForm />
      </div>
    </main>
  );
}
