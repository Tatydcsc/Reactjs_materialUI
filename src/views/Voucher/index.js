import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Divider from '@mui/material/Divider';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser';

const defaultTheme = createTheme();

function Voucher() {
  const [pedido, setPedido] = useState(null);
  const [enviandoEmail, setEnviandoEmail] = useState(false);
  const [mensagemEnvio, setMensagemEnvio] = useState('');
  
  useEffect(() => {
    const pedidoAtual = localStorage.getItem('pedidoAtual');
    if (pedidoAtual) {
      setPedido(JSON.parse(pedidoAtual));
    }
  }, []);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleEmail = async () => {
    if (!pedido?.cliente?.email) {
      alert('Email do cliente não encontrado');
      return;
    }

    setEnviandoEmail(true);
    setMensagemEnvio('');

    try {
      // Configurar o EmailJS com suas credenciais
      // Substitua com suas próprias credenciais do EmailJS
      const templateParams = {
        to_email: pedido.cliente.email,
        to_name: pedido.cliente.nome,
        from_name: "Resort Praia Paradisíaca",
        message: `
          Confirmação de Reserva
          
          Código do Pedido: ${pedido.id}
          Check-in: ${format(new Date(pedido.reservas[0].checkIn), 'dd/MM/yyyy', { locale: ptBR })}
          Check-out: ${format(new Date(pedido.reservas[0].checkOut), 'dd/MM/yyyy', { locale: ptBR })}
          Quantidade de Pessoas: ${pedido.reservas[0].quantidadePessoas}
          Valor Total: R$ ${pedido.valorTotal.toFixed(2)}
        `,
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Substitua pelo seu Service ID
        'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Substitua pela sua Public Key
      );

      setMensagemEnvio('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setMensagemEnvio('Erro ao enviar email. Tente novamente.');
    } finally {
      setEnviandoEmail(false);
    }
  };
  
  if (!pedido) {
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
                Pedido não encontrado
              </Typography>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <CustomButton variant="contained">VOLTAR PARA A PÁGINA INICIAL</CustomButton>
                </Link>
              </Box>
            </Container>
          </Box>
        </main>
        <Footer />
      </ThemeProvider>
    );
  }
  
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
                Seu pedido foi realizado com sucesso. Abaixo está o voucher da sua reserva.
              </Typography>
            </Box>
            
            <Paper sx={{ p: 4, mb: 4 }} className="voucher-container">
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  VOUCHER DE RESERVA
                </Typography>
                <Typography variant="body2">
                  Código: {pedido.id}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Dados do Cliente
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Nome: {pedido.cliente.nome}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Email: {pedido.cliente.email}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    CPF: {pedido.cliente.cpf}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Telefone: {pedido.cliente.telefone}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Dados do Pagamento
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Método: {pedido.pagamento.metodo === 'cartao' ? 'Cartão de Crédito' : 'PIX'}
                  </Typography>
                  {pedido.pagamento.metodo === 'cartao' && (
                    <Typography variant="body2" gutterBottom>
                      Cartão: **** **** **** {pedido.pagamento.cartao.numero.slice(-4)}
                    </Typography>
                  )}
                  <Typography variant="body2" gutterBottom>
                    Data: {format(new Date(pedido.data), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Valor Total: R$ {pedido.valorTotal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
              
              <Divider sx={{ mt: 3, mb: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Detalhes da Reserva
              </Typography>
              
              {pedido.reservas.map((reserva, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Destino: {reserva.destino}
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
                  <Typography variant="body2" gutterBottom>
                    Valor: R$ {reserva.valorTotal.toFixed(2)}
                  </Typography>
                </Box>
              ))}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <CustomButton 
                  variant="outlined" 
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                >
                  IMPRIMIR
                </CustomButton>
                <Box>
                  <CustomButton 
                    variant="contained" 
                    color="primary"
                    startIcon={<EmailIcon />}
                    onClick={handleEmail}
                    disabled={enviandoEmail}
                  >
                    {enviandoEmail ? 'ENVIANDO...' : 'ENVIAR POR EMAIL'}
                  </CustomButton>
                  {mensagemEnvio && (
                    <Typography 
                      variant="caption" 
                      color={mensagemEnvio.includes('sucesso') ? 'success.main' : 'error.main'}
                      sx={{ display: 'block', mt: 1, textAlign: 'center' }}
                    >
                      {mensagemEnvio}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <CustomButton variant="contained">VOLTAR PARA A PÁGINA INICIAL</CustomButton>
              </Link>
            </Box>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Voucher; 