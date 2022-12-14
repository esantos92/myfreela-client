import { JobCard } from "../../Components/JobCard"
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