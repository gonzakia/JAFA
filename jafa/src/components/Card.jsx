function Card({ rank, onClick, disabled }) {
  return (
    <div
      onClick={!disabled ? onClick : null}
      style={{
        border: "1px solid black",
        borderRadius: "8px",
        padding: "1rem",
        margin: "0.25rem",
        width: "60px",
        height: "90px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
        backgroundColor: disabled ? "#eee" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
        color: disabled ? "black" : "black",
      }}
    >
      {rank}
    </div>
  );
}

export default Card;
