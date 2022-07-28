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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.138125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [0.05, 500, 1500, "Add Shopping Cart"], "isController": false}, {"data": [0.0, 500, 1500, "Category"], "isController": false}, {"data": [0.0625, 500, 1500, "Use Coupons Page"], "isController": false}, {"data": [0.0, 500, 1500, "Bangla to English"], "isController": false}, {"data": [0.0, 500, 1500, "Product Check"], "isController": false}, {"data": [0.9, 500, 1500, "After Login-0"], "isController": false}, {"data": [0.4375, 500, 1500, "Add Shopping Cart-0"], "isController": false}, {"data": [0.0, 500, 1500, "Registration page"], "isController": false}, {"data": [0.0, 500, 1500, "After Login-1"], "isController": false}, {"data": [0.125, 500, 1500, "Add Shopping Cart-1"], "isController": false}, {"data": [0.025, 500, 1500, "Refund Policy"], "isController": false}, {"data": [0.0625, 500, 1500, "Replacement Policy"], "isController": false}, {"data": [0.85, 500, 1500, "Use Coupons Page-0"], "isController": false}, {"data": [0.175, 500, 1500, "Use Coupons Page-1"], "isController": false}, {"data": [0.0, 500, 1500, "After Login"], "isController": false}, {"data": [0.0, 500, 1500, "Customer Complain"], "isController": false}, {"data": [0.0, 500, 1500, "Search"], "isController": false}, {"data": [0.075, 500, 1500, "Contact Us"], "isController": false}, {"data": [0.0, 500, 1500, "Track Order"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 800, 0, 0.0, 8297.428750000008, 191, 62905, 6291.5, 18528.8, 22828.89999999998, 37952.41, 5.186486609139886, 526.4854915634502, 0.8172261859225787], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Homepage", 40, 0, 0.0, 20200.199999999997, 9804, 43972, 18293.0, 31519.699999999997, 37450.44999999999, 43972.0, 0.8931362479346224, 187.54465681239674, 0.1020477939534676], "isController": false}, {"data": ["Add Shopping Cart", 40, 0, 0.0, 4007.525, 1116, 14621, 3349.5, 7244.5999999999985, 10441.849999999997, 14621.0, 0.45673049475330846, 12.961511892120258, 0.1333617362609758], "isController": false}, {"data": ["Category", 40, 0, 0.0, 14162.974999999999, 4657, 26925, 13172.0, 22132.899999999998, 23233.6, 26925.0, 0.40120361083249745, 66.4614938565697, 0.05916186058174523], "isController": false}, {"data": ["Use Coupons Page", 40, 0, 0.0, 3287.7250000000004, 531, 7850, 2952.5, 6062.9, 6505.75, 7850.0, 0.5137096256341103, 14.244907050664613, 0.14799251910357672], "isController": false}, {"data": ["Bangla to English", 40, 0, 0.0, 11661.000000000004, 6078, 25901, 10822.0, 16966.6, 22218.39999999999, 25901.0, 0.8342544893319708, 160.60702442280018, 0.09776419796859032], "isController": false}, {"data": ["Product Check", 40, 0, 0.0, 14980.075000000003, 2264, 26814, 14781.5, 23434.699999999997, 24009.85, 26814.0, 0.45524902121460437, 88.67685206327391, 0.06846518483110262], "isController": false}, {"data": ["After Login-0", 40, 0, 0.0, 387.04999999999995, 219, 1492, 239.5, 1135.9999999999993, 1373.9499999999998, 1492.0, 0.8677166037572129, 0.42453712742418326, 0.1177857499240748], "isController": false}, {"data": ["Add Shopping Cart-0", 40, 0, 0.0, 845.0749999999999, 436, 1857, 534.0, 1676.6999999999998, 1821.4499999999998, 1857.0, 0.45998160073597055, 0.25020483555657774, 0.0673801172953082], "isController": false}, {"data": ["Registration page", 40, 0, 0.0, 4396.15, 2105, 8896, 3936.0, 7295.299999999999, 7913.4, 8896.0, 0.8398773779028261, 31.69552870280939, 0.12384910553059254], "isController": false}, {"data": ["After Login-1", 40, 0, 0.0, 18019.3, 6368, 41308, 16362.5, 28052.0, 40614.999999999956, 41308.0, 0.6135439834343124, 128.83464989646447, 0.07249884960503107], "isController": false}, {"data": ["Add Shopping Cart-1", 40, 0, 0.0, 3162.3499999999995, 619, 14112, 2337.0, 6726.899999999999, 9869.399999999992, 14112.0, 0.4620484919892343, 12.861101725751118, 0.06723166533827725], "isController": false}, {"data": ["Refund Policy", 40, 0, 0.0, 6846.999999999999, 795, 18955, 5784.5, 13705.399999999998, 15882.899999999998, 18955.0, 0.5345806882726362, 60.36428750417641, 0.069954894754427], "isController": false}, {"data": ["Replacement Policy", 40, 0, 0.0, 5985.150000000001, 751, 12619, 5670.0, 10121.099999999999, 12365.549999999996, 12619.0, 0.6056843476022471, 65.42869675656033, 0.0822169182780394], "isController": false}, {"data": ["Use Coupons Page-0", 40, 0, 0.0, 475.04999999999995, 191, 2407, 266.5, 824.6, 1479.0, 2407.0, 0.5159625927120284, 0.27158577878103835, 0.07809980651402773], "isController": false}, {"data": ["Use Coupons Page-1", 40, 0, 0.0, 2812.5499999999997, 340, 7597, 2335.0, 5551.4, 6263.599999999998, 7597.0, 0.5154705601876313, 14.022410082604157, 0.07047449065065271], "isController": false}, {"data": ["After Login", 40, 0, 0.0, 18407.0, 6596, 41770, 16600.0, 28290.1, 40973.69999999995, 41770.0, 0.6112002444800978, 128.64153583161433, 0.15518756207502485], "isController": false}, {"data": ["Customer Complain", 40, 0, 0.0, 11492.9, 2664, 62905, 8688.0, 17934.699999999997, 36995.34999999992, 62905.0, 0.3944617569326654, 47.080012252968324, 0.05315988521162873], "isController": false}, {"data": ["Search", 40, 0, 0.0, 9950.725, 3610, 18906, 9866.5, 15582.0, 15604.35, 18906.0, 0.5867081273743344, 76.30987173093564, 0.08250583041201577], "isController": false}, {"data": ["Contact Us", 40, 0, 0.0, 4991.224999999999, 655, 17486, 4137.0, 10254.299999999997, 13242.39999999999, 17486.0, 0.692101392854053, 80.71294554027165, 0.08854031490613375], "isController": false}, {"data": ["Track Order", 40, 0, 0.0, 9877.550000000001, 3935, 43144, 8608.5, 14891.5, 21606.949999999975, 43144.0, 0.39952456576673756, 43.70580259491206, 0.054622499225921155], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 800, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
