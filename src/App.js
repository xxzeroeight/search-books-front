import { Route, Routes } from 'react-router-dom';
import './App.css';
import ImageUpload from './components/ImageUpload';
import UploadSuccess from './pages/UploadSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ImageUpload />} />
        <Route path="/upload-success" element={<UploadSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
