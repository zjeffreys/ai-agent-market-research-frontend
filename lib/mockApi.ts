export async function fetchResource(name: string) {
  const res = await fetch(`/api/mock/${name}`);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
