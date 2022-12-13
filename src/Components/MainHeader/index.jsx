import { Link } from 'react-router-dom';

import logoMyFreela from "../../assets/logo.png";
import EditProfileLogo from "../../assets/edit.png"
import LogoutIcon from "../../assets/log-out.png"
import './MainHeader.css';
import '../../assets/global.css';

export const MainHeader = () => {
  const menuToggle = () => {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
  }

  return (
    <div className='header'>
      <Link to='/' className='logo'>
        <img src={logoMyFreela} alt="Logo MyFreela" />
      </Link>

      <div className='action'>
        <button className='avatar' onClick={menuToggle}>
          <img src="https://github.com/esantos92.png" alt="User avatar" />
        </button>

        <div className="menu">
          <h3>Everton Santos</h3>
          <ul>
            <li><img src={EditProfileLogo} alt='Edit profile icon'/><span className='title'>Editar Perfil</span></li>
            <li><img src={LogoutIcon} alt='Logout icon'/><span className='title'>Logout</span></li>
          </ul>
        </div>

      </div>
    </div>
  )
}
