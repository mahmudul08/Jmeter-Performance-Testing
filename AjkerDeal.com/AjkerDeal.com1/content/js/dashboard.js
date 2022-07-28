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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.2125, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [0.25, 500, 1500, "Add Shopping Cart"], "isController": false}, {"data": [0.0, 500, 1500, "Category"], "isController": false}, {"data": [0.25, 500, 1500, "Use Coupons Page"], "isController": false}, {"data": [0.0, 500, 1500, "Bangla to English"], "isController": false}, {"data": [0.0, 500, 1500, "Product Check"], "isController": false}, {"data": [0.9, 500, 1500, "After Login-0"], "isController": false}, {"data": [0.9, 500, 1500, "Add Shopping Cart-0"], "isController": false}, {"data": [0.0, 500, 1500, "Registration page"], "isController": false}, {"data": [0.0, 500, 1500, "After Login-1"], "isController": false}, {"data": [0.4, 500, 1500, "Add Shopping Cart-1"], "isController": false}, {"data": [0.0, 500, 1500, "Refund Policy"], "isController": false}, {"data": [0.0, 500, 1500, "Replacement Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Use Coupons Page-0"], "isController": false}, {"data": [0.5, 500, 1500, "Use Coupons Page-1"], "isController": false}, {"data": [0.0, 500, 1500, "After Login"], "isController": false}, {"data": [0.0, 500, 1500, "Customer Complain"], "isController": false}, {"data": [0.0, 500, 1500, "Search"], "isController": false}, {"data": [0.0, 500, 1500, "Contact Us"], "isController": false}, {"data": [0.05, 500, 1500, "Track Order"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 200, 0, 0.0, 3832.5000000000027, 165, 10761, 3333.0, 7934.1, 9056.55, 10509.880000000001, 2.890632904074347, 293.43101131953784, 0.45547228425038666], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Homepage", 10, 0, 0.0, 8398.6, 6923, 10761, 8166.0, 10624.7, 10761.0, 10761.0, 0.9129085265656381, 191.6965263830564, 0.10430693125798794], "isController": false}, {"data": ["Add Shopping Cart", 10, 0, 0.0, 1785.3000000000002, 1128, 3423, 1637.5, 3336.5000000000005, 3423.0, 3423.0, 1.0582010582010584, 30.030588624338627, 0.3089864417989418], "isController": false}, {"data": ["Category", 10, 0, 0.0, 6086.8, 4451, 7354, 6338.0, 7286.3, 7354.0, 7354.0, 0.6669334400426837, 110.48104137488329, 0.09834663031879419], "isController": false}, {"data": ["Use Coupons Page", 10, 0, 0.0, 1372.5, 677, 1745, 1519.0, 1737.5, 1745.0, 1745.0, 0.7345379756133392, 20.368365056192154, 0.21161006133392096], "isController": false}, {"data": ["Bangla to English", 10, 0, 0.0, 7103.6, 5148, 10399, 6860.0, 10265.0, 10399.0, 10399.0, 0.8238589553468446, 158.6057217004449, 0.09654597132970835], "isController": false}, {"data": ["Product Check", 10, 0, 0.0, 7353.8, 5207, 10511, 7150.5, 10384.7, 10511.0, 10511.0, 0.540423692174665, 105.26762161221897, 0.08127465683095546], "isController": false}, {"data": ["After Login-0", 10, 0, 0.0, 364.40000000000003, 165, 1142, 170.5, 1129.5, 1142.0, 1142.0, 1.7047391749062393, 0.8340569595976816, 0.23140502471871804], "isController": false}, {"data": ["Add Shopping Cart-0", 10, 0, 0.0, 480.00000000000006, 439, 618, 462.5, 611.0, 618.0, 618.0, 1.1185682326621924, 0.608439946868009, 0.16385276845637584], "isController": false}, {"data": ["Registration page", 10, 0, 0.0, 2879.9, 2041, 4722, 2671.5, 4599.900000000001, 4722.0, 4722.0, 1.0688328345446774, 40.335914119281746, 0.1576110918127405], "isController": false}, {"data": ["After Login-1", 10, 0, 0.0, 7261.599999999999, 5519, 9096, 6816.0, 9076.3, 9096.0, 9096.0, 0.8722958827634334, 183.16850575715281, 0.10307402520935101], "isController": false}, {"data": ["Add Shopping Cart-1", 10, 0, 0.0, 1305.1, 510, 2984, 1164.0, 2897.2000000000003, 2984.0, 2984.0, 1.1102475852115021, 30.903698165315866, 0.16154969745753303], "isController": false}, {"data": ["Refund Policy", 10, 0, 0.0, 5070.400000000001, 2328, 7976, 5193.5, 7874.6, 7976.0, 7976.0, 0.6500260010400416, 73.40025046314352, 0.0850619962298492], "isController": false}, {"data": ["Replacement Policy", 10, 0, 0.0, 4560.700000000001, 2676, 7093, 4061.0, 7065.6, 7093.0, 7093.0, 0.821557673348669, 88.74828628204075, 0.11152003573775879], "isController": false}, {"data": ["Use Coupons Page-0", 10, 0, 0.0, 189.00000000000003, 184, 194, 189.5, 193.9, 194.0, 194.0, 0.7832693663350827, 0.41228729341270465, 0.11856128103704865], "isController": false}, {"data": ["Use Coupons Page-1", 10, 0, 0.0, 1183.4, 493, 1550, 1329.0, 1543.0, 1550.0, 1550.0, 0.7452120128176467, 20.272095536180043, 0.10188445487741261], "isController": false}, {"data": ["After Login", 10, 0, 0.0, 7626.400000000001, 5689, 9664, 7391.0, 9637.3, 9664.0, 9664.0, 0.8598452278589854, 180.97474876397249, 0.21832007738607048], "isController": false}, {"data": ["Customer Complain", 10, 0, 0.0, 2709.4, 1579, 4385, 2388.5, 4326.6, 4385.0, 4385.0, 1.2822156686754713, 153.03569568213874, 0.17279859597384278], "isController": false}, {"data": ["Search", 10, 0, 0.0, 2792.1, 2143, 3774, 2490.5, 3745.5, 3774.0, 3774.0, 1.5723270440251573, 204.50385711477986, 0.22110849056603774], "isController": false}, {"data": ["Contact Us", 10, 0, 0.0, 4148.9, 2341, 5593, 3930.0, 5570.1, 5593.0, 5593.0, 0.8046994447573831, 93.84414354832221, 0.10294494849923554], "isController": false}, {"data": ["Track Order", 10, 0, 0.0, 3978.1, 1241, 6696, 3276.0, 6690.0, 6696.0, 6696.0, 0.9080177971488241, 99.33218128575321, 0.1241430582039408], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 200, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
