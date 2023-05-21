
import Chat from './pages/Chat.tsx'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';

function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Chat />} />
        </Routes>
        </>
  )
}

export default App
