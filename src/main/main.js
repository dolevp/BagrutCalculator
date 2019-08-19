import React from "react";
import { Container, Content, Button } from "native-base";
import { View, Text, TouchableHighlight } from "react-native";
import SubjectCard from "../components/subjectCard";
import TopBar from "../components/topBar";
import style from "./style.js";
import { Feather } from "@expo/vector-icons";

const bagrutReqJson = require("../data/bagrutReqs.json");
const calcMethodJson = require("../data/calculationMethods.json");

const pink = "#FC3C7D";
const lime = "#EEFF41";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      sector: ""
    };
  }

  calculateAvg() {}
  applySectorSubjects = async sectorName => {
    await this.clearCards();

    let cards = bagrutReqJson.requirements[sectorName].map(item => ({
      subjectName: item.subjectName,
      units: item.units,
      splitSubject: item.splitSubject
    }));
    this.setState({ cards });
    this.setState({ sector: sectorName });
  };

  addEmptyCard = () => {
    let cards = [...this.state.cards, "default"];
    this.setState({ cards });
  };

  clearCards = async () => {
    this.setState({ cards: [] });
  };

  removeCard = card => {
    console.log(card.getSubjectName());
    card.hideCard()
    //card.hideCard()
    let cards = [...this.state.cards];
    //get index of card to remove
    for (let i = cards.length - 1; i >= 0; i--) {
      if (
        cards[i].subjectName == card.getSubjectName() &&
        cards[i].units == card.getUnits() &&
        cards[i].splitSubject == card.getSplitSubject()
      ) {
        cards[i] = "removed";
        break;
      }
    }
    this.setState({ cards }, () => console.log(cards));
  };

  render() {
    return (
      <Container style={style.container}>
        <View style={{ flex: 2 }}>
          <TopBar onSectorChanged={this.applySectorSubjects} />
        </View>
        <View style={{ flex: 8 }}>
          <Content>
            {this.state.cards.map(card => {
              if (card == "removed") {
                return null;
              }
              if (card == "default") {
                return <SubjectCard onCardRemoved={this.removeCard} />;
              }
              return (
                <SubjectCard
                  onCardRemoved={this.removeCard}
                  subjectName={card.subjectName}
                  units={card.units}
                  splitSubject={card.splitSubject}
                />
              );
            })}
            <TouchableHighlight onPress={() => this.addEmptyCard()}>
              <Feather size={30} name="plus-circle" color={pink} />
            </TouchableHighlight>
          </Content>
        </View>
      </Container>
    );
  }
}
