import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from '~/pages/Home';
import DefaultLayout from '~/layouts/DefaultLayout';
import CategoryPage from './pages/CategoryPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/category/:slug"
                    element={
                        <DefaultLayout>
                            <CategoryPage />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
