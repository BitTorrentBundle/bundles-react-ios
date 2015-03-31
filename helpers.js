'use strict';

var S = require('string');

var IMG_PREFIX = 'https://d2eri39gz1mfk5.cloudfront.net/bittorrent/image/upload/';
var DEFAULT_QUALITY = 70;


var helpers = {
    getImageSource: function (bundle: Object, format: ?string, size: ?number, kind: ?string): {uri: ?string} {
        var uri = null;

        if (bundle) {
            uri = IMG_PREFIX +
                  'f_' + format +
                  ',w_' + size +
                  ',q_' + DEFAULT_QUALITY +
                  '/content-bundles/';

            switch (kind) {
                case 'background':
                    uri += bundle.background;
                break;
                case 'cover':
                    uri += bundle.cover;
                break;
            }
        }

        return { uri };
    },

    cleanString: function (description: string): string {
        return S(description).stripTags().decodeHTMLEntities().s;
    }
};

module.exports = helpers;
