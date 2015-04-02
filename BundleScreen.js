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

var GATE_TEXT = {
    'N': 'FREE',
    'E': 'SUBSCRIBE',
    'P': 'PAY'
};

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
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View>
                    {this.props.bundle.torrents.map(torrent =>
                        <Gate torrent={torrent} />
                    )}
                </View>
            </ScrollView>
        );
    }
});

var Gate = React.createClass({
    render: function () {
        return (
            <View style={styles.gate}>
                <Text style={styles.gateTitle}>{GATE_TEXT[this.props.torrent.gateType]}</Text>
                <View style={styles.seperator} />
                {this.props.torrent.files.map(file =>
                    <File file={file} />
                )}
            </View>
        );
    }
});

var File = React.createClass({
    render: function () {
        return (
            <View style={styles.file}>
                <Text style={styles.filename}>{this.props.file.filename}</Text>
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
        fontFamily: 'Open Sans',
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
    description: {
        fontSize: 12
    },
    gate: {
        padding: 10
    },
    gateTitle: {
        textAlign: 'center',
        fontSize: 18
    },
    file: {
        marginHorizontal: 5
    },
    filename: {
        fontFamily: 'Open Sans',
        fontSize: 13,
        fontWeight: '200',
        textAlign: 'center'
    }
});

module.exports = BundleScreen;
