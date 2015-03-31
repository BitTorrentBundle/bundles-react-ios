'use strict';

var IMG_PREFIX = 'https://d2eri39gz1mfk5.cloudfront.net/bittorrent/image/upload/';

var DEFAULT_QUALITY = 70;

// f_jpg,w_120,q_70/content-bundles/


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
    }
};

module.exports = helpers;
