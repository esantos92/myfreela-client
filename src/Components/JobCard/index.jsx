import DeleteIcon from "../../assets/trash-24.svg"
import EditIcon from "../../assets/edit-24.svg"
import "./JobCard.css";
import "../../assets/global.css";
import { api } from "../../services/api";

export const JobCard = (props) => {
  const storageToken = localStorage.getItem("@Auth:token");

  const deleteJob = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Você deseja excluir o job: ${props.jobName}?`) === true) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storageToken}`;

      api.delete(`jobs/${props.jobId}`);
    } else {
      return;
    }
  }

  return (
    <div className="card status" data-id="<%= job.id %>">
      <div className="id column">{props.id}</div>
      <div className="name column">{props.jobName}</div>
      <div className="deadline column">
        <span>Prazo</span>
        <p className="text">7 dias para a entrega</p>
      </div>
      <div className="amount column">
        <span>Valor</span>
        <p className="text">R$ 1000,00 </p>
      </div>
      <div className="status badge column">em andamento</div>
      <div className="actions column flex">
        <a href="#" className="button white edit" title="Editar Job">
          <img className="icon" src={EditIcon} alt="Editar Job" />
        </a>
        <button className="delete button white" title="Excluir Job" onClick={deleteJob}>
          <img className="icon" src={DeleteIcon} alt="Excluir Job" />
        </button>
      </div>
    </div>
  );
};
