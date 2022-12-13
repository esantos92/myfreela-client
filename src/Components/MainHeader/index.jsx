import { Link } from 'react-router-dom'
import logoMyFreela from "../../assets/logo.png";

import './styles.css'
import '../../assets/global.css'

export const MainHeader = () => {
  return (
    <div className='header'>
      <button className='logo'>
        <img src={logoMyFreela} alt="Logo MyFreela" />
      </button>

      <button className='avatar'>
        <img src="https://github.com/esantos92.png" alt="User avatar" />
      </button>
    </div>
  )
}
