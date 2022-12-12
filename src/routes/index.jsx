import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Panel } from "../pages/Panel"
import { Register } from "../pages/Register"

export const AppRouter = () => {
  return(
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/register" exact element={<Register />}/>
        <Route path="/panel" exact element={<Panel />}/>
      </Routes>
    </Router>
  )
}