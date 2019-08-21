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

  compare(a, b) {
    if (a.final * a.units > b.final * b.units) {
      return -1;
    } else if (b.final * b.units > a.final * a.units) {
      return 1;
    }
    return 0;
  }

  getTotalUnits() {
    let sum = 0;
    for (card of this.state.cards) {
      if (card == "removed") {
        continue;
      }
      sum += card.units;
    }
    return sum;
  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  calculateAvg() {
    let totalUnits = this.getTotalUnits();
    let sumGrades = 0;
    let amountToAdd = 0;
    let sortedCards = this.state.cards.sort(this.compare);
    let grades = Object.keys(calcMethodJson.schools).map(schoolName => {
      let schoolObject = calcMethodJson.schools[schoolName];
      for (card of sortedCards) {
        if (card == "removed") {
          continue;
        }
        if (schoolObject.hasOwnProperty(card.units.toString())) {
          if (
            schoolObject[card.units.toString()].hasOwnProperty(
              card.subjectName
            ) &&
            card.final >= schoolObject.bonusMin
          ) {
            amountToAdd =
              (card.final +
                schoolObject[card.units.toString()][card.subjectName]) *
              card.units;
          } else if (
            schoolObject[card.units.toString()].hasOwnProperty(
              card.subjectName + " " + this.state.sector
            )
          ) {
            amountToAdd =
              (card.final +
                schoolObject[card.units.toString()][
                  card.subjectName + " " + this.state.sector
                ]) *
              card.units;
          } else {
            amountToAdd =
              (card.final + schoolObject[card.units.toString()]["other"]) *
              card.units;
          }
        } else {
          amountToAdd = card.final * card.units;
        }

        if (
          sumGrades > 0 &&
          this.subjectNotInSector(card.subjectName, this.state.sector) &&
          (sumGrades + amountToAdd) / totalUnits <
            sumGrades / (totalUnits - card.units)
        ) {
          //ignore this card, it lowers the average
          totalUnits -= card.units;
        } else {
          sumGrades += amountToAdd;
        }
      }

      return sumGrades / totalUnits > schoolObject.maxAvg
        ? { [schoolName]: schoolObject.maxAvg }
        : { [schoolName]: parseFloat(sumGrades / totalUnits).toFixed(3) };
    });
    return grades;
  }

  subjectNotInSector(subject, sectorName) {
    if (!this.state.sector) {
      console.log("no sector");
      return true;
    }
    for (item of bagrutReqJson.requirements[sectorName]) {
      console.log(item.subjectName);
      if (item.subjectName == subject) {
        return false;
      }
    }
    return true;
  }

  applySectorSubjects = async sectorName => {


    await this.clearCards();

    if (Object.keys(bagrutReqJson.requirements[sectorName]).length === 1) {
      return;
    }
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
    let cards = [
      ...this.state.cards,
      { subjectName: "", final: 0, units: 3, splitSubject: true }
    ];
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
              return (
                <SubjectCard
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
