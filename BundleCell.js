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
                                    '300',
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
        alignSelf: 'flex-start',
        paddingTop: 10
    },
    cellText: {
        color: 'white',
        fontFamily: 'Helvetica Neue'
    },
    bundleTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 2
    },
    bundleAuthor: {
        fontWeight: '500',
        fontSize: 10
    },
    bundleDownloads: {
        color: '#999999',
        fontSize: 12
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'rgba(55, 55, 55, .7)',
        flexDirection: 'row'
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 80,
        marginRight: 10,
        width: 80,
        resizeMode: Image.resizeMode.cover
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4
    }
});

module.exports = BundleCell;
