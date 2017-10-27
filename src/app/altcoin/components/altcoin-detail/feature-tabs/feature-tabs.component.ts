import { Component, OnInit, OnDestroy } from '@angular/core';

import { BroadcastService } from '../../../../services';
declare const Highcharts: any;

@Component({
  selector: 'app-feature-tabs',
  templateUrl: './feature-tabs.component.html',
  styleUrls: ['./feature-tabs.component.scss']
})
export class FeatureTabsComponent implements OnInit, OnDestroy {
  currentTabNumber: number = 1;
  subscription: any;
  chart: any;

  constructor(private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe(
      'altcoinInfo', (altcoin) => {
        let chartDataPriceUsd = [],
            chartDataMarketCap = [],
            chartDataVolumeUsd = [];
        altcoin.priceHistory.map((item, i) => {
          chartDataPriceUsd.push([Number(item.timestamp), Number(item.price_usd)]);
          chartDataMarketCap.push([Number(item.timestamp), Number(item.market_cap_by_available_supply)]);
          chartDataVolumeUsd.push([Number(item.timestamp), Number(item.volume_usd)]);
        });
        chartDataPriceUsd.sort(this.sortChartData);
        chartDataMarketCap.sort(this.sortChartData);
        chartDataVolumeUsd.sort(this.sortChartData);
        this.initCharts(chartDataPriceUsd,
                        chartDataMarketCap,
                        chartDataVolumeUsd);
      });
  }

  sortChartData(a, b) {
    if (a[0] < b[0]) return -1;
    else if (a[0] > b[0]) return 1;
    return 0;
  }

  initCharts (chartDataPriceUsd, chartDataMarketCap, chartDataVolumeUsd) {
    const groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });

    this.chart = Highcharts.stockChart('container_charts', {
      rangeSelector: {
        selected: 6,
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1d'
          },
          {
            type: 'day',
            count: 7,
            text: '7d'
          },
          {
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'month',
            count: 3,
            text: '3m'
          }, {
            type: 'year',
            count: 1,
            text: '1y'
          }, {
            type: 'ytd',
            text: 'YTD'
          }, {
            type: 'all',
            text: 'All'
          }
        ]
      },

      title: {
        text: ''
      },

      tooltip: {
        split: false,
        distance: 30,
        padding: 5,
        shared: true
      },

      legend: {
        enabled: true
      },

      yAxis: [
        {
          startOnTick: false,
          endOnTick: false,
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: 'Market Cap'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          },
          rotation: 90
        },
        {
          startOnTick: true,
          endOnTick: true,
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Price (USD)'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: '24h Vol'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }
      ],

      plotOptions: {
        series: {
          dataGrouping: {
            units: groupingUnits
          }
        },
      },

      series: [
        {
          name: 'Market Cap',
          type: 'line',
          data: chartDataMarketCap,
          color: '#7cb5ec',
          yAxis: 0,
          lineWidth: 2,
          tooltip: {
            valueSuffix: ' USD'
          }
        },
        {
          name: 'Price (USD)',
          type: 'line',
          id: 'price_usd',
          color: '#009933',
          yAxis: 1,
          lineWidth: 2,
          data: chartDataPriceUsd,
        },
        {
          type: 'column',
          name: '24h Vol',
          id: 'volume',
          color: '#777777',
          data: chartDataVolumeUsd,
          yAxis: 2,
          tooltip: {
            valueSuffix: ' USD'
          }
        },

        /*{
          type: 'sma',
          linkedTo: 'price_usd',
          zIndex: -1,
          lineWidth: 0,
          color: '#FFFFFF',
          tooltip: {
            pointFormat: '<span></span>'
          }
        }*/
      ]
    });
    this.chart.reflow();
  }

  selectTab(tabNumber) {
    this.currentTabNumber = tabNumber;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
