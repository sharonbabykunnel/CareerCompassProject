import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const App = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    if (data && data.length > 0) {
      const seriesData = new Array(12).fill(0);
      data.forEach((item) => {
        seriesData[item.month - 1] = item.count; 
      });
      setChartData(seriesData);
    }
  }, [data]);

  const options = {
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: months
    }
  };

  const series = [{
    name: 'Users Count',
    data: chartData
  }];

  if (!data) return <p>Loading chart data...</p>; 

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
    />
  );
}

export default App;
