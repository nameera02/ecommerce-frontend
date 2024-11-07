import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ProjectForm from './components/ProjectForm';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/projects" element={<ProjectForm />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
