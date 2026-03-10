export function nauticalMilePerMinute(groundSpeed: number): number {
  return groundSpeed / 60;
}

export function feetPerNauticalMile(
  gradient: number,
  groundSpeed: number,
): number {
  return ((gradient * groundSpeed) / nauticalMilePerMinute(groundSpeed)) * 100;
}

export function convertGradientAngleToPercentage(angle: number): number {
  const radians = (angle * Math.PI) / 180;

  return Math.tan(radians);
}

export function convertGradientPercentageToAngle(percentage: number): number {
  return Number(((Math.atan(percentage) * 180) / Math.PI).toFixed(0));
}

export function angleFeetPerMinute(angle: number, groundSpeed: number): number {
  return angle * nauticalMilePerMinute(groundSpeed) * 100;
}

export function gradientFeetPerMinute(
  gradient: number,
  groundSpeed: number,
): number {
  return gradient * groundSpeed * 100;
}

export function visualDescentPoint(
  height: number,
  angle: number,
  groundSpeed: number,
): number {
  return height / (angle * nauticalMilePerMinute(groundSpeed) * 100); // DME
}
