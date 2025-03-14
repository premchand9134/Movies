import { Ri4kFill } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { GoCodeReview } from "react-icons/go"; 
import { useNavigate } from "react-router-dom";
import '../Home.css'

export const Aside = ({isSidebarVisible}) =>{

    const navigate = useNavigate()
    return(        
        <aside className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
            <div className="aside-container">
                <Ri4kFill onClick={()=>navigate('/')} className="HomeLogo" />
                <GoCodeReview onClick={()=>navigate('/reviews')} className="ReLogo" />
                <RiAccountCircleFill onClick={()=>navigate('/user')} className="userLogo" />
            </div>
        </aside>
    )
} 

