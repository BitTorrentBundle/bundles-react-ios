'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');

var BundleCell = require('./BundleCell');
var BundleScreen = require('./BundleScreen');

var fetch = require('fetch');

var DEFAULT_COUNT = 30;
var DEFAULT_WHERE_PARAMS = encodeURIComponent('{"weight":{"$ne": 100,"$gte": 20}}');

var API_CONSTS = {
    API_URL: 'https://bundles.bittorrent.com/api/v1/',
    BUNDLE_LIST_URL: 'bundles',
    SEARCH_URL: 'search/bundles'
};

var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};
var LOADING = {};

var MainScreen = React.createClass({
    mixins: [TimerMixin],

    timeoutID: (null: any),

    getInitialState: function () {
        return {
            isLoading: false,
            isLoadingTail: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            filter: '',
            queryNumber: 0
        };
    },

    componentDidMount: function () {
        this.searchBundles('');
    },

    _urlForQueryAndPage: function (query: string, pageNumber: ?number): string {
        if (query) {
            return (
                API_CONSTS.API_URL +
                API_CONSTS.SEARCH_URL +
                '?query=' + encodeURIComponent(query) +
                '&from=' + (pageNumber * DEFAULT_COUNT) +
                '&size=' + DEFAULT_COUNT
            );
        } else {
            return (
                API_CONSTS.API_URL +
                API_CONSTS.BUNDLE_LIST_URL +
                '?page=' + encodeURIComponent(
                    '{"skip":' + (pageNumber * DEFAULT_COUNT) + ',"limit":' + DEFAULT_COUNT + '}'
                ) +
                '&where=' + DEFAULT_WHERE_PARAMS
            );
        }
    },

    searchBundles: function (query: string) {
        this.timeoutID = null;

        this.setState({
            filter: query
        });

        var cachedResultsForQuery = resultsCache.dataForQuery[query];
        if (cachedResultsForQuery) {
            if (!LOADING[query]) {
                this.setState({
                    dataSource: this.getDataSource(cachedResultsForQuery),
                    isLoading: false
                });
            } else {
                this.setState({
                    isLoading: true
                })
            }
            return;
        }

        LOADING[query] = true;
        resultsCache.dataForQuery[query] = null;
        this.setState({
            isLoading: true,
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: false
        });

        fetch(this._urlForQueryAndPage(query, 0))
        .then(
            (response) => response.json()
        ).catch(
            (error) => {
                LOADING[query] = false;
                resultsCache.dataForQuery[query] = undefined;

                this.setState({
                    dataSource: this.getDataSource([]),
                    isLoading: false
                });
            }
        ).then(
            (responseData) => {
                LOADING[query] = false;
                resultsCache.totalForQuery[query] = responseData.length;
                resultsCache.dataForQuery[query] = responseData;
                resultsCache.nextPageNumberForQuery[query] = 1;

                if (this.state.filter !== query) {
                    return; // do not update state if the query is stale
                }

                this.setState({
                    isLoading: false,
                    dataSource: this.getDataSource(responseData)
                });
            }
        ).done();
    },

    hasMore: function (): boolean {
        var query = this.state.filter;
        if (!resultsCache.dataForQuery[query]) {
            return true;
        }
        return (
            resultsCache.totalForQuery[query] !== resultsCache.dataForQuery[query].length
        );
    },

    onEndReached: function () {
        var query = this.state.filter;
        if (!this.hasMore() || this.state.isLoadingTail) {
            return; // We're already fetching or have all the elements so noop
        }

        if (LOADING[query]) {
            return;
        }

        LOADING[query] = true;
        this.setState({
            queryNumber: this.state.queryNumber + 1,
            isLoadingTail: true
        });

        var page = resultsCache.nextPageNumberForQuery[query];
        fetch(this._urlForQueryAndPage(query, page))
        .then(
            (response) => response.json()
        ).catch(
            (error) => {
                console.error(error);
                LOADING[query] = false;
                this.setState({
                    isLoadingTail: false
                });
            }
        ).then (
            (responseData) => {
                var bundlesForQuery = resultsCache.dataForQuery[query].slice();

                LOADING[query] = false;
                if (!responseData) {
                    resultsCache.totalForQuery[query] = bundlesForQuery.length;
                } else {
                    for (var i in responseData) {
                        bundlesForQuery.push(responseData[i])
                    }
                    resultsCache.dataForQuery[query] = bundlesForQuery;
                    resultsCache.nextPageNumberForQuery[query] += 1;
                }

                if (this.state.filter !== query) {
                    return; // do not update state if the query is stale
                }

                this.setState({
                    isLoading: false,
                    dataSource: this.getDataSource(resultsCache.dataForQuery[query])
                });
            }
        ).done();
    },

    getDataSource: function (bundles: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(bundles);
    },

    selectBundle: function(bundle: Object) {
        this.props.navigator.push({
            title: bundle.title,
            component: BundleScreen,
            passProps: {bundle}
        });
    },

    onSearchChange: function(event: Object) {
        var filter = event.nativeEvent.text.toLowerCase();

        this.clearTimeout(this.timeoutID);
        this.timeoutID = this.setTimeout(
            () => this.searchBundles(filter), 100
        );
    },

    renderFooter: function () {
        if(!this.hasMore() || !this.state.isLoadingTail) {
            return <View style={styles.scrollSpinner} />;
        }
        return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    },

    renderRow: function (bundle: Object) {
        return (
            <BundleCell
                onSelect={() => this.selectBundle(bundle)}
                bundle={bundle}
            />
        );
    },

    render: function () {
        var content = this.state.dataSource.getRowCount() === 0 ?
            <NoBundles
                filter={this.state.filter}
                isLoading={this.state.isLoading}
            /> :
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderFooter={this.renderFooter}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="onDrag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
            />;

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
});
                // <SearchBar
                //     onSearchChange={this.onSearchChange}
                //     isLoading={this.state.isLoading}
                //     onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0,0)}
                // />
                // <View style={styles.seperator} />

var NoBundles = React.createClass({
    render: function () {
        var text = '';
        if (this.props.filter) {
            text = 'No results for "' + this.props.filter + '"';
        } else if (!this.props.isLoading) {
            text = 'No bundles found';
        }

        return (
            <View style={[styles.container, styles.centertext]}>
                <Text style={styles.noBundlesText}>{text}</Text>
            </View>
        );
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <View style={styles.searchBar}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChange={this.props.onSearchChange}
                    placeholder="Search for a bundle..."
                    onFocus={this.props.onFocus}
                    style={styles.searchBarInput}
                />
                <ActivityIndicatorIOS
                    animating={this.props.isLoading}
                    style={styles.spinner}
                />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    centerText: {
        alignItems: 'center'
    },
    noBundlesText: {
        marginTop: 80,
        color: '#888888'
    },
    searchBar: {
        marginTop: 64,
        padding: 3,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBarInput: {
        fontSize: 15,
        flex: 1,
        height: 30
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee'
    },
    spinner: {
        width: 30
    },
    scrollSpinner: {
        marginVertical: 20
    }
});

module.exports = MainScreen;
