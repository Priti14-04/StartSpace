import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes ,Route} from 'react-router'
import AllIdea from './views/AllIdea'
import NewIdea from './views/NewIdea'
import EditIdea from './views/EditIdea'
import Signup from './views/Signup'
import Login from './views/Login'
import ReadIdea from './views/ReadIdea'
import About from './views/About'
import Contact from './views/Contact'
import App from './App'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
  <Route path="/" element={<App/>}/>
    <Route path="/ideas" element={<AllIdea/>}/>
    <Route path="/new" element={<NewIdea/>}/>
    <Route path="/edit/:id" element={<EditIdea/>}/>
    <Route path="/idea/:slug" element={<ReadIdea/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>

  </Routes>

 </BrowserRouter>
)
