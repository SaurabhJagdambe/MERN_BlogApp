import './App.css';
import Header from './comonents/Header';
import {Routes,Route} from 'react-router-dom';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreatBlog from './pages/CreatBlog';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <>
    <Header/> 
    <Routes>   
      <Route path='/' element={<Login/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/my-blogs' element={<UserBlogs/>}/>
      <Route path='/blog-details/:id' element={<BlogDetails/>}/>
      <Route path='/create-blog' element={<CreatBlog/>}/>


    </Routes>
    </>
  );
}

export default App;
