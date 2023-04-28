import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import Products from "../../src/components/dashboard/Products";
export default function View() {
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
            <Products />
          </Grid>
        </Grid>
      </FullLayout>
    </ThemeProvider>
  );
}
