import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import emailjs from '@emailjs/browser';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

emailjs.init("YOUR_PUBLIC_KEY"); // Substitua pela sua Public Key
