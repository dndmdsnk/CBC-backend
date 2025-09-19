import "./App.css";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Homepage from "./pages/homepage";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";




function App() {
  return (
    <BrowserRouter>
     
      <div>
        
       {/*<Header />*/}
         
        <Routes path="/*">
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin/*" element={<AdminPage/>} />
          <Route path="/testing" element={<TestPage/>} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
