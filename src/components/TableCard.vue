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
              <a-tab-pane key="1" tab="零件借用率">
                <a-table 
                :columns="columns" 
                :data-source="tableData" 
                :scroll="{y:380}"
                :pagination="false"
                >
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="2" tab="图纸借用率" force-render>
                <a-table 
                :columns="columns" 
                :data-source="tableData" 
                :scroll="{y:380}"
                :pagination="false"
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
for(let i=1; i<11; i++){
  tableData.push({
    key:i,
    rank:i,
    name:`X32泵${i}`,
    count:i
  })
}
export default {
  data(){
    return{
      columns:[
        {
          title:'排名',
          dataIndex:'rank',
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
          data: ["2020/12","2021/1"],
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
            data: [1,0.4]
          },
          {
            name:'零件',
            type: "line",
            data: [1,0.12],
          },
          {
            name:'图纸',
            type: "line",
            data: [1,0.2]
          },
          {
            name:'文档',
            type: "line",
            data: [1,0.7]
          }
        ],
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.drawLine();
    });
  },
  methods: {
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