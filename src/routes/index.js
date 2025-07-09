import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const signed = false;
const loading = false;

function Routes(){
    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;