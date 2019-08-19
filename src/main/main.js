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
    this.calculateAvg();
  }

  calculateAvg() {
    let totalUnits = 0;
    let sumGrades = 0;
    let grades = calcMethodJson.schools.map(school => {
      var schoolObject = school[Object.keys(school)[0]];

      for (card of this.state.cards) {
        if (card == "removed" || card == "default") {
          continue;
        }
        console.log(card.final)
        totalUnits += card.units;

        if (schoolObject.hasOwnProperty(card.units)) {
          if (
            schoolObject[card.units.toString()].hasOwnProperty(
              card.subjectName
            ) &&
            card.final >= schoolObject.bonusMin
          ) {
            sumGrades +=
              (card.final +
                schoolObject[card.units.toString()][card.subjectName]) *
              card.units;
          } else if (
            schoolObject[card.units.toString()].hasOwnProperty(
              card.subjectName + " " + this.state.sector
            )
          ) {
            sumGrades +=
              (card.final +
                schoolObject[card.units.toString()][
                  card.subjectName + " " + this.statesector
                ]) *
              card.units;
          }
        } else {
          sumGrades += card.final * card.units;
        }
      }
      console.log(sumGrades)
      console.log(totalUnits)
      return sumGrades / totalUnits;
    });
    return grades;
  }

  applySectorSubjects = async sectorName => {
    await this.clearCards();

    let cards = bagrutReqJson.requirements[sectorName].map(item => ({
      subjectName: item.subjectName,
      final: 0,
      units: item.units,
      splitSubject: item.splitSubject
    }));
    this.setState({ cards });
    this.setState({ sector: sectorName });
  };

  addEmptyCard = () => {
    let cards = [...this.state.cards, "default"];
    this.setState({ cards }, () => setTimeout(this.scrollToBottom, 100));
  };

  clearCards = async () => {
    this.setState({ cards: [] });
  };

  scrollToBottom = () => {
    this._contentScroll._root.scrollToEnd();
  };

  getSumUnits = () => {
    let cards = [...this.state.cards];
    let sum = 0;
    for (var i = 0; i < cards.length; i++) {
      sum += cards[i].units;
    }
    return sum;
  };

  onFinalChanged = (card, value) => {
    card.final = value;
  };

  removeCard = card => {
    let cards = [...this.state.cards];
    for (let i = 0; i < cards.length; i++) {
      if (card == cards[i]) cards[i] = "removed";
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
          <Content ref={contentScroll => (this._contentScroll = contentScroll)}>
            {this.state.cards.map(card => {
              if (card == "removed") {
                return null;
              }
              if (card == "default") {
                return (
                  <SubjectCard
                    dataCard={card}
                    onFinalChanged={this.onFinalChanged}
                    onCardRemoved={this.removeCard}
                  />
                );
              }
              return (
                <SubjectCard
                  onFinalChanged={this.onFinalChanged}
                  dataCard={card}
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
            <TouchableHighlight
              onPress={() => console.log(this.calculateAvg())}
            >
              <Feather size={30} name="feather" color={pink} />
            </TouchableHighlight>
          </Content>
        </View>
      </Container>
    );
  }
}
