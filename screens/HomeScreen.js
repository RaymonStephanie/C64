import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import dictionary from "../dictionary";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      word: "",
      definition: "",
      lexicalCategory: "",
    };
  }

  getWord = (word) => {
    var lexicalCategory = dictionary[word]["lexicalCategory"];
    var definition = responseObject[word]["definition"];
    this.setState({
      word: this.state.word,
      lexicalCategory:
        lexicalCategory === undefined ? "" : lexicalCategory.trim(),
      definition: definition === undefined ? "" : definition.trim(),
    });
  };

  getWord = (word) => {
    fetch(
      `https://rupinwhitehatjr.github.io/dictionary/${word.toLowerCase()}.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        var data = res.definitions[0];
        var definition = data.description;
        var lexicalCategory = data.wordtype;
        this.setState({
          word: word.trim(),
          definition: definition == undefined ? "" : definition.trim(),
          lexicalCategory:
            lexicalCategory == undefined ? "" : lexicalCategory.trim(),
        });
      });
  };
  render() {
    return (
      <View style={styles.screen}>
        <TextInput
          placeholder="Lexicography"
          onChangeText={(text) => {
            this.setState({
              word: text,
              definition: "",
              lexicalCategory: "",
            });
          }}
          value={this.state.word}
          style={{
            backgroundColor: "#242c37",
            color: "#F5F5F5",
            padding: "1rem",
            borderRadius: "6px",
            width: "20%",
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.getWord(this.state.word);
          }}
          style={styles.button}
        >
          <Text
            style={{
              color: "#f5f5f5",
              fontWeight: 700,
            }}
          >
            Search
          </Text>
        </TouchableOpacity>
        <View
          style={{
            padding: "1rem",
            marginTop: ".5rem",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: "#fd4f4f",
            }}
          >
            {this.state.word.slice(0, 1).toUpperCase() +
              this.state.word.slice(1, this.state.word.length)}
          </Text>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#ffffff",
            }}
          >
            {this.state.lexicalCategory.toString()}
          </Text>
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "#ffffff",
              padding: "3rem",
              paddingTop: ".5rem",
            }}
          >
            {this.state.definition.toString()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: ".5rem",
    backgroundColor: "#151a21",
  },
  button: {
    backgroundColor: "#f05454",
    color: "#f5f5f5",
    padding: ".5rem",
    borderRadius: "4px",
    marginTop: "5px",
  },
  cont: {
    backgroundColor: "#242c37",
    marginTop: ".5rem",
    padding: ".5rem",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#f05454",
    fontWeight: 700,
  },
});
