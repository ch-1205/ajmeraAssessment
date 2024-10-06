interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  date: string;
}

export const saveToLocalStorage = (key: string, value: WeatherData[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): WeatherData[] | null => {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as WeatherData[]) : null;
};
