import DeleteIcon from "../../assets/trash-24.svg"
import EditIcon from "../../assets/edit-24.svg"
import { api } from "../../services/api";
import { Modal } from "../Modal";
import { useState } from "react";
import "../../assets/global.css";
import "./JobCard.css";

export const JobCard = (props) => {
  const storageToken = localStorage.getItem("@Auth:token");
  const [showUpdateJobModal, setShowUpdateJobModal] = useState(false)
  const [title, setTitle] = useState(props.jobName)
  const [dailyHours, setDailyHours] = useState(props.dailyHours)
  const [totalHours, setTotalHours] = useState(props.totalHours)

  const deleteJob = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Você deseja excluir o job: ${props.jobName}?`) === true) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      api.delete(`jobs/${props.jobId}`).then(() => window.location.reload())
    } else {
      return;
    }
  }

  const updateJob = ({ title, daily_hours, total_hours}) => {
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${storageToken}`;

    api.put(`/jobs/${props.jobId}`, {
      title,
      daily_hours,
      total_hours
    }).then(() => {
      alert('Job atualizado com sucesso!!!')
      setShowUpdateJobModal(false)
      window.location.reload()
    })
  }

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    const data ={
      title,
      daily_hours: dailyHours,
      total_hours: totalHours,
    }

    await updateJob(data)
  }

  const remainingDays = (totalHours, dailyHours, creationDate) =>  {
    const remainingDays = (totalHours / dailyHours).toFixed()
    const createdAt = new Date(creationDate)
    const dueDay = createdAt.getDate() + Number(remainingDays)
    const dueDateInMs = createdAt.setDate(dueDay)
    const timeDiffInMs = dueDateInMs - Date.now()
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
    
    return dayDiff
  }

  // const calculateBudget = (totalHours, valueHour) =>  valueHour * totalHours

  return (
    <>
      <div className="card status" data-id="<%= job.id %>">
        <div className="id column">{props.id}</div>
        <div className="name column">{props.jobName}</div>
        <div className="deadline column">
          <span>Prazo</span>
          <p className="text">{remainingDays(props.totalHours, props.dailyHours, props.creationDate)} dia(s) para a entrega</p>
        </div>
        <div className="amount column">
          <span>Valor</span>
          <p className="text">R$ {props.jobBudget} </p>
        </div>
        {remainingDays(props.totalHours, props.dailyHours, props.creationDate) > 0 ?
          <div className="badge-progress">em andamento</div> : 
          <div className="badge-dued">vencido</div>
        }
        <div className="actions column flex">
          <a href="#" className="button white edit" title="Editar Job" onClick={() => setShowUpdateJobModal(true)}>
            <img className="icon" src={EditIcon} alt="Editar Job" />
          </a>
          <button className="delete button white" title="Excluir Job" onClick={deleteJob}>
            <img className="icon" src={DeleteIcon} alt="Excluir Job" />
          </button>
        </div>
      </div>

      {showUpdateJobModal &&
        <Modal onClose={() => setShowUpdateJobModal(false)}>
        <span className="title-create-job">Atualizar Job</span>
        <form onSubmit={handleUpdateJob} className="create-job-form">
          <div className="job-name">
            <span>Nome do Job</span>
            <input 
              type="text"
              value={title}
              placeholder={props.jobName}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="hours-daily">
            <span>Horas por dia</span>
            <input 
              type="number" 
              min="1" 
              max={props.hoursPerDay}
              value={dailyHours}
              placeholder={props.dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
            />
          </div>
          <div className="total-hours">
            <span>Total de horas para concluir</span>
            <input
              type="number" 
              min="1"
              value={totalHours}
              placeholder={props.totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
            />
          </div>
          <button type="submit" className="confirm-button">Confirmar</button>
        </form>
      </Modal>
      }
    </>
    


  );
};
