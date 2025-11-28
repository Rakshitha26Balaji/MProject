import React, { useState } from "react";
import "./TenderForm.css";
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

const tenderTypeOptions = ["Open Tender", "Limited Tender", "Global Tender"];
const documentTypeOptions = ["PDF", "DOC", "XLS", "Others"];

export default function LostForm() {
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
    a.download = `lost-${submittedData?.tenderName || "loss"}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Lost Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill all details below to update the LOST tender information
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* SECTION — LOST TENDER DETAILS */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📌 Lost Tender Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>

                {/* Sl.No */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="slno"
                    control={control}
                    rules={{ required: "Sl.No is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Sl.No"
                        className="text-field-style" error={!!errors.slno}
                        helperText={errors.slno?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Tender Name / Lead Description */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderName"
                    control={control}
                    rules={{ required: "Tender Name / Lead Description is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Tender Name / Lead Description"
                        className="text-field-style" error={!!errors.tenderName}
                        helperText={errors.tenderName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Customer */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="customer"
                    control={control}
                    rules={{ required: "Customer is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Customer"
                        className="text-field-style" error={!!errors.customer}
                        helperText={errors.customer?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Tender Type */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderType"
                    control={control}
                    rules={{ required: "Tender Type is required" }}
                    render={({ field }) => (
                      <TextField {...field} select fullWidth label="Tender Type"
                        className="text-field-style" error={!!errors.tenderType}
                        helperText={errors.tenderType?.message}
                      >
                        {tenderTypeOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Document Type */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="documentType"
                    control={control}
                    rules={{ required: "Document Type is required" }}
                    render={({ field }) => (
                      <TextField {...field} select fullWidth label="Document Type"
                        className="text-field-style" error={!!errors.documentType}
                        helperText={errors.documentType?.message}
                      >
                        {documentTypeOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Value Without GST */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="valueWithoutGST"
                    control={control}
                    rules={{ required: "Value without GST is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Value in Crore (without GST)"
                        className="text-field-style" error={!!errors.valueWithoutGST}
                        helperText={errors.valueWithoutGST?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Value With GST */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="valueWithGST"
                    control={control}
                    rules={{ required: "Value with GST is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Value in Crore (with GST)"
                        className="text-field-style" error={!!errors.valueWithGST}
                        helperText={errors.valueWithGST?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Reason for Losing */}
                <Grid item xs={12}>
                  <Controller
                    name="reasonForLosing"
                    control={control}
                    rules={{ required: "Reason for losing is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth multiline rows={2}
                        label="Reason for Losing"
                        className="text-field-style" error={!!errors.reasonForLosing}
                        helperText={errors.reasonForLosing?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Year We Lost */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="yearLost"
                    control={control}
                    rules={{ required: "Year we lost is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Year We Lost"
                        className="text-field-style" error={!!errors.yearLost}
                        helperText={errors.yearLost?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Partners */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="partners"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Partners"
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Competitors */}
                <Grid item xs={12}>
                  <Controller
                    name="competitors"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth multiline rows={2}
                        label="Competitors"
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Technical Score */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="technicalScore"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Technical Score"
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Quoted Price */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="quotedPrice"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Quoted Price"
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>

          {/* BUTTONS */}
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

        {/* SUCCESS SNACKBAR */}
        <Snackbar open={submitSuccess} autoHideDuration={4500} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            LOST tender details submitted successfully!
          </Alert>
        </Snackbar>

        {/* JSON PREVIEW */}
        {submittedData && (
          <Box sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">📌 Submitted Data (JSON)</Typography>
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
