import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #007a78;
`;

const Player = styled.View`
  font-size: 30px;
`;

const Text = styled.Text`
  color: #ffc745;
  font-size: 20px;
  font-weight: 700;
`;

const BoardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const Cell = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px;
`;

const ResetBtn = styled.TouchableOpacity`
  padding: 8px 20px;
  border: #ffc745;
  border-radius: 10px;
  margin-top: 30px;
`;

const PastMatches = styled.TouchableOpacity`
  padding: 8px 20px;
  border: #ffc745;
  border-radius: 10px;
  margin-top: 30px;
`;

export default function Board({ navigation }) {
  const [player, setPlayer] = useState("O"); // two players
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]); // 9 cell
  const [pastMatches, setPastMatches] = useState([]);

  const fillBoard = useCallback((pos) => {
    // if cell is empty set cell to current player
    if (board[pos] === "") {
      let update = [...board];
      update[pos] = player;
      setBoard(update);
    }

    if (player === "O") {
      if (board[pos] === "X") return; // avoid click multiple times
      setPlayer("X");
    } else {
      if (board[pos] === "O") return; // avoid click multiple times
      setPlayer("O");
    }
  });

  const resetBoard = useCallback(() => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
  });

  const findWinner = useCallback((game) => {
    // check every row, col, diagonal
    let possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let possibility of possibilities) {
      if (
        game[possibility[0]] &&
        game[possibility[0]] === game[possibility[1]] &&
        game[possibility[0]] === game[possibility[2]]
      ) {
        return game[possibility[0]];
      }
    }
    return;
  });

  useEffect(() => {
    let winner = findWinner(board);
    if (winner === "O") {
      alert("O is the winner");
      setPastMatches([...pastMatches, board]);
      resetBoard();
    } else if (winner === "X") {
      alert("X is the winner");
      setPastMatches([...pastMatches, board]);
      resetBoard();
    }
  }, [board]);

  return (
    <Container>
      <Player>
        <Text> Player {player}</Text>
      </Player>
      <BoardContainer>
        <Cell
          onPress={() => fillBoard(0)}
          style={{ borderTopWidth: "0", borderLeftWidth: "0" }}
        >
          {board[0] === "X" ? (
            <Text>X</Text>
          ) : board[0] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell onPress={() => fillBoard(1)} style={{ borderTopWidth: "0" }}>
          {board[1] === "X" ? (
            <Text>X</Text>
          ) : board[1] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell
          onPress={() => fillBoard(2)}
          style={{ borderTopWidth: "0", borderRightWidth: "0" }}
        >
          {board[2] === "X" ? (
            <Text>X</Text>
          ) : board[2] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell onPress={() => fillBoard(3)} style={{ borderLeftWidth: "0" }}>
          {board[3] === "X" ? (
            <Text>X</Text>
          ) : board[3] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell onPress={() => fillBoard(4)}>
          {board[4] === "X" ? (
            <Text>X</Text>
          ) : board[4] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell onPress={() => fillBoard(5)} style={{ borderRightWidth: "0" }}>
          {board[5] === "X" ? (
            <Text>X</Text>
          ) : board[5] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell
          onPress={() => fillBoard(6)}
          style={{ borderLeftWidth: "0", borderBottomWidth: "0" }}
        >
          {board[6] === "X" ? (
            <Text>X</Text>
          ) : board[6] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell onPress={() => fillBoard(7)} style={{ borderBottomWidth: "0" }}>
          {board[7] === "X" ? (
            <Text>X</Text>
          ) : board[7] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
        <Cell
          onPress={() => fillBoard(8)}
          style={{ borderRightWidth: "0", borderBottomWidth: "0" }}
        >
          {board[8] === "X" ? (
            <Text>X</Text>
          ) : board[8] === "O" ? (
            <Text>O</Text>
          ) : null}
        </Cell>
      </BoardContainer>
      <ResetBtn onPress={() => resetBoard()}>
        <Text>Reset Game</Text>
      </ResetBtn>
      <PastMatches
        onPress={() =>
          navigation.navigate("Matches", {
            pastMatches,
          })
        }
      >
        <Text>Past Matches</Text>
      </PastMatches>
    </Container>
  );
}
