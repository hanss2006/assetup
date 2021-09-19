import React, {Component} from 'react'
import DataService from "../api/DataService";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

class AssetGraphComponent extends Component {
    seriesData;
    seriesDataLinear;
    startDate = '2020-01-01';
    endDate = '2020-02-01';


    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            /**Apex chart**/
/*
            dataLabels: {
                enabled: true
            },
*/
            series: [],
            seriesBar: [],
            //optionsBar: this.optionsBar,
            options: this.options
        };

    }

    componentDidMount() {
        DataService.retrieveAsset(this.state.id)
            .then(response => {
                let security = response.data.ticker;
                let barOptions = this.state.optionsBar;
                if (response.data.purchaseDate) {
                    barOptions.annotations.xaxis.push(
                        {
                            x: new Date(response.data.purchaseDate).getTime(),
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                orientation: 'vertical',
                                text: 'Покупка'
                            }
                        }
                    );
                }

                DataService.retrieveAsset(this.state.id)
                    .then(response => {
                        //let engine = 'stock', market = 'shares';
                        let seurity = response.data.ticker;
                        let barOptions = this.state.optionsBar;
                        if (response.data.purchaseDate){
                            barOptions.annotations.xaxis.push(
                                {
                                    x: new Date(response.data.purchaseDate).getTime(),
                                    borderColor: '#00E396',
                                    label: {
                                        borderColor: '#00E396',
                                        orientation: 'vertical',
                                        text: 'Покупка'
                                    }
                                }
                            );
                        }

                        this.setState(
                            {
                                id: this.props.match.params.id,
                                ticker: response.data.ticker,
                                description: response.data.description,
                                price: response.data.price,
                                quantity: response.data.quantity,
                                purchaseDate: moment(response.data.purchaseDate).format('YYYY-MM-DD'),
                                currency: response.data.currency
                                //, optionsBar: barOptions
                            }
                        );
/////
                        //         "columns": [
//                            0"open",
//                            1"close",
//                            2"high",
//                            3"low",
//                            4"value",
//                            5"volume",
//                            6"begin",
//                            7"end"
//                    ],
//
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
/////

                    });

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

    optionsBar = {
        annotations: {
            xaxis: []
        },
        noData: {
            text: 'нет данных'
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
    };
    options = {
        annotations: {
            xaxis: []
        },
        noData: {
            text: 'нет данных'
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
    };
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

