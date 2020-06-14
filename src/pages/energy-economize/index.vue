<template>
  <div class="wrap">
    <div class="header">
      <div class="header-date">2020年3月17日 星期二</div>
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
        <div class="item-common data-month" id="monthChart">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">月能耗数据</div>
          </div>
        </div>
        <div class="item-common data-year" id="yearChart">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">年能耗数据</div>
          </div>
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
        <div class="item-common data-rank" id="midBottom">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名</div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="item-common data-complete" id>
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">节能完成图</div>
          </div>
        </div>
        <div class="item-common data-forecast">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名曲线</div>
          </div>
        </div>
        <div class="item-common data-water">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名（横向柱状图）</div>
          </div>
        </div>
        <div class="item-common data-electric">
          <div class="item-header">
            <img class="mark-icon" src="../../assets/img/mark_icon.png" />
            <div class="item-title">能耗排名（横向柱状图）</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
export default {
  name: "index",
  data() {
    return {
      msg: "this is energy-consumption page"
    };
  },
  created() {
    this.socket.initWebSocket("ws://139.196.13.211:6900", data => {
      console.log("data=====", data);
    });

    this.websocketsend();
    this.websocketonmessage();
  },
  mounted() {
    // this.loadingrosepie('dayChart'); // 执行下面的函数
    this.loadingbar("dayChart");
    this.loadingbar("weekChart");
    this.loadingbar("monthChart");
    this.loadingbar("yearChart");
    this.loadingbar("midBottom");
  },
  methods: {
    websocketsend() {
      // 数据发送
      let username = "guest";
      let password = "123456";
      let params = {
        username: username,
        password: md5(md5(password)),
        itype: 0,
        iname: "groupList"
      };
      this.socket.sendSock(JSON.stringify(params));
    },
    websocketonmessage() {
      this.socket.websocketonmessage();
    },
    loadingbar(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
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
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        color: ["blue", "yellow", "#3496f9"],
        legend: {
          data: ["订单量", "订单量1", "平均订单量"],
          // y:275,
          textStyle: {
            color: "#6c7db1" // legend字体颜色
          }
        },
        xAxis: [
          {
            type: "category",
            data: [
              "京东自营",
              "寰宇优行",
              "不夜城",
              "IGOLA",
              "云商国际",
              "海纳惠捷"
            ],
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
            type: "value",
            name: "能耗量",
            min: 0,
            // max: 250,
            interval: 50,
            axisLabel: {
              show: true,
              formatter: "{value} ",
              textStyle: {
                color: "#3496f9"
              }
            }
          },
          {
            type: "value",
            name: "周水量",
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
            name: "订单量",
            type: "bar",
            data: [2.0, 4.9, 7.0, 3.2, 5.6, 6.7]
            // itemStyle: {
            //   normal: {
            //     //这里是重点
            //     color: function(params) {
            //       //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
            //       var colorList = [
            //         "blue",
            //         "blue",
            //         "blue",
            //         "blue",
            //         "blue",
            //         "blue"
            //       ];
            //       return colorList[params.dataIndex];
            //     }
            //   }
            // }
          },
          {
            name: "订单量1",
            type: "bar",
            data: [2.6, 5.9, 9.0, 6.4, 8.7, 7]
            // itemStyle: {
            //   normal: {
            //     //这里是重点
            //     color: function(params) {
            //       //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
            //       var colorList = [
            //         "yellow",
            //         "yellow",
            //         "yellow",
            //         "yellow",
            //         "yellow",
            //         "yellow"
            //       ];
            //       return colorList[params.dataIndex];
            //     }
            //   }
            // }
          },
          {
            name: "平均订单量",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
          }
        ]
      });
    }
  },
  destroyed() {
    this.socket.websocketclose();
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
