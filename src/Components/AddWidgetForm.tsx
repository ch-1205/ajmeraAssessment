import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

type AddWidgetFormProps = {
  onAddWidget: (weather: {
    city: string;
    temperature: number;
    condition: string;
    windSpeed: number;
    windDirection: string;
    date: string;
  }) => void;
};

// Yup Validation for form
const validationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  temperature: Yup.number()
    .required("Temperature is required")
    .typeError("Temperature must be a number"),
  condition: Yup.string().required("Weather condition is required"),
  windSpeed: Yup.number()
    .required("Wind speed is required")
    .typeError("Wind speed must be a number"),
  windDirection: Yup.string().required("Wind direction is required"),
});

const AddWidgetForm = ({ onAddWidget }: AddWidgetFormProps) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Formik form management
  const formik = useFormik({
    initialValues: {
      city: "",
      temperature: "",
      condition: "",
      windSpeed: "",
      windDirection: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onAddWidget({
        city: values.city,
        temperature: Number(values.temperature),
        condition: values.condition,
        windSpeed: Number(values.windSpeed),
        windDirection: values.windDirection,
        date: new Date().toISOString(),
      });

      setSnackbarOpen(true);

      formik.resetForm();
      setOpen(false);
    },
  });

  // Open dialog function
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog function
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Widget
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 600, fontSize: "1.5rem" }}
        >
          Add New Weather Widget
        </DialogTitle>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Box display="grid" gap={2} mt={2}>
              {/* City Input */}
              <TextField
                data-testid="city-input"
                label="City Name"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                variant="outlined"
                fullWidth
              />

              {/* Temperature Input */}
              <TextField
                data-testid="temperature-input"
                label="Temperature (°C)"
                name="temperature"
                value={formik.values.temperature}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.temperature &&
                  Boolean(formik.errors.temperature)
                }
                helperText={
                  formik.touched.temperature && formik.errors.temperature
                }
                type="number"
                variant="outlined"
                fullWidth
              />

              {/* Weather Condition Dropdown */}
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  data-testid="condition-label-test"
                  id="condition-label"
                >
                  Weather Condition
                </InputLabel>
                <Select
                  labelId="condition-label"
                  name="condition"
                  value={formik.values.condition}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.condition && Boolean(formik.errors.condition)
                  }
                  label="Weather Condition"
                >
                  <MenuItem value="">
                    <em>Select Condition</em>
                  </MenuItem>
                  <MenuItem value="sunny">Sunny</MenuItem>
                  <MenuItem value="cloudy">Cloudy</MenuItem>
                  <MenuItem value="rain">Rain</MenuItem>
                  <MenuItem value="snow">Snow</MenuItem>
                  <MenuItem value="stormy">Stormy</MenuItem>
                </Select>
                {formik.touched.condition && formik.errors.condition && (
                  <Typography color="error" variant="caption">
                    {formik.errors.condition}
                  </Typography>
                )}
              </FormControl>

              {/* Wind Speed Input */}
              <TextField
                data-testid="wind-speed-input"
                label="Wind Speed (km/h)"
                name="windSpeed"
                value={formik.values.windSpeed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.windSpeed && Boolean(formik.errors.windSpeed)
                }
                helperText={formik.touched.windSpeed && formik.errors.windSpeed}
                type="number"
                variant="outlined"
                fullWidth
              />

              {/* Wind Direction Input */}
              <TextField
                data-testid="wind-direction-input"
                label="Wind Direction"
                name="windDirection"
                value={formik.values.windDirection}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.windDirection &&
                  Boolean(formik.errors.windDirection)
                }
                helperText={
                  formik.touched.windDirection && formik.errors.windDirection
                }
                variant="outlined"
                fullWidth
              />
            </Box>

            {/* Dialog Actions */}
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Widget
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        message="Widget created successfully!"
        onClose={() => setSnackbarOpen(false)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

export default AddWidgetForm;
