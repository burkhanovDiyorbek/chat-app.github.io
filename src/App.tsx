import Register from "./pages/Register";
import PrivateRoute from "./components/routes/PrivateRoute";
import Layout from "./Layout/Layout";
import ChatPage from "./pages/ChatPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function App() {
  const nav = useNavigate();
  useEffect(() => {
    nav("/register");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/uid/:uid" element={<Layout />}>
            <Route path="/uid/:uid" element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
