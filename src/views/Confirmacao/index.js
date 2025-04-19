import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const defaultTheme = createTheme();

function Confirmacao() {
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
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main' }} />
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Pedido Confirmado!
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Seu pedido foi realizado com sucesso.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Em breve você receberá um e-mail com a confirmação do seu pedido.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Link to="/voucher" style={{ textDecoration: 'none' }}>
                <CustomButton variant="contained" color="primary">
                  VER VOUCHER
                </CustomButton>
              </Link>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <CustomButton variant="outlined">
                  VOLTAR PARA A PÁGINA INICIAL
                </CustomButton>
              </Link>
            </Box>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Confirmacao; 