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

import LandingPage from './pages/LandingPage.jsx';
import Feeds from './pages/Feeds.jsx';
import Jobs from './components/Jobs/Jobs.jsx';
import Signup from './components/User/Signup.jsx';
import Signin from './components/User/Signin.jsx';
import Footer from './components/Layout/Footer.jsx';
import Homepage from './pages/Homepage.jsx';
import CreateJob from './components/Jobs/CreateJob.jsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Footer />}>
      <Route path="/" element={<LandingPage />}>
        <Route index={true} element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Route>
      <Route path="/home" element={<Homepage />}>
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/new" element={<CreateJob />} />
        <Route path="feeds" element={<Feeds />} />
      </Route>
    </Route>
  )
);

const theme = createTheme({
  palette: {
    primary: { main: '#ce93d8' },
    secondary: { main: '#f48fb1' },
    green: { main: '#aed581' },
    text: { main: '#aed581', secondary: '#f48fb1' },
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
