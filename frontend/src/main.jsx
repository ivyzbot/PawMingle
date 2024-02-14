import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App.jsx';
import Feeds from './pages/Feeds.jsx';
import Jobs from './pages/Jobs.jsx';
import './index.css';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Footer from './components/Layout/Footer.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Footer />}>
        <Route path="/" element={<App />}>
          <Route index={true} element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route path="feeds" element={<Feeds />} />
        <Route path="jobs" element={<Jobs />} />
      </Route>
    </>
  )
);

const theme = createTheme({
  palette: {
    primary: { main: '#ce93d8', placeholder: '#e040fb' },
    secondary: { main: '#f48fb1' },
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
