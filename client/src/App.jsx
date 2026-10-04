
import { NavBar } from './components/comps';
import Home from './home'
import Create from './create'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Edit from './edit';

import './App.css';
function App() {

  return (
    
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/create' Component={Create}/>
      <Route path='/edit/:id' Component={Edit}/>
    </Routes>
    </BrowserRouter>
  )
}


export default App
