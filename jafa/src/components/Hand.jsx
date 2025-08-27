import Card from "./Card";

function Hand({ cards, onCardClick, disabled }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60px",
        marginTop: "2rem",
      }}
    >
      {cards.map((rank) => (
        <Card
          key={rank}
          rank={rank}
          onClick={() => onCardClick(rank)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Hand;
