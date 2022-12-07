$(document).ready(function () {

    $("#Date").change(function () {
        a = $("#Date").val();
        console.log(a)
        a = a.split("")
        b = [a[8],a[9],a[4],a[5],a[6],a[7],a[0],a[1],a[2],a[3]]
        b = b.toLocaleString(b)
        b = b.replaceAll(',','')
        a = b

        Highcharts.getJSON('Sample_2.json', function (data) {

            // split the data set into ohlc and volume
            ohlc = [],
            volume = [],
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
                    ohlc.push([
                        data[i]['Timestamp'], // the date
                        data[i]['Open'], // open
                        data[i]['High'], // high
                        data[i]['Low'], // low
                        data[i]['Close'] // close
                    ]);

                    volume.push([
                        data[i]['Timestamp'], // the date
                        data[i]['Volume'] // the volume
                    ]);
                }
            }


            // create the chart
            Highcharts.stockChart('chart', {
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
                    text: 'Nifty Bank',
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
                        height: '60%',
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
                        top: '65%',
                        height: '35%',
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
                                for (var j = 0; j < ohlc.length; j++) {
                                    if (this.points[i].y == ohlc[j][4]) {
                                        i = j
                                        tooltipArray.push('Open:' + ohlc[i][1] + '<br> High:' + ohlc[i][2] + '<br> Low:' + ohlc[i][3] + '<br> Close:' + ohlc[i][4])
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
                        data: ohlc,
                        dataGrouping: {
                            enabled: false,
                        }
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        color: 'rgb(66, 177, 66)',
                        negativeColor: 'rgb(255, 108, 108)',
                        data: volume,
                        yAxis: 1,
                        dataGrouping: {
                            enabled: false,
                        }
                    }
                ]
            });
        });

        $('#chart_div').show();
    })
})