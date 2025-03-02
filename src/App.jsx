import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App