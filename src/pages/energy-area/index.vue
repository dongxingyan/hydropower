<template>
  <div class="wrap">
    <div class="header">融自能耗数据</div>
    <div class="content">
      <div class="content-left">
        <div class="item-common data-day1" id="myChart1"></div>
        <div class="item-common data-day2" id="myChart2"></div>
        <!-- <div class="two">
          <span class="item-tittle">111111111</span>
        </div>-->

        <!-- <div class="item-common data-month"></div>
        <div class="item-common data-year"></div>-->
      </div>
      <div class="content-right">
        <div class="item-common2 data-day3">
          <div class="one" id="myChart3"></div>
          <div class="two" id="right">
            <div class="item-header">
              <img class="mark-icon" src="../../assets/img/mark_icon.png" />
              <div class="item-title">站点数</div>
            </div>
            <div class="item-foot">
              <p class="item-txt">2020年站点个数：123341</p>
              <p class="item-txt yellow">2019年站点个数：545456</p>
            </div>
          </div>
        </div>
        <div class="item-common data-day4" id="myChart4"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      msg: "this is energy-consumption page"
    };
  },
  mounted() {
    this.loadingrosepie("myChart2"); //执行下面的函数
    this.loadingbar("myChart1");
    this.loadingbar("myChart3");
    this.loadingbar("myChart4");
    this.loadingbar("myChart2");
  },
  methods: {
    loadingrosepie(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        title: {
          text: "订单量渠道占比",
          x: "center",
          textStyle: {
            color: "#ffffff",
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["APP", "M站", "PC端", "小程序", "CPS", "开普勒"],
          textStyle: {
            color: "#fff"
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {
                value: 10,
                name: "APP"
              },
              {
                value: 5,
                name: "M站"
              },
              {
                value: 15,
                name: "PC端"
              },
              {
                value: 25,
                name: "小程序"
              },
              {
                value: 20,
                name: "CPS"
              },
              {
                value: 35,
                name: "开普勒"
              }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: [
              {
                value: 10,
                name: "APP"
              },
              {
                value: 5,
                name: "M站"
              },
              {
                value: 15,
                name: "PC端"
              },
              {
                value: 25,
                name: "小程序"
              },
              {
                value: 20,
                name: "CPS"
              },
              {
                value: 35,
                name: "开普勒"
              }
            ]
          }
        ]
      });
      // $.get(url).done(function(data) {
      //   // 填入数据
      //   myChart.setOption({
      //     title: {
      //       text: data.text
      //     },
      //     series: [
      //       {
      //         // 根据名字对应到相应的系列
      //         data: data.data
      //       }
      //     ]
      //   });
      // });
    },
    loadingbar(id, url) {
      var myChart = this.$echarts.init(document.getElementById(id));
      myChart.setOption({
        title: {
          text: "订单供应数量柱状图",
          x: "60",
          textStyle: {
            color: "#ffffff",
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
        legend: {
          data: ["订单量", "订单量1", "平均订单量"],
          // y:275,
          textStyle: {
            color: "#fff" //legend字体颜色
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
              "海纳惠捷",
              "陆淘国际",
              "比邻特惠",
              "畅游五洲",
              "天泰国际",
              "国航旗舰店"
            ],
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              show: true,
              interval: 0,
              textStyle: {
                color: "#fff",
                fontSize: "12"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "订单量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              show: true,
              formatter: "{value} ",
              textStyle: {
                color: "#fff"
              }
            }
          },
          {
            type: "value",
            name: "平均订单量",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} ",
              textStyle: {
                color: "#fff"
              }
            }
          },
          {}
        ],
        series: [
          {
            name: "订单量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4
            ]
          },
          {
            name: "订单量1",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0
            ]
          },
          {
            name: "平均订单量",
            type: "line",
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0]
          }
        ]
      });
      // $.get(url).done(function(data) {
      //   myChart.setOption({
      //     title: {
      //       text: data.text
      //     },
      //     series: [
      //       { data: data.data },
      //       { data: data.data },
      //       { data: data.data }
      //     ]
      //   });
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  background: #0d0d0e;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    color: #8fbedc;
    font-size: 20px;
    background-color: #0d1c3b;
  }
  .content {
    display: flex;
    flex-direction: row;
    margin: 10px;
    .item-common {
      margin-bottom: 30px;
      margin-top: 15px;
      border: 1px solid #24365e;
    }
    .item-common2 {
      margin-bottom: 18px;
      margin-top: 15px;
      // border: 1px solid #24365e;
    }
    .content-left {
      margin-left: 20px;
      flex: 1;
      .data-day1 {
        height: 396px;
      }
      .data-day2 {
        height: 396px;
      }
    }
    .content-center {
      width: 800px;
      margin: 0 10px;
      .center-item {
        border: 1px solid #24365e;
      }
      .data-preview {
        height: 215px;
      }
      .data-pic {
        height: 480px;
      }
      .data-rank {
        height: 280px;
      }
    }
    .content-right {
      flex: 1;
      // flex-direction: row;
      margin-right: 15px;
      margin-left: 50px;
      .data-day3 {
        display: inline-flex;
        flex: 1;
        flex-direction: row;
        height: 396px;
        // overflow: auto;
        .one {
          flex: 1;
          margin-right: 30px;
          height: 396px;
          width: 460px;
          border: 1px solid #24365e;
          .mark-icon {
            width: 20px;
            height: 20px;
            // margin-right: 10px;
          }
        }
        .two {
          background: url("../../assets/img/building.png") center center
            no-repeat;
          display: inline-flex;
          // flex: 1;
          flex-direction: column;
          justify-content: space-between;
          background-size: 65%;
          height: 396px;
          width: 460px;
          border: 1px solid #24365e;
          padding: 25px;
          .item-header {
            display: flex;
            align-items: space-between;
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
          .item-foot {
            margin-bottom: -10px;
            // position: fixed;
            bottom: 1px;
            // align-items: space-between;
            .item-txt {
              font-size: 14px;
              font-weight: bold;
              color: #6c7db1;
              margin-bottom: 3px;
            }
            .yellow {
              color: #abc959;
            }
          }
        }
        .data-item {
          margin-bottom: 30px;
          .item-title {
            font-size: 14px;
            color: #fff;
          }
        }
      }
      .data-day4 {
        height: 396px;
        border: 1px solid #24365e;
      }
    }
  }
}
</style>
