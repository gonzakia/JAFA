# JAFA

JAFA is a card game based on simultaneous bidding and strategy. This project is a browser-based version of the game built in React, currently in development.

The current version supports single-player mode against a simulated opponent, and lays the foundation for future features including multiplayer mode, advanced UI, and persistent game history.

---

## 🧠 What is JAFA?

JAFA is a card game played over 13 rounds. Each round features a public "central card" with a point value (Ace = 1 to King = 13). Players simultaneously select a card from their hand to bid for it. The highest bidder wins the points; in case of a tie, the points are split evenly.

### Game rules:
- Each player has 13 unique cards (A–K).
- Once a card is used to bid, it’s gone for the rest of the game.
- Each round lasts a fixed amount of time (e.g. 5 seconds) to make a decision.
- The player with the most points at the end of 13 rounds wins.

---

## 🎮 Current Features

- ✅ Single-player mode with a simulated opponent
- ⏱️ Real-time 10-second timer per round
- 🃏 Visual display of hand, bids, and central card
- 🤖 Opponent automatically selects a card and reveals it after time is up
- 🧮 Live score tracking and round updates
- ♻️ Auto-selection if the player runs out of time
- 💻 Desktop-first layout, built with React + Vite

---

## 🌱 Project Vision

This project is still in early development. Planned features include:

### ✨ Near-term roadmap
- [ ] Show card ranks as A–K instead of numbers
- [ ] Highlight selected card visually
- [ ] Add game over screen with final scores
- [ ] "Play again" / restart button
- [ ] Upload screenshots or demo GIF

### 🌐 Long-term vision
- [ ] Real-time multiplayer using Firebase
- [ ] Lobby creation and room joining
- [ ] Animated card transitions (drag/drop or flip effects)
- [ ] Mobile-friendly layout and responsiveness
- [ ] Persistent match history per user
- [ ] Optional game modes: fast/slow rounds, bluff rounds, secret scoring

---

## 🛠 Tech Stack

- [React](https://reactjs.org/) — frontend framework
- [Vite](https://vitejs.dev/) — fast dev environment and build tool
- JavaScript (ES6+)
- CSS (inline styles for now)