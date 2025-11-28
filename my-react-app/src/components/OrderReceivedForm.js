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

export default function OrderReceivedForm() {
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
    a.download = `order-received-${submittedData?.tenderName || "data"}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Order Received Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill all details below to submit the order information
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* SECTION 1 — Order Details */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📌 Order Received Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* Sl.No
                <Grid item xs={12} md={6}>
                  { <Controller
                    name="slno"
                    control={control}
                    rules={{ required: "Sl.No is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="number" fullWidth label="Sl.No"
                        className="text-field-style" error={!!errors.slno}
                        helperText={errors.slno?.message}
                      />
                    )}
                  /> }
                </Grid> */}

                {/* Tender Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderName"
                    control={control}
                    rules={{ required: "Tender Name is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Tender Name"
                        className="text-field-style" error={!!errors.tenderName}
                        helperText={errors.tenderName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Customer Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="customerName"
                    control={control}
                    rules={{ required: "Customer Name is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Customer Name"
                        className="text-field-style" error={!!errors.customerName}
                        helperText={errors.customerName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Order Received Date */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="orderReceivedDate"
                    control={control}
                    rules={{ required: "Order Received Date is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="date" fullWidth label="Order Received Date"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.orderReceivedDate}
                        helperText={errors.orderReceivedDate?.message}
                      />
                    )}
                  />
                </Grid>

                {/* PO/WO Number */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="poWoNo"
                    control={control}
                    rules={{ required: "PO/WO No is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="PO / WO No"
                        className="text-field-style" error={!!errors.poWoNo}
                        helperText={errors.poWoNo?.message}
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

                {/* Value without GST */}
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

                {/* Value with GST */}
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

                {/* Competitors */}
                <Grid item xs={12}>
                  <Controller
                    name="competitors"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth multiline rows={2}
                        label="Competitors" className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Remarks */}
                <Grid item xs={12}>
                  <Controller
                    name="remarks"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth multiline rows={2}
                        label="Remarks" className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Contract Copy / Work Order / LOI */}
                <Grid item xs={12}>
                  <Controller
                    name="contractCopy"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth
                        label="Contract Copy / Work Order / LOI (Date & File)"
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
            Order details submitted successfully!
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
