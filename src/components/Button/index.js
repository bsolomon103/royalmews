import "./button.css";

const Button = ({ label, onClick, image }) => {
  return (
    <button className="custom__btn" onClick={onClick}>
    {label}
    </button>
  );
};

export default Button;

export function StackHorizontal({ children }) {
  // To be used arrange multiple items (e.g. buttons) horizontally
  return <div className="btn__container">{children}</div>;
}


export function redirectToURL(url) {
  // Redirect to the URL using window.location.href
  if (url) {
    window.open(url, '_blank');
  }
}