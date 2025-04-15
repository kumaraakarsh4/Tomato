import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import StoreContextprovider from './Context/StoreContext'
import {NextUIProvider} from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextprovider>
      <NextUIProvider>
        <App/>
      </NextUIProvider>
    </StoreContextprovider>
  </BrowserRouter>,
)
