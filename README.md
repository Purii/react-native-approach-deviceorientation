# React Native: Approach to detect device orientation change without additional components

React Native is an awesome technology to develop native applications using JavaScript as primary cross-platform language. You can read more about React Native in the [official documentation](https://facebook.github.io/react-native/), if you’re not already familiar with it.

Native components could easily added by developing bridges to native Objective-C, Swift or Java code. But sometimes such a bridge isn’t really necessary. Some requirements could be met by using already existing bridges and some JavaScript logic.
With this approach I want to show, how to detect a device orientation change easily, with already included components and their available methods.

## No third-party components
Detect a device orientation change in react-native isn’t as complicated as you might think. All you need is already on board, no third-party components are needed. This approach works for **every platform**, which is supported by React Native, out of the box.

### Event: `onLayout`
Each View-Component supports an event called `onLayout` (https://facebook.github.io/react-native/docs/view.html#onlayout). This event gets triggered every time the layout of the specific component is changed. Changing the device orientation will change at least the layout of the root View.
*Of course, this only works, if mulitple layouts are enabled, like landscape and portrait.*

### Api: `Dimensions`
[This Api](https://facebook.github.io/react-native/docs/dimensions.html#content) allows you to get the current dimensions of your app. Through this api it is possible to get the dimensions of `window`. The important part is, that the result won’t be affected by layout changes, it is just the dimension of the application’s window.

## Detect device orientation change
To recognize an orientation change, we use both, `onLayout` and `Dimensions`. Because the dimensions of `window` are always the same, we are able to compare its values with those of the root View, which we get through `onLayout`. The rest is simple math. If the width of the View is wider than the width of `window` the app is in landscape mode.

```javascript
handleLayoutChange(event: Event) {
  const isLandscape = event.nativeEvent.layout.width > Dimensions.get('window').width;
  // Do whatever you want with that result
  this.setState({
    isLandscape
  })
}
```

There’s no need to call this comparison manually, since `onLayout` gets triggered every single time the layout changes. I would reccomend the simple add the value `isLandscape` to your state and propagate it down to its child components. Or you choose something different, like a global state or store ([Redux](https://github.com/rackt/redux),..).

## Example
To run the example, follow these steps:

1. git clone https://github.com/Purii/react-native-approach-deviceorientation
2. npm i
3. run /ios/deviceorientation.xcodeproj via Xcode
