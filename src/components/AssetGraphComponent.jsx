import React, {Component} from 'react'
import DataService from "../api/DataService";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

class AssetGraphComponent extends Component {
    seriesData;
    seriesDataLinear;
    startDate = '2020-01-01';
    endDate = '2020-05-18';

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            series: [],
            options: {
                annotations: {
                    xaxis: [
                        {
                            x: new Date('2020-01-01').getTime(),
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                orientation: 'vertical',
                                text: 'Покупка'
                            }
                        }
                    ]
                },

                noData: {
                    text: 'Загрузка...'
                },
                chart: {
                    locales: [{
                        "name": "ru",
                        "options": {
                            "months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                            "shortMonths": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                            "days": ["Воскресенье", "Понедельник", "Вторнник", "Среда", "Четверг", "Пятница", "Суббота"],
                            "shortDays": ["Вск", "Пон", "Втн", "Срд", "Чет", "Пят", "Суб"],
                            "toolbar": {
                                "exportToSVG": "Сохранить SVG",
                                "exportToPNG": "Сохранить PNG",
                                "menu": "Меню",
                                "selection": "Выбор",
                                "selectionZoom": "Выбор увеличить",
                                "zoomIn": "Приблизить",
                                "zoomOut": "Удалить",
                                "pan": "Передвинуть",
                                "reset": "Сбросить увеличение"
                            }
                        }
                    }],
                    defaultLocale: "ru",
                    type: 'candlestick',
                    height: 290,
                    id: 'candles',
                    toolbar: {
                        autoSelected: 'pan',
                        show: true
                    },
                    zoom: {
                        enabled: true
                    },
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#3C90EB',
                            downward: '#DF7D46'
                        }
                    }
                },
                xaxis: {
                    type: 'datetime'
                }
            },
            dataLabels: {
                enabled: true
            },
            seriesBar: [],
            optionsBar: {

                annotations: {
                    xaxis: [
                        {
                            x: new Date('2020-01-01').getTime(),
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                orientation: 'vertical',
                                text: 'Покупка'
                            }
                        }
                    ]
                },
                noData: {
                    text: 'Загрузка...'
                },
                chart: {
                    locales: [{
                        "name": "ru",
                        "options": {
                            "months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                            "shortMonths": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                            "days": ["Воскресенье", "Понедельник", "Вторнник", "Среда", "Четверг", "Пятница", "Суббота"],
                            "shortDays": ["Вск", "Пон", "Втн", "Срд", "Чет", "Пят", "Суб"],
                            "toolbar": {
                                "exportToSVG": "Сохранить SVG",
                                "exportToPNG": "Сохранить PNG",
                                "menu": "Меню",
                                "selection": "Выбор",
                                "selectionZoom": "Выбор увеличить",
                                "zoomIn": "Приблизить",
                                "zoomOut": "Удалить",
                                "pan": "Передвинуть",
                                "reset": "Сбросить увеличение"
                            }
                        }
                    }],
                    defaultLocale: "ru",
                    height: 160,
                    type: 'bar',
                    brush: {
                        enabled: true,
                        target: 'candles'
                    },
                    selection: {
                        enabled: false,
                        xaxis: {
                            min: new Date('2020-01-01').getTime(),
                            max: new Date('2021-05-18').getTime()
                        },
                        fill: {
                            color: '#ccc',
                            opacity: 0.4
                        },
                        stroke: {
                            color: '#0D47A1',
                        }
                    },
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    bar: {
                        columnWidth: '80%',
                        colors: {
                            ranges: [{
                                from: -1000,
                                to: 0,
                                color: '#F15B46'
                            }, {
                                from: 1,
                                to: 10000,
                                color: '#FEB019'
                            }],

                        },
                    }
                },
                stroke: {
                    width: 0
                },
                xaxis: {
                    type: 'datetime',
                    axisBorder: {
                        offsetX: 13
                    }
                },
                yaxis: {
                    labels: {
                        show: true
                    }
                }
            },


        };

    }


    componentDidMount() {
        DataService.retrieveAsset(this.state.id)
            .then(response => {
                //let engine = 'stock', market = 'shares';
                let seurity = response.data.ticker
                this.setState(
                    {
                        id: this.props.match.params.id,
                        ticker: response.data.ticker,
                        description: response.data.description,
                        price: response.data.price,
                        quantity: response.data.quantity,
                        purchaseDate: moment(response.data.purchaseDate).format('YYYY-MM-DD'),
                        currency: response.data.currency
                    }
                );
/*
*         "columns": [
            0"open",
            1"close",
            2"high",
            3"low",
            4"value",
            5"volume",
            6"begin",
            7"end"
        ],
        * */
                DataService.retrieveCandles(seurity, this.startDate, this.endDate)
                    .then(
                        answer => {
                            this.seriesData = answer.data.candles.data.map(item => {
                                const container = {};

                                container['x'] = item[7]; //item.end;
                                //[item.open, item.high, item.low, item.close];
                                container.['y'] = [item[0], item[2], item[3], item[1]];

                                return container;
                            });
                            this.seriesDataLinear = answer.data.candles.data.map(item => {
                                const container = {};

                                container['x'] = item[7]; //.end;
                                container.['y'] = item[4]; //.value;

                                return container;
                            });


                            this.setState({
                                series: [{
                                    data: this.seriesData
                                }],
                                seriesBar: [{
                                    name: 'volume',
                                    data: this.seriesDataLinear
                                }]
                            });
                        }, error => {
                            console.log(`Неизвестная ошибка: ${error}`);
                        });
/*                Micex.candles(engine, market, seurity)
                    .then(
                        answer => {
                            this.seriesData = answer.map(item => {
                                const container = {};

                                container['x'] = item.end;
                                container.['y'] = [item.open, item.high, item.low, item.close];

                                return container;
                            });
                            this.seriesDataLinear = answer.map(item => {
                                const container = {};

                                container['x'] = item.end;
                                container.['y'] = item.value;

                                return container;
                            });


                            this.setState({
                                id: this.props.match.params.id,
                                ticker: '',
                                description: '',
                                price: 0,
                                quantity: 0,
                                purchaseDate: moment(new Date()).format('YYYY-MM-YY'),
                                currency: 'RUB',

                                series: [{
                                    data: this.seriesData
                                }],
                                seriesBar: [{
                                    name: 'volume',
                                    data: this.seriesDataLinear
                                }]
                            });
                        }, error => {
                            console.log(`Неизвестная ошибка: ${error}`);
                        });*/


            });


    }

    render() {
        //let {ticker, description, price, quantity, purchaseDate, currency} = this.state;
        return (
            <div>
                <h1>График</h1>
                <div className='container'>
                    <div id="chart-candlestick">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick"
                                        height={290}/>
                    </div>
                    <div id="chart-bar11">
                        <ReactApexChart options={this.state.optionsBar} series={this.state.seriesBar} type="bar"
                                        height={160}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssetGraphComponent;


/*
Open High Low Close
* {
x: new Date(2016, 1, 1),
y: [51.98, 56.29, 51.59, 53.85]
}
*
*     {
x: new Date(2017, 11, 1),
y: 43.04
}
*
* {
* begin: "2013-10-31 17:50:00"
close: 988.9
end: "2013-10-31 17:59:59"
high: 989
low: 988.9
open: 989
value: 1977.9
volume: 2
* }
*
* */

/*
var seriesData = [{
    x: new Date(2016, 1, 1),
    y: [51.98, 56.29, 51.59, 53.85]
},
    {
        x: new Date(2016, 2, 1),
        y: [53.66, 54.99, 51.35, 52.95]
    },
    {
        x: new Date(2016, 3, 1),
        y: [52.96, 53.78, 51.54, 52.48]
    },
    {
        x: new Date(2016, 4, 1),
        y: [52.54, 52.79, 47.88, 49.24]
    },
    {
        x: new Date(2016, 5, 1),
        y: [49.10, 52.86, 47.70, 52.78]
    },
    {
        x: new Date(2016, 6, 1),
        y: [52.83, 53.48, 50.32, 52.29]
    },
    {
        x: new Date(2016, 7, 1),
        y: [52.20, 54.48, 51.64, 52.58]
    },
    {
        x: new Date(2016, 8, 1),
        y: [52.76, 57.35, 52.15, 57.03]
    },
    {
        x: new Date(2016, 9, 1),
        y: [57.04, 58.15, 48.88, 56.19]
    },
    {
        x: new Date(2016, 10, 1),
        y: [56.09, 58.85, 55.48, 58.79]
    },
    {
        x: new Date(2016, 11, 1),
        y: [58.78, 59.65, 58.23, 59.05]
    },
    {
        x: new Date(2017, 0, 1),
        y: [59.37, 61.11, 59.35, 60.34]
    },
    {
        x: new Date(2017, 1, 1),
        y: [60.40, 60.52, 56.71, 56.93]
    },
    {
        x: new Date(2017, 2, 1),
        y: [57.02, 59.71, 56.04, 56.82]
    },
    {
        x: new Date(2017, 3, 1),
        y: [56.97, 59.62, 54.77, 59.30]
    },
    {
        x: new Date(2017, 4, 1),
        y: [59.11, 62.29, 59.10, 59.85]
    },
    {
        x: new Date(2017, 5, 1),
        y: [59.97, 60.11, 55.66, 58.42]
    },
    {
        x: new Date(2017, 6, 1),
        y: [58.34, 60.93, 56.75, 57.42]
    },
    {
        x: new Date(2017, 7, 1),
        y: [57.76, 58.08, 51.18, 54.71]
    },
    {
        x: new Date(2017, 8, 1),
        y: [54.80, 61.42, 53.18, 57.35]
    },
    {
        x: new Date(2017, 9, 1),
        y: [57.56, 63.09, 57.00, 62.99]
    },
    {
        x: new Date(2017, 10, 1),
        y: [62.89, 63.42, 59.72, 61.76]
    },
    {
        x: new Date(2017, 11, 1),
        y: [61.71, 64.15, 61.29, 63.04]
    }
]

var seriesDataLinear = [{
    x: new Date(2016, 1, 1),
    y: 3.85
},
    {
        x: new Date(2016, 2, 1),
        y: 2.95
    },
    {
        x: new Date(2016, 3, 1),
        y: -12.48
    },
    {
        x: new Date(2016, 4, 1),
        y: 19.24
    },
    {
        x: new Date(2016, 5, 1),
        y: 12.78
    },
    {
        x: new Date(2016, 6, 1),
        y: 22.29
    },
    {
        x: new Date(2016, 7, 1),
        y: -12.58
    },
    {
        x: new Date(2016, 8, 1),
        y: -17.03
    },
    {
        x: new Date(2016, 9, 1),
        y: -19.19
    },
    {
        x: new Date(2016, 10, 1),
        y: -28.79
    },
    {
        x: new Date(2016, 11, 1),
        y: -39.05
    },
    {
        x: new Date(2017, 0, 1),
        y: 20.34
    },
    {
        x: new Date(2017, 1, 1),
        y: 36.93
    },
    {
        x: new Date(2017, 2, 1),
        y: 36.82
    },
    {
        x: new Date(2017, 3, 1),
        y: 29.30
    },
    {
        x: new Date(2017, 4, 1),
        y: 39.85
    },
    {
        x: new Date(2017, 5, 1),
        y: 28.42
    },
    {
        x: new Date(2017, 6, 1),
        y: 37.42
    },
    {
        x: new Date(2017, 7, 1),
        y: 24.71
    },
    {
        x: new Date(2017, 8, 1),
        y: 37.35
    },
    {
        x: new Date(2017, 9, 1),
        y: 32.99
    },
    {
        x: new Date(2017, 10, 1),
        y: 31.76
    },
    {
        x: new Date(2017, 11, 1),
        y: 43.04
    }
]
*/
