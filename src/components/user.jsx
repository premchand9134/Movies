import { Aside } from "./ui/aside"
import { NavBar } from "./ui/nav"

export const User = ({isSidebarVisible, setIsSidebarVisible}) =>{
    return(
        <div className="grid">
            <NavBar setIsSidebarVisible={setIsSidebarVisible} />  
            <Aside isSidebarVisible={isSidebarVisible} />  
                       
         </div>
    )
}