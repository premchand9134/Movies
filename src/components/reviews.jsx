import { Aside } from "./ui/aside"
import { NavBar } from "./ui/nav"
import {db,auth} from '../firebase'
import { useEffect } from "react"

export const Reviews = ({isSidebarVisible, setIsSidebarVisible}) =>{

    useEffect(()=>{
        
    },[])

    return(
        <div className="grid">
                <NavBar setIsSidebarVisible={setIsSidebarVisible} />  
                <Aside isSidebarVisible={isSidebarVisible} />  
               
        </div>
    )
}
