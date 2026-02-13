export function calculateBMI(
  heightCm: number,
  weightKg: number
): { bmi: number; category: string } {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string;
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  return { bmi, category };
}

export function calculateIdealWeight(
  heightCm: number,
  gender: 'male' | 'female'
): { min: number; max: number } {
  // Using the Devine formula and BMI range (18.5-24.9)
  const heightM = heightCm / 100;
  
  // BMI range for healthy weight
  const minBMI = 18.5;
  const maxBMI = 24.9;

  const minWeight = minBMI * heightM * heightM;
  const maxWeight = maxBMI * heightM * heightM;

  return {
    min: minWeight,
    max: maxWeight,
  };
}
