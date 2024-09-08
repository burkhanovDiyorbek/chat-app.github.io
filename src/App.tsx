import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import Layout from './Layout/Layout';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="uid/:uid" element={<Layout />}>
          <Route path="chat/:chatId" element={<ChatPage />} />
        </Route>
      </Route>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
