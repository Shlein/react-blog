import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import PostsPage from "./pages/Posts/PostsPage";
import PostPage from "./pages/Post/PostPage";
import AboutPage from "./pages/About/AboutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RequireAuth from "./hoc/RequireAuth";
import {AuthProvider} from "./hoc/AuthProvider";

function App() {

  return (
    <div id='root'>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='home' element={<HomePage />}/>
            <Route path='posts' element={
              <RequireAuth>
                <PostsPage />
              </RequireAuth>
            }/>
            <Route path='posts/:id' element={<PostPage />}/>
            <Route path='about' element={<AboutPage />}/>
            <Route path='login' element={<LoginPage />}/>
            <Route path='*' element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
