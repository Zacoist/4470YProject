import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Card,
  StatusBar,
} from "react-native";

// Get the screen height
const { height } = Dimensions.get("window");

export default class Container extends React.Component {
  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    // Compare the content's height to the screen's height. If content's height > screen's height, enable scrolling
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#468189" />
        <ScrollView
          //   style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.content}>{this.props.children}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  scrollview: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
