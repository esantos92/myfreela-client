import { JobCard } from "../../Components/JobCard"
import { MainHeader } from "../../Components/MainHeader"

import './Panel.css'

export const Panel = () => {
  return (
    <section>
      <MainHeader/>

      <div className="container-jobs">
        <JobCard />
        <JobCard />
        
      </div>
    </section>

  )
}