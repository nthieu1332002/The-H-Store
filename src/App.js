import { BrowserRouter } from "react-router-dom";

import Header from './components/header/Header';
import Pages from './pages/Pages';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Pages />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
