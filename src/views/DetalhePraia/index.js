import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale';
import { addDays, differenceInDays, isWeekend } from 'date-fns';

const defaultTheme = createTheme();

// Valor base da diária
const valorDiariaBase = 380.00;

// Adicional para finais de semana (30% a mais)
const adicionalFimDeSemana = 1.3;

// URL da imagem da praia (usando a mesma URL pública)
const praiaImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

function DetalhePraia() {
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [quantidadeDias, setQuantidadeDias] = useState(2);
  const [valorTotal, setValorTotal] = useState(0);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  
  // Atualiza o checkout quando o checkin muda
  useEffect(() => {
    if (checkIn) {
      setCheckOut(addDays(checkIn, 2)); // Mínimo de 2 diárias
    }
  }, [checkIn]);
  
  // Calcula o número de dias e o valor total quando as datas mudam
  useEffect(() => {
    if (checkIn && checkOut) {
      const dias = differenceInDays(checkOut, checkIn);
      
      if (dias < 2) {
        setErro("A estadia mínima é de 2 diárias.");
        setValorTotal(0);
        setQuantidadeDias(0);
        return;
      } else {
        setErro("");
        setQuantidadeDias(dias);
      }
      
      let total = 0;
      let dataAtual = new Date(checkIn);
      
      // Calcular o valor para cada dia individualmente
      for (let i = 0; i < dias; i++) {
        const valorDiaria = isWeekend(dataAtual) 
          ? valorDiariaBase * adicionalFimDeSemana 
          : valorDiariaBase;
        
        total += valorDiaria * quantidadePessoas;
        dataAtual = addDays(dataAtual, 1);
      }
      
      setValorTotal(total);
    }
  }, [checkIn, checkOut, quantidadePessoas]);
  
  const handleReservar = () => {
    // Dados da reserva para enviar ao carrinho
    const reservaData = {
      destino: "Resort Praia Paradisíaca",
      imagem: praiaImageUrl,
      checkIn: checkIn,
      checkOut: checkOut,
      quantidadePessoas: quantidadePessoas,
      quantidadeDias: quantidadeDias,
      valorDiaria: valorDiariaBase,
      valorTotal: valorTotal
    };
    
    // Salvar os dados da reserva no localStorage
    localStorage.setItem('reservaAtual', JSON.stringify(reservaData));
    
    // Navegar para a página de carrinho
    navigate('/carrinho');
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
              Resort Praia Paradisíaca
            </Typography>
            
            {/* Imagem da praia */}
            <Box 
              sx={{ 
                width: '100%', 
                height: 400, 
                overflow: 'hidden', 
                borderRadius: 2,
                mb: 4
              }}
            >
              <img 
                src={praiaImageUrl} 
                alt="Resort Praia Paradisíaca" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
            </Box>
            
            <Typography
              variant="h5"
              align="left"
              color="text.primary"
              paragraph
              sx={{ mb: 2 }}
            >
              Desfrute de uma experiência única em nosso resort à beira-mar
            </Typography>
            
            <Typography
              variant="body1"
              align="left"
              color="text.secondary"
              paragraph
            >
              Com uma vista deslumbrante para o oceano, o Resort Praia Paradisíaca oferece acomodações luxuosas,
              serviço de primeira classe e uma variedade de atividades para toda a família.
            </Typography>
            
            <Typography
              variant="body1"
              align="left"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              Nossas suítes espaçosas são equipadas com ar-condicionado, TV de tela plana, minibar e varanda privativa
              com vista para o mar. Aproveite também nossa piscina infinita, spa completo e restaurantes gourmet.
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={8}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Faça sua reserva
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>
                            Data de check-in:
                          </Typography>
                          <div style={{ width: '100%' }}>
                            <DatePicker
                              selected={checkIn}
                              onChange={date => setCheckIn(date)}
                              selectsStart
                              startDate={checkIn}
                              endDate={checkOut}
                              minDate={new Date()}
                              dateFormat="dd/MM/yyyy"
                              locale={ptBR}
                              customInput={
                                <TextField 
                                  fullWidth
                                  variant="outlined"
                                />
                              }
                            />
                          </div>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>
                            Data de check-out:
                          </Typography>
                          <div style={{ width: '100%' }}>
                            <DatePicker
                              selected={checkOut}
                              onChange={date => setCheckOut(date)}
                              selectsEnd
                              startDate={checkIn}
                              endDate={checkOut}
                              minDate={checkIn ? addDays(checkIn, 2) : new Date()}
                              dateFormat="dd/MM/yyyy"
                              locale={ptBR}
                              customInput={
                                <TextField 
                                  fullWidth
                                  variant="outlined"
                                />
                              }
                            />
                          </div>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Quantidade de pessoas"
                          type="number"
                          InputProps={{ inputProps: { min: 1 } }}
                          value={quantidadePessoas}
                          onChange={(e) => setQuantidadePessoas(Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </Grid>
                      
                      {erro && (
                        <Grid item xs={12}>
                          <Typography variant="body2" color="error">
                            {erro}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Resumo da reserva
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Diária em dias de semana: R$ {valorDiariaBase.toFixed(2)} por pessoa
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Diária em fins de semana: R$ {(valorDiariaBase * adicionalFimDeSemana).toFixed(2)} por pessoa
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Quantidade de pessoas: {quantidadePessoas}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Duração da estadia: {quantidadeDias} {quantidadeDias === 1 ? 'dia' : 'dias'}
                    </Typography>
                    
                    <Box sx={{ mt: 3, mb: 2 }}>
                      <Typography variant="h5" align="right">
                        Total: R$ {valorTotal.toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <CustomButton variant="outlined">VOLTAR</CustomButton>
                      </Link>
                      <CustomButton 
                        variant="contained" 
                        color="primary"
                        disabled={!checkIn || !checkOut || quantidadeDias < 2}
                        sx={{ ml: 4 }}
                        onClick={handleReservar}
                      >
                        RESERVAR
                      </CustomButton>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default DetalhePraia; 