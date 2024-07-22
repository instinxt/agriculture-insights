import { useEffect, useState } from 'react';
import {
  aggregatedByCropDataType,
  aggregatedByYearDataType,
  cropDataType,
} from './types/dataTypes';
import { YearlyTable } from './components/YearlyTable';
import { CropAvgTable } from './components/CropAvgTable';
import './App.css'
import { aggregateByCrop, aggregateByYear, getYearRange } from './utils/dataProcessor';

const App: React.FC = () => {

  // State variables to hold data retrieved from the JSON file
  const [maxMinData, setMaxMinData] = useState<aggregatedByYearDataType>(new Map());
  const [cropAvgData, setCropAvgData] = useState<aggregatedByCropDataType>(new Map());
  const [range, setRange] = useState<number>(0);

  //Simulating if it was fetched using an API
  useEffect(() => {
    fetchAndUpdateData();
  }, []); // Empty dependency array implies useEffect runs only once on mount

  const fetchAndUpdateData = async () => {
    try {
      const response = await fetch('/data/India_Agro_Dataset.json');

      if (!response.ok) {
        throw new Error('Internal Server Error');
      }
      const data: cropDataType[] = await response.json();

      // Process the JSON data using processor functions
      const maxMinData = aggregateByYear(data);
      const cropAvgData = aggregateByCrop(data);
      const range = getYearRange(data);

      // Update state with processed data
      setMaxMinData(maxMinData);
      setCropAvgData(cropAvgData);
      setRange(range);
    } catch (error) {
      console.error('Data processing Error', error);
    }
  }

  return (
    <>
      <div className="main-container">
        <h1>Indian Agriculture Data Analysis</h1>
        <YearlyTable data={maxMinData} />
        <CropAvgTable data={cropAvgData} range={range} />
      </div>
    </>
  );
};

export default App;