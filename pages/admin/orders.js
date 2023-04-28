import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import Orders from "../../src/components/dashboard/Orders";
export default function Order() {
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
      <CssBaseline />
      <FullLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Orders />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}
