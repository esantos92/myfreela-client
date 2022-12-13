import DeleteIcon from "../../assets/trash-24.svg"
import EditIcon from "../../assets/edit-24.svg"
import "./JobCard.css";
import "../../assets/global.css";

export const JobCard = () => {
  return (
    <div className="card status" data-id="<%= job.id %>">
      <div className="id column">1</div>
      <div className="name column">Projeto Pessoal</div>
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
        <button className="delete button white" title="Excluir Job">
          <img className="icon" src={DeleteIcon} alt="Excluir Job" />
        </button>
      </div>
    </div>
  );
};
