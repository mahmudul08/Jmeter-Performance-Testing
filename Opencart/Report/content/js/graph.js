/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[700.0, 1.0], [400.0, 3.0], [800.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test20", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 2.0]], "isOverall": false, "label": "Manu Mp3Players test22", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test21", "isController": false}, {"data": [[600.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test24", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Footer Information Terms&Condition", "isController": false}, {"data": [[600.0, 2.0], [400.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test23", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Wish List", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Order History", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "WishList", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "Footer Customer services Sitemap", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Adress Book", "isController": false}, {"data": [[600.0, 3.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Footer Information Delivery Information", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "MyAccount RegisterPage", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Right Manu Transaction", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Components Scanners", "isController": false}, {"data": [[600.0, 1.0], [400.0, 3.0], [900.0, 1.0]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Footer MyAccount Newaletter", "isController": false}, {"data": [[600.0, 1.0], [800.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Footer Information Privacy Policy", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands Cannon", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Phone&PDAs", "isController": false}, {"data": [[600.0, 2.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Footer Information AboutUs", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "Footer Extras Special", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Manu DesktopPc", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [800.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test4", "isController": false}, {"data": [[600.0, 2.0], [400.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test6", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands HTC", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test5", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test8", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Forgotten Password", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test7", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test9", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [800.0, 1.0]], "isOverall": false, "label": "Footer Extras GiftCertificate", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Tablets", "isController": false}, {"data": [[300.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "CheckOut", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Download", "isController": false}, {"data": [[600.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "Manu Laptop&Notebookswindows", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "Footer Extras Brands", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Manu Components", "isController": false}, {"data": [[400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Manu DesktopMac", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Footer MyAccount Order History", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Components WebCameras", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Components Monitors", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Login", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "Manu Desktop", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Software", "isController": false}, {"data": [[600.0, 2.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": " Footer Customer services Contact Us", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard", "isController": false}, {"data": [[1300.0, 1.0], [1500.0, 1.0], [1700.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "OpenCart HomePage", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Register", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Mp3Players test11", "isController": false}, {"data": [[400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test12", "isController": false}, {"data": [[600.0, 1.0], [2500.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Subscription", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs", "isController": false}, {"data": [[400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Manu Mp3Players test15", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "MyAccount LoginPage", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands Sony", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Footer My Account ", "isController": false}, {"data": [[400.0, 5.0]], "isOverall": false, "label": "Manu Components Printers", "isController": false}, {"data": [[2500.0, 1.0], [700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Rewards Points", "isController": false}, {"data": [[600.0, 1.0], [1400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Newsletter", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Footer Customer services Returns", "isController": false}, {"data": [[300.0, 1.0], [400.0, 4.0]], "isOverall": false, "label": "ShoppingCart", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [800.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "Footer Extras affliate", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Manu Laptop&Notebooks", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands Palm", "isController": false}, {"data": [[500.0, 5.0]], "isOverall": false, "label": "Manu Mp3Players test17", "isController": false}, {"data": [[600.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu My Account", "isController": false}, {"data": [[400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Manu Mp3Players test16", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "Extra Brands Apple", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [400.0, 1.0]], "isOverall": false, "label": "Manu Mp3Players test19", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Manu Mp3Players test18", "isController": false}, {"data": [[600.0, 1.0], [1700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Right Manu Returns", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 7.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 195.0, "series": [{"data": [[0.0, 98.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 195.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 7.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 60.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 4.7138888888888895, "minX": 1.6546242E12, "maxY": 4.7138888888888895, "series": [{"data": [[1.6546242E12, 4.7138888888888895]], "isOverall": false, "label": "OpenCart", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6546242E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1456.4, "series": [{"data": [[5.0, 594.8]], "isOverall": false, "label": "Manu Mp3Players test20", "isController": false}, {"data": [[5.0, 594.8]], "isOverall": false, "label": "Manu Mp3Players test20-Aggregated", "isController": false}, {"data": [[5.0, 576.8]], "isOverall": false, "label": "Manu Mp3Players test22", "isController": false}, {"data": [[5.0, 576.8]], "isOverall": false, "label": "Manu Mp3Players test22-Aggregated", "isController": false}, {"data": [[5.0, 605.6]], "isOverall": false, "label": "Manu Mp3Players test21", "isController": false}, {"data": [[5.0, 605.6]], "isOverall": false, "label": "Manu Mp3Players test21-Aggregated", "isController": false}, {"data": [[5.0, 628.2]], "isOverall": false, "label": "Manu Mp3Players test24", "isController": false}, {"data": [[5.0, 628.2]], "isOverall": false, "label": "Manu Mp3Players test24-Aggregated", "isController": false}, {"data": [[4.0, 1147.0], [5.0, 553.25]], "isOverall": false, "label": "Footer Information Terms&Condition", "isController": false}, {"data": [[4.8, 672.0]], "isOverall": false, "label": "Footer Information Terms&Condition-Aggregated", "isController": false}, {"data": [[5.0, 633.4]], "isOverall": false, "label": "Manu Mp3Players test23", "isController": false}, {"data": [[5.0, 633.4]], "isOverall": false, "label": "Manu Mp3Players test23-Aggregated", "isController": false}, {"data": [[5.0, 587.4]], "isOverall": false, "label": "Right Manu Wish List", "isController": false}, {"data": [[5.0, 587.4]], "isOverall": false, "label": "Right Manu Wish List-Aggregated", "isController": false}, {"data": [[5.0, 587.8]], "isOverall": false, "label": "Right Manu Order History", "isController": false}, {"data": [[5.0, 587.8]], "isOverall": false, "label": "Right Manu Order History-Aggregated", "isController": false}, {"data": [[5.0, 463.6]], "isOverall": false, "label": "WishList", "isController": false}, {"data": [[5.0, 463.6]], "isOverall": false, "label": "WishList-Aggregated", "isController": false}, {"data": [[1.0, 1073.0], [5.0, 807.75]], "isOverall": false, "label": "Footer Customer services Sitemap", "isController": false}, {"data": [[4.2, 860.8]], "isOverall": false, "label": "Footer Customer services Sitemap-Aggregated", "isController": false}, {"data": [[5.0, 589.4]], "isOverall": false, "label": "Right Manu Adress Book", "isController": false}, {"data": [[5.0, 589.4]], "isOverall": false, "label": "Right Manu Adress Book-Aggregated", "isController": false}, {"data": [[5.0, 632.5], [3.0, 1016.0]], "isOverall": false, "label": "Footer Information Delivery Information", "isController": false}, {"data": [[4.6, 709.2]], "isOverall": false, "label": "Footer Information Delivery Information-Aggregated", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "MyAccount RegisterPage", "isController": false}, {"data": [[5.0, 0.2]], "isOverall": false, "label": "MyAccount RegisterPage-Aggregated", "isController": false}, {"data": [[5.0, 801.8]], "isOverall": false, "label": "Right Manu Transaction", "isController": false}, {"data": [[5.0, 801.8]], "isOverall": false, "label": "Right Manu Transaction-Aggregated", "isController": false}, {"data": [[5.0, 459.8]], "isOverall": false, "label": "Manu Components Scanners", "isController": false}, {"data": [[5.0, 459.8]], "isOverall": false, "label": "Manu Components Scanners-Aggregated", "isController": false}, {"data": [[5.0, 582.6]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs", "isController": false}, {"data": [[5.0, 582.6]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [2.0, 0.0], [1.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Footer MyAccount Newaletter", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Footer MyAccount Newaletter-Aggregated", "isController": false}, {"data": [[1.0, 882.0], [5.0, 655.0]], "isOverall": false, "label": "Footer Information Privacy Policy", "isController": false}, {"data": [[4.2, 700.4]], "isOverall": false, "label": "Footer Information Privacy Policy-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands Cannon", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands Cannon-Aggregated", "isController": false}, {"data": [[5.0, 445.4]], "isOverall": false, "label": "Manu Phone&PDAs", "isController": false}, {"data": [[5.0, 445.4]], "isOverall": false, "label": "Manu Phone&PDAs-Aggregated", "isController": false}, {"data": [[1.0, 941.0], [5.0, 667.25]], "isOverall": false, "label": "Footer Information AboutUs", "isController": false}, {"data": [[4.2, 722.0]], "isOverall": false, "label": "Footer Information AboutUs-Aggregated", "isController": false}, {"data": [[4.0, 858.0], [2.0, 729.0], [1.0, 963.0], [5.0, 853.0], [3.0, 698.0]], "isOverall": false, "label": "Footer Extras Special", "isController": false}, {"data": [[3.0, 820.2]], "isOverall": false, "label": "Footer Extras Special-Aggregated", "isController": false}, {"data": [[5.0, 463.2]], "isOverall": false, "label": "Manu DesktopPc", "isController": false}, {"data": [[5.0, 463.2]], "isOverall": false, "label": "Manu DesktopPc-Aggregated", "isController": false}, {"data": [[5.0, 720.4]], "isOverall": false, "label": "Manu Mp3Players test4", "isController": false}, {"data": [[5.0, 720.4]], "isOverall": false, "label": "Manu Mp3Players test4-Aggregated", "isController": false}, {"data": [[5.0, 639.2]], "isOverall": false, "label": "Manu Mp3Players test6", "isController": false}, {"data": [[5.0, 639.2]], "isOverall": false, "label": "Manu Mp3Players test6-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands HTC", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands HTC-Aggregated", "isController": false}, {"data": [[5.0, 650.0]], "isOverall": false, "label": "Manu Mp3Players test5", "isController": false}, {"data": [[5.0, 650.0]], "isOverall": false, "label": "Manu Mp3Players test5-Aggregated", "isController": false}, {"data": [[5.0, 661.8]], "isOverall": false, "label": "Manu Mp3Players test8", "isController": false}, {"data": [[5.0, 661.8]], "isOverall": false, "label": "Manu Mp3Players test8-Aggregated", "isController": false}, {"data": [[5.0, 588.4]], "isOverall": false, "label": "Right Manu Forgotten Password", "isController": false}, {"data": [[5.0, 588.4]], "isOverall": false, "label": "Right Manu Forgotten Password-Aggregated", "isController": false}, {"data": [[5.0, 654.8]], "isOverall": false, "label": "Manu Mp3Players test7", "isController": false}, {"data": [[5.0, 654.8]], "isOverall": false, "label": "Manu Mp3Players test7-Aggregated", "isController": false}, {"data": [[5.0, 668.2]], "isOverall": false, "label": "Manu Mp3Players test9", "isController": false}, {"data": [[5.0, 668.2]], "isOverall": false, "label": "Manu Mp3Players test9-Aggregated", "isController": false}, {"data": [[4.0, 628.0], [1.0, 870.0], [5.0, 727.0]], "isOverall": false, "label": "Footer Extras GiftCertificate", "isController": false}, {"data": [[4.0, 735.8]], "isOverall": false, "label": "Footer Extras GiftCertificate-Aggregated", "isController": false}, {"data": [[5.0, 444.6]], "isOverall": false, "label": "Manu Tablets", "isController": false}, {"data": [[5.0, 444.6]], "isOverall": false, "label": "Manu Tablets-Aggregated", "isController": false}, {"data": [[5.0, 437.4]], "isOverall": false, "label": "CheckOut", "isController": false}, {"data": [[5.0, 437.4]], "isOverall": false, "label": "CheckOut-Aggregated", "isController": false}, {"data": [[5.0, 629.8]], "isOverall": false, "label": "Right Manu Download", "isController": false}, {"data": [[5.0, 629.8]], "isOverall": false, "label": "Right Manu Download-Aggregated", "isController": false}, {"data": [[5.0, 540.2]], "isOverall": false, "label": "Manu Laptop&Notebookswindows", "isController": false}, {"data": [[5.0, 540.2]], "isOverall": false, "label": "Manu Laptop&Notebookswindows-Aggregated", "isController": false}, {"data": [[1.0, 829.0], [5.0, 657.0]], "isOverall": false, "label": "Footer Extras Brands", "isController": false}, {"data": [[4.2, 691.4]], "isOverall": false, "label": "Footer Extras Brands-Aggregated", "isController": false}, {"data": [[5.0, 492.6]], "isOverall": false, "label": "Manu Components", "isController": false}, {"data": [[5.0, 492.6]], "isOverall": false, "label": "Manu Components-Aggregated", "isController": false}, {"data": [[5.0, 468.6]], "isOverall": false, "label": "Manu DesktopMac", "isController": false}, {"data": [[5.0, 468.6]], "isOverall": false, "label": "Manu DesktopMac-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [2.0, 0.0], [1.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Footer MyAccount Order History", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Footer MyAccount Order History-Aggregated", "isController": false}, {"data": [[5.0, 452.8]], "isOverall": false, "label": "Manu Components WebCameras", "isController": false}, {"data": [[5.0, 452.8]], "isOverall": false, "label": "Manu Components WebCameras-Aggregated", "isController": false}, {"data": [[5.0, 472.6]], "isOverall": false, "label": "Manu Components Monitors", "isController": false}, {"data": [[5.0, 472.6]], "isOverall": false, "label": "Manu Components Monitors-Aggregated", "isController": false}, {"data": [[5.0, 593.2]], "isOverall": false, "label": "Right Manu Login", "isController": false}, {"data": [[5.0, 593.2]], "isOverall": false, "label": "Right Manu Login-Aggregated", "isController": false}, {"data": [[5.0, 501.6]], "isOverall": false, "label": "Manu Desktop", "isController": false}, {"data": [[5.0, 501.6]], "isOverall": false, "label": "Manu Desktop-Aggregated", "isController": false}, {"data": [[5.0, 434.4]], "isOverall": false, "label": "Manu Software", "isController": false}, {"data": [[5.0, 434.4]], "isOverall": false, "label": "Manu Software-Aggregated", "isController": false}, {"data": [[1.0, 910.0], [5.0, 693.0]], "isOverall": false, "label": " Footer Customer services Contact Us", "isController": false}, {"data": [[4.2, 736.4]], "isOverall": false, "label": " Footer Customer services Contact Us-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard-Aggregated", "isController": false}, {"data": [[5.0, 1456.4]], "isOverall": false, "label": "OpenCart HomePage", "isController": false}, {"data": [[5.0, 1456.4]], "isOverall": false, "label": "OpenCart HomePage-Aggregated", "isController": false}, {"data": [[5.0, 617.2]], "isOverall": false, "label": "Right Manu Register", "isController": false}, {"data": [[5.0, 617.2]], "isOverall": false, "label": "Right Manu Register-Aggregated", "isController": false}, {"data": [[5.0, 462.8]], "isOverall": false, "label": "Manu Mp3Players test11", "isController": false}, {"data": [[5.0, 462.8]], "isOverall": false, "label": "Manu Mp3Players test11-Aggregated", "isController": false}, {"data": [[5.0, 484.2]], "isOverall": false, "label": "Manu Mp3Players test12", "isController": false}, {"data": [[5.0, 484.2]], "isOverall": false, "label": "Manu Mp3Players test12-Aggregated", "isController": false}, {"data": [[5.0, 971.2]], "isOverall": false, "label": "Right Manu Subscription", "isController": false}, {"data": [[5.0, 971.2]], "isOverall": false, "label": "Right Manu Subscription-Aggregated", "isController": false}, {"data": [[5.0, 483.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs", "isController": false}, {"data": [[5.0, 483.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs-Aggregated", "isController": false}, {"data": [[5.0, 503.0]], "isOverall": false, "label": "Manu Mp3Players test15", "isController": false}, {"data": [[5.0, 503.0]], "isOverall": false, "label": "Manu Mp3Players test15-Aggregated", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "MyAccount LoginPage", "isController": false}, {"data": [[5.0, 0.0]], "isOverall": false, "label": "MyAccount LoginPage-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands Sony", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands Sony-Aggregated", "isController": false}, {"data": [[4.0, 0.0], [2.0, 0.0], [1.0, 0.0], [5.0, 0.0], [3.0, 0.0]], "isOverall": false, "label": "Footer My Account ", "isController": false}, {"data": [[3.0, 0.0]], "isOverall": false, "label": "Footer My Account -Aggregated", "isController": false}, {"data": [[5.0, 455.4]], "isOverall": false, "label": "Manu Components Printers", "isController": false}, {"data": [[5.0, 455.4]], "isOverall": false, "label": "Manu Components Printers-Aggregated", "isController": false}, {"data": [[5.0, 1000.0]], "isOverall": false, "label": "Right Manu Rewards Points", "isController": false}, {"data": [[5.0, 1000.0]], "isOverall": false, "label": "Right Manu Rewards Points-Aggregated", "isController": false}, {"data": [[5.0, 764.2]], "isOverall": false, "label": "Right Manu Newsletter", "isController": false}, {"data": [[5.0, 764.2]], "isOverall": false, "label": "Right Manu Newsletter-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Footer Customer services Returns", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Footer Customer services Returns-Aggregated", "isController": false}, {"data": [[5.0, 454.2]], "isOverall": false, "label": "ShoppingCart", "isController": false}, {"data": [[5.0, 454.2]], "isOverall": false, "label": "ShoppingCart-Aggregated", "isController": false}, {"data": [[4.0, 702.3333333333334], [1.0, 855.0], [5.0, 705.0]], "isOverall": false, "label": "Footer Extras affliate", "isController": false}, {"data": [[3.6, 733.4]], "isOverall": false, "label": "Footer Extras affliate-Aggregated", "isController": false}, {"data": [[5.0, 636.0]], "isOverall": false, "label": "Manu Laptop&Notebooks", "isController": false}, {"data": [[5.0, 636.0]], "isOverall": false, "label": "Manu Laptop&Notebooks-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands Palm", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands Palm-Aggregated", "isController": false}, {"data": [[5.0, 519.0]], "isOverall": false, "label": "Manu Mp3Players test17", "isController": false}, {"data": [[5.0, 519.0]], "isOverall": false, "label": "Manu Mp3Players test17-Aggregated", "isController": false}, {"data": [[5.0, 586.0]], "isOverall": false, "label": "Right Manu My Account", "isController": false}, {"data": [[5.0, 586.0]], "isOverall": false, "label": "Right Manu My Account-Aggregated", "isController": false}, {"data": [[5.0, 511.2]], "isOverall": false, "label": "Manu Mp3Players test16", "isController": false}, {"data": [[5.0, 511.2]], "isOverall": false, "label": "Manu Mp3Players test16-Aggregated", "isController": false}, {"data": [[1.0, 0.0], [5.0, 0.0]], "isOverall": false, "label": "Extra Brands Apple", "isController": false}, {"data": [[4.2, 0.0]], "isOverall": false, "label": "Extra Brands Apple-Aggregated", "isController": false}, {"data": [[5.0, 789.4]], "isOverall": false, "label": "Manu Mp3Players test19", "isController": false}, {"data": [[5.0, 789.4]], "isOverall": false, "label": "Manu Mp3Players test19-Aggregated", "isController": false}, {"data": [[5.0, 694.6]], "isOverall": false, "label": "Manu Mp3Players test18", "isController": false}, {"data": [[5.0, 694.6]], "isOverall": false, "label": "Manu Mp3Players test18-Aggregated", "isController": false}, {"data": [[5.0, 821.6]], "isOverall": false, "label": "Right Manu Returns", "isController": false}, {"data": [[5.0, 821.6]], "isOverall": false, "label": "Right Manu Returns-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 859.9166666666666, "minX": 1.6546242E12, "maxY": 101049.11666666667, "series": [{"data": [[1.6546242E12, 101049.11666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6546242E12, 859.9166666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6546242E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6546242E12, "maxY": 1456.4, "series": [{"data": [[1.6546242E12, 594.8]], "isOverall": false, "label": "Manu Mp3Players test20", "isController": false}, {"data": [[1.6546242E12, 576.8]], "isOverall": false, "label": "Manu Mp3Players test22", "isController": false}, {"data": [[1.6546242E12, 605.6]], "isOverall": false, "label": "Manu Mp3Players test21", "isController": false}, {"data": [[1.6546242E12, 628.2]], "isOverall": false, "label": "Manu Mp3Players test24", "isController": false}, {"data": [[1.6546242E12, 672.0]], "isOverall": false, "label": "Footer Information Terms&Condition", "isController": false}, {"data": [[1.6546242E12, 633.4]], "isOverall": false, "label": "Manu Mp3Players test23", "isController": false}, {"data": [[1.6546242E12, 587.4]], "isOverall": false, "label": "Right Manu Wish List", "isController": false}, {"data": [[1.6546242E12, 587.8]], "isOverall": false, "label": "Right Manu Order History", "isController": false}, {"data": [[1.6546242E12, 463.6]], "isOverall": false, "label": "WishList", "isController": false}, {"data": [[1.6546242E12, 860.8]], "isOverall": false, "label": "Footer Customer services Sitemap", "isController": false}, {"data": [[1.6546242E12, 589.4]], "isOverall": false, "label": "Right Manu Adress Book", "isController": false}, {"data": [[1.6546242E12, 709.2]], "isOverall": false, "label": "Footer Information Delivery Information", "isController": false}, {"data": [[1.6546242E12, 0.2]], "isOverall": false, "label": "MyAccount RegisterPage", "isController": false}, {"data": [[1.6546242E12, 801.8]], "isOverall": false, "label": "Right Manu Transaction", "isController": false}, {"data": [[1.6546242E12, 459.8]], "isOverall": false, "label": "Manu Components Scanners", "isController": false}, {"data": [[1.6546242E12, 582.6]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Newaletter", "isController": false}, {"data": [[1.6546242E12, 700.4]], "isOverall": false, "label": "Footer Information Privacy Policy", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Cannon", "isController": false}, {"data": [[1.6546242E12, 445.4]], "isOverall": false, "label": "Manu Phone&PDAs", "isController": false}, {"data": [[1.6546242E12, 722.0]], "isOverall": false, "label": "Footer Information AboutUs", "isController": false}, {"data": [[1.6546242E12, 820.2]], "isOverall": false, "label": "Footer Extras Special", "isController": false}, {"data": [[1.6546242E12, 463.2]], "isOverall": false, "label": "Manu DesktopPc", "isController": false}, {"data": [[1.6546242E12, 720.4]], "isOverall": false, "label": "Manu Mp3Players test4", "isController": false}, {"data": [[1.6546242E12, 639.2]], "isOverall": false, "label": "Manu Mp3Players test6", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands HTC", "isController": false}, {"data": [[1.6546242E12, 650.0]], "isOverall": false, "label": "Manu Mp3Players test5", "isController": false}, {"data": [[1.6546242E12, 661.8]], "isOverall": false, "label": "Manu Mp3Players test8", "isController": false}, {"data": [[1.6546242E12, 588.4]], "isOverall": false, "label": "Right Manu Forgotten Password", "isController": false}, {"data": [[1.6546242E12, 654.8]], "isOverall": false, "label": "Manu Mp3Players test7", "isController": false}, {"data": [[1.6546242E12, 668.2]], "isOverall": false, "label": "Manu Mp3Players test9", "isController": false}, {"data": [[1.6546242E12, 735.8]], "isOverall": false, "label": "Footer Extras GiftCertificate", "isController": false}, {"data": [[1.6546242E12, 444.6]], "isOverall": false, "label": "Manu Tablets", "isController": false}, {"data": [[1.6546242E12, 437.4]], "isOverall": false, "label": "CheckOut", "isController": false}, {"data": [[1.6546242E12, 629.8]], "isOverall": false, "label": "Right Manu Download", "isController": false}, {"data": [[1.6546242E12, 540.2]], "isOverall": false, "label": "Manu Laptop&Notebookswindows", "isController": false}, {"data": [[1.6546242E12, 691.4]], "isOverall": false, "label": "Footer Extras Brands", "isController": false}, {"data": [[1.6546242E12, 492.6]], "isOverall": false, "label": "Manu Components", "isController": false}, {"data": [[1.6546242E12, 468.6]], "isOverall": false, "label": "Manu DesktopMac", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Order History", "isController": false}, {"data": [[1.6546242E12, 452.8]], "isOverall": false, "label": "Manu Components WebCameras", "isController": false}, {"data": [[1.6546242E12, 472.6]], "isOverall": false, "label": "Manu Components Monitors", "isController": false}, {"data": [[1.6546242E12, 593.2]], "isOverall": false, "label": "Right Manu Login", "isController": false}, {"data": [[1.6546242E12, 501.6]], "isOverall": false, "label": "Manu Desktop", "isController": false}, {"data": [[1.6546242E12, 434.4]], "isOverall": false, "label": "Manu Software", "isController": false}, {"data": [[1.6546242E12, 736.4]], "isOverall": false, "label": " Footer Customer services Contact Us", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard", "isController": false}, {"data": [[1.6546242E12, 1456.4]], "isOverall": false, "label": "OpenCart HomePage", "isController": false}, {"data": [[1.6546242E12, 617.2]], "isOverall": false, "label": "Right Manu Register", "isController": false}, {"data": [[1.6546242E12, 462.8]], "isOverall": false, "label": "Manu Mp3Players test11", "isController": false}, {"data": [[1.6546242E12, 484.2]], "isOverall": false, "label": "Manu Mp3Players test12", "isController": false}, {"data": [[1.6546242E12, 971.2]], "isOverall": false, "label": "Right Manu Subscription", "isController": false}, {"data": [[1.6546242E12, 483.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs", "isController": false}, {"data": [[1.6546242E12, 503.0]], "isOverall": false, "label": "Manu Mp3Players test15", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "MyAccount LoginPage", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Sony", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer My Account ", "isController": false}, {"data": [[1.6546242E12, 455.4]], "isOverall": false, "label": "Manu Components Printers", "isController": false}, {"data": [[1.6546242E12, 1000.0]], "isOverall": false, "label": "Right Manu Rewards Points", "isController": false}, {"data": [[1.6546242E12, 764.2]], "isOverall": false, "label": "Right Manu Newsletter", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Customer services Returns", "isController": false}, {"data": [[1.6546242E12, 454.2]], "isOverall": false, "label": "ShoppingCart", "isController": false}, {"data": [[1.6546242E12, 733.4]], "isOverall": false, "label": "Footer Extras affliate", "isController": false}, {"data": [[1.6546242E12, 636.0]], "isOverall": false, "label": "Manu Laptop&Notebooks", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Palm", "isController": false}, {"data": [[1.6546242E12, 519.0]], "isOverall": false, "label": "Manu Mp3Players test17", "isController": false}, {"data": [[1.6546242E12, 586.0]], "isOverall": false, "label": "Right Manu My Account", "isController": false}, {"data": [[1.6546242E12, 511.2]], "isOverall": false, "label": "Manu Mp3Players test16", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Apple", "isController": false}, {"data": [[1.6546242E12, 789.4]], "isOverall": false, "label": "Manu Mp3Players test19", "isController": false}, {"data": [[1.6546242E12, 694.6]], "isOverall": false, "label": "Manu Mp3Players test18", "isController": false}, {"data": [[1.6546242E12, 821.6]], "isOverall": false, "label": "Right Manu Returns", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6546242E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6546242E12, "maxY": 1449.0, "series": [{"data": [[1.6546242E12, 545.8]], "isOverall": false, "label": "Manu Mp3Players test20", "isController": false}, {"data": [[1.6546242E12, 549.2]], "isOverall": false, "label": "Manu Mp3Players test22", "isController": false}, {"data": [[1.6546242E12, 584.0]], "isOverall": false, "label": "Manu Mp3Players test21", "isController": false}, {"data": [[1.6546242E12, 601.0]], "isOverall": false, "label": "Manu Mp3Players test24", "isController": false}, {"data": [[1.6546242E12, 649.2]], "isOverall": false, "label": "Footer Information Terms&Condition", "isController": false}, {"data": [[1.6546242E12, 559.4]], "isOverall": false, "label": "Manu Mp3Players test23", "isController": false}, {"data": [[1.6546242E12, 568.6]], "isOverall": false, "label": "Right Manu Wish List", "isController": false}, {"data": [[1.6546242E12, 535.4]], "isOverall": false, "label": "Right Manu Order History", "isController": false}, {"data": [[1.6546242E12, 460.0]], "isOverall": false, "label": "WishList", "isController": false}, {"data": [[1.6546242E12, 797.2]], "isOverall": false, "label": "Footer Customer services Sitemap", "isController": false}, {"data": [[1.6546242E12, 554.2]], "isOverall": false, "label": "Right Manu Adress Book", "isController": false}, {"data": [[1.6546242E12, 627.6]], "isOverall": false, "label": "Footer Information Delivery Information", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "MyAccount RegisterPage", "isController": false}, {"data": [[1.6546242E12, 774.0]], "isOverall": false, "label": "Right Manu Transaction", "isController": false}, {"data": [[1.6546242E12, 459.2]], "isOverall": false, "label": "Manu Components Scanners", "isController": false}, {"data": [[1.6546242E12, 582.2]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Newaletter", "isController": false}, {"data": [[1.6546242E12, 677.2]], "isOverall": false, "label": "Footer Information Privacy Policy", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Cannon", "isController": false}, {"data": [[1.6546242E12, 443.8]], "isOverall": false, "label": "Manu Phone&PDAs", "isController": false}, {"data": [[1.6546242E12, 721.8]], "isOverall": false, "label": "Footer Information AboutUs", "isController": false}, {"data": [[1.6546242E12, 742.6]], "isOverall": false, "label": "Footer Extras Special", "isController": false}, {"data": [[1.6546242E12, 460.2]], "isOverall": false, "label": "Manu DesktopPc", "isController": false}, {"data": [[1.6546242E12, 695.6]], "isOverall": false, "label": "Manu Mp3Players test4", "isController": false}, {"data": [[1.6546242E12, 612.2]], "isOverall": false, "label": "Manu Mp3Players test6", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands HTC", "isController": false}, {"data": [[1.6546242E12, 622.4]], "isOverall": false, "label": "Manu Mp3Players test5", "isController": false}, {"data": [[1.6546242E12, 616.6]], "isOverall": false, "label": "Manu Mp3Players test8", "isController": false}, {"data": [[1.6546242E12, 574.2]], "isOverall": false, "label": "Right Manu Forgotten Password", "isController": false}, {"data": [[1.6546242E12, 602.4]], "isOverall": false, "label": "Manu Mp3Players test7", "isController": false}, {"data": [[1.6546242E12, 625.0]], "isOverall": false, "label": "Manu Mp3Players test9", "isController": false}, {"data": [[1.6546242E12, 711.6]], "isOverall": false, "label": "Footer Extras GiftCertificate", "isController": false}, {"data": [[1.6546242E12, 443.4]], "isOverall": false, "label": "Manu Tablets", "isController": false}, {"data": [[1.6546242E12, 434.8]], "isOverall": false, "label": "CheckOut", "isController": false}, {"data": [[1.6546242E12, 597.2]], "isOverall": false, "label": "Right Manu Download", "isController": false}, {"data": [[1.6546242E12, 540.0]], "isOverall": false, "label": "Manu Laptop&Notebookswindows", "isController": false}, {"data": [[1.6546242E12, 691.4]], "isOverall": false, "label": "Footer Extras Brands", "isController": false}, {"data": [[1.6546242E12, 492.0]], "isOverall": false, "label": "Manu Components", "isController": false}, {"data": [[1.6546242E12, 464.6]], "isOverall": false, "label": "Manu DesktopMac", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Order History", "isController": false}, {"data": [[1.6546242E12, 452.4]], "isOverall": false, "label": "Manu Components WebCameras", "isController": false}, {"data": [[1.6546242E12, 471.0]], "isOverall": false, "label": "Manu Components Monitors", "isController": false}, {"data": [[1.6546242E12, 557.4]], "isOverall": false, "label": "Right Manu Login", "isController": false}, {"data": [[1.6546242E12, 493.4]], "isOverall": false, "label": "Manu Desktop", "isController": false}, {"data": [[1.6546242E12, 433.2]], "isOverall": false, "label": "Manu Software", "isController": false}, {"data": [[1.6546242E12, 736.4]], "isOverall": false, "label": " Footer Customer services Contact Us", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard", "isController": false}, {"data": [[1.6546242E12, 1449.0]], "isOverall": false, "label": "OpenCart HomePage", "isController": false}, {"data": [[1.6546242E12, 560.0]], "isOverall": false, "label": "Right Manu Register", "isController": false}, {"data": [[1.6546242E12, 462.4]], "isOverall": false, "label": "Manu Mp3Players test11", "isController": false}, {"data": [[1.6546242E12, 483.8]], "isOverall": false, "label": "Manu Mp3Players test12", "isController": false}, {"data": [[1.6546242E12, 934.6]], "isOverall": false, "label": "Right Manu Subscription", "isController": false}, {"data": [[1.6546242E12, 483.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs", "isController": false}, {"data": [[1.6546242E12, 501.4]], "isOverall": false, "label": "Manu Mp3Players test15", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "MyAccount LoginPage", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Sony", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer My Account ", "isController": false}, {"data": [[1.6546242E12, 455.0]], "isOverall": false, "label": "Manu Components Printers", "isController": false}, {"data": [[1.6546242E12, 688.6]], "isOverall": false, "label": "Right Manu Rewards Points", "isController": false}, {"data": [[1.6546242E12, 717.6]], "isOverall": false, "label": "Right Manu Newsletter", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Customer services Returns", "isController": false}, {"data": [[1.6546242E12, 451.4]], "isOverall": false, "label": "ShoppingCart", "isController": false}, {"data": [[1.6546242E12, 708.0]], "isOverall": false, "label": "Footer Extras affliate", "isController": false}, {"data": [[1.6546242E12, 548.4]], "isOverall": false, "label": "Manu Laptop&Notebooks", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Palm", "isController": false}, {"data": [[1.6546242E12, 518.6]], "isOverall": false, "label": "Manu Mp3Players test17", "isController": false}, {"data": [[1.6546242E12, 571.6]], "isOverall": false, "label": "Right Manu My Account", "isController": false}, {"data": [[1.6546242E12, 509.8]], "isOverall": false, "label": "Manu Mp3Players test16", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Apple", "isController": false}, {"data": [[1.6546242E12, 624.6]], "isOverall": false, "label": "Manu Mp3Players test19", "isController": false}, {"data": [[1.6546242E12, 559.8]], "isOverall": false, "label": "Manu Mp3Players test18", "isController": false}, {"data": [[1.6546242E12, 790.8]], "isOverall": false, "label": "Right Manu Returns", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6546242E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6546242E12, "maxY": 734.6, "series": [{"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test20", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test22", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test21", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test24", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Information Terms&Condition", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test23", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Wish List", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Order History", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "WishList", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Customer services Sitemap", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Adress Book", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Information Delivery Information", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "MyAccount RegisterPage", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Transaction", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components Scanners", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Newaletter", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Information Privacy Policy", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Cannon", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Phone&PDAs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Information AboutUs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Extras Special", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu DesktopPc", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test4", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test6", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands HTC", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test5", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test8", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Forgotten Password", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test7", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test9", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Extras GiftCertificate", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Tablets", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "CheckOut", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Download", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Laptop&Notebookswindows", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Extras Brands", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu DesktopMac", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer MyAccount Order History", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components WebCameras", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components Monitors", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Login", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Desktop", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Software", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": " Footer Customer services Contact Us", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Hewlett-Packard", "isController": false}, {"data": [[1.6546242E12, 734.6]], "isOverall": false, "label": "OpenCart HomePage", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Register", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test11", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test12", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Subscription", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components Mice&Trackballs", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test15", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "MyAccount LoginPage", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Sony", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer My Account ", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Components Printers", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Rewards Points", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Newsletter", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Customer services Returns", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "ShoppingCart", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Footer Extras affliate", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Laptop&Notebooks", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Palm", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test17", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu My Account", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test16", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Extra Brands Apple", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test19", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Manu Mp3Players test18", "isController": false}, {"data": [[1.6546242E12, 0.0]], "isOverall": false, "label": "Right Manu Returns", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6546242E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 388.0, "minX": 1.6546242E12, "maxY": 2554.0, "series": [{"data": [[1.6546242E12, 2554.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6546242E12, 843.4000000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6546242E12, 1792.8300000000002]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6546242E12, 961.8999999999997]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6546242E12, 388.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6546242E12, 566.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6546242E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 963.0, "series": [{"data": [[8.0, 625.5], [2.0, 910.0], [9.0, 690.5], [10.0, 489.0], [11.0, 462.0], [12.0, 465.0], [13.0, 677.0], [14.0, 706.5], [1.0, 876.0], [4.0, 963.0], [17.0, 705.0], [5.0, 595.0], [21.0, 488.0], [7.0, 616.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [8.0, 0.0], [4.0, 0.0], [17.0, 0.0], [9.0, 0.0], [21.0, 0.0], [13.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 21.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 910.0, "series": [{"data": [[8.0, 584.5], [2.0, 910.0], [9.0, 670.0], [10.0, 486.0], [11.0, 462.0], [12.0, 465.0], [13.0, 677.0], [14.0, 689.0], [1.0, 860.0], [4.0, 834.0], [17.0, 684.0], [5.0, 566.0], [21.0, 483.0], [7.0, 580.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 0.0], [8.0, 0.0], [4.0, 0.0], [17.0, 0.0], [9.0, 0.0], [21.0, 0.0], [13.0, 0.0], [14.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 21.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 6.0, "minX": 1.6546242E12, "maxY": 6.0, "series": [{"data": [[1.6546242E12, 6.0]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6546242E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.6546242E12, "maxY": 5.0, "series": [{"data": [[1.6546242E12, 5.0]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6546242E12, 1.0]], "isOverall": false, "label": "Non HTTP response code: java.net.URISyntaxException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6546242E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.08333333333333333, "minX": 1.6546242E12, "maxY": 0.08333333333333333, "series": [{"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test4-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test20-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Wish List-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Information Privacy Policy-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Forgotten Password-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components WebCameras-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test22-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Extras Brands-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test6-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu DesktopPc-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test24-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer MyAccount Order History-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test8-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Subscription-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test11-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Extras Special-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Customer services Sitemap-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Information AboutUs-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands Sony-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Laptop&Notebookswindows-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Returns-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands Palm-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Login-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test16-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components Monitors-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test18-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "MyAccount RegisterPage-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Download-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands Apple-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Adress Book-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test21-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "ShoppingCart-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test5-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands Hewlett-Packard-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu My Account-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Tablets-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components Scanners-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test23-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components Mice&Trackballs-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Phone&PDAs-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test7-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Order History-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Rewards Points-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "CheckOut-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "MyAccount LoginPage-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test9-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer MyAccount Newaletter-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu DesktopMac-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Software-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands HTC-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Extras affliate-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Laptop&NotebooksMacs-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test12-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Information Terms&Condition-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Information Delivery Information-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "OpenCart HomePage-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Components Printers-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Extra Brands Cannon-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Register-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Newsletter-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Desktop-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test15-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": " Footer Customer services Contact Us-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Customer services Returns-failure", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Right Manu Transaction-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer Extras GiftCertificate-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test17-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Mp3Players test19-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Manu Laptop&Notebooks-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "WishList-success", "isController": false}, {"data": [[1.6546242E12, 0.08333333333333333]], "isOverall": false, "label": "Footer My Account -failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6546242E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.6546242E12, "maxY": 5.0, "series": [{"data": [[1.6546242E12, 5.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.6546242E12, 1.0]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6546242E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
