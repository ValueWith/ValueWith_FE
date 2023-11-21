export function metersToKilometers(meters: number): number {
  const kilometers = meters / 1000;

  return Number(kilometers.toFixed(2));
}
