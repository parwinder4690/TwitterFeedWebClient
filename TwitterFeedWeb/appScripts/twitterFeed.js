console.log("loding widget file...");


$(document).ready(function () {
    console.log("Load Widget");
        $.widget("ui.twitterFeed", {
            options: {
                data: [],
                filterText: '',
                template: ''
            },
            _init: function ()
            {
                var self = this;

                var strVar = "";
                strVar += "<div class=\"row feedContent\" style=\"margin-bottom:10px;\">";
                strVar += "        <div class=\"col-md-2\" style=\"float:left;width:58px;margin-bottom:10px;\">";
                strVar += "            <img src=\"${ProfileImageUrl}\" style=\"width:48px;height:48px; border-radius:50%;\" \/>";
                strVar += "        <\/div>";
                strVar += "        <div class=\"col-md-4\" style=\"float:left;width:90%;\">";
                strVar += "";
                strVar += "            <div stye=\"width:100%;float:left;\">";
                strVar += "                <div style=\"float:left;font-weight:bold;\">${UserName}<\/div>";
                strVar += "                <div style=\"margin-left:10px;\"><span style=\"margin-left:20px\">${ScreenName}<\/span><\/div>";
                strVar += "            <\/div>";
                strVar += "";
                strVar += "            <div class=\"tweetText\" stye=\"width:100%;float:left;\">${Text}<\/div>";
                strVar += "";
                strVar += "            <div class=\"tweetfooter\" stye=\"width:100%;\">";
                strVar += "                <div style=\"float:left;\"><span class=\"glyphicon glyphicon-calendar\"><\/span> ${CreatedAtxt}<\/div>";
                strVar += "                <div style=\"float:left;\"><span style=\"margin-left:20px\"><span class=\"glyphicon glyphicon-retweet\"><\/span> ${RetweetCount}<\/span><\/div>";
                strVar += "            <\/div>";
                strVar += "        <\/div>";
                strVar += "    <\/div>";

                self.options.template = strVar;
                //var urlTemplate = "/appScripts/feedContent.html";
                //$.when($.get(urlTemplate)).then(function (_html) {
                //    self.options.template = _html;

                //    self.load();

                //    setInterval(function () {
                //        self.load();
                //    }, 10000);

                //});

                self.load();

                setInterval(function () {
                    self.load();
                }, 10000);
               
            },
            load: function ()
            {
                var self = this;
                var url = "http://localhost:61989/api/TimeLineFeed";
                $.when($.getJSON(url)).then(function (_data) {
                    self.options.data = _data;
                    self.renderTweets();
                });
            },
            renderTweets: function ()
            {
                console.log("renderTweets...");
                var self = this;
                var el = self.element;
                var data = self.options.data;

                if (self.options.filterText != '')
                {
                    data = data.filter(function (tweetData, index) {
                        return tweetData.Text.includes(self.options.filterText);
                    });
                }
                var divContent = document.createElement("div");
                data.forEach(function (value, index) {
                    //$("#templateContent").tmpl(value).appendTo(divContent);
                    $(self.options.template).tmpl(value).appendTo(divContent);
                });
   

                el.html(divContent);
            },
            setFilter: function (_filterText) {
                var self = this;
                self.options.filterText = _filterText;
                self.renderTweets();
            }
        });

        
      
    });
