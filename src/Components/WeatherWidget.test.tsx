// WeatherWidget.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherWidget from "./WeatherWidget";
import { UnitProvider } from "../Context/UnitContext";

const mockWeather = {
  city: "Los Angeles",
  temperature: 25,
  condition: "sunny",
  windSpeed: 10,
  windDirection: "N",
  date: new Date().toISOString(),
};

describe("WeatherWidget Component", () => {
  const mockRemove = jest.fn();

  beforeEach(() => {
    render(
      <UnitProvider>
        <WeatherWidget weather={mockWeather} onRemove={mockRemove} />
      </UnitProvider>
    );
  });

  it("renders the weather widget with correct information", () => {
    expect(screen.getByText(mockWeather.city)).toBeInTheDocument();

    expect(screen.getByText(`${mockWeather.temperature}°`)).toBeInTheDocument();

    expect(screen.getByText(mockWeather.condition)).toBeInTheDocument();

    expect(
      screen.getByText(
        `Wind: ${mockWeather.windSpeed} km/h, ${mockWeather.windDirection}`
      )
    ).toBeInTheDocument();
  });

  it("opens confirmation dialog on remove button click", () => {
    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure you want to delete this weather widget/i)
    ).toBeInTheDocument();
  });

  it("calls onRemove when delete is confirmed", () => {
    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });
});
