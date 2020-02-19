import React, { Component } from "react";
import { View, Animated, PanResponder } from "react-native";
import { Card } from "react-native-elements";
import PlainText from "./PlainText";

class Swipe extends Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
    });
  }

  render() {
    return (
      <Animated.View
        style={{ ...this.position.getLayout(), flex: 1, backgroundColor: "red" }}
        key="hb5vk34"
        {...this._panResponder.panHandlers}
      >
        <View style={styles.card}>
          <PlainText>
            Dolore aliqua adipisicing exercitation cupidatat qui irure ipsum. Aliqua nostrud
            cupidatat labore consequat ullamco elit elit elit minim laboris et et tempor. Ad do
            dolore adipisicing esse qui reprehenderit occaecat sint. Non sit minim qui reprehenderit
            culpa elit dolor eiusmod. Ea dolore consequat nulla ea dolore ut et.
          </PlainText>
        </View>
      </Animated.View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    height: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
};

export default Swipe;
