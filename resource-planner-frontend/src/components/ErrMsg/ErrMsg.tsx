import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrMsg = ({msg,closeMsg}:{msg:string,closeMsg:()=>void}) => {
  return (
    <div className="fixed flex justify-between w-1/2 px-4 py-2 text-gray-600 bg-gray-300 rounded bottom-10 border border-red-500">
        <p>{msg}</p><FontAwesomeIcon icon={faXmark} onClick={closeMsg}></FontAwesomeIcon>
    </div>

  )
}

export default ErrMsg