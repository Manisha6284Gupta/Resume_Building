//Profile info cards

import { useNavigate } from "react-router-dom"
import { cardStyles } from "../assets/dummystyle.js"


export const ProfileInfoCard = () => {
    const navigate = useNavigate()
    const {user, clearUser} = useContext(UserContext)

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/')
    }
    return (
        user && (
            <div className="cardStyle.profileCard">
                <div className={cardStyles.profileInitialsContainer}>
                    <span className= {cardStyles.profileInitialsText}>
                        {user.name ? user.name.charAt(0).toUpperCase() : ""} 

                    </span>

                </div>
                <div>
                    <div className={cardStyles.profileName}>
                        {user.name || ""}

                    </div>
                    <button className={cardStyles.logoutButton}
                    onClick = {handleLogout}>
                        Logout

                    </button>
                </div>

                
                 

            </div>
        )
    )
}