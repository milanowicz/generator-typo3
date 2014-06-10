(function (w) {

    /**
     * Main Object
     * @namespace Main
     * @version 0.0.2
     */
    w.Main = w.Main || {

        /**
         * Ajax Cache
         * @type {object}
         */
        AjaxCache           : {},

        /**
         * Debug modus
         * @type {boolean}
         */
        Debug               : false,


        /**
         * Call an url by ajax and get the content as callback back
         * @param {string} Url - URL to fetch
         * @param {string} DataType - Default html
         * @param {object} Callback - callback function
         */
        ajax : function (Url, DataType, Callback) {

            if (typeof(Main.AjaxCache[Url]) !== 'undefined') {
                return Callback(Main.AjaxCache[Url]);
            }

            if (typeof(DataType) !== 'undefined') {
                DataType = 'html';
            }

            $.ajax({
                'url'      : Url,
                'type'     : 'POST',
                'dataType' : DataType,
                'data'     : {
                    'ajax'  : '1'
                },
                success : function (Content) {

                    Main.AjaxCache[Url] = Content;
                    Callback(Content);

                },
                error : function (Message) {
                    if (Main.Debug) {
                        console.log(Message);
                    }
                }
            });

        },

        /**
         * Main.trigger
         * @return void
         */
        trigger : function () {

            $(window).resize(function () {

                Detection.WindowSize();

            });

        }

    };

})(window);