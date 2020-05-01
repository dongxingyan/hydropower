<template>
  <div class='wrap'>
      <div class='header'>
        融自能耗数据
      </div>
      <div class='content'>
        <div class='content-left'>
          <div class='item-common data-day'>

          </div>
          <div class='item-common data-week'></div>
          <div class='item-common data-month'></div>
          <div class='item-common data-year'></div>
        </div>
        <div class='content-center'>
          <div class='item-common data-preview'></div>
          <div class='item-common data-pic'></div>
          <div class='item-common data-rank'></div>
        </div>
        <div class='content-right'>
          <div class='item-common data-complete'></div>
          <div class='item-common data-forecast'></div>
          <div class='item-common data-water'></div>
          <div class='item-common data-electric'></div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            msg: 'this is energy-consumption page'
        };
    }
};
</script>

<style lang="less" scoped>
.wrap{
  background: #060A26;
  .header{
    display:flex;
    align-items: center;
    width: 100%;
    height: 80px;
    color: #8fbedc;
    font-size: 20px;
    background-color: #0D1C3B;
  }
  .content{
      display: flex;
      margin: 10px;
      .item-common{
          margin-bottom: 10px;
          border: 1px solid #24365e;
        }
      .content-left{
        flex: 1;
        .data-day{
          height: 320px;
        }
        .data-week,.data-month,.data-year{
          height: 215px;
        }
      }
      .content-center{
        width: 800px;
        margin: 0 10px;
        .center-item{
          border: 1px solid #24365e;
        }
        .data-preview{
          height: 215px;
        }
        .data-pic {
          height: 480px;
        }
        .data-rank {
          height: 280px;
        }
      }
      .content-right{
        flex: 1;
        .data-complete{
          height: 255px;
        }
        .data-forecast{
          height: 287px;
        }
        .data-water{
          height: 213px;
        }
        .data-electric{
          height: 210px;
        }

      }
  }
}
</style>
