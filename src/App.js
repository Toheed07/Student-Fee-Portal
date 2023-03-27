import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/home/home';
import NavScrollExample from "./routes/navigation/navigation"
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<NavScrollExample />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
