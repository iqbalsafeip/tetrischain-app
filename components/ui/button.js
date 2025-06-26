export function Button({ children, className, onClick, disabled = false }) {
  return <button className={`px-4 py-2 font-semibold ${className}`} disabled={disabled} onClick={onClick}>{children}</button>;
}
