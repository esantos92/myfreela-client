import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Panel } from "../pages/Panel"
import { Register } from "../pages/Register"
import { PrivateRoutes } from "./privateRoutes"

export const AppRouter = () => {
  return(
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/register" exact element={<Register />}/>

        <Route path="/panel" element={<PrivateRoutes />}>
          <Route path="/panel" exact element={<Panel />}/>
        </Route>

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" exact element={<Panel />}/>
        </Route>
      </Routes>
    </Router>
  )
}