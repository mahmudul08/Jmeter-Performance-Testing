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

    var data = {"OkPercent": 83.33333333333333, "KoPercent": 16.666666666666668};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5430555555555555, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8, 500, 1500, "Manu Mp3Players test20"], "isController": false}, {"data": [0.7, 500, 1500, "Manu Mp3Players test22"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Mp3Players test21"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Mp3Players test24"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Information Terms&Condition"], "isController": false}, {"data": [0.7, 500, 1500, "Manu Mp3Players test23"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Wish List"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Order History"], "isController": false}, {"data": [1.0, 500, 1500, "WishList"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Customer services Sitemap"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Adress Book"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Information Delivery Information"], "isController": false}, {"data": [0.0, 500, 1500, "MyAccount RegisterPage"], "isController": false}, {"data": [0.4, 500, 1500, "Right Manu Transaction"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Components Scanners"], "isController": false}, {"data": [0.8, 500, 1500, "Manu Laptop&NotebooksMacs"], "isController": false}, {"data": [0.0, 500, 1500, "Footer MyAccount Newaletter"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Information Privacy Policy"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands Cannon"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Phone&PDAs"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Information AboutUs"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Extras Special"], "isController": false}, {"data": [0.8, 500, 1500, "Manu DesktopPc"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test4"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Mp3Players test6"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands HTC"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test5"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test8"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Forgotten Password"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test7"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test9"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Extras GiftCertificate"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Tablets"], "isController": false}, {"data": [1.0, 500, 1500, "CheckOut"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Download"], "isController": false}, {"data": [0.8, 500, 1500, "Manu Laptop&Notebookswindows"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Extras Brands"], "isController": false}, {"data": [0.9, 500, 1500, "Manu Components"], "isController": false}, {"data": [0.8, 500, 1500, "Manu DesktopMac"], "isController": false}, {"data": [0.0, 500, 1500, "Footer MyAccount Order History"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Components WebCameras"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Components Monitors"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Login"], "isController": false}, {"data": [0.8, 500, 1500, "Manu Desktop"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Software"], "isController": false}, {"data": [0.5, 500, 1500, " Footer Customer services Contact Us"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands Hewlett-Packard"], "isController": false}, {"data": [0.2, 500, 1500, "OpenCart HomePage"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Register"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Mp3Players test11"], "isController": false}, {"data": [0.9, 500, 1500, "Manu Mp3Players test12"], "isController": false}, {"data": [0.4, 500, 1500, "Right Manu Subscription"], "isController": false}, {"data": [1.0, 500, 1500, "Manu Components Mice&Trackballs"], "isController": false}, {"data": [0.7, 500, 1500, "Manu Mp3Players test15"], "isController": false}, {"data": [0.0, 500, 1500, "MyAccount LoginPage"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands Sony"], "isController": false}, {"data": [0.0, 500, 1500, "Footer My Account "], "isController": false}, {"data": [1.0, 500, 1500, "Manu Components Printers"], "isController": false}, {"data": [0.4, 500, 1500, "Right Manu Rewards Points"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu Newsletter"], "isController": false}, {"data": [0.0, 500, 1500, "Footer Customer services Returns"], "isController": false}, {"data": [1.0, 500, 1500, "ShoppingCart"], "isController": false}, {"data": [0.5, 500, 1500, "Footer Extras affliate"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Laptop&Notebooks"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands Palm"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test17"], "isController": false}, {"data": [0.5, 500, 1500, "Right Manu My Account"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Mp3Players test16"], "isController": false}, {"data": [0.0, 500, 1500, "Extra Brands Apple"], "isController": false}, {"data": [0.6, 500, 1500, "Manu Mp3Players test19"], "isController": false}, {"data": [0.5, 500, 1500, "Manu Mp3Players test18"], "isController": false}, {"data": [0.4, 500, 1500, "Right Manu Returns"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 360, 60, 16.666666666666668, 523.077777777778, 0, 2554, 528.0, 812.1000000000006, 932.95, 1782.6299999999997, 8.148483476686284, 134.0164481595179, 1.140464965765052], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Manu Mp3Players test20", 5, 0, 0.0, 594.8, 462, 814, 498.0, 814.0, 814.0, 814.0, 1.8768768768768769, 37.689667206268766, 0.3244211007882883], "isController": false}, {"data": ["Manu Mp3Players test22", 5, 0, 0.0, 576.8, 421, 734, 600.0, 734.0, 734.0, 734.0, 1.736111111111111, 34.923977322048614, 0.3000895182291667], "isController": false}, {"data": ["Manu Mp3Players test21", 5, 0, 0.0, 605.6, 417, 728, 648.0, 728.0, 728.0, 728.0, 1.8281535648994516, 36.77552273765996, 0.31599920018281535], "isController": false}, {"data": ["Manu Mp3Players test24", 5, 0, 0.0, 628.2, 494, 683, 664.0, 683.0, 683.0, 683.0, 1.43143429716576, 28.796991304036645, 0.24742565488119095], "isController": false}, {"data": ["Footer Information Terms&Condition", 5, 0, 0.0, 672.0, 523, 1147, 556.0, 1147.0, 1147.0, 1147.0, 0.6693440428380187, 9.98303108266399, 0.12419469544846051], "isController": false}, {"data": ["Manu Mp3Players test23", 5, 0, 0.0, 633.4, 479, 849, 674.0, 849.0, 849.0, 849.0, 1.5114873035066505, 30.40539742669287, 0.2612629421100363], "isController": false}, {"data": ["Right Manu Wish List", 5, 0, 0.0, 587.4, 550, 637, 590.0, 637.0, 637.0, 637.0, 1.2632642748863063, 22.727407307983828, 0.2010860125063163], "isController": false}, {"data": ["Right Manu Order History", 5, 0, 0.0, 587.8, 551, 616, 588.0, 616.0, 616.0, 616.0, 1.25, 22.49267578125, 0.198974609375], "isController": false}, {"data": ["WishList", 5, 0, 0.0, 463.6, 406, 488, 480.0, 488.0, 488.0, 488.0, 7.22543352601156, 129.9942986813584, 1.1501422507225434], "isController": false}, {"data": ["Footer Customer services Sitemap", 5, 0, 0.0, 860.8, 623, 1073, 933.0, 1073.0, 1073.0, 1073.0, 0.5523641184268671, 11.838069280269554, 0.09116165626380911], "isController": false}, {"data": ["Right Manu Adress Book", 5, 0, 0.0, 589.4, 546, 647, 571.0, 647.0, 647.0, 647.0, 1.2732365673542145, 22.908808409727527, 0.20267339890501654], "isController": false}, {"data": ["Footer Information Delivery Information", 5, 0, 0.0, 709.2, 553, 1016, 674.0, 1016.0, 1016.0, 1016.0, 0.6279040562602034, 9.360675938716565, 0.11650563543890494], "isController": false}, {"data": ["MyAccount RegisterPage", 5, 5, 100.0, 0.2, 0, 1, 0.0, 1.0, 1.0, 1.0, 21.83406113537118, 26.034559224890828, 0.0], "isController": false}, {"data": ["Right Manu Transaction", 5, 0, 0.0, 801.8, 552, 1553, 621.0, 1553.0, 1553.0, 1553.0, 0.8404773911581779, 15.121206032526475, 0.13378692847537402], "isController": false}, {"data": ["Manu Components Scanners", 5, 0, 0.0, 459.8, 430, 485, 468.0, 485.0, 485.0, 485.0, 4.269854824935952, 77.17679200469684, 0.7380510781383433], "isController": false}, {"data": ["Manu Laptop&NotebooksMacs", 5, 0, 0.0, 582.6, 446, 908, 489.0, 908.0, 908.0, 908.0, 3.7037037037037037, 65.09910300925925, 0.6401909722222222], "isController": false}, {"data": ["Footer MyAccount Newaletter", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5779678649867067, 0.6874656831580165, 0.0], "isController": false}, {"data": ["Footer Information Privacy Policy", 5, 0, 0.0, 700.4, 546, 882, 658.0, 882.0, 882.0, 882.0, 0.5945303210463733, 8.848631651307967, 0.11031324316290131], "isController": false}, {"data": ["Extra Brands Cannon", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6044487427466151, 0.7390330331237911, 0.0], "isController": false}, {"data": ["Manu Phone&PDAs", 5, 0, 0.0, 445.4, 410, 467, 448.0, 467.0, 467.0, 467.0, 4.237288135593221, 107.6080839512712, 0.7200079449152543], "isController": false}, {"data": ["Footer Information AboutUs", 5, 0, 0.0, 722.0, 544, 941, 678.0, 941.0, 941.0, 941.0, 0.6092360180333862, 9.052271498415985, 0.11304183928353843], "isController": false}, {"data": ["Footer Extras Special", 5, 0, 0.0, 820.2, 698, 963, 853.0, 963.0, 963.0, 963.0, 0.5260942760942761, 11.391174110900675, 0.08477105034722222], "isController": false}, {"data": ["Manu DesktopPc", 5, 0, 0.0, 463.2, 396, 512, 496.0, 512.0, 512.0, 512.0, 4.916420845624385, 86.27742441002951, 0.8498110250737464], "isController": false}, {"data": ["Manu Mp3Players test4", 5, 0, 0.0, 720.4, 641, 838, 695.0, 838.0, 838.0, 838.0, 1.358695652173913, 27.327827785326086, 0.23485266644021738], "isController": false}, {"data": ["Manu Mp3Players test6", 5, 0, 0.0, 639.2, 462, 823, 628.0, 823.0, 823.0, 823.0, 1.3498920086393087, 27.15075762688985, 0.23333094289956802], "isController": false}, {"data": ["Extra Brands HTC", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6045949214026601, 0.7392117593712213, 0.0], "isController": false}, {"data": ["Manu Mp3Players test5", 5, 0, 0.0, 650.0, 504, 764, 647.0, 764.0, 764.0, 764.0, 1.3966480446927374, 28.091174930167597, 0.2414127967877095], "isController": false}, {"data": ["Manu Mp3Players test8", 5, 0, 0.0, 661.8, 617, 753, 654.0, 753.0, 753.0, 753.0, 1.3116474291710387, 26.38153364375656, 0.22672030758132214], "isController": false}, {"data": ["Right Manu Forgotten Password", 5, 0, 0.0, 588.4, 549, 646, 584.0, 646.0, 646.0, 646.0, 1.3061650992685476, 22.993097733803555, 0.21301715974399166], "isController": false}, {"data": ["Manu Mp3Players test7", 5, 0, 0.0, 654.8, 620, 718, 630.0, 718.0, 718.0, 718.0, 1.2943308309603934, 26.035009626585556, 0.2237271065234274], "isController": false}, {"data": ["Manu Mp3Players test9", 5, 0, 0.0, 668.2, 632, 710, 660.0, 710.0, 710.0, 710.0, 1.3065064018813692, 26.27813071596551, 0.2258316729814476], "isController": false}, {"data": ["Footer Extras GiftCertificate", 5, 0, 0.0, 735.8, 628, 870, 749.0, 870.0, 870.0, 870.0, 0.5470459518599562, 10.081885940919037, 0.08868127735229758], "isController": false}, {"data": ["Manu Tablets", 5, 0, 0.0, 444.6, 402, 465, 454.0, 465.0, 465.0, 465.0, 4.230118443316413, 93.32450957064299, 0.7187896573604061], "isController": false}, {"data": ["CheckOut", 5, 0, 0.0, 437.4, 388, 489, 450.0, 489.0, 489.0, 489.0, 5.973715651135007, 89.72240890083633, 0.9508941905615294], "isController": false}, {"data": ["Right Manu Download", 5, 0, 0.0, 629.8, 558, 775, 581.0, 775.0, 775.0, 775.0, 1.2416190712689348, 22.339928141296248, 0.19764053575862925], "isController": false}, {"data": ["Manu Laptop&Notebookswindows", 5, 0, 0.0, 540.2, 441, 651, 497.0, 651.0, 651.0, 651.0, 3.993610223642172, 70.22357977236422, 0.690301767172524], "isController": false}, {"data": ["Footer Extras Brands", 5, 0, 0.0, 691.4, 566, 829, 677.0, 829.0, 829.0, 829.0, 0.5587840858292356, 9.272869111812696, 0.09276688924899418], "isController": false}, {"data": ["Manu Components", 5, 0, 0.0, 492.6, 474, 511, 491.0, 511.0, 511.0, 511.0, 4.578754578754579, 84.24640138507326, 0.7780305631868131], "isController": false}, {"data": ["Manu DesktopMac", 5, 0, 0.0, 468.6, 404, 504, 500.0, 504.0, 504.0, 504.0, 4.955401387512389, 111.50620973736373, 0.8565488726461844], "isController": false}, {"data": ["Footer MyAccount Order History", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5780346820809249, 0.6875451589595375, 0.0], "isController": false}, {"data": ["Manu Components WebCameras", 5, 0, 0.0, 452.8, 438, 465, 453.0, 465.0, 465.0, 465.0, 4.184100418410042, 75.66275496861924, 0.7232282949790795], "isController": false}, {"data": ["Manu Components Monitors", 5, 0, 0.0, 472.6, 451, 488, 481.0, 488.0, 488.0, 488.0, 4.492362982929021, 113.1513926325247, 0.776511960916442], "isController": false}, {"data": ["Right Manu Login", 5, 0, 0.0, 593.2, 548, 642, 595.0, 642.0, 642.0, 642.0, 1.3213530655391121, 23.77454826242072, 0.2103325680496829], "isController": false}, {"data": ["Manu Desktop", 5, 0, 0.0, 501.6, 421, 566, 489.0, 566.0, 566.0, 566.0, 5.0, 193.7353515625, 0.849609375], "isController": false}, {"data": ["Manu Software", 5, 0, 0.0, 434.4, 402, 450, 439.0, 450.0, 450.0, 450.0, 4.269854824935952, 73.02202311058923, 0.7255417378309137], "isController": false}, {"data": [" Footer Customer services Contact Us", 5, 0, 0.0, 736.4, 598, 910, 683.0, 910.0, 910.0, 910.0, 0.5772338951743247, 9.402035290637265, 0.0952661409027938], "isController": false}, {"data": ["Extra Brands Hewlett-Packard", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6045218232378189, 0.7391223854431144, 0.0], "isController": false}, {"data": ["OpenCart HomePage", 5, 0, 0.0, 1456.4, 932, 1776, 1501.0, 1776.0, 1776.0, 1776.0, 2.7307482250136537, 70.13969483888586, 0.3173428113052977], "isController": false}, {"data": ["Right Manu Register", 5, 0, 0.0, 617.2, 588, 683, 596.0, 683.0, 683.0, 683.0, 1.3113034356150013, 28.691165502884868, 0.21257458038290059], "isController": false}, {"data": ["Manu Mp3Players test11", 5, 0, 0.0, 462.8, 453, 473, 465.0, 473.0, 473.0, 473.0, 4.25531914893617, 85.60089760638297, 0.7355385638297872], "isController": false}, {"data": ["Manu Mp3Players test12", 5, 0, 0.0, 484.2, 460, 505, 496.0, 505.0, 505.0, 505.0, 4.299226139294927, 86.48413988607051, 0.7431279557179707], "isController": false}, {"data": ["Right Manu Subscription", 5, 0, 0.0, 971.2, 550, 2514, 591.0, 2514.0, 2514.0, 2514.0, 1.3048016701461378, 23.474452391049063, 0.2076979221033403], "isController": false}, {"data": ["Manu Components Mice&Trackballs", 5, 0, 0.0, 483.0, 465, 492, 486.0, 492.0, 492.0, 492.0, 4.582951420714941, 82.97200819202567, 0.7921703139321723], "isController": false}, {"data": ["Manu Mp3Players test15", 5, 0, 0.0, 503.0, 454, 532, 522.0, 532.0, 532.0, 532.0, 4.3591979075850045, 87.69650446817785, 0.7534941695727986], "isController": false}, {"data": ["MyAccount LoginPage", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 21.929824561403507, 26.084498355263158, 0.0], "isController": false}, {"data": ["Extra Brands Sony", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6045218232378189, 0.7397127387861201, 0.0], "isController": false}, {"data": ["Footer My Account ", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.5780346820809249, 0.6875451589595375, 0.0], "isController": false}, {"data": ["Manu Components Printers", 5, 0, 0.0, 455.4, 426, 478, 463.0, 478.0, 478.0, 478.0, 4.405286343612335, 79.62382984581498, 0.7614606277533039], "isController": false}, {"data": ["Right Manu Rewards Points", 5, 0, 0.0, 1000.0, 560, 2554, 579.0, 2554.0, 2554.0, 2554.0, 1.3448090371167294, 24.19658166352878, 0.21406628227541688], "isController": false}, {"data": ["Right Manu Newsletter", 5, 0, 0.0, 764.2, 547, 1474, 575.0, 1474.0, 1474.0, 1474.0, 0.727802037845706, 13.095035025473072, 0.11585130094614264], "isController": false}, {"data": ["Footer Customer services Returns", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6266449429753103, 0.7514843652086728, 0.0], "isController": false}, {"data": ["ShoppingCart", 5, 0, 0.0, 454.2, 392, 482, 472.0, 482.0, 482.0, 482.0, 6.596306068601583, 99.07342513192611, 1.0499979386543536], "isController": false}, {"data": ["Footer Extras affliate", 5, 0, 0.0, 733.4, 591, 855, 705.0, 855.0, 855.0, 855.0, 0.5407743889249405, 9.729186100746269, 0.08608029823707548], "isController": false}, {"data": ["Manu Laptop&Notebooks", 5, 0, 0.0, 636.0, 473, 922, 558.0, 922.0, 922.0, 922.0, 3.4891835310537336, 105.13959460048848, 0.5928886078157711], "isController": false}, {"data": ["Extra Brands Palm", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6045218232378189, 0.7391223854431144, 0.0], "isController": false}, {"data": ["Manu Mp3Players test17", 5, 0, 0.0, 519.0, 505, 528, 521.0, 528.0, 528.0, 528.0, 4.355400696864112, 87.61415913545297, 0.7528378157665506], "isController": false}, {"data": ["Right Manu My Account", 5, 0, 0.0, 586.0, 547, 660, 552.0, 660.0, 660.0, 660.0, 1.294665976178146, 23.292608671025373, 0.20608452550491974], "isController": false}, {"data": ["Manu Mp3Players test16", 5, 0, 0.0, 511.2, 472, 528, 519.0, 528.0, 528.0, 528.0, 4.363001745200698, 87.76706342713788, 0.7541516688481676], "isController": false}, {"data": ["Extra Brands Apple", 5, 5, 100.0, 0.0, 0, 0, 0.0, 0.0, 0.0, 0.0, 0.6045218232378189, 0.7391223854431144, 0.0], "isController": false}, {"data": ["Manu Mp3Players test19", 5, 0, 0.0, 789.4, 451, 1363, 697.0, 1363.0, 1363.0, 1363.0, 1.918649270913277, 38.59895133825787, 0.33164152436684574], "isController": false}, {"data": ["Manu Mp3Players test18", 5, 0, 0.0, 694.6, 502, 1185, 520.0, 1185.0, 1185.0, 1185.0, 2.857142857142857, 57.474888392857146, 0.49386160714285715], "isController": false}, {"data": ["Right Manu Returns", 5, 0, 0.0, 821.6, 555, 1793, 580.0, 1793.0, 1793.0, 1793.0, 1.0098969905069684, 18.169269781357304, 0.1607550873560897], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=7", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=8", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=9", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/register&amp;language=en-gb", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=10", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 20, 33.333333333333336, 5.555555555555555], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 57: https://demo.opencart.com/index.php?route=account/returns|add&amp;language=en-gb", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=5", 5, 8.333333333333334, 1.3888888888888888], "isController": false}, {"data": ["Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=6", 5, 8.333333333333334, 1.3888888888888888], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 360, 60, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 20, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=7", 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=8", 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=9", 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/register&amp;language=en-gb", 5], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["MyAccount RegisterPage", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/register&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Footer MyAccount Newaletter", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["Extra Brands Cannon", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=9", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Extra Brands HTC", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=5", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Footer MyAccount Order History", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Extra Brands Hewlett-Packard", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=7", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["MyAccount LoginPage", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Extra Brands Sony", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=10", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["Footer My Account ", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in authority at index 8: https://${url)/index.php?route=account/login&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Footer Customer services Returns", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 57: https://demo.opencart.com/index.php?route=account/returns|add&amp;language=en-gb", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Extra Brands Palm", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=6", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Extra Brands Apple", 5, 5, "Non HTTP response code: java.net.URISyntaxException/Non HTTP response message: Illegal character in query at index 62: https://demo.opencart.com/index.php?route=product/manufacturer|info&amp;language=en-gb&amp;manufacturer_id=8", 5, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
