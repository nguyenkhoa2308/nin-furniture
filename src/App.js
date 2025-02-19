import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import './App.css';
import DefaultLayout from '~/layouts/DefaultLayout';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import CategoryPage from '~/pages/CategoryPage';
import ProductDetail from '~/pages/ProductDetail';
import AccountLayout from './layouts/AccountLayout';
import Profile from './pages/Profile';
import { AuthContext } from '~/contexts/AuthContext';
import httpRequest from '~/utils/httpRequest';
import PurchasePage from './pages/PurchasePage';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';

function App() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccount = async () => {
            const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
            if (!token) {
                setAuth({ isAuthenticated: false, user: null });
                return;
            }

            try {
                const res = await httpRequest.get(`user/account`);
                if (res && !res.message) {
                    setAuth({
                        isAuthenticated: true,
                        user: {
                            id: res.id,
                            email: res.email,
                            name: res.name,
                        },
                    });
                } else {
                    console.log('Lỗi');
                }
            } catch (error) {
                // console.error('Failed to fetch account:', error);
                setAuth({
                    isAuthenticated: false,
                    user: null,
                });
            }
        };

        fetchAccount();
        // eslint-disable-next-line
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="category/:slug" element={<CategoryPage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="products/:slug" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<CheckOut />} />
                </Route>
                <Route path="account" element={<AccountLayout />}>
                    <Route path="" element={<Profile />}></Route>
                    <Route path="addresses" element={<PurchasePage />}></Route>
                    <Route path="password" element={<PurchasePage />}></Route>
                    <Route path="purchase" element={<PurchasePage />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
