<template>
  <div class="add">
    <a-row :gutter="10" class="add-content">
      <a-col :span="16">
        <a-card>
        <div class="add-chart">
          <p>新增数</p>
          <a-tabs default-active-key="1"  @change="callback">
            <a-tab-pane key="1" tab="产品" animated=false>
              <div
                ref="myChart1"
                :style="{ width: '100%', height: '400px' }"
              >
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="零件" >
              <div
                ref="myChart2"
                :style="{ width: '100%', height: '400px' }"
              >
              </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="图纸" >
              <div
                ref="myChart3"
                :style="{ width: '100%', height: '400px' }"
              >
              </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="文档" >
              <div
                ref="myChart4"
                :style="{ width: '100%', height: '400px' }"
              >
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
        <div class="add-count">
          <p>流程数</p>
          <a-empty class="empty"></a-empty>
        </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      areaBox1: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: ["2020/12"],
          name: "日期",
          nameLocation: "middle",
          nameGap: 32,
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: "新增数目(个)",
          nameLocation: "middle",
          nameGap: 32,
          axisLine: {
            show: false, //不显示坐标轴线
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 500,
            data: [13],
          },
        ],
      },
      areaBox2: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: ["2020/12","2021/1"],
          name: "日期",
          nameLocation: "middle",
          nameGap: 32,
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: "新增数目(个)",
          nameLocation: "middle",
          nameGap: 32,
          axisLine: {
            show: false, //不显示坐标轴线
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 240,
            data: [15,2],
          },
        ],
      },
      areaBox3: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: ["2020/12"],
          name: "日期",
          nameLocation: "middle",
          nameGap: 32,
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: "新增数目(个)",
          nameLocation: "middle",
          nameGap: 32,
          axisLine: {
            show: false, //不显示坐标轴线
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 500,
            data: [51],
          },
        ],
      },
      areaBox4: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: ["2020/12"],
          name: "日期",
          nameLocation: "middle",
          nameGap: 32,
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        yAxis: {
          name: "新增数目(个)",
          nameLocation: "middle",
          nameGap: 32,
          axisLine: {
            show: false, //不显示坐标轴线
          },
          axisTick: {
            show: false, //不显示坐标轴刻度线
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 500,
            data: [63],
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(()=>{
      this.drawLine1();
    });
  },
  methods: {
    callback(key){
      if(key==1){
        this.$nextTick(()=>{this.drawLine1()})
      }else if(key==2){
        this.$nextTick(()=>{this.drawLine2()})
      }else if(key==3){
        this.$nextTick(()=>{this.drawLine3()})
      }else if(key==4){
        this.$nextTick(()=>{this.drawLine4()})
      }
    },
    drawLine1() {
      let myChart1 = this.$echarts.init(this.$refs["myChart1"]);
      myChart1.setOption(this.areaBox1);
      window.addEventListener("resize",function(){
			  myChart1.resize();
      })
    },
    drawLine2() {
      let myChart2 = this.$echarts.init(this.$refs["myChart2"]);
      myChart2.setOption(this.areaBox2);
      window.addEventListener("resize",function(){
			  myChart2.resize();
      })
    },
    drawLine3() {
      let myChart3 = this.$echarts.init(this.$refs["myChart3"]);
      myChart3.setOption(this.areaBox3);
      window.addEventListener("resize",function(){
			  myChart3.resize();
      })
    },
    drawLine4() {
      let myChart4 = this.$echarts.init(this.$refs["myChart4"]);
      myChart4.setOption(this.areaBox4);
      window.addEventListener("resize",function(){
			  myChart4.resize();
      })
    },
  },
};
</script>
<style lang="less">
.add p{
  font-size: 20px;
  font-weight: bold;
}
.add-chart {
  margin-left: 16px;
  background: #fff
}
.add-count {
  background: #fff;
  height: 502px;
  margin-right: 16px;
  margin-left: 16px;
}
.empty{
  margin-top: 120px;
}
.add{
  margin-left: 10px;
  margin-right: 10px;
}
</style>