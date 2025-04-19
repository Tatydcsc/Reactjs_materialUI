import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import { cards } from "../../components/Card/data";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";

const defaultTheme = createTheme();

// Filtrando apenas os cards de promoção (balão e parque)
const promocoes = cards.filter(card => 
  card.title === "Passeio de balão" || card.title === "Parque de diversão"
);

function Promocoes() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavHeader />
      <main>
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
              Promoções
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Aproveite nossas ofertas especiais!
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <CustomButton variant="outlined">Voltar para Home</CustomButton>
              </Link>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {promocoes.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={6}>
                <Card card={card} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Promocoes; 