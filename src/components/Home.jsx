import './Home.css'
import { NavBar } from '../components/ui/nav'
import { Aside } from '../components/ui/aside'
import { Main } from '../components/ui/main'
import { useState } from 'react'

export const Home = ({setIsSidebarVisible,isSidebarVisible}) =>{


    return(
        <>    
            <div className="grid">
                <NavBar setIsSidebarVisible={setIsSidebarVisible} />  
                <Aside isSidebarVisible={isSidebarVisible} />  
                <Main />
            </div>
          
        </>
 
        
    )
}