import React, { useState, useEffect } from "react"; // CHANGED: added useEffect
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper
} from "@mui/material";
import axios from "axios"; // CHANGED: added axios
import ChartCard from "../components/ChartCard";

// CHANGED: moved months locally (removed mockData)
const MONTHS = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
];

// =======================
// CHANGED: Chart uses API data now
// =======================
function MonthlyValueChart({ data, selectedMonth }) {
  const maxValue = Math.max(...data.map((m) => m.value), 1);

  return (
    <Box
      sx={{
        width: "100%",
        height: "240px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        gap: "8px",
        paddingBottom: "20px"
      }}
    >
      {MONTHS.map((month, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: `${(data[idx]?.value / maxValue) * 180}px`,
              backgroundColor:
                idx === selectedMonth
                  ? "#2563eb"
                  : "rgba(37,99,235,0.35)",
              borderRadius: "5px 5px 0 0"
            }}
          />
          <Typography
            sx={{
              fontSize: "10px",
              color: "#8892a4",
              marginTop: "8px"
            }}
          >
            {month}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// =======================
// CHANGED: Uses API data
// =======================
function LeadsVsBQsChart({ data }) {
  const maxValue = Math.max(
    ...data.map((m) => Math.max(m.leads, m.bqs)),
    1
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "240px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        gap: "6px",
        paddingBottom: "20px"
      }}
    >
      {MONTHS.map((month, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "3px",
            flex: 1
          }}
        >
          <Box
            sx={{
              width: "45%",
              height: `${(data[idx]?.leads / maxValue) * 180}px`,
              backgroundColor: "rgba(37,99,235,0.8)",
              borderRadius: "4px 4px 0 0"
            }}
          />
          <Box
            sx={{
              width: "45%",
              height: `${(data[idx]?.bqs / maxValue) * 180}px`,
              backgroundColor: "rgba(124,58,237,0.8)",
              borderRadius: "4px 4px 0 0"
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

export default function MonthlyAnalysis() {
  const [selectedMonth, setSelectedMonth] = useState(0);

  // CHANGED: API state
  const [monthDataList, setMonthDataList] = useState([]);
  const [totalLostForms, setTotalLostForms] = useState(0);
  const [loading, setLoading] = useState(true);

  // CHANGED: backend URL
  const API_URL = "http://localhost:8083/api/dashboard/analysis/monthly-analysis";

  // =======================
  // CHANGED: fetch backend data
  // =======================
  useEffect(() => {
    fetchMonthlyAnalysis();
  }, []);

  const fetchMonthlyAnalysis = async () => {
    try {
      const response = await axios.get(API_URL);

      if (response.data.success) {
        setMonthDataList(response.data.data);
        setTotalLostForms(response.data.totalLostForms);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const monthData = monthDataList[selectedMonth] || {
    orders: 0,
    leads: 0,
    bqs: 0,
    value: 0,
    won: 0,
    lost: 0
  };

  // CHANGED: loading state
  if (loading) {
    return <Typography>Loading monthly analysis...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#8892a4",
          textTransform: "uppercase",
          borderBottom: "2px solid #e4e8ef"
        }}
      >
        Monthly reports — select a month
      </Typography>

      <Paper sx={{ border: "1px solid #e4e8ef", borderRadius: "14px" }}>
        <Box
          sx={{
            padding: "16px 20px",
            borderBottom: "1px solid #e4e8ef",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
              FY 2025–26 monthly breakdown
            </Typography>
          </Box>

          <Button variant="outlined" size="small">
            Generate Report
          </Button>
        </Box>

        {/* Month Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0,1fr))",
            borderBottom: "1px solid #e4e8ef"
          }}
        >
          {MONTHS.map((month, idx) => (
            <Box
              key={idx}
              onClick={() => setSelectedMonth(idx)}
              sx={{
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  idx === selectedMonth ? "#eff4ff" : "transparent"
              }}
            >
              <Typography sx={{ fontSize: "11px" }}>
                {month}
              </Typography>

              <Typography sx={{ fontWeight: 700 }}>
                {monthDataList[idx]?.orders || 0}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Detail cards */}
        <Box
          sx={{
            padding: "16px 20px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "16px"
          }}
        >
          <Paper sx={{ p: 2 }}>
            Orders: {monthData.orders}
          </Paper>

          <Paper sx={{ p: 2 }}>
            Order Value: ₹{monthData.value} Cr
          </Paper>

          <Paper sx={{ p: 2 }}>
            Leads: {monthData.leads}
          </Paper>

          <Paper sx={{ p: 2 }}>
            BQs: {monthData.bqs}
          </Paper>

          <Paper sx={{ p: 2 }}>
            Won: {monthData.won}
          </Paper>

          <Paper sx={{ p: 2 }}>
            Lost: {monthData.lost}
          </Paper>

          <Paper sx={{ p: 2 }}>
            Win Rate:{" "}
            {monthData.leads > 0
              ? Math.round((monthData.won / monthData.leads) * 100)
              : 0}
            %
          </Paper>

          {/* CHANGED: total lost forms */}
          <Paper sx={{ p: 2 }}>
            Total Lost Forms: {totalLostForms}
          </Paper>
        </Box>
      </Paper>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Monthly order value">
            <MonthlyValueChart
              data={monthDataList}
              selectedMonth={selectedMonth}
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ChartCard title="Leads vs BQs">
            <LeadsVsBQsChart data={monthDataList} />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
}