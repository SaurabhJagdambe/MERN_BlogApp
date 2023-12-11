import './App.css';
import Header from './comonents/Header';
import {Routes,Route} from 'react-router-dom';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreatBlog from './pages/CreatBlog';
import BlogDetails from './pages/BlogDetails';
import { Toaster } from 'react-hot-toast';
import Footer from './comonents/Footer';
function App() {
  return (
    <>
    <Header/> 
    <Toaster/>
    <Footer />
    <Routes>   
      <Route path='/' element={<Login/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/my-blogs' element={<UserBlogs/>}/>
      <Route path='/create-blog' element={<CreatBlog/>}/>
      <Route path='/blog-details/:id' element={<BlogDetails/>}/>
      


    </Routes>
    </>
  );
}

export default App;
