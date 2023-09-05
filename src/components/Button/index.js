import "./button.css";

export default function Button({ label, onClick }) {
  return (
    <button className="custom__btn" onClick={onClick}>
      {label}
    </button>
  );
}

export function StackHorizontal({ children }) {
  // To be used arrange multiple items (e.g. buttons) horizontally
  return <div className="btn__container">{children}</div>;
}
