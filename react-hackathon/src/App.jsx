// Import Packages
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Stations from './Stations';

export default function App() {
  return (
    // Route Endpoints with page that is Rendered
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/:line' element={<Stations />} />
    </Routes>        
  )
}