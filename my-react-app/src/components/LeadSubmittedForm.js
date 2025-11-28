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
const statusOptions = ["Open", "In Progress", "Completed", "Rejected"];

export default function TenderForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSubmittedData({ ...data, submittedAt: new Date().toISOString() });
    setSubmitSuccess(true);
  };

  const handleReset = () => { reset(); setSubmittedData(null); };
  const handleCloseSnackbar = () => setSubmitSuccess(false);

  const handleDownloadJSON = () => {
    if (!submittedData) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(submittedData, null, 2)], { type: "application/json" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `tender-${submittedData.tenderReferenceNo}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Lead Submitted Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill tender details below to submit the form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1 – Tender Details */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📋 Tender Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["leadSubmitted", "Lead Submitted"],
                  ["tenderName", "Tender Name"],
                  ["customer", "Customer Name"],
                  ["tenderDate", "Tender Date", "date"],
                  ["bidOwner", "Bid Owner"],
                ].map(([name, label, type]) => (
                  <Grid item xs={12} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type={type || "text"}
                          label={label}
                          fullWidth
                          className="text-field-style"
                          InputLabelProps={{ shrink: true }}
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

          {/* Section 2 – Timeline & Approvals */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📅 Timeline & Approvals</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["rfpReceivedOn", "RFP Received On", "date"],
                  ["valueEMD", "Value of EMD (in Crore)", "number"],
                  ["rfpDueDate", "RFP Due Date", "date"],
                  ["approvalDmktg", "Dmktg In-principle Approval Received On", "date"],
                  ["sellingPriceApproval", "Selling Price Approval Initiated On", "date"],
                  ["bidSubmittedOn", "Bid Submitted On", "date"],
                  ["approvalSbuFinance", "Approval from SBU Finance On", "date"],
                  ["approvalGM", "Approval from GM", "date"],
                  ["sentToFinanceGM", "Sent to Finance GM On", "date"],
                  ["dmktgApprovalReceived", "Dmktg Approval Received On", "date"],
                ].map(([name, label, type]) => (
                  <Grid item xs={12} sm={6} key={name}>
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
                          InputLabelProps={{ shrink: true }}
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

          {/* Section 3 – Reference & Classification */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">🏷️ Reference & Classification</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderReferenceNo"
                    control={control}
                    rules={{ required: "Tender Reference No is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Tender Reference Number"
                        fullWidth
                        className="text-field-style"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.tenderReferenceNo}
                        helperText={errors.tenderReferenceNo?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderType"
                    control={control}
                    rules={{ required: "Tender Type is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Tender Type"
                        fullWidth
                        className="text-field-style"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.tenderType}
                        helperText={errors.tenderType?.message}
                      >
                        {tenderTypeOptions.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name="website"
                    control={control}
                    rules={{ required: "Website / Portal Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Tender Website / Portal Name"
                        fullWidth
                        className="text-field-style"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.website}
                        helperText={errors.website?.message}
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
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.presentStatus}
                        helperText={errors.presentStatus?.message}
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
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
              Submit Tender
            </Button>&nbsp;&nbsp;&nbsp;
            <Button type="button" variant="outlined" size="large" className="btn-reset" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </form>

        {/* Snackbar */}
        <Snackbar open={submitSuccess} autoHideDuration={5000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Tender form submitted successfully!
          </Alert>
        </Snackbar>

        {/* JSON Output Box */}
        {submittedData && (
          <Box sx={{ mt: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">📊 Submitted Data (JSON)</Typography>
              <Button variant="contained" color="success" size="small" onClick={handleDownloadJSON}>
                Download JSON
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Paper elevation={2} sx={{
              p: 3,
              backgroundColor: "#1e1e1e",
              color: "#d4d4d4",
              maxHeight: 480,
              overflow: "auto",
              borderRadius: 2
            }}>
              <pre>{JSON.stringify(submittedData, null, 2)}</pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
