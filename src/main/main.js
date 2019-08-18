import React from "react";
import { Container, Content, Button } from "native-base";
import { View, Text, TouchableHighlight } from "react-native";
import SubjectCard from "../components/subjectCard";
import TopBar from "../components/topBar";
import style from "./style.js";
import { Feather } from "@expo/vector-icons";

const bagrutReqJson = require("../data/bagrutReqs.json");

const pink = "#FC3C7D";
const lime = "#EEFF41";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      ref: 0
    };
  }

  applySectorSubjects = async sectorName => {
    await this.clearCards();

    let cards = bagrutReqJson.requirements[sectorName].map(item => ({
      subjectName: item.subjectName,
      units: item.units,
      splitSubject: item.splitSubject
    }));
    this.setState({ cards });
  };

  addEmptyCard = () => {
    let cards = [...this.state.cards, "default"];
    this.setState({ cards });
  };

  clearCards = async () => {
    this.setState({ cards: [] });
  };

  removeCard = card => {
    let cards = [...this.state.cards];
    card.hideCard()
    //get index of card to remove
    let index = -1;
    for(let i = 0; i < cards.length; i++){
      if(cards[i].subjectName == card.getSubjectName() && cards[i].units == card.getUnits() && cards[i].splitSubject == card.getSplitSubject()) {
        index = i;
        break;
      }
    }
    console.log(index)
    if (index !== -1) {
      cards[index].subjectName = "TtTTTTT"
      this.setState({ cards });
    }
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
              if (card == "default") {
                return <SubjectCard onCardRemoved={this.removeCard} />;
              }
              console.log(card.subjectName)
              return (
                <SubjectCard
                  onCardRemoved={this.removeCard}
                  subjectName={card.subjectName}
                  units={card.units}
                  splitSubject={card.splitSubject}
                />
              );
            })}
            <TouchableHighlight
              style={{ padding: "3%" }}
              onPress={() => this.addEmptyCard()}
            >
              <Feather size={30} name="plus-circle" color={pink} />
            </TouchableHighlight>
          </Content>
        </View>
      </Container>
    );
  }
}
