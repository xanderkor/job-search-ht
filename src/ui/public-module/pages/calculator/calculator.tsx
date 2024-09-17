import * as React from 'react';
import { useCalculatorPageController } from './calculator.controller';
import Button from '@mui/material/Button';
import { CalculationResult } from './components/calculation-result';
import LinearProgress from '@mui/material/LinearProgress';
import { NumberInput } from '../../../../components/number-input';
import { Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import './calculator.styles.scss';

export const CalculatorPage: React.FC = () => {
  const {
    inputs,
    calculateMining,
    calculationResult,
    calculationInProgress,
    closeNotification,
    notificationMessage,
  } = useCalculatorPageController();

  return (
    <div className="CalculatorPage">
      {calculationInProgress ? <LinearProgress /> : <div style={{ height: 4 }} />}
      <div 
        className="CalculatorPage__content"
      >
        <div>
          <Typography variant="h3">Hut8 Bitcoin Mining Calculator</Typography>
          <div className="CalculatorPage__sections">
            <section className="CalculatorPage__params-panel">
              {inputs.map((inputConfig) => (
                <NumberInput
                  fullWidth
                  style={{ width: '100%', display: 'block', marginBottom: '10px' }}
                  key={inputConfig.label}
                  label={inputConfig.label}
                  value={inputConfig.value ?? ''}
                  positiveOnly
                  onChange={inputConfig.onChange}
                  className=""
                />
              ))}

              <Button variant="contained" onClick={calculateMining} disabled={calculationInProgress}>
                Calculate
              </Button>
            </section>

            <section>
              <CalculationResult data={calculationResult} />
              <Button variant="outlined" onClick={calculateMining} href="https://hut8.com/" target="_blank">
                Start Mining With Hut8
              </Button>
            </section>
          </div>
        </div>
      </div>

      <Snackbar
        open={Boolean(notificationMessage)}
        autoHideDuration={2000}
        onClose={closeNotification}
        message={notificationMessage}
      />
    </div>
  );
};