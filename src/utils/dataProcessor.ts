import { 
  aggregatedByYearDataType, 
  aggregateByYearType, 
  aggregateByCropType, 
  aggregatedByCropDataType, 
  getYearRangeType 
} from "../types/dataTypes";

export const aggregateByYear: aggregateByYearType = (dataPoints) => {
  
  // Initialize a Map to store aggregated data grouped by year
  const groupedByYear: aggregatedByYearDataType = new Map();

  // Map Required fields
  dataPoints.forEach((data) => {
    const year = data['Year']; 
    const crop = data['Crop Name']; 
    const production = data['Crop Production (UOM:t(Tonnes))']; 

    // Check if Production is a number, because null/empty values can't be compared with real numbers
    if (typeof production === "number") {
      // If year is not yet in groupedByYear, initialize with current crop and production
      if (!groupedByYear.has(year)) {
        groupedByYear.set(year, {
          maxProduction: { cropName: crop, production: production },
          minProduction: { cropName: crop, production: production },
        });
      } 
      
      
      else {
        // If year exists, update max and min production
        const yearData = groupedByYear.get(year)!;
        if (yearData.maxProduction.production < production) {
          yearData.maxProduction = { cropName: crop, production: production };
        }
        if (yearData.minProduction.production > production) {
          yearData.minProduction = { cropName: crop, production: production };
        }
      }
    }
  });

  return groupedByYear;
};

export const aggregateByCrop: aggregateByCropType = (dataPoints) => {
  
    // Initialize a Map to store aggregated data grouped by crop
    const groupedByCrop: aggregatedByCropDataType = new Map();
  
    // Map Required fields
    dataPoints.forEach((data) => {
      const Crop = data['Crop Name']; 
      const Yield = data['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']; 
      const Area = data['Area Under Cultivation (UOM:Ha(Hectares))']; 
      
      // Check if the crop already exists in groupedByCrop map
      if (groupedByCrop.has(Crop) === false) {
        // If not, initialize new entry with current Yield and Area values and replacing null values by 0
        const totalYield = (typeof Yield === "number") ? Yield : 0;
        const totalArea = (typeof Area === "number") ? Area : 0;
        groupedByCrop.set(Crop, { totalYield, totalArea });
      } else {
        // If crop exists, update existing entry with cumulative Yield and Area values, and replacing null values by 0
        const cropData = groupedByCrop.get(Crop)!;
        cropData.totalYield += (typeof Yield === "number") ? Yield : 0;
        cropData.totalArea += (typeof Area === "number") ? Area : 0;
      }
  
    });
  
    return groupedByCrop;
  };

export const getYearRange: getYearRangeType = (dataPoints) => {
    
  let minYear = parseInt(dataPoints[0]['Year'].split(', ')[1]);
  let maxYear = parseInt(dataPoints[0]['Year'].split(', ')[1]);

  //Get Max Min year value to evaluate year range
  dataPoints.forEach((data) => {
    const currentYear = parseInt(data['Year'].split(', ')[1]);
    
    if(currentYear < minYear){
      minYear = currentYear;
    }

    if(currentYear > maxYear){
      maxYear = currentYear;
    }
  })
  
  const range = maxYear - minYear + 1;
  return range;
}