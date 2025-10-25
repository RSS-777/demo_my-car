import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { store } from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyles />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
