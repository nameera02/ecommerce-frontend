import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ProjectPage from './components/projects/ProjectPage';
import ClientPage from './components/clients/ClientPage';
import CertificatePage from './components/certificates/CertificateTable';
import ProductPage from './components/product/ProductPage';
import Team from './components/team/Team';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/certificates" element={<CertificatePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/teams" element={<Team />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
