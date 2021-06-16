Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-ohlc.json', function (data) {

    // create the chart
    Highcharts.stockChart('container', {


        rangeSelector: {
            selected: 2
        },

        title: {
            text: 'AAPL Stock Price'
        },

        series: [{
            type: 'hlc',
            name: 'AAPL Stock Price',
            useOhlcdata: true,
            data: data,
            dataGrouping: {
                units: [[
                    'week', // unit name
                    [1] // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]]
            }
        }]
    });
});