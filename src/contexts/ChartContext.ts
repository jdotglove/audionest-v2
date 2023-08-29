import { createContext } from 'react';

const ChartContext = createContext({
  setChartData: undefined,
  chartData: undefined,
});

export default ChartContext;