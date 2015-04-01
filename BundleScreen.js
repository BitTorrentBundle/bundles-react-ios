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
        var description = helpers.cleanString(this.props.bundle.description);

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image
                    source={helpers.getImageSource(
                        this.props.bundle,
                        'jpg',
                        '1400',
                        'background'
                    )}
                    style={styles.bgImage}
                >
                    <View style={styles.splashPane}>
                        <Image
                            source={helpers.getImageSource(
                                this.props.bundle,
                                'jpg',
                                '120',
                                'cover'
                            )}
                            style={styles.coverImage}
                        />
                        <View style={styles.splashText}>
                            <Text style={[styles.splashFont, styles.splashTitle]}>{this.props.bundle.title}</Text>
                            <Text style={styles.splashFont}>{this.props.bundle.author}</Text>
                        </View>
                    </View>
                </Image>
                <View style={styles.descriptionContainer}>
                    <Text>{description}</Text>
                </View>
            </ScrollView>
        );
    }
});

var Gates = React.createClass({
    render: function () {
        return this.props.torrents.map((torrent) => this.renderGate(torrent));
    },
    renderGate: function(torrent: object): ReactElement {
        return (
            <View style={styles.gate}>
                <Text>Gate: {torrent.gateType}</Text>
                <View style={styles.seperator} />
                <Files files={torrent.files} />
            </View>
        );
    }
});

var Files = React.createClass({
    render: function () {
        return this.props.files.map((file) => this.renderFile(file));
    },
    renderFile: function(torrent: object): ReactElement {
        return (
            <View style={styles.file}>
                <Text>Gate: {file.fileName}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    contentContainer: {},
    splashPane: {
        backgroundColor: 'rgba(55, 55, 55, .7)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },
    coverImage: {
        borderWidth: 2,
        borderColor: 'white',
        flex: 1,
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        marginBottom: 10
    },
    splashText: {
        flex: 1,
        alignItems: 'center'
    },
    splashTitle: {
        fontSize: 22,
        fontWeight: '200'
    },
    splashFont: {
        color: 'white',
        fontFamily: 'Helvetica Neue',
        fontWeight: '500'
    },
    separator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginVertical: 10
    },
    descriptionContainer: {
        padding: 10
    },
    gate: {
        borderColor: 'rgba(0, 0, 0, .2)',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingHorizontal: 10
    }
});

module.exports = BundleScreen;
