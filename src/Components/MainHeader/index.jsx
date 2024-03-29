/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { api } from '../../services/api';

import logoMyFreela from "../../assets/logo.png";
import avatar from "../../assets/user.png";
import EditProfileLogo from "../../assets/edit.png";
import LogoutIcon from "../../assets/log-out.png";
import './MainHeader.css';
import '../../assets/global.css';

export const MainHeader = (props) => {
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false)
  const [daysPerWeek, setDaysPerWeek] = useState(null)
  const [actualDaysPerWeek, setActualDaysPerWeek] = useState(null)
  const [gitHubUserName, setGitHubUserName] = useState(null)
  const [actualGitHubUserName, setActualGitHubUserName] = useState(null)
  const [hoursPerDay, setHoursPerDay] = useState(null)
  const [actualHoursPerDay, setActualHoursPerDay] = useState(null)
  const [profileId, setProfileId] = useState(null)
  const [monthtlyBudget, setMonthtlyBudget] = useState(null)
  const [actualMonthtlyBudget, setActualMonthtlyBudget] = useState(null)
  const [valueHour, setValueHour] = useState(null)
  const storageToken = localStorage.getItem("@Auth:token");

  useEffect(() => {
    const getProfile = () =>{

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      api.get(`/profile/${localStorage.getItem("@Auth:user")}`)
      .then((response)=> {
        const profile = response.data
        setDaysPerWeek(profile.days_per_week)
        setActualDaysPerWeek(profile.days_per_week)
        setGitHubUserName(profile.github_username)
        setActualGitHubUserName(profile.github_username)
        setHoursPerDay(profile.hours_per_day)
        setActualHoursPerDay(profile.hours_per_day)
        setProfileId(profile.id)
        setMonthtlyBudget(profile.monthly_budget)
        setActualMonthtlyBudget(profile.monthly_budget)
        setValueHour(profile.value_hour)
      })
    }

    getProfile()
  }, [])

  const menuToggle = () => {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
  }

  const logOut = () => {
    localStorage.clear();
    window.location.reload(false)
  }

  const openModal= () => {
    setShowUpdateProfileModal(true)
    console.log(props.profile.value_hour)
    menuToggle()
  }

  const updateProfile = ({ days_per_week, github_username, profile_id, monthly_budget, hours_per_day}) => {
    const value = monthly_budget /[(days_per_week * 4) * hours_per_day]
    const value_hour = value.toFixed(2)
    
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${storageToken}`;

    api.put(`/profile/${profile_id}`, {
      days_per_week,
      github_username,
      monthly_budget,
      hours_per_day,
      value_hour
    }).then(() => {
      alert('Perfil atualizado com sucesso!!!')
      setShowUpdateProfileModal(false)
      window.location.reload()
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const data ={
      days_per_week:daysPerWeek,
      github_username:gitHubUserName,
      profile_id:profileId,
      monthly_budget:monthtlyBudget,
      hours_per_day:hoursPerDay
    }

    await updateProfile(data)
  }

  return (
    <>
      <div className='header'>
        <Link to='/' className='logo'>
          <img src={logoMyFreela} alt="Logo MyFreela" />
        </Link>

        <div className='action'>
          <button className='avatar' onClick={menuToggle}>
            {
              actualGitHubUserName !== "Insira seu github" ?
                <img src={`https://github.com/${actualGitHubUserName}.png`} alt="User avatar" /> :
                <img src={avatar} alt="User avatar" />}
            
          </button>

          <div className="menu">
            <h3>Everton Santos</h3>
            <ul>
              <li onClick={() => openModal()}><img src={EditProfileLogo} alt='Edit profile icon'/><span className='title'>Editar Perfil</span></li>
              <li onClick={logOut}><img src={LogoutIcon} alt='Logout icon'/><span className='title'>Logout</span></li>
            </ul>
          </div>

        </div>
      </div>

      {showUpdateProfileModal && 
        <Modal onClose={() => setShowUpdateProfileModal(false)}>
          <span className='title-update-profile'>Editar Perfil</span>
          <form onSubmit={handleUpdateProfile} className='update-profile-form'>
            <div className='github-profile'>
              <span>Seu username no github:</span>
              <input
                type="text"
                value={gitHubUserName}
                onChange={(e) => setGitHubUserName(e.target.value)}
              />
            </div>

            <div className='days-per-week'>
              <span>Quantos dias você vai trabalhar por semana?</span>
              <input
                type="number"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
              />
            </div>

            <div className='monthly-budget'>
              <span>Quanto pretende ganhar por mês?</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={monthtlyBudget}
                onChange={(e) => setMonthtlyBudget(e.target.value)}
              />
            </div>
            <div className='profile-summary'>
              <div>Você pretende trabalhar {actualDaysPerWeek} dia(s) por semana, sendo {actualHoursPerDay} horas por dia.</div>
              <div>Sua pretensão de salário é de R${actualMonthtlyBudget} por mês.</div>
              <div>O seu valor por hora é R${valueHour}</div>
            </div>
            <button type="submit" className="update-button">Confirmar</button>
          </form>
        </Modal>
      }
    </>
  )
}
