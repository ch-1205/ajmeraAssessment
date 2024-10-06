import { useState, useEffect } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import WeatherWidget from "./WeatherWidget";
import AddWidgetForm from "./AddWidgetForm";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorageUtils";
import { useUnit } from "../Context/UnitContext";
import CloudOffIcon from '@mui/icons-material/CloudOff'; // Icon for "no widgets"

type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  date: string;
};

const Dashboard = () => {
  const [widgets, setWidgets] = useState<WeatherData[]>([]);
  const { unit, toggleUnit } = useUnit();

  useEffect(() => {
    const savedWidgets = getFromLocalStorage("widgets");
    if (Array.isArray(savedWidgets) && savedWidgets.length > 0) {
      setWidgets(savedWidgets);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("widgets", widgets);
  }, [widgets]);

  const handleAddWidget = (weather: WeatherData) => {
    setWidgets([...widgets, weather]);
  };

  const handleRemoveWidget = (city: string) => {
    setWidgets(widgets.filter((widget) => widget.city !== city));
  };

  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          padding: {
            xs: "8px", 
            sm: "16px", 
          },
          fontWeight: 600, 
          color: "text.primary", 
          fontSize: {
            xs: "1.5rem",
            sm: "2rem", 
          },
        }}
      >
        Weather Dashboard
      </Typography>

      <Container
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "12px",
            gap: "16px",
          }}
        >
          <Box
            display="flex" 
            justifyContent="center" 
            alignItems="center"
            mt={2} 
          >
            <Button variant="outlined" onClick={toggleUnit}>
              Switch to {unit === "Celsius" ? "Fahrenheit" : "Celsius"}
            </Button>
          </Box>

          <AddWidgetForm onAddWidget={handleAddWidget} />
        </div>

        {widgets.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mt: 4 }}
          >
            <CloudOffIcon sx={{ fontSize: 60, color: 'gray' }} />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              No weather widgets available. Please add a new one!
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="flex-start"
          >
            {widgets.map((weather) => (
              <Grid key={weather.city}>
                <WeatherWidget
                  weather={weather}
                  onRemove={() => handleRemoveWidget(weather.city)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
