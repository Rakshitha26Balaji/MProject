import db from "../models/index.js";

const DomesticLeads = db.DomesticLeadsModel;
const BudgetaryQuotation = db.BudgetaryQuotationModel;
const LostForm = db.LostFormModel;

// Financial year month order (matches frontend)
const MONTHS = [
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
];

// Convert string date into JS Date
function parseDate(dateStr) {
  if (!dateStr) return null;

  try {
    // YYYY-MM-DD
    if (dateStr.includes("-") && dateStr.split("-")[0].length === 4) {
      return new Date(dateStr);
    }

    // DD/MM/YYYY
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }

    // DD-MM-YYYY
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const [day, month, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }

    return null;
  } catch {
    return null;
  }
}

export const getMonthlyAnalysis = async (req, res) => {
  try {
    const leads = await DomesticLeads.findAll({ raw: true });
    const bqs = await BudgetaryQuotation.findAll({ raw: true });
    const lostForms = await LostForm.findAll({ raw: true });

    // Initialize monthly structure
    const monthlyMap = {};

    MONTHS.forEach(month => {
      monthlyMap[month] = {
        month,
        orders: 0,
        leads: 0,
        bqs: 0,
        value: 0,
        won: 0,
        lost: 0
      };
    });

    // ---------------- LEADS ----------------
    leads.forEach(row => {
      const date = parseDate(row.tenderDated);

      if (!date || isNaN(date.getTime())) return;

      const monthName = MONTHS.includes(
        date.toLocaleString("en-US", { month: "short" })
      )
        ? date.toLocaleString("en-US", { month: "short" })
        : null;

      if (!monthName) return;

      monthlyMap[monthName].leads++;

      const value = parseFloat(row.estimatedValueInCrWithoutGST || 0);

      if (!isNaN(value)) {
        monthlyMap[monthName].value += value;
      }

      const status = (row.wonLostParticipated || "")
        .toString()
        .toLowerCase()
        .trim();

      if (status.includes("won") || status.includes("win")) {
        monthlyMap[monthName].won++;
        monthlyMap[monthName].orders++;
      }

      if (status.includes("lost")) {
        monthlyMap[monthName].lost++;
      }
    });

    // ---------------- BQ ----------------
    bqs.forEach(row => {
      const date = parseDate(row.dateOfLetterSubmission);

      if (!date || isNaN(date.getTime())) return;

      const monthName = MONTHS.includes(
        date.toLocaleString("en-US", { month: "short" })
      )
        ? date.toLocaleString("en-US", { month: "short" })
        : null;

      if (!monthName) return;

      monthlyMap[monthName].bqs++;
    });

    // Lost form table only has year, so use yearly total only
    const totalLostForms = lostForms.length;

    const result = MONTHS.map(month => ({
      ...monthlyMap[month],
      value: Number(monthlyMap[month].value.toFixed(2))
    }));

    res.status(200).json({
      success: true,
      totalLostForms,
      data: result
    });
  } catch (error) {
    console.error("Monthly Analysis Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};