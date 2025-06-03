
import ReactDOM from "react-dom"
const Modal = (props) => {

    const { title, content, show, onClose, onConfirm, confirmText } = props
    console.log(title)
    //NOTE - evita di creare un portal anche quando show è false 
    if (!show) return null
    return (
        ReactDOM.createPortal(show && (
            <div className="modal">
                <div className="modal-content" >
                    <h1>{title}</h1>
                    {content}
                    <button
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