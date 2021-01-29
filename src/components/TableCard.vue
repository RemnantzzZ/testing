<template>
    <div class="chart">
      <a-row :gutter="10">
        <a-col :span="16" >
          <a-card>
          <div class="chartBox">
            <p>新增率</p>    
            <div ref="lineChart" :style="{ width: '100%', height: '500px' }">              
          </div>
          </div> 
          </a-card>  
        </a-col>
        <a-col :span="8" >
          <a-card>
          <div class="tabBox">
           <a-tabs default-active-key="1">
              <a-tab-pane v-for="(item,index) in refName" :key="index" :tab="item.name">
                <a-table 
                :columns="columns" 
                :data-source="refCount[item.ename.toLowerCase()]" 
                :scroll="{y:380}"
                :pagination="false"
                :rowKey="(record,index)=>{return index}"
                >
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
</template>

<style lang="less">
  @size:16px;
  .chart p{
    font-size: 20px;
    font-weight: bold;
  }
  .chart{
    margin-left: 10px;
    margin-right: 10px;
  }
  .chartBox{
    background: #fff;
    margin-left: @size;
  }
  
  .tabBox{
    margin-right: @size;
    background: #fff;
    height: 550px;
    
  }
</style>

<script>
const tableData=[]
import {count, globalParam,increased,wfCount,passRateOfWf,referenceCount} from '../utils/http'
export default {
   created(){
    this.tableCard()
     
  },
  data(){
    return{
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
      refName:[
        {
          key:"1",
          ename:"Part",
          name:"零件借用率"
        },
        {
          key:"2",
          ename:"Drawing",
          name:"图纸借用率"
        }
      ],
      columns:[
        {
          title:'排名',
          dataIndex:'index',
          width:30,
          align:'center'
        },
        {
          title:'名称',
          dataIndex:'name',
          width:80,
          align:'left'
        },
        {
          title:'借用次数',
          dataIndex:'count',
          width:50,
          align:'center'
        }
      ],
      tableData,
      areaBoxa: {
        legend:{
          data:['产品','零件','图纸','文档']
        },
        color: ['#4472c5','#0aa1ed','#80FF80','#FF8096'],
        tooltip: {
          trigger:'axis'
        },
        xAxis: {
          type:'category',
          data: [],
          axisTick: {
            show: false, 
          },
        },
        yAxis: {
          type:'value',
          axisLine: {
            show: false, 
          },
          axisTick: {
            show: false, 
          },
        },
        series: [
          {
            name:'产品',
            type: "line",
            data: []
          },
          {
            name:'零件',
            type: "line",
            data: []
          },
          {
            name:'图纸',
            type: "line",
            data: []
          },
          {
            name:'文档',
            type: "line",
            data: []
          }
        ],
      }
    }
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
      //获取借用率
      const refCounts = await referenceCount(this.refClasses)
      
      Object.keys(refCounts).forEach(key => {
        if (key !== 'PartRefRate' && key !== 'DocRefRate') {
          this.$set(this.refCount, key.toLowerCase(), [])
          this.refCount[key.toLowerCase()] = []
          const refItem = refCounts[key]
          const keyLower = key.toLowerCase()
          Object.keys(refItem).forEach((item, index) => {
            const obj = {}
            obj.name = item
            obj.count = refItem[item]
            this.refCount[keyLower].push(obj)
          })
          this.refCount[keyLower].sort((a, b) => {
            return b.count - a.count
          })
          for (let i = 0; i < this.refCount[keyLower].length; i++) {
            this.refCount[keyLower][i].index = i + 1
          }
        }
      })
      this.refClasses.forEach(item => {
        if (!(item.toLowerCase() in this.refCount)) {
          this.$set(this.refCount, item.toLowerCase(), [])
        }
      })
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
        this.$nextTick(function () {
      this.drawLine();
    });
        let lineData=JSON.parse(JSON.stringify(this.lineData))
         
         this.areaBoxa.xAxis.data.push(lineData[4].date,lineData[8].date)
         this.areaBoxa.series[1].data.push(lineData[5].value,lineData[8].value)
         this.areaBoxa.series[0].data.push(lineData[4].value)
         this.areaBoxa.series[2].data.push(lineData[6].value)
         this.areaBoxa.series[3].data.push(lineData[7].value)
      }
      this.loading = false
        
    },
    drawLine() {
      
      let lineChart = this.$echarts.init(this.$refs["lineChart"]);
      lineChart.setOption(this.areaBoxa);
      window.addEventListener("resize",function(){
			  lineChart.resize();
      })
    },
  },
};
</script>

