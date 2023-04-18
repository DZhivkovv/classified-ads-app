import './App.scss';
import Home from './pages/Home/Home.jsx';
import Ads from './pages/Ads/Ads.jsx';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ads' element={<Ads/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
