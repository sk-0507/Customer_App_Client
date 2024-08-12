 
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';
import CustomerForm from './component/CustomerForm';
import CustomerUpdateForm from './component/CustomerUpdateForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/creatCustomer" element={<CustomerForm />} />
        <Route path="/update/:id" element={<CustomerUpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
