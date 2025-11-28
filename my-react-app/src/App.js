import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DefenceLeads from "./components/LeadTable";
import CivilLeads from "./components/CivilLeadTable";
import Settings from "./components/Settings";
import Header from "./components/Header"; // ✔ imported
import BudgetaryQuotationForm from "./components/BudgetaryQuotationForm";
import LeadSubmittedForm from "./components/LeadSubmittedForm";
import DomesticLeadsForm from "./components/DomesticLeadsForm"; // <-- import DomesticLeads
import ExportLeadsForm from "./components/ExportLeadsForm"; // <-- import DomesticLeads
import CRMLeadsForm from "./components/CRMLeadsForm";
import OrderReceivedForm from "./components/OrderReceivedForm";
import LostForm from "./components/LostForm"; 

function App() {
  return (
    <Router>
      <Sidebar />
    
      {/* Use the header here */}
      <Header />

      {/* Main content shifted to the right */}
      <div style={{ marginLeft: "80px", padding: "20px" }}>
        <Routes>
          <Route path="/defence-leads" element={<DefenceLeads />} />
          <Route path="/civil-leads" element={<CivilLeads />} />
          <Route path="/budgetary-quotation" element={<BudgetaryQuotationForm />} />
          <Route path="/lead-submitted" element={<LeadSubmittedForm />} />
          <Route path="/domestic-leads" element={<DomesticLeadsForm />} />
          <Route path="/export-leads" element={<ExportLeadsForm />} /> 
          <Route path="/crm-leads" element={<CRMLeadsForm />} />
          <Route path="/order-received" element={<OrderReceivedForm />} />
          <Route path="/lost" element={<LostForm />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
