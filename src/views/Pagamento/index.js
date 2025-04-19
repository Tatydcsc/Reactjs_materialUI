import * as React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputMask from 'react-input-mask';

const defaultTheme = createTheme();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Pagamento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [tabValue, setTabValue] = useState(0);
  const [cartaoData, setCartaoData] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCartaoChange = (e) => {
    const { name, value } = e.target;
    setCartaoData({
      ...cartaoData,
      [name]: value
    });
  };
  
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validar dados pessoais
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    
    // Validar dados de pagamento
    if (paymentMethod === 'cartao') {
      if (!cartaoData.numero) newErrors.numero = 'Número do cartão é obrigatório';
      if (!cartaoData.nome) newErrors.nomeCartao = 'Nome no cartão é obrigatório';
      if (!cartaoData.validade) newErrors.validade = 'Validade é obrigatória';
      if (!cartaoData.cvv) newErrors.cvv = 'CVV é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Obter reservas do localStorage
      const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
      
      // Criar dados do pedido
      const pedido = {
        id: Date.now().toString(),
        data: new Date().toISOString(),
        cliente: formData,
        reservas: reservas,
        pagamento: {
          metodo: paymentMethod,
          ...(paymentMethod === 'cartao' && { cartao: cartaoData }),
        },
        valorTotal: reservas.reduce((sum, reserva) => sum + reserva.valorTotal, 0),
      };
      
      // Salvar pedido no localStorage
      const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]');
      pedidos.push(pedido);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      
      // Limpar carrinho
      localStorage.removeItem('reservas');
      
      // Salvar pedido atual para exibir na página de confirmação
      localStorage.setItem('pedidoAtual', JSON.stringify(pedido));
      
      // Navegar para a página de confirmação
      navigate('/confirmacao');
    }
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
              Finalizar Compra
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Dados Pessoais
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Nome completo"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          error={!!errors.nome}
                          helperText={errors.nome}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <InputMask
                          mask="999.999.999-99"
                          value={formData.cpf}
                          onChange={handleChange}
                        >
                          {() => (
                            <TextField
                              required
                              fullWidth
                              label="CPF"
                              name="cpf"
                              error={!!errors.cpf}
                              helperText={errors.cpf}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={formData.telefone}
                          onChange={handleChange}
                        >
                          {() => (
                            <TextField
                              required
                              fullWidth
                              label="Telefone"
                              name="telefone"
                              error={!!errors.telefone}
                              helperText={errors.telefone}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Endereço"
                          name="endereco"
                          value={formData.endereco}
                          onChange={handleChange}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Cidade"
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="Estado"
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <InputMask
                          mask="99999-999"
                          value={formData.cep}
                          onChange={handleChange}
                        >
                          {() => (
                            <TextField
                              fullWidth
                              label="CEP"
                              name="cep"
                            />
                          )}
                        </InputMask>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Forma de Pagamento
                    </Typography>
                    
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <FormLabel component="legend">Selecione a forma de pagamento</FormLabel>
                      <RadioGroup
                        aria-label="forma-pagamento"
                        name="forma-pagamento"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel value="cartao" control={<Radio />} label="Cartão de Crédito" />
                        <FormControlLabel value="pix" control={<Radio />} label="PIX" />
                      </RadioGroup>
                    </FormControl>
                    
                    {paymentMethod === 'cartao' && (
                      <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <InputMask
                              mask="9999 9999 9999 9999"
                              value={cartaoData.numero}
                              onChange={handleCartaoChange}
                            >
                              {() => (
                                <TextField
                                  required
                                  fullWidth
                                  label="Número do Cartão"
                                  name="numero"
                                  error={!!errors.numero}
                                  helperText={errors.numero}
                                />
                              )}
                            </InputMask>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              label="Nome no Cartão"
                              name="nome"
                              value={cartaoData.nome}
                              onChange={handleCartaoChange}
                              error={!!errors.nomeCartao}
                              helperText={errors.nomeCartao}
                            />
                          </Grid>
                          
                          <Grid item xs={6}>
                            <InputMask
                              mask="99/99"
                              value={cartaoData.validade}
                              onChange={handleCartaoChange}
                            >
                              {() => (
                                <TextField
                                  required
                                  fullWidth
                                  label="Validade (MM/AA)"
                                  name="validade"
                                  error={!!errors.validade}
                                  helperText={errors.validade}
                                />
                              )}
                            </InputMask>
                          </Grid>
                          
                          <Grid item xs={6}>
                            <InputMask
                              mask="999"
                              value={cartaoData.cvv}
                              onChange={handleCartaoChange}
                            >
                              {() => (
                                <TextField
                                  required
                                  fullWidth
                                  label="CVV"
                                  name="cvv"
                                  error={!!errors.cvv}
                                  helperText={errors.cvv}
                                />
                              )}
                            </InputMask>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                    
                    {paymentMethod === 'pix' && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Typography variant="body1" gutterBottom>
                          Escaneie o QR Code abaixo para pagar com PIX
                        </Typography>
                        <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                            alt="QR Code PIX" 
                            style={{ width: 200, height: 200 }} 
                          />
                        </Box>
                        <Typography variant="body2">
                          Após o pagamento, você receberá a confirmação por email.
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                  
                  <Paper sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Resumo do Pedido
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body1">
                        Total:
                      </Typography>
                      <Typography variant="h6">
                        R$ {JSON.parse(localStorage.getItem('reservas') || '[]')
                          .reduce((sum, reserva) => sum + reserva.valorTotal, 0)
                          .toFixed(2)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                      <CustomButton 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        size="large"
                      >
                        FINALIZAR PAGAMENTO
                      </CustomButton>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default Pagamento; 