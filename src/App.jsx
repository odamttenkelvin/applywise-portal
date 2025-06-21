import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/LoginPage/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                {/* You can add more protected pages the same way */}
            </Routes>
        </Router>
    )
}

export default App
