import { Box, Button, TextField, Slider, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { NewEntry, HealthCheckRating } from "../../types";

const HealthCheckEntryForm = ({
  onSubmit,
}: {
  onSubmit: (values: NewEntry) => void;
}) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
    };
    onSubmit(newEntry);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setHealthCheckRating(newValue as HealthCheckRating);
  };

  const marks = [
    {
      value: HealthCheckRating.Healthy ,
      label: "Healthy",
    },
    {
      value: HealthCheckRating.LowRisk ,
      label: "Low Risk",
    },
    {
      value: HealthCheckRating.HighRisk ,
      label: "High Risk",
    },
    {
      value: HealthCheckRating.CriticalRisk ,
      label: "Critical Risk",
    },
  ];

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label='Description'
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        required
      />
      <TextField
        label='Date'
        type='date'
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label='Specialist'
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        required
      />
      <Typography gutterBottom>Health Check Rating</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ width : 300 }}>
          {" "}
          <Slider
            value={healthCheckRating}
            onChange={handleSliderChange}
            step={1}
            marks={marks}
            min={0}
            max={3}
            valueLabelDisplay='off'
            valueLabelFormat={(value) => {
              switch (value) {
                case HealthCheckRating.Healthy:
                  return "Healthy";
                case HealthCheckRating.LowRisk:
                  return "Low Risk";
                case HealthCheckRating.HighRisk:
                  return "High Risk";
                case HealthCheckRating.CriticalRisk:
                  return "Critical Risk";
                default:
                  return "";
              }
            }}
          />
        </Box>
      </Box>

      <Button type='submit' variant='contained' color='primary'>
        Add
      </Button>
    </Box>
  );
};

export default HealthCheckEntryForm;
