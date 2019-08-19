import style from "./style";
import React from "react";
import { Text, View, TouchableHighlight, Animated } from "react-native";
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
      final: 0,
      fadeAnim: new Animated.Value(0)
    };
  }

  static defaultProps = {
    units: 3,
    splitSubject: true
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 700 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  renderGradeInputs() {
    return (
      <View style={style.gradeView}>
        {this.state.splitSubject && (
          <View style={style.gradeSplitBigView}>
            <View style={style.gradeSplitMiniView}>
              <Input
                style={style.gradeText}
                textAlign={"center"}
                maxLength={3}
                placeholderTextColor="#757575"
                keyboardType="number-pad"
                value={this.state.p30 == 0 ? "" : this.state.p30.toString()}
                onChangeText={text => {
                  this.setState({ p30: text }, () => {
                    this.handleMiniGradeChange();

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
                maxLength={3}
                keyboardType="number-pad"
                value={this.state.p70 == 0 ? "" : this.state.p70.toString()}
                onChangeText={text => {
                  this.setState({ p70: text }, () => {
                    this.handleMiniGradeChange();
                  });
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
            maxLength={3}
            placeholderTextColor="#757575"
            keyboardType="number-pad"
            value={this.state.final == 0 ? "" : this.state.final.toString()}
            onChangeText={text => {
              this.setState({ final: text }, () => {
                this.setState({ p30: 0 });
                this.setState({ p70: 0 });
                this.props.dataCard.final = parseInt(text)
              });
            }}
            placeholder={"ציון סופי"}
            autoCapitalize="none"
          />
        </View>
      </View>
    );
  }

  getUnits() {
    return this.state.units;
  }

  getFinalGrade() {
    return this.state.final;
  }

  getSubjectName() {
    return this.state.subjectName;
  }

  getSplitSubject() {
    return this.state.splitSubject;
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
          onChange={value => {
            this.setState({ units: value });
            this.props.dataCard.units = value
          }}
          value={this.state.units}
          minValue={1}
          maxValue={5}
          type="plus-minus"
        />
      </View>
    );
  }

  renderSplitToggle() {
    return (
      <Right style={style.toggleContainer}>
        <CheckBox
          checked={this.state.splitSubject}
          onPress={this.toggleSplitSubject}
          color={pink}
          style={{ marginEnd: "3%" }}
        />
        <Body style={style.toggleContainer}>
          <Text style={style.splitText}>חלוקת 70/30 (הערכה חלופית)</Text>
        </Body>
      </Right>
    );
  }

  handleMiniGradeChange() {
    if (this.state.p30 != 0 && this.state.p70 != 0)
      this.setState({
        final: Math.round(0.3 * this.state.p30 + 0.7 * this.state.p70)
      }, () => this.props.dataCard.final = this.state.final);
  }

  hideCard = () => {
    this.setState({ show: false });
  };

  toggleSplitSubject = () => {
    this.setState({ splitSubject: !this.state.splitSubject }, () => this.props.dataCard.splitSubject = this.state.splitSubject);
  };

  removeCard = () => {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 0,
        duration: 700 // Make it take a while
      }
    ).start(() => {
      this.props.onCardRemoved(this.props.dataCard);
    });
    //this.props.onCardRemoved(this);
  };

  render() {
    let { fadeAnim } = this.state;

    if (this.state.show) {
      return (
        <Animated.View style={{ opacity: fadeAnim }}>
          <Card>
            <CardItem header>
              <Item underline>
                <Input
                  style={style.subjectNameText}
                  textAlign={"right"}
                  placeholder="שם המקצוע"
                  onChangeText={text => {
                    this.setState({ subjectName: text });
                    this.props.dataCard.subjectName = text
                  }}
                  value={this.state.subjectName}
                  autoCapitalize="none"
                />
              </Item>
            </CardItem>

            <CardItem>{this.renderSplitToggle()}</CardItem>

            <CardItem>
              <Left style={style.left}>{this.renderUnitSelection()}</Left>
              <Right style={style.right}>{this.renderGradeInputs()}</Right>
            </CardItem>

            <CardItem footer style={style.cardFooter}>
              <TouchableHighlight
                onPress={() => {
                  this.removeCard();
                }}
              >
                <EvilIcons name="trash" size={35} color={pink} />
              </TouchableHighlight>
            </CardItem>
          </Card>
        </Animated.View>
      );
    }
    return null;
  }
}
