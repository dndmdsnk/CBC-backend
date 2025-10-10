import "./App.css";
import LoginPage from "./pages/login";
import Homepage from "./pages/homepage";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register";
import ProductPage from "./pages/client/ProductPage"; 
import ProductOverview from "./pages/client/ProductOverview";
import CartPage from "./pages/client/cart";
import CheckoutPage from "./pages/client/checkOut";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from "./pages/client/forgetPassword";
import ComingSoon from "./pages/comingSoonPage";






function App() {
  return (
    <GoogleOAuthProvider clientId="391049423367-0hckd0n55jjl2umprt8tqvc3l5hdfsbs.apps.googleusercontent.com">
    <BrowserRouter>
     
      <div>
        <Toaster position='top-center'/>
        
       
         
        <Routes path="/*">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage/>} />
          <Route path="/testing" element={<TestPage/>} />
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductPage/>} />
          <Route path="/productoverview/:id" element={<ProductOverview/>} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/forgetpassword" element={<ForgetPasswordPage/>}/>
          <Route path="/about" element={<ComingSoon/>}/>
          <Route path="/contact" element={<ComingSoon/>}/>
      
        </Routes>
      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
//https://fnhwbynyqskhlzikzepz.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHdieW55cXNraGx6aWt6ZXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDA5MTQsImV4cCI6MjA3NDM3NjkxNH0.s60BZhOBQXay-TW2m_ugjyK-s60dK_K-12fHwIpp18M  
