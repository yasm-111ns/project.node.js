export default function Button({ children, loading, ...props }) {
    return (
      <button className="btn" disabled={loading || props.disabled} {...props}>
        {loading ? "Загрузка..." : children}
      </button>
    );
  }