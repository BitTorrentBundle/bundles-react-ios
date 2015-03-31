'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var MainScreen = require('./MainScreen');

var BundlesApp = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: 'BitTorrent Bundles',
                    component: MainScreen,
                }}
            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

AppRegistry.registerComponent('bundlesReactNative', () => BundlesApp);

module.exports = BundlesApp;
