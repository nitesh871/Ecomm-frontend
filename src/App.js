import React from 'react'
import './index.css';
import { BrowserRouter,Navigate,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import PaymentComponent from './pages/Checkout';
import { useSelector } from 'react-redux';


function App() {
  // const currentUser = useSelector(state => state.user.currentUser);

  // const ProtectedLoginRoute = () => {
  //   return currentUser ? <Navigate to="/" /> : <Login />;
  // };
    return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:category' element={<ProductList/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/payment' element={<PaymentComponent/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
