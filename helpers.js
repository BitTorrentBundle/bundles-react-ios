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
                  ',q_' + DEFAULT_QUALITY;

            var img;
            switch (kind) {
                case 'background':
                    img = bundle.background;
                break;
                case 'cover':
                    uri += ',c_limit';
                    img = bundle.cover;
                break;
            }

            uri += '/content-bundles/' + img;
        }

        return { uri };
    },

    cleanString: function (description: string): string {
        return S(description).stripTags().decodeHTMLEntities().s;
    }
};

module.exports = helpers;
