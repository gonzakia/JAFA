import Hand from "./components/Hand";
import Card from "./components/Card";
import { useState, useEffect } from "react";


function App() {

  const [timeLeft, setTimeLeft] = useState(10); // 5 seconds per round

  const [hand, setHand] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  const [centralCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  const [currentRound, setCurrentRound] = useState(0);

  const [selectedBid, setSelectedBid] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [opponentHand, setOpponentHand] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  const [opponentBid, setOpponentBid] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  
  useEffect(() => {
    if (hasSubmitted) return; // stop timer after submission
    if (timeLeft === 0) {
      endRound();             // time's up!
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000); // countdown every second

    return () => clearTimeout(timerId); // clean up timer on rerender
  }, [timeLeft, hasSubmitted]);



  const centralCard = centralCards[currentRound];

  function handleCardClick(card) {
    if (hasSubmitted) return; // can't change after round is submitted
    
    // Build the new hand: start with current hand
    let updatedHand = [...hand];

    // If a card was already selected, return it to the hand
    if (selectedBid !== null) {
      updatedHand.push(selectedBid);
    }

    // Remove the newly selected card
    updatedHand = updatedHand.filter((c) => c !== card);

    // Sort it so the hand stays tidy
    updatedHand.sort((a, b) => a - b);

    // Apply state updates
    setHand(updatedHand);
    setSelectedBid(card);
  }

  function endRound() {
    let finalPlayerBid = selectedBid;

    // If no card was selected, auto-pick one at random
    if (finalPlayerBid === null) {
      const randomIndex = Math.floor(Math.random() * hand.length);
      finalPlayerBid = hand[randomIndex];
    }

    setSelectedBid(finalPlayerBid);

    // Remove card from hand
    setHand(hand.filter((c) => c !== finalPlayerBid)); // remove played card
    setHasSubmitted(true); // lock in the bid

    // Simulate opponent picking a random card from their hand
    const randomIndex = Math.floor(Math.random() * opponentHand.length);
    const randomCard = opponentHand[randomIndex];

    // Remove opponent card from hand
    setOpponentBid(randomCard);
    setOpponentHand(opponentHand.filter((c) => c !== randomCard));

    

    const centralValue = centralCards[currentRound];

    if (finalPlayerBid > randomCard){
      setPlayerScore((prev) => prev + centralValue);
    } else if (randomCard > finalPlayerBid){
      setOpponentScore((prev) => prev + centralValue);
    } else {
      setPlayerScore((prev) => prev + centralValue/2);
      setOpponentScore((prev) => prev + centralValue/2);
    }

    setHasSubmitted(true);
  }

  function nextRound() {
    setSelectedBid(null);
    setOpponentBid(null);
    setHasSubmitted(false);
    setCurrentRound((prev) => prev + 1);
    setTimeLeft(5);
  }

  return (
    <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
        //backgroundColor: "#f8f8f8", // optional nice background
        minHeight: "100vh",
      }}
    >
      <div style={{
          width: "100vw",
          maxWidth: "1400px", // 
          position: "relative",
        }}
      >
        {/* EVERYTHING ELSE GOES INSIDE THIS */}

        {/* Round centered */}
        <div style={{ textAlign: "center", top: "1rem"}}>
          <h1>Round {currentRound + 1}</h1>
        </div>

        {/* Timer in top-left */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <p
            style={{
              fontSize: "1.2rem",
              color: timeLeft <= 3 ? "red" : "white",
            }}
          >
            ⏱ Time Left: {timeLeft}s
          </p>
        </div>

        {/* Scoreboard in top-right */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem"}}>
          <div>
            <strong>Your Score:</strong> {playerScore} |{" "}
            <strong>Opponent Score:</strong> {opponentScore}
          </div>
        </div>
        
        {/* Opponent's card */}
        {hasSubmitted && opponentBid !== null && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p>Opponent played:</p>
            <Card rank={opponentBid} disabled={true} />
          </div>
        )}

        {/* Central card */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <p>Card being bid for:</p>
          <Card rank={centralCards[currentRound]} disabled={true} />
        </div>

        {/* Player's selected card */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          {selectedBid ? (
            <>
              <p>You placed this card:</p>
              <Card rank={selectedBid} disabled={true} />
            </>
          ) : (
            <p>You haven’t placed a card yet.</p>
          )}
        </div>

        {/* Hand */}
        <div>
          <h2 style={{ textAlign: "center" }}>Your Hand</h2>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Hand
              cards={hand}
              onCardClick={handleCardClick}
              disabled={hasSubmitted}
            />
          </div>
        </div>

        {/* Submit or Next Round button */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          {!hasSubmitted && selectedBid && (
            <button onClick={endRound}>Submit Bid</button>
          )}

          {hasSubmitted && currentRound < centralCards.length - 1 && (
            <button onClick={nextRound}>Next Round</button>
          )}
        </div>
      </div>
    </div>
  );

}

export default App;
