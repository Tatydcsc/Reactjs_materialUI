import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const defaultTheme = createTheme();

function Carrinho() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  
  useEffect(() => {
    // Carregar reserva do localStorage
    const reservaAtual = localStorage.getItem('reservaAtual');
    const reservasExistentes = localStorage.getItem('reservas') ? JSON.parse(localStorage.getItem('reservas')) : [];
    
    if (reservaAtual) {
      const novaReserva = JSON.parse(reservaAtual);
      
      // Verificar se a reserva já existe no carrinho
      const reservaExistente = reservasExistentes.find(
        r => r.destino === novaReserva.destino && 
             r.checkIn === novaReserva.checkIn && 
             r.checkOut === novaReserva.checkOut
      );
      
      if (!reservaExistente) {
        const novasReservas = [...reservasExistentes, novaReserva];
        localStorage.setItem('reservas', JSON.stringify(novasReservas));
        setReservas(novasReservas);
      } else {
        setReservas(reservasExistentes);
      }
      
      // Limpar a reserva atual
      localStorage.removeItem('reservaAtual');
    } else {
      setReservas(reservasExistentes);
    }
  }, []);
  
  useEffect(() => {
    // Calcular o valor total de todas as reservas
    const total = reservas.reduce((sum, reserva) => sum + reserva.valorTotal, 0);
    setValorTotal(total);
  }, [reservas]);
  
  const handleRemoverReserva = (index) => {
    const novasReservas = [...reservas];
    novasReservas.splice(index, 1);
    setReservas(novasReservas);
    localStorage.setItem('reservas', JSON.stringify(novasReservas));
  };
  
  const handleFinalizarCompra = () => {
    navigate('/pagamento');
  };
  
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
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Carrinho de Compras
            </Typography>
            
            {reservas.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Seu carrinho está vazio
                </Typography>
                <Typography variant="body1" paragraph>
                  Adicione destinos ao seu carrinho para continuar.
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <CustomButton variant="contained">CONTINUAR COMPRANDO</CustomButton>
                </Link>
              </Paper>
            ) : (
              <>
                {reservas.map((reserva, index) => (
                  <Paper key={index} sx={{ p: 3, mb: 3, mt: index === 0 ? 4 : 0 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ height: 150, overflow: 'hidden', borderRadius: 1 }}>
                          <img 
                            src={reserva.imagem} 
                            alt={reserva.destino} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Typography variant="h6" gutterBottom>
                          {reserva.destino}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Check-in: {format(new Date(reserva.checkIn), 'dd/MM/yyyy', { locale: ptBR })}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Check-out: {format(new Date(reserva.checkOut), 'dd/MM/yyyy', { locale: ptBR })}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Pessoas: {reserva.quantidadePessoas}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Duração: {reserva.quantidadeDias} dias
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                          R$ {reserva.valorTotal.toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton 
                          aria-label="remover" 
                          color="error"
                          onClick={() => handleRemoverReserva(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
                
                <Paper sx={{ p: 3, mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">
                      Total:
                    </Typography>
                    <Typography variant="h5">
                      R$ {valorTotal.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <CustomButton variant="outlined">CONTINUAR COMPRANDO</CustomButton>
                    </Link>
                    <CustomButton 
                      variant="contained" 
                      color="primary"
                      onClick={handleFinalizarCompra}
                      sx={{ ml: 2 }}
                    >
                      FINALIZAR COMPRA
                    </CustomButton>
                  </Box>
                </Paper>
              </>
            )}
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Carrinho; 