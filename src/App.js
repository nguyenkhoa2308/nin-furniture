import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import CategoryPage from '~/pages/CategoryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:slug" element={<CategoryPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<SignUp />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
