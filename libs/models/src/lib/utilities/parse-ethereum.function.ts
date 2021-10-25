export function ethereumParser(number: string): string {
  return (Number(number) / 1000000000000000000).toFixed(2);
}
