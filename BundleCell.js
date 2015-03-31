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
                    <View style={styles.row}>
                        <Image
                            source={helpers.getImageSource(
                                this.props.bundle,
                                'jpg',
                                '120',
                                'cover'
                            )}
                            style={styles.cellImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.bundleTitle} numberOfLines={2}>
                                {this.props.bundle.title}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.cellBorder} />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    bundleTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2
    },
    bundleDownloads: {
        color: '#999999',
        fontSize: 12
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 93,
        marginRight: 10,
        width: 60
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4
    }
});

module.exports = BundleCell;
