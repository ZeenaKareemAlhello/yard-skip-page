function PageHeader() {
  return (
    <div className="mb-4">
      <h1 className="flex justify-center">Choose Your Skip Size</h1>
      <h2 className="flex justify-center">
        Select the skip size that best suits your needs
      </h2>
    </div>
  );
}

function Button({ children, onClick, type = "button", className = "", id }) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default {
  PageHeader,
  Button,
};
