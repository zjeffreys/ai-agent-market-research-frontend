export default function JsonCodeBlock({ data }: { data: any }) {
  return (
    <pre className="bg-dark-800 p-4 rounded text-xs overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
