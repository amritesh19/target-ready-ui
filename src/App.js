import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PageRoutes from './components/PageRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <PageRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
