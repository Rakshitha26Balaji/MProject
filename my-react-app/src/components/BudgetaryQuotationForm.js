import React, { useState } from "react";
import "./TenderForm.css"; // using the same css styling
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Divider,
  Alert,
  Snackbar,
  Card,
  CardContent,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const defenceOptions = ["Defence", "Non-Defence"];
const statusOptions = ["Open", "In Progress", "Completed", "Rejected"];

export default function BudgetaryQuotationForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmittedData({ ...data, submittedAt: new Date().toISOString() });
    setSubmitSuccess(true);
  };

  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };
  const handleCloseSnackbar = () => setSubmitSuccess(false);

  const handleDownloadJSON = () => {
    if (!submittedData) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(submittedData, null, 2)], { type: "application/json" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `bq-${submittedData.referenceNo}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Budgetary Quotation Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill details below to submit the form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1 – Quotation Basic Info */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📋 Quotation Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["slno", "Sl. No"],
                  ["bqTitle", "BQ Title"],
                  ["customer", "Customer"],
                  ["leadOwner", "Lead Owner"],
                ].map(([name, label]) => (
                  <Grid item xs={12} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={label}
                          fullWidth
                          className="text-field-style"
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Section 2 – Financial & Classification */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">💰 Financial & Classification</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="defenceType"
                    control={control}
                    rules={{ required: "Defence / Non-Defence Type is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Defence / Non-Defence"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.defenceType}
                        helperText={errors.defenceType?.message}
                      >
                        {defenceOptions.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {[
                  ["estimatedValue", "Estimated Value (in Crore without GST)", "number"],
                  ["submittedValue", "Submitted Value (in Crore without GST)", "number"],
                ].map(([name, label, type]) => (
                  <Grid item xs={12} md={6} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type={type}
                          label={label}
                          fullWidth
                          className="text-field-style"
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Section 3 – Submission & Status */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📅 Submission & Status</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="dateOfSubmission"
                    control={control}
                    rules={{ required: "Date of Letter Submission is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="date"
                        label="Date of Letter Submission"
                        fullWidth
                        className="text-field-style"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dateOfSubmission}
                        helperText={errors.dateOfSubmission?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="referenceNo"
                    control={control}
                    rules={{ required: "Reference No is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Reference Number"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.referenceNo}
                        helperText={errors.referenceNo?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="competitors"
                    control={control}
                    rules={{ required: "Competitor names are required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Competitors"
                        multiline
                        rows={2}
                        fullWidth
                        className="text-field-style"
                        error={!!errors.competitors}
                        helperText={errors.competitors?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="presentStatus"
                    control={control}
                    rules={{ required: "Present Status is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Present Status"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.presentStatus}
                        helperText={errors.presentStatus?.message}
                      >
                        {statusOptions.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button type="submit" variant="contained" size="large" className="btn-submit">
              Submit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="button" variant="outlined" size="large" className="btn-reset" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </form>

        {/* Snackbar */}
        <Snackbar open={submitSuccess} autoHideDuration={5000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Budgetary Quotation submitted successfully!
          </Alert>
        </Snackbar>

        {/* JSON Output */}
        {submittedData && (
          <Box sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">📊 Submitted Data (JSON)</Typography>
              <Button variant="contained" color="success" size="small" onClick={handleDownloadJSON}>
                Download JSON
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Paper
              elevation={2}
              sx={{
                p: 3,
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                maxHeight: 480,
                overflow: "auto",
                borderRadius: 2,
              }}
            >
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
