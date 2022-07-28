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

    var data = {"OkPercent": 99.83333333333333, "KoPercent": 0.16666666666666666};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.1425, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [0.016666666666666666, 500, 1500, "Add Shopping Cart"], "isController": false}, {"data": [0.0, 500, 1500, "Category"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "Use Coupons Page"], "isController": false}, {"data": [0.0, 500, 1500, "Bangla to English"], "isController": false}, {"data": [0.0, 500, 1500, "Product Check"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "After Login-0"], "isController": false}, {"data": [0.5, 500, 1500, "Add Shopping Cart-0"], "isController": false}, {"data": [0.0, 500, 1500, "Registration page"], "isController": false}, {"data": [0.0, 500, 1500, "After Login-1"], "isController": false}, {"data": [0.1, 500, 1500, "Add Shopping Cart-1"], "isController": false}, {"data": [0.016666666666666666, 500, 1500, "Refund Policy"], "isController": false}, {"data": [0.016666666666666666, 500, 1500, "Replacement Policy"], "isController": false}, {"data": [0.8, 500, 1500, "Use Coupons Page-0"], "isController": false}, {"data": [0.3, 500, 1500, "Use Coupons Page-1"], "isController": false}, {"data": [0.0, 500, 1500, "After Login"], "isController": false}, {"data": [0.0, 500, 1500, "Customer Complain"], "isController": false}, {"data": [0.0, 500, 1500, "Search"], "isController": false}, {"data": [0.05, 500, 1500, "Contact Us"], "isController": false}, {"data": [0.0, 500, 1500, "Track Order"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 600, 1, 0.16666666666666666, 9570.89333333333, 218, 332759, 5896.0, 20834.0, 28230.29999999996, 46547.38000000008, 1.2941298271042552, 131.09332940780618, 0.20363166530783033], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Homepage", 30, 0, 0.0, 24862.93333333333, 15255, 47373, 24205.0, 33731.3, 41894.44999999999, 47373.0, 0.6310873635273576, 132.51848560068998, 0.07210666165302818], "isController": false}, {"data": ["Add Shopping Cart", 30, 0, 0.0, 3092.0000000000005, 1480, 6482, 2930.5, 4966.400000000001, 5709.799999999999, 6482.0, 0.44194337232255976, 12.541869530950766, 0.12904401203559115], "isController": false}, {"data": ["Category", 30, 0, 0.0, 11934.633333333333, 3984, 18540, 11979.0, 16940.2, 18495.45, 18540.0, 0.3531780134914001, 58.50580039703095, 0.05207996097382951], "isController": false}, {"data": ["Use Coupons Page", 30, 0, 0.0, 2402.5999999999995, 635, 8107, 1884.5, 5830.700000000004, 7077.949999999999, 8107.0, 0.5377307761247536, 14.911001355529665, 0.15491267476250226], "isController": false}, {"data": ["Bangla to English", 30, 0, 0.0, 18499.033333333333, 8736, 35555, 19322.0, 24790.600000000002, 29756.34999999999, 35555.0, 0.5755506100836467, 110.80248541938454, 0.06744733711917734], "isController": false}, {"data": ["Product Check", 30, 0, 0.0, 12104.166666666668, 5043, 18895, 11892.0, 16144.100000000002, 18631.0, 18895.0, 0.4286816609985425, 83.50199649552742, 0.06446970292360893], "isController": false}, {"data": ["After Login-0", 30, 0, 0.0, 396.73333333333323, 218, 1730, 244.5, 744.8, 1423.0999999999997, 1730.0, 0.6079889751332509, 0.2974633559978112, 0.08252975346047058], "isController": false}, {"data": ["Add Shopping Cart-0", 30, 0, 0.0, 713.9, 498, 1637, 550.0, 1082.3000000000002, 1544.05, 1637.0, 0.44822949350067237, 0.24381233191393992, 0.06565861721201255], "isController": false}, {"data": ["Registration page", 30, 0, 0.0, 7935.633333333332, 2844, 30932, 5508.5, 25308.30000000003, 30524.45, 30932.0, 0.5735918320523116, 21.31804830599212, 0.08458238929677642], "isController": false}, {"data": ["After Login-1", 30, 0, 0.0, 22335.966666666667, 9909, 54388, 19510.0, 31304.200000000004, 45275.04999999999, 54388.0, 0.4070445849502049, 85.47300276790318, 0.04809804177634257], "isController": false}, {"data": ["Add Shopping Cart-1", 30, 0, 0.0, 2378.0, 951, 5939, 2415.5, 3584.7000000000007, 4779.049999999998, 5939.0, 0.4453549478934711, 12.396437577937117, 0.06480262425403047], "isController": false}, {"data": ["Refund Policy", 30, 1, 3.3333333333333335, 16513.9, 1067, 332759, 5576.5, 9536.400000000001, 156224.39999999976, 332759.0, 0.08455944529003889, 9.237238570381646, 0.010696549622301146], "isController": false}, {"data": ["Replacement Policy", 30, 0, 0.0, 4668.366666666668, 738, 11107, 4106.0, 7998.8, 11099.3, 11107.0, 0.08530191190018538, 9.214689051428522, 0.011579068119263446], "isController": false}, {"data": ["Use Coupons Page-0", 30, 0, 0.0, 568.0666666666668, 224, 3753, 276.5, 1307.9000000000012, 2539.6999999999985, 3753.0, 0.5414771496642842, 0.2850158043643058, 0.08196187324019925], "isController": false}, {"data": ["Use Coupons Page-1", 30, 0, 0.0, 1834.3333333333333, 386, 7339, 1441.5, 3149.0000000000014, 6470.549999999999, 7339.0, 0.540316625542568, 14.698300704212668, 0.07387141364839796], "isController": false}, {"data": ["After Login", 30, 0, 0.0, 22733.4, 10144, 54629, 19884.5, 31545.100000000002, 45522.09999999999, 54629.0, 0.40570145782057176, 85.38945966482298, 0.10301013577475455], "isController": false}, {"data": ["Customer Complain", 30, 0, 0.0, 10691.299999999997, 5099, 23798, 9036.5, 17781.9, 22393.85, 23798.0, 0.3341240936883959, 39.878558943666675, 0.04502844231347522], "isController": false}, {"data": ["Search", 30, 0, 0.0, 15378.066666666666, 5592, 49261, 14317.5, 20005.300000000003, 47815.6, 49261.0, 0.348800706902766, 45.36657319292167, 0.049050099408201465], "isController": false}, {"data": ["Contact Us", 30, 0, 0.0, 3651.4000000000005, 662, 10514, 2825.0, 6768.700000000001, 9899.65, 10514.0, 0.08777961464749169, 10.236868946864075, 0.011229618670724036], "isController": false}, {"data": ["Track Order", 30, 0, 0.0, 8723.433333333332, 3812, 17261, 8536.5, 13923.2, 16281.449999999999, 17261.0, 0.33580335355615754, 36.73505045445388, 0.045910614744005915], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond", 1, 100.0, 0.16666666666666666], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 600, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Refund Policy", 30, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
