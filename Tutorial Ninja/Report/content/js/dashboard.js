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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7111111111111111, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Information Terms & Conditions"], "isController": false}, {"data": [0.5, 500, 1500, "Tablets"], "isController": false}, {"data": [1.0, 500, 1500, "Checkout-1"], "isController": false}, {"data": [0.5, 500, 1500, "Open Registration"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Gift Certificates"], "isController": false}, {"data": [1.0, 500, 1500, "Checkout-0"], "isController": false}, {"data": [1.0, 500, 1500, "Scanners"], "isController": false}, {"data": [0.5, 500, 1500, "Shopping Cart"], "isController": false}, {"data": [0.5, 500, 1500, "Information About Us"], "isController": false}, {"data": [1.0, 500, 1500, "Customer Service Returns Submit"], "isController": false}, {"data": [0.0, 500, 1500, "MACS & Windows"], "isController": false}, {"data": [0.5, 500, 1500, "Login Dashboard"], "isController": false}, {"data": [1.0, 500, 1500, "Customer Service Contact Us Submit"], "isController": false}, {"data": [0.5, 500, 1500, "Click Logout"], "isController": false}, {"data": [1.0, 500, 1500, "Login Dashboard-0"], "isController": false}, {"data": [1.0, 500, 1500, "Customer Service Contact Us"], "isController": false}, {"data": [0.0, 500, 1500, "Mice and Trackballs"], "isController": false}, {"data": [1.0, 500, 1500, "Login Dashboard-1"], "isController": false}, {"data": [0.5, 500, 1500, "Checkout"], "isController": false}, {"data": [0.5, 500, 1500, "Logout"], "isController": false}, {"data": [1.0, 500, 1500, "Customer Service Site Maps"], "isController": false}, {"data": [0.5, 500, 1500, "Home Page"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Affiliate-0"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Extras Gift Certificates submit"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Affiliate-1"], "isController": false}, {"data": [0.5, 500, 1500, "Wish List-1"], "isController": false}, {"data": [0.0, 500, 1500, "Wish List"], "isController": false}, {"data": [0.5, 500, 1500, "Wish List-0"], "isController": false}, {"data": [0.0, 500, 1500, "Phones & PDAs"], "isController": false}, {"data": [1.0, 500, 1500, "Web Cameras"], "isController": false}, {"data": [1.0, 500, 1500, "Account Create"], "isController": false}, {"data": [1.0, 500, 1500, "Printers"], "isController": false}, {"data": [0.5, 500, 1500, "MAC"], "isController": false}, {"data": [1.0, 500, 1500, "Customer Service Returns"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Affiliate"], "isController": false}, {"data": [0.5, 500, 1500, "MP3"], "isController": false}, {"data": [0.5, 500, 1500, "PC"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Brands"], "isController": false}, {"data": [1.0, 500, 1500, "Information Privacy Policy"], "isController": false}, {"data": [1.0, 500, 1500, "Extras Specials"], "isController": false}, {"data": [0.5, 500, 1500, "Search Mac"], "isController": false}, {"data": [1.0, 500, 1500, "Monitors"], "isController": false}, {"data": [0.5, 500, 1500, "Cameras"], "isController": false}, {"data": [0.5, 500, 1500, "Software"], "isController": false}, {"data": [0.5, 500, 1500, "Information Delivery Information"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 45, 0, 0.0, 629.5555555555554, 62, 1908, 478.0, 1471.6, 1615.1999999999996, 1908.0, 13.558300692979813, 260.7936784423019, 2.32150591292558], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Information Terms & Conditions", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 67.32100474683544, 0.7458135548523207], "isController": false}, {"data": ["Tablets", 1, 0, 0.0, 1129.0, 1129, 1129, 1129.0, 1129.0, 1129.0, 1129.0, 0.8857395925597874, 22.29226638618246, 0.14272171169176262], "isController": false}, {"data": ["Checkout-1", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 307.0, 3.257328990228013, 52.308122964169385, 0.4898717426710098], "isController": false}, {"data": ["Open Registration", 1, 0, 0.0, 1452.0, 1452, 1452, 1452.0, 1452.0, 1452.0, 1452.0, 0.6887052341597797, 17.20148932506887, 0.10559250172176309], "isController": false}, {"data": ["Extras Gift Certificates", 1, 0, 0.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 136.0, 7.352941176470588, 153.55727251838235, 1.1201746323529411], "isController": false}, {"data": ["Checkout-0", 1, 0, 0.0, 283.0, 283, 283, 283.0, 283.0, 283.0, 283.0, 3.5335689045936394, 1.966928003533569, 0.5452186395759718], "isController": false}, {"data": ["Scanners", 1, 0, 0.0, 147.0, 147, 147, 147.0, 147.0, 147.0, 147.0, 6.802721088435374, 130.61357355442178, 1.1160714285714286], "isController": false}, {"data": ["Shopping Cart", 1, 0, 0.0, 1324.0, 1324, 1324, 1324.0, 1324.0, 1324.0, 1324.0, 0.7552870090634441, 12.129584828172204, 0.11358808534743202], "isController": false}, {"data": ["Information About Us", 1, 0, 0.0, 672.0, 672, 672, 672.0, 672.0, 672.0, 672.0, 1.488095238095238, 23.662748790922617, 0.26303245907738093], "isController": false}, {"data": ["Customer Service Returns Submit", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 139.0, 7.194244604316547, 127.86645683453236, 1.145177607913669], "isController": false}, {"data": ["MACS & Windows", 1, 0, 0.0, 1534.0, 1534, 1534, 1534.0, 1534.0, 1534.0, 1534.0, 0.651890482398957, 21.329041720990872, 0.10504094687092569], "isController": false}, {"data": ["Login Dashboard", 1, 0, 0.0, 878.0, 878, 878, 878.0, 878.0, 878.0, 878.0, 1.1389521640091116, 22.258506548974943, 0.3447999715261959], "isController": false}, {"data": ["Customer Service Contact Us Submit", 1, 0, 0.0, 135.0, 135, 135, 135.0, 135.0, 135.0, 135.0, 7.407407407407407, 118.69936342592592, 1.2152777777777777], "isController": false}, {"data": ["Click Logout", 1, 0, 0.0, 1007.0, 1007, 1007, 1007.0, 1007.0, 1007.0, 1007.0, 0.9930486593843098, 18.8553174652433, 0.1493452085402185], "isController": false}, {"data": ["Login Dashboard-0", 1, 0, 0.0, 467.0, 467, 467, 467.0, 467.0, 467.0, 467.0, 2.1413276231263385, 1.1919499464668093, 0.3262178800856531], "isController": false}, {"data": ["Customer Service Contact Us", 1, 0, 0.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 136.0, 7.352941176470588, 130.6008731617647, 1.1488970588235294], "isController": false}, {"data": ["Mice and Trackballs", 1, 0, 0.0, 1650.0, 1650, 1650, 1650.0, 1650.0, 1650.0, 1650.0, 0.6060606060606061, 11.656605113636365, 0.09943181818181819], "isController": false}, {"data": ["Login Dashboard-1", 1, 0, 0.0, 411.0, 411, 411, 411.0, 411.0, 411.0, 411.0, 2.4330900243309004, 46.19544555961071, 0.3659139294403893], "isController": false}, {"data": ["Checkout", 1, 0, 0.0, 590.0, 590, 590, 590.0, 590.0, 590.0, 590.0, 1.694915254237288, 28.161414194915256, 0.5164194915254238], "isController": false}, {"data": ["Logout", 1, 0, 0.0, 962.0, 962, 962, 962.0, 962.0, 962.0, 962.0, 1.0395010395010396, 18.56788429054054, 0.15734634875259876], "isController": false}, {"data": ["Customer Service Site Maps", 1, 0, 0.0, 150.0, 150, 150, 150.0, 150.0, 150.0, 150.0, 6.666666666666667, 165.60546875, 1.0416666666666667], "isController": false}, {"data": ["Home Page", 1, 0, 0.0, 669.0, 669, 669, 669.0, 669.0, 669.0, 669.0, 1.4947683109118086, 37.742899850523166, 0.18246683482810164], "isController": false}, {"data": ["Extras Affiliate-0", 1, 0, 0.0, 62.0, 62, 62, 62.0, 62.0, 62.0, 62.0, 16.129032258064516, 8.978074596774194, 2.457157258064516], "isController": false}, {"data": ["Extras Extras Gift Certificates submit", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 185.516357421875, 1.6682942708333333], "isController": false}, {"data": ["Extras Affiliate-1", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 197.77425130208334, 1.5665690104166667], "isController": false}, {"data": ["Wish List-1", 1, 0, 0.0, 566.0, 566, 566, 566.0, 566.0, 566.0, 566.0, 1.7667844522968197, 33.54474933745583, 0.2657078180212014], "isController": false}, {"data": ["Wish List", 1, 0, 0.0, 1501.0, 1501, 1501, 1501.0, 1501.0, 1501.0, 1501.0, 0.6662225183211192, 13.020616464023984, 0.20233906562291806], "isController": false}, {"data": ["Wish List-0", 1, 0, 0.0, 932.0, 932, 932, 932.0, 932.0, 932.0, 932.0, 1.0729613733905579, 0.5983017033261803, 0.1645067730686695], "isController": false}, {"data": ["Phones & PDAs", 1, 0, 0.0, 1908.0, 1908, 1908, 1908.0, 1908.0, 1908.0, 1908.0, 0.5241090146750524, 14.756944444444445, 0.08445115959119497], "isController": false}, {"data": ["Web Cameras", 1, 0, 0.0, 157.0, 157, 157, 157.0, 157.0, 157.0, 157.0, 6.369426751592357, 122.35021894904459, 1.044984076433121], "isController": false}, {"data": ["Account Create", 1, 0, 0.0, 405.0, 405, 405, 405.0, 405.0, 405.0, 405.0, 2.4691358024691357, 44.50231481481481, 0.3761574074074074], "isController": false}, {"data": ["Printers", 1, 0, 0.0, 148.0, 148, 148, 148.0, 148.0, 148.0, 148.0, 6.756756756756757, 129.7310494087838, 1.1085304054054055], "isController": false}, {"data": ["MAC", 1, 0, 0.0, 639.0, 639, 639, 639.0, 639.0, 639.0, 639.0, 1.5649452269170578, 40.01766676447574, 0.2567488262910798], "isController": false}, {"data": ["Customer Service Returns", 1, 0, 0.0, 137.0, 137, 137, 137.0, 137.0, 137.0, 137.0, 7.299270072992701, 176.96453010948903, 1.1333827554744524], "isController": false}, {"data": ["Extras Affiliate", 1, 0, 0.0, 158.0, 158, 158, 158.0, 158.0, 158.0, 158.0, 6.329113924050633, 123.68967563291139, 1.9160403481012658], "isController": false}, {"data": ["MP3", 1, 0, 0.0, 1433.0, 1433, 1433, 1433.0, 1433.0, 1433.0, 1433.0, 0.6978367062107467, 25.207306568387995, 0.11244439113747383], "isController": false}, {"data": ["PC", 1, 0, 0.0, 955.0, 955, 955, 955.0, 955.0, 955.0, 955.0, 1.0471204188481678, 19.569085405759164, 0.1717931937172775], "isController": false}, {"data": ["Extras Brands", 1, 0, 0.0, 97.0, 97, 97, 97.0, 97.0, 97.0, 97.0, 10.309278350515465, 182.214481314433, 1.6208923969072164], "isController": false}, {"data": ["Information Privacy Policy", 1, 0, 0.0, 478.0, 478, 478, 478.0, 478.0, 478.0, 478.0, 2.092050209205021, 33.31344796025105, 0.3697862186192469], "isController": false}, {"data": ["Extras Specials", 1, 0, 0.0, 151.0, 151, 151, 151.0, 151.0, 151.0, 151.0, 6.622516556291391, 155.54506415562915, 1.0088990066225165], "isController": false}, {"data": ["Search Mac", 1, 0, 0.0, 906.0, 906, 906, 906.0, 906.0, 906.0, 906.0, 1.1037527593818985, 36.77738686534216, 0.17892866997792495], "isController": false}, {"data": ["Monitors", 1, 0, 0.0, 381.0, 381, 381, 381.0, 381.0, 381.0, 381.0, 2.6246719160104988, 73.9368028215223, 0.43061023622047245], "isController": false}, {"data": ["Cameras", 1, 0, 0.0, 1302.0, 1302, 1302, 1302.0, 1302.0, 1302.0, 1302.0, 0.7680491551459293, 20.479310675883255, 0.12375792050691244], "isController": false}, {"data": ["Software", 1, 0, 0.0, 818.0, 818, 818, 818.0, 818.0, 818.0, 818.0, 1.2224938875305624, 22.341553331295845, 0.1969838783618582], "isController": false}, {"data": ["Information Delivery Information", 1, 0, 0.0, 589.0, 589, 589, 589.0, 589.0, 589.0, 589.0, 1.697792869269949, 27.07515386247878, 0.30009815365025466], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 45, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
