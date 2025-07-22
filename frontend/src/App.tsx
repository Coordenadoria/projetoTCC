"use client"

import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import TecnicoDashboard from "./pages/TecnicoDashboard"
import "./App.css"

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requiredRole && user.perfil !== requiredRole) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Administrador">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tecnico"
        element={
          <ProtectedRoute requiredRole="Técnico">
            <TecnicoDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          user ? (
            user.perfil === "Administrador" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/tecnico" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
