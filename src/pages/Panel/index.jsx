import { useState } from "react"
import { JobCard } from "../../Components/JobCard"
import { MainHeader } from "../../Components/MainHeader"
import { Modal } from "../../Components/Modal"
import { useEffect } from "react"
import { api } from "../../services/api"

import './Panel.css'

export const Panel = () => {
  const [showCreateJobModal, setShowCreateJobModal] = useState(false)
  const [profile, setProfile] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [title, setTitle] = useState("")
  const [dailyHours, setDailyHours] = useState("")
  const [totalHours, setTotalHours] = useState("")
  const storageToken = localStorage.getItem("@Auth:token");

  const createJob = ({ profile_id, title, daily_hours, total_hours }) => {
    api.post('/jobs',{
      profile_id,
      title,
      daily_hours,
      total_hours
    }).then(() => {
      api.get(`/jobs/index_jobs/${localStorage.getItem("@Auth:user")}`)
      .then((response)=> {
        const jobs = response.data
        setJobs(jobs)
      })
      alert("job criado com sucesso");
      setShowCreateJobModal(false)
      setDailyHours("")
      setTitle("")
      setTotalHours("")
    })
  }

  const jobBudget = (totalHours, hourValue) => totalHours * hourValue

  const handleNewJob = async (e) => {
    e.preventDefault();
    const data ={
      profile_id: profile.id,
      title,
      daily_hours: dailyHours,
      total_hours: totalHours,
    }

    await createJob(data)
  }
  
  useEffect(() => {
    const getProfile = () =>{

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      api.get(`/profile/${localStorage.getItem("@Auth:user")}`)
      .then((response)=> {
        const profile = response.data
        setProfile(profile)
        console.log(profile)
      })
    }

    const getJobs = () => {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      api.get(`/jobs/index_jobs/${localStorage.getItem("@Auth:user")}`)
      .then((response)=> {
        const jobs = response.data
        setJobs(jobs)
      })
    }

    getProfile()
    getJobs()
  }, [])

  return (
    <section>
      <MainHeader 
        profile={{...profile}}
      />

      <button className="open-job-modal-button" onClick={() => setShowCreateJobModal(true)}>Criar Job</button>

      {showCreateJobModal &&
        <Modal onClose={() => setShowCreateJobModal(false)}>
          <span className="title-create-job">Criar Job</span>
          <form onSubmit={handleNewJob} className="create-job-form">
            <div className="job-name">
              <span>Nome do Job</span>
              <input 
                type="text"
                required={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="hours-daily">
              <span>Horas por dia</span>
              <input 
                type="number" 
                min="1" 
                max={profile.hours_per_day}
                required={true}
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
              />
            </div>
            <div className="total-hours">
              <span>Total de horas para concluir</span>
              <input
                type="number" 
                min="1"
                required={true}
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
              />
            </div>
            <button type="submit" className="confirm-button">Confirmar</button>
          </form>
        </Modal>
      }

      <div className="container-jobs">

        {jobs == null ?
          <span>Você ainda não tem Jobs criados</span> :
          jobs.map((job, index) =>
            <JobCard
              jobName={job.title}
              id={index+1}
              key={job.id}
              jobId={job.id}
              creationDate={job.inserted_at}
              totalHours={job.total_hours}
              dailyHours={job.daily_hours}
              hoursPerDay={profile.hours_per_day}
              jobBudget={jobBudget(job.total_hours, profile.value_hour)}
            />
          )
        }
      </div>
    </section>

  )
}