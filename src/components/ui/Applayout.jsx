import { Outlet } from "react-router-dom"
import { Aside } from "./aside"
import { NavBar } from "./nav"
import { useState } from "react";

export const  AppLayout = () =>{

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    return(
        <div className="grid">
           <NavBar setIsSidebarVisible={setIsSidebarVisible} />
           <Aside isSidebarVisible={isSidebarVisible} /> 
           <Outlet />       
        </div>
    )
}