import style from "./style";
import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import {
  Card,
  Item,
  Input,
  Left,
  Header,
  CheckBox,
  Right,
  Body,
  CardItem,
  Container,
  Content
} from "native-base";
import NumericInput from "react-native-numeric-input";
import { EvilIcons } from "@expo/vector-icons";

const pink = "#FC3C7D";
const lime = "#EEFF41";

export default class SubjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleMiniGradeChange.bind(this);
    this.state = {
      units: this.props.units,
      subjectName: this.props.subjectName,
      splitSubject: this.props.splitSubject,
      p30: 0,
      show: true,
      p70: 0,
      final: 0
    };
  }

  static defaultProps = {
    units: 3,
    splitSubject: true
  };

  renderGradeInputs() {
    return (
      <View style={style.gradeView}>
        {this.state.splitSubject && (
          <View style={style.gradeSplitBigView}>
            <View style={style.gradeSplitMiniView}>
              <Input
                style={style.gradeText}
                textAlign={"center"}
                placeholderTextColor="#757575"
                keyboardType="number-pad"
                value={this.state.p30 == 0 ? "" : this.state.p30.toString()}
                onChangeText={text => {
                  this.setState({ p30: text }, () => {
                    this.handleMiniGradeChange();
                    console.log(this.state.p30);
                  });
                }}
                placeholder={"ציון 30%"}
                autoCapitalize="none"
              />
            </View>
            <View style={style.gradeSplitMiniView}>
              <Input
                style={style.gradeText}
                placeholderTextColor="#757575"
                textAlign={"center"}
                keyboardType="number-pad"
                value={this.state.p70 == 0 ? "" : this.state.p70.toString()}
                onChangeText={text => {
                  this.setState({ p70: text }, () =>
                    this.handleMiniGradeChange()
                  );
                }}
                placeholder={"ציון 70%"}
                autoCapitalize="none"
              />
            </View>
          </View>
        )}
        <View style={style.finalGradeView}>
          <Input
            style={style.gradeText}
            textAlign={"center"}
            placeholderTextColor="#757575"
            keyboardType="number-pad"
            value={this.state.final == 0 ? "" : this.state.final.toString()}
            onChangeText={text => {
              this.setState({ final: text }, () => {
                this.setState({ p30: 0 });
                this.setState({ p70: 0 });
              });
            }}
            placeholder={"ציון סופי"}
            autoCapitalize="none"
          />
        </View>
      </View>
    );
  }

  getUnits(){
    return this.state.units
  }

  getFinalGrade(){
    return this.state.final
  }

  getSubjectName(){
    return this.state.subjectName
  }

  getSplitSubject(){
    return this.state.splitSubject
  }

  hideCard(){
    this.setState({show: false})
  }
  renderUnitSelection() {
    return (
      <View style={style.unitView}>
        <Text style={style.unitText}>מספר יחידות לימוד</Text>
        <NumericInput
          rounded
          borderColor="transparent"
          textColor={pink}
          iconStyle={{ color: pink }}
          editable={false}
          onChange={value => this.setState({ units: value })}
          value={this.state.units}
          minValue={1}
          maxValue={15}
          type="plus-minus"
        />
      </View>
    );
  }

  renderSplitToggle() {
    return (
      <Right style={{ alignItems: "center", justifyContent: "center" }}>
        <Body>
          <Text style={style.splitText}> חלוקת 70-30 (הערכה חלופית)</Text>
        </Body>
        <CheckBox
          checked={this.state.splitSubject}
          onPress={this.toggleSplitSubject}
          color={pink}
        />
      </Right>
    );
  }

  handleMiniGradeChange() {
    if (this.state.p30 != 0 && this.state.p70 != 0)
      this.setState({
        final: Math.round(0.3 * this.state.p30 + 0.7 * this.state.p70)
      });
  }

  toggleSplitSubject = () => {
    this.setState({ splitSubject: !this.state.splitSubject });
  };

  removeCard = () => {
    this.props.onCardRemoved(this);
  };

  render() {
    if(this.state.show) {
      return (
        <Card>
          <CardItem header>
            <Item underline>
              <Input
                style={style.subjectNameText}
                textAlign={"right"}
                placeholder="שם המקצוע"
                onChangeText={text => this.setState({ subjectName: text })}
                value={this.state.subjectName}
                autoCapitalize="none"
              />
            </Item>
          </CardItem>

          <CardItem>
            <Left>{this.renderSplitToggle()}</Left>
          </CardItem>

          <CardItem>
            <Left style={style.left}>{this.renderUnitSelection()}</Left>
            <Right style={style.right}>{this.renderGradeInputs()}</Right>
          </CardItem>

          <CardItem footer>
            <TouchableHighlight onPress={() => this.removeCard()}>
              <EvilIcons name="trash" size={35} color={pink} />
            </TouchableHighlight>
          </CardItem>
        </Card>
      );
    }
    return null


  }
}
