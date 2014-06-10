(function (w) {

    /**
     * Website Object
     * @namespace <%= websiteProject %>
     * @version 0.0.1
     */
    w.<%= websiteProject %> = w.<%= websiteProject %> || {

        /**
         * Main.Init call all functions you want ;)
         * @return void
         */
        init : function () {

            <% if (includeBrowserDetection) { %>
            /**
             * Fill Main object variables by these functions
             */
            Detection.CheckAll();
            <% } if (includeExample) { %>
            /**
             * Init functions . . .
             */
            Main.Tools.showTooltip('a');
            Main.Tools.showTooltip('img');
            Main.Tools.fitText();
            Main.Tools.checkSvg();
            <% } %>

            // Set a trigger
            Main.trigger();

        }

    };

})(window);


/**
 * Init Main JavaScript Object
 */
if (typeof(jQuery) === 'undefined') {
    console.log('jQuery Framework is required!');
} else {

    $(document).ready(<%= websiteProject %>.init);

} // End of if