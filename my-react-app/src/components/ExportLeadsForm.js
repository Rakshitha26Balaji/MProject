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
const civilDefenceOptions = ["Civil", "Defence"];
const businessDomainOptions = ["IT", "Electronics", "Telecom", "Construction", "Other"];
const soleConsortiumOptions = ["Sole", "Consortium"];
const resultStatusOptions = ["Won", "Lost", "Participated", "Not Participated"];
const openClosedOptions = ["Open", "Closed"];

export default function TenderForm() {
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
    a.download = `tender-${submittedData.tenderName}-${Date.now()}.json`;
    a.click();
  };

  return (
    <Container maxWidth="xl" className="tender-container">
      <Paper elevation={4} className="tender-paper">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" className="section-title">
            Export Leads Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill all details below to submit the tender form
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* SECTION 1 — Tender Basic Details */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📌 Tender Basic Details</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["tenderName", "Tender Name"],
                  ["customer", "Customer"],
                  ["location", "Location"],
                ].map(([name, label]) => (
                  <Grid item xs={12} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label={label}
                          className="text-field-style"
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}

                {/* Tender Type */}
                <Grid item xs={12}>
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
                        error={!!errors.tenderType}
                        helperText={errors.tenderType?.message}
                      >
                        {tenderTypeOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* SECTION 2 — Classification & Financial */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">🏷️ Classification & Financial</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["documentType", "Document Type"],
                  ["leadOwner", "Lead Owner"],
                ].map(([name, label]) => (
                  <Grid item xs={12} md={6} key={name}>
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

                {/* Civil / Defence */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="civilDefence"
                    control={control}
                    rules={{ required: "Civil / Defence selection is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Civil / Defence"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.civilDefence}
                        helperText={errors.civilDefence?.message}
                      >
                        {civilDefenceOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Business Domain */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="businessDomain"
                    control={control}
                    rules={{ required: "Business Domain is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Business Domain"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.businessDomain}
                        helperText={errors.businessDomain?.message}
                      >
                        {businessDomainOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {[
                  ["valueOfEMD", "Value of EMD"],
                  ["estimatedValue", "Estimated Value in Crore (without GST)"],
                  ["submittedValue", "Submitted Value in Crore (without GST)"],
                ].map(([name, label]) => (
                  <Grid item xs={12} md={4} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
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

          {/* SECTION 3 — Submission Timeline */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">🗓️ Submission Timeline</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {[
                  ["tenderDated", "Tender Dated"],
                  ["lastDateSubmission", "Last Date of Submission"],
                ].map(([name, label]) => (
                  <Grid item xs={12} md={6} key={name}>
                    <Controller
                      name={name}
                      control={control}
                      rules={{ required: `${label} is required` }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="date"
                          fullWidth
                          label={label}
                          InputLabelProps={{ shrink: true }}
                          className="text-field-style"
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}

                {/* Sole / Consortium */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="soleConsortium"
                    control={control}
                    rules={{ required: "Sole / Consortium selection is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Sole / Consortium"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.soleConsortium}
                        helperText={errors.soleConsortium?.message}
                      >
                        {soleConsortiumOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Pre-Bid Meeting */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="preBidDate"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="datetime-local"
                        fullWidth
                        label="Pre-Bid Meeting Date & Time"
                        InputLabelProps={{ shrink: true }}
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* SECTION 4 — Competitors & Outcome */}
          <Card className="tender-card">
            <CardContent>
              <Typography variant="h6" className="section-title">📊 Competitors & Result</Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* Competitors Info */}
                <Grid item xs={12}>
                  <Controller
                    name="competitorsInfo"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={2}
                        label="Competitors Information"
                        fullWidth
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Result Status */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="resultStatus"
                    control={control}
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Won / Lost / Participated / Not Participated"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.resultStatus}
                        helperText={errors.resultStatus?.message}
                      >
                        {resultStatusOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Open / Closed */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="openClosed"
                    control={control}
                    rules={{ required: "Open / Closed status is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Open / Closed"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.openClosed}
                        helperText={errors.openClosed?.message}
                      >
                        {openClosedOptions.map((item) => (
                          <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>

                {/* Order Won Value */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="orderWonValue"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        label="Order Won Value in Crore (without GST)"
                        fullWidth
                        className="text-field-style"
                      />
                    )}
                  />
                </Grid>

                {/* Present Status */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="presentStatus"
                    control={control}
                    rules={{ required: "Present Status is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Present Status"
                        fullWidth
                        className="text-field-style"
                        error={!!errors.presentStatus}
                        helperText={errors.presentStatus?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Reason */}
                <Grid item xs={12}>
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        rows={2}
                        label="Reason for Losing / Participated / Not Participating"
                        fullWidth
                        className="text-field-style"
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
                      <TextField
                        {...field}
                        label="Corrigendums – Date & File"
                        fullWidth
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

        {/* SNACKBAR */}
        <Snackbar open={submitSuccess} autoHideDuration={4500} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Tender submitted successfully!
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
                maxHeight: 500,
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
