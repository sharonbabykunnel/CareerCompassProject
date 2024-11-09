import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const AdminPublic = () => {
    const admin = useSelector(state=>state.presisted.admin);
    if(admin){
        return <Navigate to='/admin'/>
    }else{
        return <Outlet/>
    }
}

export default AdminPublic
