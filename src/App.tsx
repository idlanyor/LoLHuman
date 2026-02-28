import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import { ApiDocProvider } from './context/ApiDocContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <ApiDocProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </ApiDocProvider>
    </ThemeProvider>
  )
}

export default App
