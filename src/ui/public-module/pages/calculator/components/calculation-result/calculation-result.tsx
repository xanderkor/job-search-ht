import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MiningCalculationDto } from '../../../../../../entities/mining/calculation/get-dto';

import './calculation-result.styles.scss';

type CalculationResultProps = {
  data: MiningCalculationDto;
};

export const CalculationResult: React.FC<CalculationResultProps> = ({ data }) => {
  type FeatureData = {
    featureName: string;
    day: number;
    month: number;
    year: number;
  };

  const columns: Array<{ fieldName: keyof FeatureData; title?: string }> = [
    { fieldName: 'featureName' },
    { title: '1 Day', fieldName: 'day' },
    { title: '1 Month', fieldName: 'month' },
    { title: '1 Year', fieldName: 'year' },
  ];

  const featureData: FeatureData[] = [
    { featureName: 'Profit, USD', day: data.dailyProfitUSD, month: data.monthlyProfitUSD, year: data.yearlyProfitUSD },
    { featureName: 'Revenue, USD', day: data.dailyRevenueUSD, month: data.monthlyRevenueUSD, year: data.yearlyRevenueUSD },
    { featureName: 'Revenue, BTC', day: data.dailyRevenueBTC, month: data.monthlyRevenueBTC, year: data.yearlyRevenueBTC },
    { featureName: 'Cost, USD', day: data.dailyCost, month: data.monthlyCost, year: data.yearlyCost },
  ];

  return (
    <div className="CalculationPageCalculationResult">
      <TableContainer classes={{ root: 'CalculationPageCalculationResult__table' }}>
        <Table aria-label="feature table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.fieldName} align="center">
                  <span>{column.title}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {featureData.map((feature) => (
              <TableRow key={feature.featureName}>
                {columns.map((column) => (
                  <TableCell key={column.fieldName} align="center">
                    {feature[column.fieldName as keyof FeatureData]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="CalculationPageCalculationResult__metric">
        <p>Breakeven timeline: {data.breakevenTimeline} days</p>
        <p>Cost to mine: {data.costToMine} USD</p>
      </div>
    </div>
  );
}
