export function calculateWaterIntake(
  weightKg: number,
  activityLevel: string
): { liters: number; cups: number } {
  // Base calculation: 30-35ml per kg of body weight
  let baseWater = weightKg * 0.033; // liters

  // Activity multipliers
  const multipliers: Record<string, number> = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.2,
    active: 1.3,
    'very-active': 1.4,
  };

  const multiplier = multipliers[activityLevel] || 1.2;
  const totalLiters = baseWater * multiplier;

  // Convert to cups (1 liter ≈ 4.227 cups)
  const totalCups = Math.round(totalLiters * 4.227);

  return {
    liters: totalLiters,
    cups: totalCups,
  };
}
