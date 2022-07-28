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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.43, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "Homepage"], "isController": false}, {"data": [0.5, 500, 1500, "Add Shopping Cart"], "isController": false}, {"data": [0.4, 500, 1500, "Category"], "isController": false}, {"data": [0.6, 500, 1500, "Use Coupons Page"], "isController": false}, {"data": [0.2, 500, 1500, "Bangla to English"], "isController": false}, {"data": [0.1, 500, 1500, "Product Check"], "isController": false}, {"data": [1.0, 500, 1500, "After Login-0"], "isController": false}, {"data": [0.9, 500, 1500, "Add Shopping Cart-0"], "isController": false}, {"data": [0.0, 500, 1500, "Registration page"], "isController": false}, {"data": [0.0, 500, 1500, "After Login-1"], "isController": false}, {"data": [0.9, 500, 1500, "Add Shopping Cart-1"], "isController": false}, {"data": [0.4, 500, 1500, "Refund Policy"], "isController": false}, {"data": [0.4, 500, 1500, "Replacement Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Use Coupons Page-0"], "isController": false}, {"data": [0.8, 500, 1500, "Use Coupons Page-1"], "isController": false}, {"data": [0.0, 500, 1500, "After Login"], "isController": false}, {"data": [0.5, 500, 1500, "Customer Complain"], "isController": false}, {"data": [0.0, 500, 1500, "Search"], "isController": false}, {"data": [0.4, 500, 1500, "Contact Us"], "isController": false}, {"data": [0.5, 500, 1500, "Track Order"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 100, 0, 0.0, 1887.1700000000005, 165, 10052, 1159.0, 5452.600000000001, 6298.649999999998, 10050.339999999998, 3.2008194097689007, 324.9183978598521, 0.5043478630529415], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Homepage", 5, 0, 0.0, 4768.6, 3989, 6502, 4519.0, 6502.0, 6502.0, 6502.0, 0.7689941556444171, 161.47675715164564, 0.08786359004921562], "isController": false}, {"data": ["Add Shopping Cart", 5, 0, 0.0, 840.2, 654, 1044, 809.0, 1044.0, 1044.0, 1044.0, 1.2976901116013497, 36.82702601868674, 0.3789153743835972], "isController": false}, {"data": ["Category", 5, 0, 0.0, 1533.6, 1230, 2598, 1296.0, 2598.0, 2598.0, 2598.0, 1.0315659170621003, 170.88433405972765, 0.15211567722302455], "isController": false}, {"data": ["Use Coupons Page", 5, 0, 0.0, 672.0, 367, 1085, 527.0, 1085.0, 1085.0, 1085.0, 0.9271277582050806, 25.708781927962175, 0.267092469404784], "isController": false}, {"data": ["Bangla to English", 5, 0, 0.0, 1629.2, 1318, 2190, 1505.0, 2190.0, 2190.0, 2190.0, 1.2391573729863692, 238.55715613382898, 0.14521375464684014], "isController": false}, {"data": ["Product Check", 5, 0, 0.0, 2349.8, 1148, 2993, 2409.0, 2993.0, 2993.0, 2993.0, 0.8302889405513119, 161.72990700763864, 0.12486767270009963], "isController": false}, {"data": ["After Login-0", 5, 0, 0.0, 166.8, 165, 169, 167.0, 169.0, 169.0, 169.0, 1.8656716417910448, 0.9127944263059701, 0.2532503498134328], "isController": false}, {"data": ["Add Shopping Cart-0", 5, 0, 0.0, 530.2, 475, 720, 484.0, 720.0, 720.0, 720.0, 1.3568521031207597, 0.7380533412483039, 0.19875763229308005], "isController": false}, {"data": ["Registration page", 5, 0, 0.0, 2694.8, 1966, 3619, 2879.0, 3619.0, 3619.0, 3619.0, 1.050420168067227, 39.64105173319328, 0.15489594275210083], "isController": false}, {"data": ["After Login-1", 5, 0, 0.0, 6585.4, 5314, 9886, 5951.0, 9886.0, 9886.0, 9886.0, 0.47321597577134206, 99.36796091236039, 0.05591712213704334], "isController": false}, {"data": ["Add Shopping Cart-1", 5, 0, 0.0, 310.0, 168, 547, 331.0, 547.0, 547.0, 547.0, 1.4841199168892847, 41.31041991317898, 0.2159510425942416], "isController": false}, {"data": ["Refund Policy", 5, 0, 0.0, 1285.6, 591, 1718, 1430.0, 1718.0, 1718.0, 1718.0, 0.8033419023136247, 90.7125203345919, 0.10512481924807197], "isController": false}, {"data": ["Replacement Policy", 5, 0, 0.0, 1286.0, 899, 2274, 1062.0, 2274.0, 2274.0, 2274.0, 0.7654623392529087, 82.68862068470607, 0.10390553237905695], "isController": false}, {"data": ["Use Coupons Page-0", 5, 0, 0.0, 194.0, 186, 205, 193.0, 205.0, 205.0, 205.0, 0.9879470460383323, 0.52002290802213, 0.14954276575775538], "isController": false}, {"data": ["Use Coupons Page-1", 5, 0, 0.0, 477.8, 170, 879, 338.0, 879.0, 879.0, 879.0, 0.962278675904542, 26.176987105465745, 0.1315615377213241], "isController": false}, {"data": ["After Login", 5, 0, 0.0, 6753.0, 5482, 10052, 6121.0, 10052.0, 10052.0, 10052.0, 0.46572280178837555, 98.02236997601527, 0.11824993014157972], "isController": false}, {"data": ["Customer Complain", 5, 0, 0.0, 1235.8, 1031, 1481, 1202.0, 1481.0, 1481.0, 1481.0, 1.0688328345446774, 127.56791263627619, 0.14404192496793503], "isController": false}, {"data": ["Search", 5, 0, 0.0, 2509.6, 1647, 3704, 2346.0, 3704.0, 3704.0, 3704.0, 0.7983394539358135, 103.83558448427272, 0.11226648570972378], "isController": false}, {"data": ["Contact Us", 5, 0, 0.0, 1055.0, 663, 2061, 845.0, 2061.0, 2061.0, 2061.0, 1.016053647632595, 118.49229545570006, 0.129983425624873], "isController": false}, {"data": ["Track Order", 5, 0, 0.0, 866.0, 682, 1170, 826.0, 1170.0, 1170.0, 1170.0, 1.1263798152737103, 123.21979190132913, 0.1539972403694526], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 100, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
