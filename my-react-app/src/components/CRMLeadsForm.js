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

export default function CRMLeadsForm() {
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
    a.download = `crmless-${submittedData?.leadId || "crm"}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            CRM Leads Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill all details below to submit the CRM lead form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* SECTION 1 — CRM Lead Info */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📌 CRM Lead Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>

                {/* Sl No
                <Grid item xs={12} md={6}>
                  <Controller
                    name="slno"
                    control={control}
                    rules={{ required: "Sl.No is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Sl.No" type="number"
                        className="text-field-style" error={!!errors.slno}
                        helperText={errors.slno?.message}
                      />
                    )}
                  />
                </Grid> */}

                {/* Lead ID */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="leadId"
                    control={control}
                    rules={{ required: "Lead ID is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Lead ID"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.leadId}
                        helperText={errors.leadId?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Issue Date */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="issueDate"
                    control={control}
                    rules={{ required: "Issue Date is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="date" fullWidth label="Issue Date"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.issueDate}
                        helperText={errors.issueDate?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Tender Name */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderName"
                    control={control}
                    rules={{ required: "Tender Name is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Tender Name"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.tenderName}
                        helperText={errors.tenderName?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Organisation */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="organisation"
                    control={control}
                    rules={{ required: "Organisation is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Organisation"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.organisation}
                        helperText={errors.organisation?.message}
                      />
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
                        InputLabelProps={{ shrink: true }}
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

                {/* Tender Type */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tenderType"
                    control={control}
                    rules={{ required: "Tender Type is required" }}
                    render={({ field }) => (
                      <TextField {...field} select fullWidth label="Tender Type"
                        InputLabelProps={{ shrink: true }}
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

                {/* EMD */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="emdValue"
                    control={control}
                    rules={{ required: "EMD value is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="EMD in Crore" type="number"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.emdValue}
                        helperText={errors.emdValue?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Approx Tender Value */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="approxTenderValue"
                    control={control}
                    rules={{ required: "Approx Tender Value is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Approx Tender Value in Crore" type="number"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.approxTenderValue}
                        helperText={errors.approxTenderValue?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Last Date of Submission */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="lastDateSubmission"
                    control={control}
                    rules={{ required: "Last Date of Submission is required" }}
                    render={({ field }) => (
                      <TextField {...field} type="date" fullWidth label="Last Date of Submission"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.lastDateSubmission}
                        helperText={errors.lastDateSubmission?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Pre-bid Date */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="preBidDate"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} type="datetime-local" fullWidth label="Pre-bid Date & Time"
                        InputLabelProps={{ shrink: true }} className="text-field-style" error={!!errors.teamAssigned}
                        helperText={errors.teamAssigned?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Team Assigned */}
                <Grid item xs={12}>
                  <Controller
                    name="teamAssigned"
                    control={control}
                    rules={{ required: "Team Assigned is required" }}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Team Assigned"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style" error={!!errors.teamAssigned}
                        helperText={errors.teamAssigned?.message}
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
                        InputLabelProps={{ shrink: true }}
                        label="Remarks" className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Corrigendum */}
                <Grid item xs={12}>
                  <Controller
                    name="corrigendum"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth
                        InputLabelProps={{ shrink: true }}
                        label="Corrigendums – Date & File"
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* FORM BUTTONS */}
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
            CRM Lead submitted successfully!
          </Alert>
        </Snackbar>

        {/* JSON OUTPUT */}
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
                maxHeight: 450,
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
