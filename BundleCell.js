'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var helpers = require('./helpers');

var BundleCell = React.createClass({
    render: function () {
        return (
            <View>
                <TouchableHighlight onPress={this.props.onSelect}>
                    <Image
                        source={helpers.getImageSource(
                            this.props.bundle,
                            'jpg',
                            '1024',
                            'background'
                        )}
                    >
                        <View style={styles.row}>
                            <Image
                                source={helpers.getImageSource(
                                    this.props.bundle,
                                    'jpg',
                                    '200',
                                    'cover'
                                )}
                                style={styles.cellImage}
                            />
                            <View style={styles.textContainer}>
                                <Text style={[styles.cellText,styles.bundleTitle]} numberOfLines={2}>
                                    {this.props.bundle.title}
                                </Text>
                                <Text style={[styles.cellText,styles.bundleAuthor]}>{this.props.bundle.author}</Text>
                            </View>
                            <Text style={[styles.cellText,styles.bundleDownloads]}>{this.props.bundle.stats.download} Downloads</Text>
                        </View>
                    </Image>
                </TouchableHighlight>
                <View style={styles.cellBorder} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        paddingBottom: 10
    },
    cellText: {
        color: 'white',
        fontFamily: 'Open Sans'
    },
    bundleTitle: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 2
    },
    bundleAuthor: {
        fontWeight: '500',
        fontSize: 10
    },
    bundleDownloads: {
        position: 'absolute',
        top: 0,
        right: 5,
        fontSize: 8,
        margin: 5
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'rgba(55, 55, 55, .7)',
        flexDirection: 'row'
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 100,
        marginRight: 10,
        width: 100,
        resizeMode: Image.resizeMode.cover
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4
    }
});

module.exports = BundleCell;
