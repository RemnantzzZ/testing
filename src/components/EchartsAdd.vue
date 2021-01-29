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
import {count, globalParam,increased,wfCount,passRateOfWf,referenceCount} from '../utils/http'

export default {
   created(){
    this.tableCard()
    
  },
  data() {
    return {
       loading: false,
      globalParam: {},
      increased: {},
      increasedClasses: [],
      refClasses: [],
      wfTemplates: {},
      refCount: {},
      lineData: [],
   
      columnsData: {},
      donutData: [],
      areaBox1: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: [],
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
            data: [],
          },
        ],
      },
      areaBox2: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: [],
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
            data: [],
          },
        ],
      },
      areaBox3: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: [],
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
            data: [],
          },
        ],
      },
      areaBox4: {
        color: ["#0aa1ed"],
        tooltip: {},
        xAxis: {
          data: [],
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
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
   
  },
  methods: {
    async tableCard(){
      //获取全局参数
      
      this.globalParam = await globalParam()
      if (this.globalParam === undefined) {
        return
      }
      if (this.globalParam && this.globalParam.QUERY_INCREASED_CLASS) {
        let queryClasses = this.globalParam.QUERY_INCREASED_CLASS.split('|')
        this.increasedClasses = queryClasses.map(item => item.toLowerCase())
        this.refClasses = this.globalParam.QUERY_REFERENCE_CLASS_NAME.split('|')
      }
      //获取增长数和增长率
       if (this.increasedClasses.length > 0 && this.increasedClasses[0] !== '') {
        this.increased = await increased(this.increasedClasses)
        

        
        this.increasedClasses.forEach(item => {
          this.$set(this.columnsData, item.toLowerCase(), [])
          this.lineData.push({
            name: `line.${item}`
          })
        })
        const keys = Object.keys(this.increased)
        
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i]
          const arr = this.increased[key]
          
          if (this.increasedClasses.includes(key.toLowerCase())) {
            arr.forEach(item => {
              this.lineData.push({
                name: `line.${key.toLowerCase()}`,
                year: item.year,
                month: item.month,
                date: `${item.year}/${item.month}`,
                //type: this.$t(`line.${key.toLowerCase()}`),
                value: item.rate
              })
              
              const obj = {}
              obj.date = `${item.year}/${item.month}`
              if (typeof item.count === 'string') {
                obj.value = Number(item.count)
              } else {
                obj.value = item.count
              }
              this.columnsData[key.toLowerCase()].push(obj)
            })
          }
        }
        
        this.lineData.sort((a, b) => {
          return a.year - b.year || a.month - b.month
        })
        this.$nextTick(()=>{
          this.drawLine1();
        });
        
        
        let columnsData = JSON.parse(JSON.stringify(this.columnsData))
        this.areaBox1.xAxis.data.push(columnsData.product[0].date)
        this.areaBox1.series[0].data.push(columnsData.product[0].value)
        this.areaBox2.xAxis.data.push(columnsData.part[0].date,columnsData.part[1].date)
        this.areaBox2.series[0].data.push(columnsData.part[0].value,columnsData.part[1].value)
        this.areaBox3.xAxis.data.push(columnsData.drawing[0].date)
        this.areaBox3.series[0].data.push(columnsData.drawing[0].value)
        this.areaBox4.xAxis.data.push(columnsData.document[0].date)
        this.areaBox4.series[0].data.push(columnsData.document[0].value)

        this.loading = false 
    }
    },
    
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