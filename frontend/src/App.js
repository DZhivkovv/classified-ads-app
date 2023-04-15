import './App.scss';
import Home from './pages/Home/Home.jsx';
import Ads from './pages/Ads/Ads.jsx';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ads' element={<Ads/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
