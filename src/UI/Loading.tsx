import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";


const defaultProps = {
  size: 8,
  color: "gray-500",
  className: "",
  containerClassName: "",
};


const Loader = ({
  size = defaultProps.size,
  color = defaultProps.color,
  className = defaultProps.className,
  containerClassName = defaultProps.containerClassName,
}) => {
  return (
    <div
      className={`flex min-h-[50vh] items-center justify-center ${containerClassName}`}
    >
      <Loader2
        className={`h-${size} w-${size} animate-spin text-${color} ${className}`}
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

Loader.defaultProps = defaultProps;

export default Loader;