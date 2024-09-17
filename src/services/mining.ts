import { appConfig } from "../config/app";

export type CalculateMiningRequestParams = {
  hashRate: number;
  powerConsumption: number;
  electricityCost: number;
  initialInvestment: number;
};

export class MiningService {
  async calculateMining(params: CalculateMiningRequestParams) {
    const miningInput = {
      hash_rate: params.hashRate,
      power_consumption: params.powerConsumption,
      electricity_cost: params.electricityCost,
      initial_investment: params.initialInvestment
    };
  
    try {
      const response = await fetch(`${appConfig.apiUrl}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(miningInput),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error(`HTTP error! ${error}`);
    }
  }
}

export const miningService = new MiningService();