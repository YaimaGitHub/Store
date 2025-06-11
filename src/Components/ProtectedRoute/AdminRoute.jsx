import { Navigate, Outlet } from "react-router-dom"
import { useAdmin } from "../../contexts/AdminContext"

const AdminRoute = () => {
  const { isAdmin } = useAdmin()

  return isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute
