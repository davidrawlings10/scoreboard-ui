export function calculatedPointPercentage(point: number, gp: number) {
  if (point === 0 || gp === 0) {
    return 0;
  }

  return ((point / (gp * 2)) * 100).toPrecision(3);
}
