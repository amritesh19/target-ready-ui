import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageRoutes from "./components/PageRoutes";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { AlertProvider } from "./components/AlertContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AlertProvider>
          <UserProvider>
            <Header />

            <PageRoutes />

            <Footer />
          </UserProvider>
        </AlertProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
