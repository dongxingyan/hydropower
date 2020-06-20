<template>
  <div class="wrap">
    <div class="header">
      <div class="header-date">2020年6月20日 星期六</div>
      <div class="header-title">融自能耗数据</div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="item-common data-day">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">近三天能耗数据</div>
          </div>
          <div class="charts-common" id="dayChart"></div>
        </div>
        <div class="item-common data-week">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">周能耗数据</div>
          </div>
          <div class="charts-common" id="weekChart"></div>
        </div>
        <div class="item-common data-month">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">月能耗数据</div>
          </div>
          <div class="charts-common" id="monthChart"></div>
        </div>
        <div class="item-common data-year">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">年能耗数据</div>
          </div>
          <div class="charts-common" id="yearChart"></div>
        </div>
      </div>
      <div class="content-center">
        <div class="item-common data-preview">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗数据</div>
          </div>
          <div class="preview-wrap">
            <div class="preview-common preview-water">
              <span class="preview-title">总水量</span>
              <div class="preview-count">
                <div class="count-item">2</div>
                <div class="count-item">3</div>
                <div class="count-item">4</div>
                <div class="count-item">5</div>万吨
              </div>
            </div>
            <div class="preview-common preview-electric">
              <span class="preview-title">总电量</span>
              <div class="preview-count">
                <div class="count-item">2</div>
                <div class="count-item">3</div>
                <div class="count-item">4</div>
                <div class="count-item">.</div>
                <div class="count-item">5</div>万KW
              </div>
            </div>
          </div>
        </div>
        <div class="item-common data-pic">
          <div class="data-item">
            <span class="item-title">站点总数</span>
            <div class="item-content">
              <span class="item-count">2041</span>
              <span class="item-unit">个</span>
            </div>
          </div>
          <div class="data-item">
            <span class="item-title">在线</span>
            <div class="item-content">
              <span class="item-count">2041</span>
              <span class="item-unit">个</span>
            </div>
          </div>
          <div class="data-item">
            <span class="item-title">离线</span>
            <div class="item-content">
              <span class="item-count">2041</span>
              <span class="item-unit">个</span>
            </div>
          </div>
          <div class="data-item">
            <span class="item-title">故障</span>
            <div class="item-content">
              <span class="item-count">2041</span>
              <span class="item-unit">个</span>
            </div>
          </div>
        </div>
        <div class="item-common data-rank">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名</div>
          </div>
          <div class="charts-common" id="midBottom"></div>
        </div>
      </div>
      <div class="content-right">
        <div class="item-common data-complete">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">节能完成图</div>
          </div>
          <div class="charts-common" id="right1"></div>
        </div>
        <div class="item-common data-forecast">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">折线</div>
          </div>
          <div class="charts-common" id="right2"></div>
        </div>
        <div class="item-common data-water">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名（横向柱状图）</div>
          </div>
          <div class="charts-common" id="right3"></div>
        </div>
        <div class="item-common data-electric">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名（横向柱状图）</div>
          </div>
          <div class="charts-common" id="right4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {initWebSocket, sendSock, websocketonmessage} from '../../api/websocket';
import md5 from "blueimp-md5";
export default {
  name: "index",
  data() {
    return {
            msg: 'this is energy-consumption page',
            summaryData: '',
            stationSummary: '',
            threeDaysTrend: ''
        };
  },
  created() {
    initWebSocket('ws://139.196.13.211:6900', (res) => {
            res = JSON.parse(res);
            if (res.code === 0 && res.data) {
                switch (res.id) {
                case 'groupList':
                    this.summaryData = res.data;
                    break;
                case 'groupStationList':
                    this.summaryData = res.data;
                    break;
                case 'summay':
                    // 返回数据单位为吨与kw
                    this.summaryData = res.data;
                    break;
                case 'threeDaysTrend':
                    this.threeDaysTrend = res.data;
                    console.log('res.data',res.data)
                    break;
                case 'weekTrend':
                    this.summaryData = res.data;
                    break;
                case 'monthTrend':
                    this.summaryData = res.data;
                    break;
                case 'halfYearTrend':
                    this.summaryData = res.data;
                    break;
                case 'stationSummary':
                    this.stationSummary = res.data;
                    console.log('chart接口联调测试 · 语雀 v2.pdf====', this.stationSummary);
                    break;
                case 'usageRank':
                    this.summaryData = res.data;
                    break;
                case 'WatermeterUsageRank':
                    this.summaryData = res.data;
                    break;
                case 'ammeterUsageRank':
                    this.summaryData = res.data;
                    break;
                case 'wtmeterPrediction':
                    this.summaryData = res.data;
                    break;
                case 'ratioClock':
                    this.summaryData = res.data;
                    break;
                default:
                    break;
                }
            }
        });
        this.websocketsend();
        websocketonmessage((e) => {
            console.log('e======', e);
        });
  },
  mounted() {
    // this.loadingrosepie('dayChart'); // 执行下面的函数
  setTimeout(()=>{
      this.loadingbar("dayChart",true);
    this.loadingbar("weekChart");
    this.loadingbar("monthChart");
    this.loadingbar("yearChart");
    this.loadingbar("midBottom");
    this.loadingbarRow("right3");
    this.loadingbarRow("right4");
    this.loadingPie("right1");
    this.loadingZheX("right2");
  },4000)
  },
  methods: {
    websocketsend() {
            // 查询组
            sendSock({
                iname: 'groupList',
                id: 'groupList'
            });
            // 查询组所包含的站点
            sendSock({
                iname: 'groupStationList',
                id: 'groupStationList',
                gid: 4 // 必传
            });
            // 总能耗数据
            sendSock({
                iname: 'summary',
                id: 'summary',
                gid: '' // 非必传
            });
            // 近3天能耗数据
            sendSock({
                iname: 'threeDaysTrend',
                id: 'threeDaysTrend',
                gid: '' // 非必传
            });
            // 周能耗数据
            sendSock({
                iname: 'weekTrend',
                id: 'weekTrend',
                gid: '' // 非必传
            });
            // 月能耗数据
            sendSock({
                iname: 'monthTrend',
                id: 'monthTrend',
                gid: '' // 非必传
            });
            // 半年能耗数据
            sendSock({
                iname: 'halfYearTrend',
                id: 'halfYearTrend',
                gid: '' // 非必传
            });
            // 站点总览
            sendSock({
                iname: 'stationSummary',
                id: 'stationSummary',
                gid: '' // 非必传
            });
            // 能耗排名
            sendSock({
                iname: 'usageRank',
                id: 'usageRank',
                gid: '' // 非必传
            });
            // 能耗排名-用水量
            sendSock({
                iname: 'watermeterUsageRank',
                id: 'watermeterUsageRank',
                gid: '' // 非必传
            });
            // 能耗排名-用水量
            sendSock({
                iname: 'ammeterUsageRank',
                id: 'ammeterUsageRank',
                gid: '' // 非必传
            });
            // 水量预测
            sendSock({
                iname: 'wtmeterPrediction',
                id: 'wtmeterPrediction',
                gid: '' // 非必传
            });
            // 能耗值
            sendSock({
                iname: 'ratioClock',
                id: 'ratioClock',
                gid: '' // 非必传
            });
        },
    loadingbar(id, type) {
        console.log('threeDaysTrend',this.threeDaysTrend)
        let data = this.threeDaysTrend;
        let currentAmmeter =[];//用电量
        let lastAmmeter=[];
        let currentWtmeter=[];//用水量
        let lastWtmeter=[];
        let currentRatio=[];//能耗比
        let lastRatio=[];
        let currentFee=[];
        let lastFee=[];
        let time = data.time
        data.current.forEach((item,index)=>{
              currentAmmeter.push(item.ammeter);
              currentWtmeter.push(item.wtmeter)
              currentRatio.push(item.ratio)
              currentFee.push(item.fee)

        })
        data.lastYear.forEach((item,index)=>{
              lastAmmeter.push(item.ammeter)
              lastWtmeter.push(item.wtmeter)
              lastRatio.push(item.ratio)
              lastFee.push(item.fee)
        })
      // console.log('threeDaysTrend',threeDaysTrend)
      if(type){
 var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption(
        {
          title: {
            // text: '订单供应数量柱状图',    
            // x: '60',
            textStyle: {
              color: "#3496f9",
              fontWeight: "normal"
            }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              crossStyle: {
                color: "#999"
              }
            }
          },
          grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
          color: ["#2B56FB", "#FFF100", "#E50112","#E50112"],
          legend: {
            data: ["用水量", "用电量","去年同期", "能耗比(今年)","能耗比(去年)"],
            // y:275,
            textStyle: {
              color: "#6c7db1" // legend字体颜色
            }
          },
          xAxis: [
            {
               splitLine:{
　　　　       show:false,
               color:'red'
　　              },
              type: "category",
              // data: ["6月20日", "6月21日", "6月22日"],
              data: time,
              axisPointer: {
                type: "shadow"
              },
              axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                  color: "#3496f9",
                  fontSize: "12"
                }
              }
            }
          ],
          yAxis: [
            {
               splitLine:{
　　　　       show:false,
              color:'red'
　　              },
              type: "value",
              name: "用水量(t)",
              min: 0,
              // max: 250,
              interval: 50,
              color: "#3496f9",
              axisLabel: {
                show: false,
                formatter: "{value} ",
                textStyle: {
                  color: "#3496f9"
                }
              }
            },
            {
               splitLine:{
　　　　       show:false,
              color:'red'
　　              },  
              type: "value",
              name: "用电量(kw)",
              min: 0,
              // max: 25,
              interval: 5,
              axisLabel: {
                // formatter: "{value} ",
                textStyle: {
                  color: "blue"
                }
              }
            }
          ],
          series: [
            {
              name: "用水量",
              type: "bar",
              // data: [6.0, 4.9, 7.0],
              data: currentWtmeter,
              stack:'用水量堆叠'
            },
             
            {/*  */
              name: "用电量",
              type: "bar",
              // data: [5.6, 5.9, 9.0],
              data: currentAmmeter,
              stack:'用电量堆叠'
            },
              {
              // barGap: "-100%",
              name: "去年同期",
              type: "bar",
              // data: [2.0, 3.9, 6.0],
              data: lastWtmeter,
              stack:'用水量堆叠'
                  //  z:3,       
                // xAxisIndex:1,
            },
             {
              // barGap: "-100%",
              name: "去年同期",
              type: "bar",
              // data: [1.0, 2.9, 7.0],
              data: lastAmmeter,
              stack:'用电量堆叠'
            },
            {
              name: "能耗比(今年)",
              type: "line",
              yAxisIndex: 1,
              // data: [2.0, 2.2, 3.3]
              data: currentRatio
            },
            {
              // name: "用电量(kw)",
              name: "能耗比(去年)",
              type: "line",
              yAxisIndex: 1,
              // data: [4.0, 3.2, 5.3],
              data: lastRatio
            }
          ]
        },
        true
      );
      }
     
    },
    loadingbarRow(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        title: {
          textStyle: {
            color: "#3496f9",
            fontWeight: "normal"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["2011年"],
          textStyle: {
            color: "#6c7db1" // legend字体颜色
          }
        },
        yAxis: {
          type: "category",
          data: ["未命名", "未命名", "未命名", "未命名"],
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#FFF",
              fontSize: "12"
            }
          }
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#3496f9",
              fontSize: "12"
            }
          }
        },
        series: [
          {
            name: "2011年",
            type: "bar",
            data: [18203, 23489, 29034, 29034],
            itemStyle: {
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ["skyBlue", "pink", "lightgreen", "orange"];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    },
    loadingZheX(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#3496f9",
              fontSize: "12"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "#3496f9",
              fontSize: "12"
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    },
    loadingPie(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // title: {
        //   text: "XX节能",
        //   x: "center",
        //   y: "-6",
        //   textStyle: {
        //     color: "#ffffff",
        //     fontWeight: "normal",
        //     fontSize: "18"
        //   }
        // },
        legend: {
          orient: "vertical",
          x: "20",
          y: "40",
          data: ["XX节能1", "XX节能2", "XX节能3"],
          // padding: [40, 0, 0, -10],
          textStyle: {
            color: "#ffffff" //legend字体颜色
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 25,
                name: "XX节能1"
              },
              {
                value: 25,
                name: "XX节能2"
              },
              {
                value: 50,
                name: "XX节能3"
              }
            ],
            itemStyle: {
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ["skyBlue", "#3496f9", "purple"];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      });
    }
  },

  destroyed() {
    // this.socket.websocketclose();
  }
};
</script>

<style lang="less" scoped>
.wrap {
  background: #060a26;
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 65px;
    color: #8fbedc;

    background-color: #0d1c3b;
    border-bottom: 1px solid #5e8cd9;
    .header-date {
      position: absolute;
      left: 40px;
      font-size: 18px;
      color: #fff;
    }
    .header-title {
      font-size: 24px;
    }
  }
  .content {
    display: flex;
    margin: 15px 15px 0;
    .item-common {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      padding: 10px;
      border: 1px solid #5e8cd9;
      .item-header {
        display: flex;
        margin-bottom:12px;
        .mark-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
        .item-title {
          font-size: 14px;
          font-weight: bold;
          color: #6c7db1;
        }
      }
      .charts-common {
        flex: 1;
      }
    }
    .content-left {
      flex: 1;
      .data-day {
        height: 320px;
      }
      .data-week,
      .data-month,
      .data-year {
        height: 215px;
      }
    }
    .content-center {
      width: 800px;
      margin: 0 10px;
      .center-item {
        border: 1px solid #5e8cd9;
      }
      .data-preview {
        height: 200px;
        .preview-wrap {
          display: flex;
          height: 100%;
          .preview-common {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .preview-title {
              flex: 1;
              display: flex;
              align-items: center;
              font-size: 24px;
              color: #98b9ef;
            }
            .preview-count {
              display: flex;
              align-items: flex-end;
              margin-bottom: 15px;
              font-size: 22px;
              color: #98b9ef;
              .count-item {
                color: #64b1e5;
                font-size: 40px;
                width: 45px;
                height: 70px;
                margin-right: 15px;
                line-height: 70px;
                text-align: center;
                border: 1px solid #5e8cd9;
              }
            }
          }
        }
      }
      .data-pic {
        height: 460px;
        padding: 55px;
        background: url("../../assets/img/building.png") center center no-repeat;
        background-size: 60%;
        .data-item {
          margin-bottom: 35px;
          .item-title {
            font-size: 14px;
            color: #fff;
          }
          .item-content {
            display: flex;
            align-items: flex-end;
            .item-count {
              font-size: 20px;
              color: #3496f9;
            }
            .item-unit {
              font-size: 14px;
              color: #fff;
            }
          }
        }
      }
      .data-rank {
        height: 260px;
      }
    }
    .content-right {
      flex: 1;
      .data-complete {
        height: 255px;
      }
      .data-forecast {
        height: 287px;
      }
      .data-water {
        height: 213px;
      }
      .data-electric {
        height: 210px;
      }
    }
  }
}
</style>
