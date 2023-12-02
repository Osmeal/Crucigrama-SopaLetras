import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

const Cell = (props) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: pressed ? "blue" : "white",
        width: 37,
        padding: 10,
        borderWidth: 1,
      }}
      onPress={() => setPressed(!pressed)}
    >
      <Text style={{ fontSize: 15 }}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default function Screen2() {
  const [titlePressed, setTitlePressed] = useState(false);
  // Generar Tablero

  const generateBoard = () => {
    const words = ["software", "developer", "system", "app", "phone", "mobile"];

    let board = [];
    const boardSize = 10;
    const maxAttempts = 100;
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(" ");
      }
      board.push(row);
    }

    const isLocationFree = (row, col, direction, word) => {
      for (let i = 0; i < word.length; i++) {
        if (direction === "horizontal" && board[row + i][col] !== " ") {
          return false;
        } else if (direction === "vertical" && board[row][col + i] !== " ") {
          return false;
        } else if (
          direction === "diagonal" &&
          board[row + i][col + i] !== " "
        ) {
          return false;
        }
      }
      return true;
    };

    const placeWord = (row, col, direction, word, order) => {
      for (let i = 0; i < word.length; i++) {
        if (direction === "horizontal") {
          if (order === "reverse") {
            board[row + i][col] = word[word.length - 1 - i];
          } else {
            board[row + i][col] = word[i];
          }
        } else if (direction === "vertical") {
          if (order === "reverse") {
            board[row][col + i] = word[word.length - 1 - i];
          } else {
            board[row][col + i] = word[i];
          }
        } else if (direction === "diagonal") {
          if (order === "reverse") {
            board[row + i][col - i + 1] = word[word.length - 2 - i];
          } else {
            board[row + i][col + i] = word[i];
          }
        }
      }
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    shuffleArray(words);

    words.forEach((word) => {
      const display = {
        software: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (
              col + word.length <= boardSize &&
              isLocationFree(row, col, "vertical", word)
            ) {
              placeWord(row, col, "vertical", word, "normal");
              break;
            }
          }
        },
        developer: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (
              col + word.length <= boardSize &&
              isLocationFree(row, col, "vertical", word)
            ) {
              placeWord(row, col, "vertical", word, "reverse");
              break;
            }
          }
        },
        system: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (
              row + word.length <= boardSize &&
              isLocationFree(row, col, "horizontal", word)
            ) {
              placeWord(row, col, "horizontal", word, "normal");
              break;
            }
          }
        },
        app: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (
              row + word.length <= boardSize &&
              isLocationFree(row, col, "horizontal", word)
            ) {
              placeWord(row, col, "horizontal", word, "reverse");
              break;
            }
          }
        },
        phone: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (
              row + word.length <= boardSize &&
              col + word.length <= boardSize &&
              isLocationFree(row, col, "diagonal", word)
            ) {
              placeWord(row, col, "diagonal", word, "normal");
              break;
            }
          }
        },
        mobile: () => {
          for (let attempts = 0; attempts < maxAttempts; attempts++) {
            const row = Math.floor(
              Math.random() * (boardSize - word.length + 1)
            );
            const col = Math.floor(
              Math.random() * (boardSize - word.length + 1)
            );
            if (
              row + word.length >= boardSize &&
              col + word.length >= boardSize &&
              isLocationFree(row, col, "diagonal", word)
            ) {
              placeWord(row, col, "diagonal", word, "reverse");
              break;
            }
          }
        },
      };

      display[word]();
    });

    // No me genera la ñ porque no está en este rango ASCII
    const finalBoard = board.map((row) => {
      return row.map((cell) => {
        if (cell === " ") {
          return (cell = String.fromCharCode(
            Math.floor(Math.random() * 25 + 97)
          ));
        } else {
          return cell;
        }
      });
    });

    return finalBoard;
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 80,
      }}
    >
      <TouchableOpacity onPress={() => setTitlePressed(true)}>
        <Text style={{ fontSize: 40, marginVertical: 20, fontWeight: "bold" }}>
          Sopa de letras
        </Text>
      </TouchableOpacity>
      {titlePressed && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                  {generateBoard().map((row, i) => {
                    return (
                      <View key={i.toString()}>
                        {row.map((letter, j) => {
                          return <Cell key={j.toString()} text={letter} />;
                        })}
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
