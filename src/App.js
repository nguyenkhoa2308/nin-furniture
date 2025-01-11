import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from '~/pages/Home';
import DefaultLayout from '~/layouts/DefaultLayout';

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
            </Routes>
        </Router>
    );
}

export default App;
