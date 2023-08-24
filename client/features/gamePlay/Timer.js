import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

// SOCKET
import { SocketContext } from "../../app/SocketProvider";

// COMPONENTS
import DefInputBox from "./DefInputBox";
import GuessDefs from "./GuessDefs";

// SLICES/STATE REDUCERS, ETC.
import {
  selectFakeWords,
  getFakeDefinitions,
  selectFakeDefinitions,
} from "./gamePlaySlice";

const Timer = ({
  checkIfTied,
  setTempBack,
  showBackOfCard,
  makeHidden,
  game,
  username,
  userId,
  userScore,
  gameName,
  gameId,
  playerTurnName,
  reloadScores,
  setDefinition,
  setWord,
  setTimer,
  setChoseWord,
}) => {
  // COMPONENT STATE
  const [countdown, setCountdown] = useState(2);
  const [defInput, setDefInput] = useState(false);
  const [playGame, setPlayGame] = useState(false);

  const clientSocket = useContext(SocketContext);
  const dispatch = useDispatch();

  const fakeWords = useSelector(selectFakeWords);
  const fakeDefinitions = useSelector(selectFakeDefinitions);

  // Gets a "fake" definiton for each "fake" word
  const handleGetFakeDefinitions = () => {
    fakeWords.forEach((word) => {
      dispatch(getFakeDefinitions(word));
    });
  };

 

  // TIMER displays definiton input box/front of card while countdown if above 0 or while definition has yet to be submitted
  // When time hits 0, mounts GuessDEfs compnents and shows front of card
  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setDefInput(true);
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        handleGetFakeDefinitions();
        setPlayGame(true);
        setDefInput(false);
        showBackOfCard("front");
        setTempBack(false);
      } else {
        setDefInput(false);
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    // NEED?
    return () => clearTimeout(timer);
  }, [countdown]);

  // When then page mounts on playerTurn, it send socket to all others in game to mount on their end
  useEffect(() => {
    clientSocket.emit("start_countdown", { gameName });
  }, []);

  // when playGame/guessDEfs mounts, runs makeHidden function in CardFront component to hade previous stles to show guessDefs
  useEffect(() => {
    playGame ? makeHidden() : null;
  }, [playGame]);

  return (
    <div style={{ overflow: "auto" }}>
      <div
        style={{ position: "fixed", bottom: "8vh", left: "40vw", color: "red" }}
      >
        Time: {countdown}
      </div>
      {/* Definition input box renders if its is NOT players turn and player has been accepted */}
      {defInput &&
      userScore.turnNum !== game.turn &&
      userScore.accepted === true ? (
        <DefInputBox
          showBackOfCard={showBackOfCard}
          game={game}
          gameName={gameName}
          userId={userId}
          playerTurnName={playerTurnName}
        />
      ) : null}
      {/* GUESSDEFS/ guess definition component mounts when playgame is true */}
      {playGame ? (
        <GuessDefs
          checkIfTied={checkIfTied}
          showBackOfCard={showBackOfCard}
          makeHidden={makeHidden}
          guessDefs={true}
          top={top}
          game={game}
          username={username}
          userScore={userScore}
          fakeDefinitions={fakeDefinitions}
          gameName={gameName}
          gameId={gameId}
          playerTurnName={playerTurnName}
          userId={userId}
          Name={playerTurnName}
          reloadScores={reloadScores}
          setDefinition={setDefinition}
          setWord={setWord}
          setTimer={setTimer}
          setPlayGame={setPlayGame}
          setChoseWord={setChoseWord}
        />
      ) : null}
    </div>
  );
};

export default Timer;
