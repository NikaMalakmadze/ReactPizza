import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Pizza from "./pages/Pizza";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/pizza/:slug" element={<Pizza />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
