import { useState } from "react";

export default function Input({ label, error, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="field">
      {label && <label>{label}</label>}
      <div className="input-wrap">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          className={error ? "invalid" : ""}
          {...props}
        />
        {isPassword && (
          <button type="button" className="eye" onClick={() => setShow((s) => !s)} tabIndex={-1}>
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && <span className="err">{error}</span>}
    </div>
  );
}