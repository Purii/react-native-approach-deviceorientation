/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';

class deviceorientation extends Component {
  constructor(props) {
    super(props);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.state = {
      isLandscape: false
    }
  }
  handleLayoutChange(event: Event) {
    const isLandscape = event.nativeEvent.layout.width > Dimensions.get('window').width;
    this.setState({
      isLandscape
    })
  }
  render() {
    const {isLandscape} = this.state;
    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text style={[...{}, styles.instructions, styles.instructions__highlight]}>
          {isLandscape ? ">Landscape<" : ">Portrait<" }
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  instructions__highlight: {
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('deviceorientation', () => deviceorientation);
