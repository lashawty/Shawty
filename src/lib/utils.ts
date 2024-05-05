import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {cities as citiesData} from './city';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCity() {
  const cities = citiesData.map((row) => row.name)
  const getDistricts = (cityName: string) => citiesData.find(row => row.name === cityName)?.districts ?? [];

  return {
    cities,
    getDistricts
  }
}
