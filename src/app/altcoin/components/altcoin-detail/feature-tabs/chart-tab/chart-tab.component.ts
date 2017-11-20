import { Component, OnInit, OnDestroy } from '@angular/core';

import { BroadcastService } from '../../../../../services';
declare const Highcharts: any;

@Component({
  selector: 'app-chart-tab',
  templateUrl: './chart-tab.component.html',
  styleUrls: ['./chart-tab.component.scss']
})
export class ChartTabComponent implements OnInit, OnDestroy {
  subscription: any;
  chart: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'altcoinInfo', (altcoin) => {
        let chartDataPriceUsd = [],
          chartDataMarketCap = [],
          chartDataVolumeUsd = [],
          chartDataPriceBtc = [];
        let last: string;
        altcoin.priceHistory.map((item, i) => {
          item.mydate = new Date(Number(item.timestamp));
          chartDataPriceUsd.push([Number(item.timestamp), Number(item.price_usd)]);
          chartDataMarketCap.push([Number(item.timestamp), Number(item.market_cap_by_available_supply)]);
          chartDataVolumeUsd.push([Number(item.timestamp), Number(item.volume_usd)]);
          chartDataPriceBtc.push([Number(item.timestamp), Number(item.price_btc)]);
        });
        chartDataPriceUsd.sort(this.sortChartData);
        chartDataMarketCap.sort(this.sortChartData);
        chartDataVolumeUsd.sort(this.sortChartData);
        chartDataPriceBtc.sort(this.sortChartData);
        this.initCharts(chartDataPriceUsd,
          chartDataMarketCap,
          chartDataPriceBtc,
          chartDataVolumeUsd);
      });
  }

  sortChartData(a, b) {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return 0;
  }

  numberSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  initCharts (chartDataPriceUsd, chartDataMarketCap, chartDataPriceBtc, chartDataVolumeUsd) {
    const groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    Highcharts.setOptions({
      lang: {
        numericSymbols: ['k', 'M', 'B'],
        //thousandsSep: ','
      }
    });

    function formatLabel(labelValue) {
      // 12 Zeroes for Trillions
      return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.abs(Number(labelValue)) / 1.0e+12 + 'T'
        // 9 Zeroes for Billions
        : Math.abs(Number(labelValue)) >= 1.0e+9
          ? Math.abs(Number(labelValue)) / 1.0e+9 + 'B'
          // 6 Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6
            ? Math.abs(Number(labelValue)) / 1.0e+6 + 'M'
            // 3 Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3
              ? Math.abs(Number(labelValue)) / 1.0e+3 + 'K'

              : Math.abs(Number(labelValue));
    }

    const marketCapColor = '#7cb5ec',
      priceUsdColor = '#009933',
      priceBtcColor = '#f7931a',
      vol24Color = '#777777';

    const that = this;

    this.chart = Highcharts.stockChart('container_charts', {
      chart: {
        type: 'line',
        zoomType: 'x',
        defaultSeriesType: 'line',
        //height: is_mobile() ? 520 : 620,
        ignoreHiddenSeries: true
      },

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              zoomType: 'none'
            },
            credits: {
              enabled: false
            },
            scrollbar: {
              enabled: false
            }
          }
        }]
      },

      tooltip: {
        split: false,
        shared: true,
        hideDelay: 50,
        xDateFormat: '%A, %b %d %Y, %H:%M:%S UTC'
      },

      legend: {
        enabled: true,
        align: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: 'black',
        borderWidth: 0,
        layout: 'horizontal',
        verticalAlign: 'bottom',
        y: 0,
        shadow: false,
        floating: false
      },
      navigator: {
        adaptToUpdatedData: false
      },
      scrollbar: {
        liveRedraw: false
      },
      title: {
        text: ''
      },
      credits: {
        href: 'http://haumea.bvblogic.net:8103',
        text: 'http://haumea.bvblogic.net:8103',
      },

      rangeSelector: {
        allButtonsEnabled: true,
        buttons: [
          { type: 'day', count: 1, text: '1d' },
          { type: 'week', count: 1, text: '7d' },
          { type: 'month', count: 1, text: '1m' },
          { type: 'month', count: 3, text: '3m' },
          { type: 'year', count: 1, text: '1y' },
          { type: 'ytd', count: 1, text: 'YTD' },
          { type: 'all', text: 'ALL' }
        ],
        selected: 6,
        inputEnabled: true,
        enabled: true
      },

      xAxis: [{
        events: {
          afterSetExtremes: function(e) {
          }
        },
        minRange: 24 * 3600 * 1000
      }],

      yAxis: [
        { // Primary yAxis
          title: {
            text: 'Market Cap',
            style: { color: marketCapColor, 'font-weight': 'bold' }
          },
          labels: {
            align: 'right',
            /*formatter: function () {
              const value = '$' + formatLabel(this.value);
              return `<span style="color:${this.color}">${value}</span>`;
            },*/
            formatter: function() {
              return '$' + this.axis.defaultLabelFormatter.call(this);
            },
            style: { color: marketCapColor }
          },
          height: '60%',
          opposite: false,
          showEmpty: false,
          floor: 0,
        },
        { // Secondary yAxis
          title: {
            text: 'Price (USD)',
            style: { color: priceUsdColor, 'font-weight': 'bold' }
          },
          labels: {
            format: '${value:.2f}',
            style: { color: priceUsdColor },
            align: 'left',
            x: 15
          },
          height: '60%',
          opposite: true,
          showEmpty: false,
          floor: 0
        },
        {// Third yAxis
          title: {
            text: 'Price (BTC)',
            style: { color: priceBtcColor, 'font-weight': 'bold' }
          },
          labels: {
            format: '${value:.8f} BTC',
            style: { color: priceBtcColor },
            align: 'left',
            x: 15
          },
          height: '60%',
          opposite: true,
          showEmpty: false,
          floor: 0
        },
        { // Fourth yAxis
          title: {
            text: '24h Vol',
            style: { color: vol24Color, 'font-weight': 'bold' },
          },
          labels: {
            align: 'right',
            style: { color: vol24Color },
            formatter: function () {
              return `<span style="color:${this.color}">${formatLabel(this.value)}</span>`;
            }
          },
          top: '60%',
          height: '43%',
          offset: 2,
          lineWidth: 1,
          opposite: false
        }
      ],

      series: [{
        name: 'Market Cap',
        data: chartDataMarketCap,
        color: marketCapColor,
        yAxis: 0,
        tooltip: {
          pointFormatter: function () {
            const val = '$' + that.numberSeparator(parseFloat(this.y).toFixed(0));
            return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${val} USD</b><br/>`;
          }
        },
        dataGrouping: {
          enabled: false
        }
      }, {
        name: 'Price (USD)',
        type: 'line',
        id: 'price_usd',
        color: priceUsdColor,
        yAxis: 1,
        tooltip: {
          valueDecimals: 2,
          pointFormatter: function () {
            return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y}</b><br/>`;
          }
        },
        data: chartDataPriceUsd,
        dataGrouping: {
          enabled: false
        }
      }, {
        name: 'Price (BTC)',
        type: 'line',
        id: 'price_btc',
        color: priceBtcColor,
        yAxis: 2,
        tooltip: {
          pointFormatter: function () {
            return `<span style="color:${this.color}">\u25CF</span>
                      ${this.series.name}: <b>${parseFloat(this.y).toFixed(8)}</b><br/>`;
          }
        },
        data: chartDataPriceBtc,
        dataGrouping: {
          enabled: false
        }
      }, {
        type: 'column',
        name: '24h Vol',
        id: 'volume',
        color: vol24Color,
        data: chartDataVolumeUsd,
        yAxis: 3,
        tooltip: {
          pointFormatter: function () {
            const value = that.numberSeparator(this.y.toFixed(0));
            return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${value} USD</b><br/>`;
          }
        },
        dataGrouping: {
          approximation: 'average',
          enabled: false
        }
      }
      ],

      plotOptions: {
        series: {
          events: {
            legendItemClick: function(event) {
              console.log('legendItemClick');
            }
          }
        }
      },

    });
    //this.chart.reflow();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
