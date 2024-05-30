import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {cities as citiesData} from './city';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type Option = {
  value: string,
  label: string,
}

const cityOptions: Option[] = citiesData.map((row) => {
  return {
      value: row.code,
      label: row.name,
  }}
);

const getDistricts = (cityCode?: string) => citiesData.find(row => row.code === cityCode)?.districts ?? [];

const getDistrictOptions: (cityCode: string) => Option[] = (cityCode) => {
  return getDistricts(cityCode).map((dist) => {
    return {
        value: dist.zip,
        label: dist.name,
    }
  })
}

type AddressConfig = {
  cityCode?: string,
  zip?: string,
  address?: string,
}
const formatAddress = ({cityCode, zip, address}: AddressConfig) => {
  const city = cityOptions.find(row => row.value === cityCode)?.label;
  const district = getDistricts(cityCode).find(row => row.zip === zip)?.name;
  
  return `${city}${district}${address}`
}

export const City = {
  cityOptions,
  getDistrictOptions,
  formatAddress
}