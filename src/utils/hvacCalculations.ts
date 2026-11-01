export type ServiceType = 'ac_repair' | 'full_replacement' | 'heating_fix' | 'seasonal_maintenance';
export type HomeSize = 'under_1500' | '1500_2500' | 'over_2500';
export type UrgencyLevel = 'emergency_today' | 'within_week' | 'planning';

export interface QuoteResult {
  minPrice: number;
  maxPrice: number;
  formattedRange: string;
  recommendedTonnage: string;
  serviceName: string;
  estimatedDuration: string;
  couponCode: string;
  discountAmount: number;
  sameDayGuaranteed: boolean;
}

export function calculateInstantQuote(
  service: ServiceType,
  homeSize: HomeSize,
  urgency: UrgencyLevel
): QuoteResult {
  let baseMin = 149;
  let baseMax = 380;
  let serviceName = 'AC Repair & Diagnostics';
  let estimatedDuration = '45–90 Mins';

  switch (service) {
    case 'full_replacement':
      baseMin = 5800;
      baseMax = 8500;
      serviceName = 'Complete High-Efficiency HVAC System Replacement';
      estimatedDuration = '1 Day Full Installation';
      break;
    case 'heating_fix':
      baseMin = 169;
      baseMax = 440;
      serviceName = 'Heating & Furnace Diagnostics & Fix';
      estimatedDuration = '45–75 Mins';
      break;
    case 'seasonal_maintenance':
      baseMin = 89;
      baseMax = 149;
      serviceName = '26-Point Precision Tune-Up & Coil Rejuvenation';
      estimatedDuration = '60 Mins';
      break;
    case 'ac_repair':
    default:
      baseMin = 149;
      baseMax = 380;
      serviceName = 'AC Rapid Repair & Cooling Restore';
      estimatedDuration = '45–90 Mins';
      break;
  }

  // Home size sizing multiplier
  let tonnage = '2.0 – 2.5 Tons';
  if (homeSize === '1500_2500') {
    tonnage = '3.0 – 3.5 Tons';
    if (service === 'full_replacement') {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.3);
    }
  } else if (homeSize === 'over_2500') {
    tonnage = '4.0 – 5.0 Tons (or Dual Zone)';
    if (service === 'full_replacement') {
      baseMin = Math.round(baseMin * 1.55);
      baseMax = Math.round(baseMax * 1.65);
    }
  }

  const sameDayGuaranteed = urgency === 'emergency_today';

  return {
    minPrice: baseMin,
    maxPrice: baseMax,
    formattedRange: `$${baseMin.toLocaleString()} - $${baseMax.toLocaleString()}`,
    recommendedTonnage: tonnage,
    serviceName,
    estimatedDuration,
    couponCode: 'COOL50',
    discountAmount: 50,
    sameDayGuaranteed,
  };
}

export interface MonthlyFinancing {
  systemCost: number;
  termMonths: number;
  aprPercent: number;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  perDayCost: number;
}

export function calculateMonthlyFinancing(
  systemCost: number,
  termMonths: number,
  isZeroAprPromo = true
): MonthlyFinancing {
  const safeCost = Math.max(3000, Math.min(25000, systemCost));
  // If promo 0% APR applies for selected promo term or standard low APR
  let apr = isZeroAprPromo && termMonths <= 36 ? 0 : 7.99;

  let monthlyPayment = 0;
  if (apr === 0) {
    monthlyPayment = Math.round(safeCost / termMonths);
  } else {
    const monthlyRate = apr / 100 / 12;
    const payment = (safeCost * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    monthlyPayment = Math.round(payment);
  }

  const totalCost = monthlyPayment * termMonths;
  const totalInterest = Math.max(0, totalCost - safeCost);
  const perDayCost = Number((monthlyPayment / 30).toFixed(2));

  return {
    systemCost: safeCost,
    termMonths,
    aprPercent: apr,
    monthlyPayment,
    totalCost,
    totalInterest,
    perDayCost,
  };
}

export interface SymptomDiagnosis {
  id: string;
  title: string;
  tagline: string;
  likelyCause: string;
  estimatedRepairTime: string;
  riskLevel: 'Moderate' | 'High' | 'Critical';
  potentialConsequences: string;
  recommendedSolution: string;
  estimatedPriceRange: string;
  diySafe: boolean;
}

export const SYMPTOMS_DATA: Record<string, SymptomDiagnosis> = {
  warm_air: {
    id: 'warm_air',
    title: 'Blowing Warm Air',
    tagline: 'Fan runs but air is lukewarm or humid',
    likelyCause: 'Failed Dual Run Capacitor, Tripped Breaker, or Low R-410A Refrigerant Leak',
    estimatedRepairTime: '45–60 Mins',
    riskLevel: 'Moderate',
    potentialConsequences: 'Compressor overheats, leading to total motor burnout ($2,500+ replacement)',
    recommendedSolution: 'Test capacitor microfarad ratings, check coil freeze, and perform electronic halogen leak detection.',
    estimatedPriceRange: '$129 – $290 (or $49 diagnostic credited to repair)',
    diySafe: false,
  },
  buzzing_noise: {
    id: 'buzzing_noise',
    title: 'Strange Buzzing or Grinding Noise',
    tagline: 'Loud chatter, electrical hum, or metallic rattle',
    likelyCause: 'Pitted Contactor Relay, Loose Blower Wheel Mount, or Seizing Fan Motor Bearings',
    estimatedRepairTime: '30–45 Mins',
    riskLevel: 'Critical',
    potentialConsequences: 'Electrical arcing danger, blown 240V high-voltage fuses, or seized motor fire hazard',
    recommendedSolution: 'Immediate shut-off, high-voltage contactor replacement, and motor shaft balancing.',
    estimatedPriceRange: '$149 – $340',
    diySafe: false,
  },
  water_leaking: {
    id: 'water_leaking',
    title: 'Water Leaking Around Unit',
    tagline: 'Puddle in attic, closet floor, or dripping through ceiling',
    likelyCause: 'Clogged PVC Condensate Drain Line, Algae Slime Blockage, or Cracked Drain Pan',
    estimatedRepairTime: '45–60 Mins',
    riskLevel: 'High',
    potentialConsequences: 'Catastrophic ceiling drywall collapse, mold infestation, water damage to subfloor',
    recommendedSolution: 'CO2/Nitrogen drain line blow-out, anti-algae enzymatic treatment, and safety float switch install.',
    estimatedPriceRange: '$119 – $240',
    diySafe: false,
  },
  short_cycling: {
    id: 'short_cycling',
    title: "System Won't Turn On / Short Cycling",
    tagline: 'Starts for 60 seconds then shuts off, or completely unresponsive',
    likelyCause: 'Tripped High-Limit Pressure Switch, Clogged Air Filter, or Bad Thermostat Board',
    estimatedRepairTime: '45–75 Mins',
    riskLevel: 'High',
    potentialConsequences: 'Premature compressor death from repeated inrush current spikes (15-20x daily)',
    recommendedSolution: 'Complete control board diagnostic, airflow static pressure test, and safety switch reset.',
    estimatedPriceRange: '$139 – $360',
    diySafe: false,
  },
};

export function getDiagnosis(symptomId: string): SymptomDiagnosis {
  return SYMPTOMS_DATA[symptomId] || SYMPTOMS_DATA.warm_air;
}

export function calculateEnergySavings(
  currentSeer: number,
  newSeer: number,
  currentSummerElectricBill = 350
): {
  monthlySavings: number;
  annualSavings: number;
  tenYearSavings: number;
  efficiencyGainPercent: number;
} {
  const safeOld = Math.max(8, currentSeer);
  const safeNew = Math.max(safeOld, newSeer);
  // Energy consumption is inversely proportional to SEER
  const efficiencyGainPercent = Math.round(((safeNew - safeOld) / safeNew) * 100);
  const coolingPortionOfBill = currentSummerElectricBill * 0.65; // ~65% of electric bill in Texas heat is cooling
  const monthlySavings = Math.round(coolingPortionOfBill * (1 - safeOld / safeNew));
  const annualSavings = monthlySavings * 7; // Approx 7 cooling months in Dallas-Fort Worth
  const tenYearSavings = annualSavings * 10;

  return {
    monthlySavings,
    annualSavings,
    tenYearSavings,
    efficiencyGainPercent,
  };
}
