import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";   // <-- IMPORT CSS

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Defence Leads", path: "/defence-leads" },
    { text: "Civil Leads", path: "/civil-leads" },
    { text: "Budgetary Quotation", path: "/budgetary-quotation" },
    { text: "Lead Submitted Form", path: "/lead-submitted" },
    { text: "Domestic Leads Form", path: "/domestic-leads" },
    { text: "Export Leads Form", path: "/export-leads" },
    { text: "CRM Leads Form", path: "/crm-leads" },
    { text: "Order Received Form", path: "/order-received" },
    { text: "Lost Form", path: "/lost" },
    { text: "Settings", path: "/settings" },
    { text: "Logout", path: "/logout" }
  ];

  return (
    <Box>
      {/* Menu Icon always visible */}
      <IconButton
        onClick={toggleDrawer}
        className="sidebar-menu-icon"
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <Box className="sidebar-container">
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  className="sidebar-item"
                  onClick={() => {
                    navigate(item.path);
                    toggleDrawer();
                  }}
                >
                  <ListItemText primary={item.text} className="sidebar-text" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
