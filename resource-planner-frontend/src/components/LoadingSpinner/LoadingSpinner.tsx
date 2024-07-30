import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const LoadingSpinner = () => {
  return (
    <div
      data-testid="spinner"
      className="flex w-screen h-screen fixed z-10 bg-transparent justify-center items-center"
    >
      <FontAwesomeIcon
        className="animate-spin text-5xl text-slate-700 z-10"
        icon={faSpinner}
      />
    </div>
  );
};

export default LoadingSpinner;
