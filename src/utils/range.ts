export default function range(a: number, b: number) {
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}
