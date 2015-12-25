# React Native: Approach to detect device orientation change without additional native components

React Native is an awesome technology to develop native applications using JavaScript as cross-platform language. If you're not already familiar with React Native, a look in the [official documentation](https://facebook.github.io/react-native/) might help you.

Native, platform specific components could easily added by developing [bridges to native Objective-C, Swift or Java code](https://facebook.github.io/react-native/docs/native-components-ios.html). But sometimes such a bridge isn’t really necessary. Some requirements could be met by using the shipped bridges and some JavaScript logic.
With this approach I want to show, how to detect a device orientation change easily, with already included components and their available methods and events. The big advantage here, is the support for multiple platforms without sepcific bridges.

I use the following solution for my component [react-native-adbannerview](https://github.com/Purii/react-native-adbannerview).

## No third-party components
Detect a device orientation change in react-native isn’t as complicated as you might think. All you need is already on board, no third-party components are required. This works for **every platform**, which is supported by React Native, out of the box.

### Event: `onLayout`
Each View-Component supports an event called `onLayout` (https://facebook.github.io/react-native/docs/view.html#onlayout). This event is triggered every time the layout of a specific component changes. The obvious View to listen for orientation change might be the root View, since its layout will definitly be affected by such a change.
*Of course, only if multiple layouts are [enabled](https://developer.apple.com/library/ios/technotes/tn2244/_index.html), like landscape and portrait.*

### Api: `Dimensions`
[The Dimensons Api](https://facebook.github.io/react-native/docs/dimensions.html#content) provides you with current dimensions of your app. It is also possible to get the dimensions of `window` directly. Important is, that the result will always be the same, no matter in which orientation the device is. `Dimensions.get('window');` will always return the dimensions of the application’s window.

## Detect device orientation change
To recognize an orientation change, we combine `onLayout` and `Dimensions`. Because the dimensions of `window` are always the same, we are able to compare its values with those of the root View, which we get through `onLayout`. The rest is simple math. Is the width of the View wider than the width of `window`, then the app is in landscape mode.

```javascript
...
import Dimensions from 'Dimensions';
...
  handleLayoutChange(event: Event) {
    const isLandscape = event.nativeEvent.layout.width > Dimensions.get('window').width;
    // Do whatever you want with the result
    this.setState({
      isLandscape
    });
  }
  render() {
    return (
      <View style={styles.container} onLayout={this.handleLayoutChange}>
      ...
      </View>
    )
  }
...
```

I would recommend to add the value of `isLandscape` to your state and propagate it down to its child components. Or you use something more complex, like a global state or store ([Redux](https://github.com/rackt/redux),..).

### Disadvantages
Because of the usage of `Dimensions`, this approach **isn't suitable for non-fullscreen applications**. The applicability really depends on your requirements.

## Example
To run the example, follow these steps:

1. git clone https://github.com/Purii/react-native-approach-deviceorientation
2. npm i
3. run `/ios/deviceorientation.xcodeproj` via Xcode

| Portrait | Landscape |
| :------------: | :---------------: |
| ![](https://github.com/Purii/react-native-approach-deviceorientation/blob/master/assets/portrait.png) | ![](https://github.com/Purii/react-native-approach-deviceorientation/blob/master/assets/landscape.png) |
