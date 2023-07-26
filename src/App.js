import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageRoutes from "./components/PageRoutes";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <UserProvider>
          <Header />
          <PageRoutes />
          <Footer />
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
