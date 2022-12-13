import { JobCard } from "../../Components/JobCard"
import { LayoutComponents } from "../../Components/LayoutComponents"
import { MainHeader } from "../../Components/MainHeader"



export const Panel = () => {
  return (
    <section>
      <MainHeader/>
  
      <div className="container-jobs">
        <JobCard />
      </div>
    </section>

  )
}