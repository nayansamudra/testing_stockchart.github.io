$(document).ready(function () {

    $("#Date").change(function () {
        $("#nifty_btn").addClass("gb_active");
        $("#bnknifty_btn").removeClass("gb_active");
        a = $("#Date").val();
        console.log(a)
        a = a.split("")
        b = [a[8],a[9],a[4],a[5],a[6],a[7],a[0],a[1],a[2],a[3]]
        b = b.toLocaleString(b)
        b = b.replaceAll(',','')
        a = b
        console.log(a)

        Highcharts.getJSON('Nifty_BankNifty.json', function (data) {

            // split the data set into ohlc and volume
            ohlc_Nifty = [],
            volume_Nifty = [],
            volume_1_Nifty = [],
            ohlc_BankNifty = [],
            volume_BankNifty = [],
            volume_1_BankNifty = [],
            dataLength = data.length,
                // set the allowed units for data grouping
                groupingUnits = [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]],

                i = 0;

            for (i; i < dataLength; i += 1) {
                if (data[i]['Date'] == a) {
                    ohlc_Nifty.push([
                        data[i]['TS_Nifty'], // the date
                        data[i]['O_Nifty'], // open
                        data[i]['H_Nifty'], // high
                        data[i]['L_Nifty'], // low
                        data[i]['C_Nifty'] // close
                    ]);

                    volume_Nifty.push([
                        data[i]['TS_Nifty'], // the date
                        data[i]['V_Nifty'] // the volume
                    ]);

                    volume_1_Nifty.push([
                        data[i]['TS_Nifty'], // the date
                        data[i]['Histo_Nifty'] // the volume
                    ]);

                    ohlc_BankNifty.push([
                        data[i]['Timestamp'], // the date
                        data[i]['Open'], // open
                        data[i]['High'], // high
                        data[i]['Low'], // low
                        data[i]['Close'] // close
                    ]);

                    volume_BankNifty.push([
                        data[i]['Timestamp'], // the date
                        data[i]['Volume'] // the volume
                    ]);

                    volume_1_BankNifty.push([
                        data[i]['Timestamp'], // the date
                        data[i]['Histogram'] // the volume
                    ]);
                }
            }


            // create the chart
            highchart = Highcharts.stockChart('chart', {
                rangeSelector: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                legend: {
                    itemStyle: {
                        color: '#000000',
                        fontWeight: 'bold'
                    }
                },
                plotOptions: {
                    candlestick: {
                        color: 'red',
                        upColor: 'green'
                    }
                },

                title: {
                    text: 'Nifty',
                    align: 'left',
                    style: {
                        "color": "White",
                        "fontSize": "20px",
                        "fontWeight": "bold",
                        "fontFamily": "Outfit"
                    }
                },
                chart: {
                    backgroundColor: '#1c1c1c',
                },

                toolbar: {
                    enabled: false
                },
                yAxis: [
                    {
                        labels:
                        {
                            formatter: function () {
                                return '';
                            }
                        },
                        height: '40%',
                        lineWidth: 0,
                        gridLineWidth: 0,
                        resize: {
                            enabled: true
                        }
                    },
                    {
                        labels: {
                            formatter: function () {
                                return '';
                            }
                        },
                        top: '45%',
                        height: '25%',
                        offset: 0,
                        lineWidth: 0,
                        gridLineWidth: 0,
                    },
                    {
                        labels: {
                            formatter: function () {
                                return '';
                            }
                        },
                        top: '75%',
                        height: '25%',
                        offset: 0,
                        lineWidth: 0,
                        gridLineWidth: 0,
                    }
                ],
                tooltip: {
                    enabled:false,
                    positioner: function () {
                        return { x: 0, y: 10 };
                    },
                    split: true,
                    formatter: function () {
                        tooltipArray = ['<b>' + moment.unix(this.x).format('h:mm a') + '</b>']
                        for (var i = 0; i < this.points.length; i++) {
                            if (i == 0) {
                                console.log(this.points[i].y)
                                for (var j = 0; j < ohlc_Nifty.length; j++) {
                                    if (this.points[i].y == ohlc_Nifty[j][4]) {
                                        i = j
                                        tooltipArray.push('Open:' + ohlc_Nifty[i][1] + '<br> High:' + ohlc_Nifty[i][2] + '<br> Low:' + ohlc_Nifty[i][3] + '<br> Close:' + ohlc_Nifty[i][4])
                                        break;
                                    }
                                }
                                i = 0
                            }
                            else if (i == 1) {
                                tooltipArray.push('Volume:' + this.points[i].y)
                            }
                        }
                        return tooltipArray;
                    }
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return moment.unix(this.value).format('h:mm a');
                        },
                    }
                },
                series: [
                    {
                        type: 'candlestick',
                        name: 'AAPL',
                        data: ohlc_Nifty,
                        dataGrouping: {
                            enabled: false,
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        color: 'rgb(66, 177, 66)',
                        negativeColor: 'rgb(255, 108, 108)',
                        data: volume_Nifty,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false,
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        color: 'rgb(66, 177, 66)',
                        negativeColor: 'rgb(255, 108, 108)',
                        data: volume_1_Nifty,
                        yAxis: 2,
                        dataGrouping: {
                            enabled: false,
                        }
                    }
                ]
            });
        });
        $('#chart_div').show();
    })

    $("#nifty_btn").click(function () {
        $("#nifty_btn").addClass("gb_active");
        $("#bnknifty_btn").removeClass("gb_active");
        highchart.update({
            title: {
                text: 'Nifty',
                align: "left",
                style: {
                    color: "White",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                },
            },
            tooltip: {
                enabled:false,
                split: true,
                formatter: function () {
                    tooltipArray = ["<b>" + moment.unix(this.x).format("h:mm a") + "</b>"];
                    for (var i = 0; i < this.points.length; i++) {
                        if (i == 0) {
                            if (i == 0) {
                                // console.log(this.points[i].y)
                                for (var j = 0; j < ohlc_Nifty.length; j++) {
                                    if (this.points[i].y == ohlc_Nifty[j][4]) {
                                        i = j;
                                        tooltipArray.push(
                                            "Open:" +
                                            ohlc_Nifty[i][1] +
                                            "<br> High:" +
                                            ohlc_Nifty[i][2] +
                                            "<br> Low:" +
                                            ohlc_Nifty[i][3] +
                                            "<br> Close:" +
                                            ohlc_Nifty[i][4]
                                        );
                                        break;
                                    }
                                }
                                i = 0;
                            }
                        } else if (i == 1) {
                            tooltipArray.push("Volume:" + this.points[i].y);
                        }
                    }
                    return tooltipArray;
                },
            },
            series: [
                {
                    type: "candlestick",
                    name: "AAPL",
                    data: ohlc_Nifty,
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "column",
                    name: "Volume",
                    data: volume_Nifty,
                    yAxis: 1,
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "column",
                    name: "Volume",
                    data: volume_1_Nifty,
                    yAxis: 2,
                    dataGrouping: {
                        enabled: false,
                    },
                },
            ],
        })
    })
    $("#bnknifty_btn").click(function () {
        $("#nifty_btn").removeClass("gb_active");
        $("#bnknifty_btn").addClass("gb_active");
        highchart.update({
            title: {
                text: 'Nifty Bank',
                align: "left",
                style: {
                    color: "White",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                },
            },
            tooltip: {
                enabled:false,
                split: true,
                formatter: function () {
                    tooltipArray = ["<b>" + moment.unix(this.x).format("h:mm a") + "</b>"];
                    for (var i = 0; i < this.points.length; i++) {
                        if (i == 0) {
                            if (i == 0) {
                                // console.log(this.points[i].y)
                                for (var j = 0; j < ohlc_BankNifty.length; j++) {
                                    if (this.points[i].y == ohlc_BankNifty[j][4]) {
                                        i = j;
                                        tooltipArray.push(
                                            "Open:" +
                                            ohlc_BankNifty[i][1] +
                                            "<br> High:" +
                                            ohlc_BankNifty[i][2] +
                                            "<br> Low:" +
                                            ohlc_BankNifty[i][3] +
                                            "<br> Close:" +
                                            ohlc_BankNifty[i][4]
                                        );
                                        break;
                                    }
                                }
                                i = 0;
                            }
                        } else if (i == 1) {
                            tooltipArray.push("Volume:" + this.points[i].y);
                        }
                    }
                    return tooltipArray;
                },
            },
            series: [
                {
                    type: "candlestick",
                    name: "AAPL",
                    data: ohlc_BankNifty,
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "column",
                    name: "volume_1",
                    data: volume_BankNifty,
                    yAxis: 1,
                    dataGrouping: {
                        enabled: false,
                    },
                },
                {
                    type: "column",
                    name: "volume_1",
                    data: volume_1_BankNifty,
                    yAxis: 2,
                    dataGrouping: {
                        enabled: false,
                    },
                },
            ],
        })
    })
})