import { Navigate, Outlet } from "react-router-dom"
import Menu from "../Menu/Menu"


function App() {
  
  if (!localStorage.getItem("tokenLavBacarreza")) return <Navigate to="/login"/>

  return (
      <>
         <Menu />
         <Outlet />
      </>
    
  )
}

export default App

