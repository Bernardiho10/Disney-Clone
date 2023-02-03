import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/app/store';
import Errorpage from './components/Errorpage';


const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    errorElement: <Errorpage />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>

      </RouterProvider>
    </Provider>
  </React.StrictMode>
);