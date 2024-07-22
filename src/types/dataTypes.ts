export interface cropDataType {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number;
  "Area Under Cultivation (UOM:Ha(Hectares))": number;
}

export interface cropProductionType {
  cropName: string;
  production: number;
}

export type aggregatedByYearDataType = Map<string, {
  maxProduction: cropProductionType;
  minProduction: cropProductionType;
}>

export type aggregatedByCropDataType = Map<string, {
  totalYield: number;
  totalArea: number;
}>

export type aggregateByYearType = (dataPoints: Array<cropDataType>) => aggregatedByYearDataType

export type aggregateByCropType = (dataPoints: Array<cropDataType>) => aggregatedByCropDataType

export type getYearRangeType = (dataPoints: Array<cropDataType>) => number
