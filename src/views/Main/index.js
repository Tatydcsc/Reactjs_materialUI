import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import NavHeader from "../../components/NavHeader";
import MyCards from "../../components/MyCards";
import Footer from "../../components/Footer";
import { cards } from "../../components/Card/data";
import CustomButton from "../../components/Button";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavHeader />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Viagens
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Venha conhecer os melhores destinos para suas férias.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/destinos" style={{ textDecoration: 'none' }}>
                <CustomButton variant="contained">Destinos</CustomButton>
              </Link>
              <Link to="/promocoes" style={{ textDecoration: 'none' }}>
                <CustomButton variant="outlined">Promoções</CustomButton>
              </Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <MyCards cards={cards} />
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
