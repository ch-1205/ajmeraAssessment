import { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context
type UnitContextType = {
  unit: 'Celsius' | 'Fahrenheit';
  toggleUnit: () => void;
};

// Create the context with default values
const UnitContext = createContext<UnitContextType | undefined>(undefined);

// Create a provider component
export const UnitProvider = ({ children }: { children: ReactNode }) => {
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit'>('Celsius');

  // Toggle between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

// Custom hook to use the context
export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};
