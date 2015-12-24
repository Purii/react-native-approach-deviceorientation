# React Native: Approach to detect device orientation change without additional components

React Native is an awesome technology to develop native applications using JavaScript as cross-platform language. You can read more about React Native in the [official documentation](https://facebook.github.io/react-native/), if you’re not already familiar with it.

Native components could easily added by developing [bridges to native Objective-C, Swift or Java code](https://facebook.github.io/react-native/docs/native-components-ios.html). But sometimes such a bridge isn’t really necessary. Some requirements could be met by using the shipped bridges and some JavaScript logic.
With this approach I want to show, how to detect a device orientation change easily, with already included components and their available methods and events.

## No third-party components
Detect a device orientation change in react-native isn’t as complicated as you might think. All you need is already on board, no third-party components are needed. This approach works for **every platform**, which is supported by React Native, out of the box.

### Event: `onLayout`
Each View-Component supports an event called `onLayout` (https://facebook.github.io/react-native/docs/view.html#onlayout). This event gets triggered every time the layout of the specific component gets changed. Rotate the will change at least the layout of the root View.
*Of course, only if mulitple layouts are enabled, like landscape and portrait.*

### Api: `Dimensions`
[The Dimensons Api](https://facebook.github.io/react-native/docs/dimensions.html#content) allows you to get the current dimensions of your app. Through this api it is possible to get the dimensions of `window`. Important is, that the result will always be the same, no matter in which orientation the device is. It delivery just the dimension of the application’s window.

## Detect device orientation change
To recognize an orientation change, we use both, `onLayout` and `Dimensions`. Because the dimensions of `window` are always the same, we are able to compare its values with those of the root View, which we get through `onLayout`. The rest is simple math. If the width of the View is wider than the width of `window`, the app is in landscape mode.

```javascript
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

There’s no need to call this comparison manually, since `onLayout` gets triggered every single time the layout changes. I would recommend to add the value `isLandscape` to your state and propagate it down to its child components. Or you use something more complex, like a global state or store ([Redux](https://github.com/rackt/redux),..).

## Example
To run the example, follow these steps:

1. git clone https://github.com/Purii/react-native-approach-deviceorientation
2. npm i
3. run `/ios/deviceorientation.xcodeproj` via Xcode

| Portrait | Landscape |
| :------------: | :---------------: |
| ![](https://github.com/Purii/react-native-approach-deviceorientation/blob/master/assets/portrait.png) | ![](https://github.com/Purii/react-native-approach-deviceorientation/blob/master/assets/landscape.png) |
