import Typed from "react-typed";

export default function AnimatedPlaceholder({ placeholderString, children }) {

  return (
    <Typed
      strings={[placeholderString]}
      typeSpeed={100}
      startDelay={50}
      backSpeed={50}
      backDelay={5000}
      attr="placeholder"
      loop
    >
      {children}
    </Typed>
  );
}
