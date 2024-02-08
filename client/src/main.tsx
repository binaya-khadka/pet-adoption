import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './app/screens'

import { QueryClientProvider, QueryClient } from 'react-query'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
)
