'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var helpers = require('./helpers');

var BundleScreen = React.createClass({
    render: function () {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainSection}>
                    <Image
                        source={helpers.getImageSource(
                            this.props.bundle,
                            'jpg',
                            '120',
                            'cover'
                        )}
                        style={styles.detailsImage}
                    />
                    <View style={styles.rightPane}>
                        <Text style={styles.bundleTitle}>{this.props.bundle.title}</Text>
                        <Text>{this.props.bundle.author}</Text>
                    </View>
                </View>
                <View style={styles.separator} />
                <View>
                    <Text>{this.props.bundle.description}</Text>
                </View>
                <View style={styles.separator} />
                <Gates torrents={this.props.bundle.torrents} />
            </ScrollView>
        );
    }
});

var Gates = React.createClass({
    render: function () {
        return (
            <View>
                {this.props.torrents.map((torrent) =>
                    <Text style={styles.bundleFilesTitle}>Gate: {torrent.gateType}</Text>
                    <Files files={torrent.files} />
                )}
            </View>
        );
    }
});

var Files = React.createClass({
    render: function () {
        return (
            {this.props.files.map(file =>
                <Text>{file.fileName}</Text>
            )}
        );
    }
});

var styles = StyleSheet.create({
    contentContainer: {
        padding: 10
    },
    rightPane: {
        justifyContent: 'space-between',
        flex: 1
    },
    bundleTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500'
    },
    mainSection: {
        flexDirection: 'row'
    },
    detailsImage: {
        width: 134,
        height: 200,
        backgroundColor: '#eaeaea',
        marginRight: 10
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginVertical: 10
    },
    bundleFilesTitle: {
        fontWeight: '500',
        marginBottom: 3
    }
});

module.exports = BundleScreen;
