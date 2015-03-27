/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'https://bundles.bittorrent.com/api/v1/bundles?page=%7B%22skip%22%3A0%2C%22limit%22%3A100%7D&where=%7B%22weight%22%3A%7B%22%24ne%22%3A100%2C%22%24gte%22%3A20%7D%7D';

var IMAGE_PREFIX = 'https://d2eri39gz1mfk5.cloudfront.net/bittorrent/image/upload/f_jpg,w_120,q_70/content-bundles/';

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBundle}
        style={styles.listView} />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderBundle: function(bundle) {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{uri: IMAGE_PREFIX + bundle.cover}}
            style={styles.thumbnail} />
          <Image
            source={{uri: IMAGE_PREFIX + bundle.background}}
            style={styles.thumbnail} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{bundle.title}</Text>
          <Text style={styles.year}>{bundle.year}</Text>
          <Text style={styles.description}>{bundle.description}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30
  },
  leftContainer: {
    flex: 1
  },
  rightContainer: {
    flex: 2
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    height: 100,
    padding: 10,
    width: 100
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  description: {
    height: 50,
    textAlign: 'left'
  }
});

AppRegistry.registerComponent('AwesomeProjectReactNative', () => AwesomeProject);