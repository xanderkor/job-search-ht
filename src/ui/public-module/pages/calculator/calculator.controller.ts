import * as React from 'react';
import { MiningCalculationDto } from '../../../../entities/mining/calculation/get-dto';
import { CalculateMiningRequestParams, miningService } from '../../../../services/mining';

export const useCalculatorPageController = () => {
  type LocalMiningRequestParams = {
    hashRate: string;
    powerConsumption: string;
    electricityCost: string;
    initialInvestment: string;
  };

  const [calculationParams, setCalculationParams] = React.useState<Partial<LocalMiningRequestParams>>({});
  const [calculationResult, setCalculationResult] = React.useState<MiningCalculationDto>({
    dailyCost: 0,
    monthlyCost: 0,
    yearlyCost: 0,
    dailyRevenueUSD: 0,
    monthlyRevenueUSD: 0,
    yearlyRevenueUSD: 0,
    dailyRevenueBTC: 0,
    monthlyRevenueBTC: 0,
    yearlyRevenueBTC: 0,
    dailyProfitUSD: 0,
    monthlyProfitUSD: 0,
    yearlyProfitUSD: 0,
    breakevenTimeline: 0,
    costToMine: 0,
  });
  const [calculationInProgress, setCalculationInProgress] = React.useState(false);

  const updateCalculationParams = React.useCallback((params: Partial<LocalMiningRequestParams>) => {
    setCalculationParams((prev) => ({
      ...prev,
      ...params,
    }));
  }, []);

  const handleHashRateChange = React.useCallback((hashRate: string) => {
    updateCalculationParams({ hashRate });
  }, [updateCalculationParams]);

  const handlePowerConsumptionChange = React.useCallback((powerConsumption: string) => {
    updateCalculationParams({ powerConsumption });
  }, [updateCalculationParams]);

  const handleElectricityCostChange = React.useCallback((electricityCost: string) => {
    updateCalculationParams({ electricityCost });
  }, [updateCalculationParams]);

  const handleInitialInvestmentChange = React.useCallback((initialInvestment: string) => {
    updateCalculationParams({ initialInvestment });
  }, [updateCalculationParams]);

  const calculateMining = React.useCallback(async () => {
    const processedRequestParams = Object.entries(calculationParams).reduce<CalculateMiningRequestParams>((acc, [key, value]) => {
      acc[key as keyof CalculateMiningRequestParams] = Number(value);
      return acc;
    }, {} as CalculateMiningRequestParams);

    try {
      setCalculationInProgress(true);
      const response = await miningService.calculateMining(processedRequestParams);
      setCalculationResult(response);
    } catch (err) {
      console.error(err);

      // error
    } finally {
      setCalculationInProgress(false);
    }
  }, [calculationParams]);

  const inputs = [
    {
      value: calculationParams.hashRate,
      onChange: handleHashRateChange,
      label: 'Hash Rate',
      description: 'The hash rate of the miner',
    },
    {
      value: calculationParams.powerConsumption,
      onChange: handlePowerConsumptionChange,
      label: 'Power Consumption',
      description: 'The power consumption of the miner',
    },
    {
      value: calculationParams.electricityCost,
      onChange: handleElectricityCostChange,
      label: 'Electricity Cost',
      description: 'The cost of electricity',
    },
    {
      value: calculationParams.initialInvestment,
      onChange: handleInitialInvestmentChange,
      label: 'Initial Investment',
      description: 'The initial investment',
    },
  ];

  return {
    calculationInProgress,
    inputs,
    calculateMining,
    calculationResult,
  };
};

