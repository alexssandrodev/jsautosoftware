import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Historic from "./pages/Historic";
import Details from "./pages/Details";

function AppRoutes() {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/historic" element={<Historic />} />
                <Route path="/details" element={<Details />} />
            </Routes>
        </BrowserRouter>
     );
}

export default AppRoutes;
