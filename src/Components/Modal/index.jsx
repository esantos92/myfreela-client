import "./modal.css"

export const Modal = ({ id = 'modal', onClose = () => {}, confirmAction, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  }

  return(
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
        <button className="cancel-button" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  )
}