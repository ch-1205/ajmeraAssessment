import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { UnitProvider } from "../Context/UnitContext";

type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  date: string;
};

jest.mock("./AddWidgetForm", () => {
  return (props: { onAddWidget: (weather: WeatherData) => void }) => {
    const handleClick = () => {
      props.onAddWidget({
        city: "Los Angeles",
        temperature: 25,
        condition: "sunny",
        windSpeed: 10,
        windDirection: "N",
        date: new Date().toISOString(),
      });
    };

    return <button onClick={handleClick}>Add Widget</button>;
  };
});

describe("Dashboard Component", () => {
  beforeEach(() => {
    render(
      <UnitProvider>
        <Dashboard />
      </UnitProvider>
    );
  });

  it("renders the Dashboard with correct title and toggle button", () => {
    expect(screen.getByText(/weather dashboard/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /switch to/i })
    ).toBeInTheDocument();
  });

  it("adds a weather widget", () => {
    fireEvent.click(screen.getByText(/add widget/i));

    expect(screen.getByText(/los angeles/i)).toBeInTheDocument();
    expect(screen.getByText(/25°/i)).toBeInTheDocument();
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
  });

  it("removes a weather widget", () => {
    const removeButton = screen.getByRole("button", {
      name: /remove/i,
      hidden: true,
    });

    fireEvent.click(removeButton);

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.queryByText(/los angeles/i)).not.toBeInTheDocument();
  });
});
