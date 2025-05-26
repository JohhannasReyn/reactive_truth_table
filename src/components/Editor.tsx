import { useState } from 'react';

type EditorProps = {
  onSubmit: (expression: string) => void;
};

export default function Editor({ onSubmit }: EditorProps) {
  const [expression, setExpression] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(expression);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-lg font-semibold mb-2">
        Enter Boolean Expression
      </label>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="e.g. if not a and b or c"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Generate Truth Table
      </button>
    </form>
  );
}
