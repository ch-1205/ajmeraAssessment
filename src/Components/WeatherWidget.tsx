import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  WbSunny,
  AcUnit,
  Cloud,
  Grain,
  Thunderstorm,
  Air,
  Delete,
} from "@mui/icons-material";
import { useUnit } from "../Context/UnitContext";

type WeatherWidgetProps = {
  weather: {
    city: string;
    temperature: number;
    condition: string;
    windSpeed: number;
    windDirection: string;
    date: string;
  };
  onRemove: () => void;
};

const WeatherWidget = ({ weather, onRemove }: WeatherWidgetProps) => {
  const { unit } = useUnit();
  const [open, setOpen] = useState(false);

  const temperature =
    unit === "Fahrenheit"
      ? (weather.temperature * 9) / 5 + 32
      : weather.temperature;

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <WbSunny sx={{ color: "yellow", fontSize: 40 }} />;
      case "cloudy":
        return <Cloud sx={{ color: "gray", fontSize: 40 }} />;
      case "rain":
        return <Grain sx={{ color: "blue", fontSize: 40 }} />;
      case "snow":
        return <AcUnit sx={{ color: "lightblue", fontSize: 40 }} />;
      case "stormy":
        return <Thunderstorm sx={{ color: "purple", fontSize: 40 }} />;
      default:
        return <WbSunny sx={{ color: "yellow", fontSize: 40 }} />;
    }
  };

  // Open confirmation dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close confirmation dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Confirm delete
  const handleDelete = () => {
    onRemove();
    setOpen(false);
  };

  return (
    <Card
      sx={{
        width: 320,
        height: 380,
        margin: "2rem auto",
        boxShadow: 3,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ padding: "1rem", textAlign: "center" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          {weather.city}
        </Typography>

        <Typography variant="body2" sx={{ color: "black" }}>
          {formattedDate(weather.date)}
        </Typography>

        {/* Weather Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {getWeatherIcon(weather.condition)}
        </Box>

        {/* Large Temperature */}
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontWeight: "bold",
            fontSize: "4rem",
            color: "black",
          }}
        >
          {temperature.toFixed(0)}°
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "black", fontWeight: "bold", marginTop: "0.5rem" }}
        >
          {unit}
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
          {weather.condition}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "0.5rem",
          }}
        >
          <Air sx={{ marginRight: "0.5rem", color: "gray" }} />
          <Typography variant="body2" sx={{ color: "gray" }}>
            Wind: {weather.windSpeed} km/h, {weather.windDirection}
          </Typography>
        </Box>
      </CardContent>

      <Button
        variant="contained"
        color="error"
        fullWidth
        startIcon={<Delete />}
        onClick={handleClickOpen}
        sx={{
          borderRadius: "0 0 15px 15px",
          padding: "0.75rem",
          fontSize: "1rem",
        }}
      >
        Remove
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this weather widget for{" "}
            {weather.city}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WeatherWidget;
