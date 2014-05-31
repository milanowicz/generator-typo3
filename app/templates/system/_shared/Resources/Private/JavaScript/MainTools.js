(function (M) {

    /**
     * Website Tools Object
     * @namespace Main.Tools
     */
    M.Tools = M.Tools || {


        /**
         * Check if Browser can handle
         *  SVG files
         * @return void
         */
        checkSvg : function () {

            if(!Modernizr.svg) {
                $('img[src*="svg"]').attr('src', function() {
                    return $(this).attr('src').replace('.svg', '.png');
                });
            }

        },


        /**
         * Make Headline responsive
         * @return void
         */
        fitText : function () {

            $('h1').fitText(1, {
                'minFontSize' : 24,
                'maxFontSize' : 40,
                'minLineHeight' : 24,
                'maxLineHeight' : 40
            });

            $('h2').fitText(1, {
                'minFontSize' : 20,
                'maxFontSize' : 32,
                'minLineHeight' : 20,
                'maxLineHeight' : 32
            });

            $('h3').fitText(1, {
                'minFontSize' : 24,
                'maxFontSize' : 40,
                'minLineHeight' : 24,
                'maxLineHeight' : 40
            });

            $('h4').fitText(1, {
                'minFontSize' : 18,
                'maxFontSize' : 24,
                'minLineHeight' : 18,
                'maxLineHeight' : 24
            });

        },


        /**
         * Init Masonry Float box with image load
         * @param {string} HtmlSelector - HTML Container
         * @param {string} ItemSelector - Container elements
         * @param {number} ColumnWidth - Column width
         * @param {number} GutterWidth - Space between columns
         * @return void
         */
        initMasonry : function (HtmlSelector, ItemSelector, ColumnWidth, GutterWidth) {
            if (Detection.ieVersion >= 8) {
                var Container = $(HtmlSelector);
                Container.imagesLoaded(function () {
                    Container.masonry({
                        'itemSelector'      : ItemSelector,
                        'columnWidth'       : ColumnWidth,
                        'gutter'            : GutterWidth,
                        'isFitWidth'        : true
                    });
                });
            }
        },


        /**
         * Scroll to Html element offset
         * @param {string} HtmlSelector - HtmlSelector
         * @return void
         */
        scrollTo : function (HtmlSelector) {

            $('html,body').animate({

                scrollTop: $(HtmlSelector).offset().top

            }, 'medium');

        },


        /**
         * Bind Tooltip on a html element
         * @param {string} HtmlSelector - HTML selector
         * @param {string} HtmlSectionSelector - HTML section selector
         * @return void
         */
        showTooltip : function (HtmlSelector, HtmlSectionSelector) {

            var Body = '';

            if (typeof(HtmlSectionSelector) !== 'undefined') {
                Body = $(HtmlSectionSelector);
            } else {
                Body = $('body');
            }

            Body.find(HtmlSelector).tooltip();

        }

    };

})(Main);