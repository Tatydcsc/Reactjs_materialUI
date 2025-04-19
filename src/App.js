import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Promocoes from "./views/Promocoes";
import Destinos from "./views/Destinos";
import DetalhePraia from "./views/DetalhePraia";
import Carrinho from "./views/Carrinho";
import Pagamento from "./views/Pagamento";
import Voucher from "./views/Voucher";
import Confirmacao from "./views/Confirmacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/detalhe-praia" element={<DetalhePraia />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/voucher" element={<Voucher />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
