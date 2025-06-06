
import ReactDOM from "react-dom"

const Modal = (props) => {
     
    const { title, content, show, onClose =()=>{}, onConfirm, confirmText } = props
   
    //NOTE - evita di creare un portal anche quando show è false 
    if (!show) return null
    return (
        ReactDOM.createPortal(show && (
            <div className="modal ">
                <div className="modal-content bg-body-secondary card text-center mt-5 " data-bs-theme="dark">
                    <div className="card-header p-3 fs-3">{title}</div>
                    <div className="py-5 fs-5">{content}</div>
                    <button
                    className="btn btn-secondary  fs-5"
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}>{confirmText}
                    </button>

                </div>
            </div>
        ), document.body
        )
    )
}

export default Modal