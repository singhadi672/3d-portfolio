import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blogs'
import Contact from './components/Contact'
import Footer from './components/Footer'


function App() {

  return (
    <div className='overflow-hidden w-full h-full'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/me' element={<About></About>} />
          <Route path='/projects' element={<Projects></Projects>} />
          <Route path='/blogs' element={<Blog></Blog>} />
          <Route path='/connect' element={<Contact></Contact>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
