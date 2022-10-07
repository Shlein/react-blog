import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/Posts/PostsPage";
import PostPage from "./pages/Post/PostPage";
import AboutPage from "./pages/About/AboutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const isAuth = false;

  return (
    <div id='root'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<HomePage />}/>
          <Route path='posts' element={<PostsPage />}/>
          <Route path='posts/:id' element={<PostPage />}/>
          <Route path='about' element={<AboutPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
