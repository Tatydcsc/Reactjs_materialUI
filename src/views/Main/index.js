import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import MyCards from "../../components/MyCards";
import Footer from "../../components/Footer";

const defaultTheme = createTheme();

const cards = [
  {
    id: 1,
    Imag: "https://media.istockphoto.com/id/1455045956/pt/foto/beach-and-fishing-village-of-firapotamos-on-milos-island-greece.webp?b=1&s=612x612&w=0&k=20&c=BYub0TkfVDh_31PLDTEaxgZ4b164f8r9XYhID_4tF_8=",
    title: "Praia",
    description: "Viage com a família para Praia nas férias.",
  },
  {
    id: 2,
    Imag: "https://media.istockphoto.com/id/1474040270/pt/foto/sunlight-aglow-on-her-dress-happy-young-woman-stands-in-the-countryside-of-cappadocia-the.jpg?s=1024x1024&w=is&k=20&c=O71NwCExBrAWPNZg9G5J0yGORR2ucCixctYRIUXIIrk=",
    title: "Passeio de balão",
    description: "Venha passear de balão.",
  },
  {
    id: 3,
    Imag: "https://media.istockphoto.com/id/1161446973/pt/foto/attraction-roller-coaster-park-sochi-against-sky.webp?b=1&s=612x612&w=0&k=20&c=jOO-pJrHfrLVXYeutzoRkr4MHS3Oz0S87zXTh3GQnco=",
    title: "Parque de diversão",
    description: "Venha para o parque de diversões com a família.",
  },
  {
    id: 4,
    Imag: "https://cdn.pixabay.com/photo/2013/08/28/00/54/field-176602_1280.jpg",
    title: "Hotel fazenda",
    description: "Passe um final de semana incrível na fazenda.",
  },
  {
    id: 5,
    Imag: "https://cdn.pixabay.com/photo/2017/12/22/11/09/schilthorn-3033448_640.jpg",
    title: "Neve",
    description: "Realize seu sonho de conhecer a neve.",
  },
  {
    id: 6,
    Imag: "https://cdn.pixabay.com/photo/2013/06/08/04/17/ferry-boat-123059_640.jpg",
    title: "Cruzeiro",
    description: "Faça um cruzeiro pela costa brasileira.",
  },
];

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavHeader />
      <CssBaseline />

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
              Viagens e lazer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Aqui você encontra os melhores destinos para passeios e viagens.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Viagens</Button>
              <Button variant="outlined">Lazer</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <MyCards data={cards} />
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
