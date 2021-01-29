<template>
  <div class="statistics">
    <a-card v-for="(item, i) in listb" :key="i" :item="item">
      <div class="card-content">
        <span class="state">{{ item.state }}</span>
        <div class="cardboxb">
          <a-progress v-if="'percent' in item" 
          type="circle"
          :percent="item.percent"
          :width="64"
          strokeColor="#667898"
          ></a-progress>
          <svg-icon :icon-class="item.icon" class-name="svg-icon2" v-else/>
          <div class="iconbox-content">
            <p class="sum" >
              {{ item.name }}
            </p>
            <p class="num" v-if="'count' in item">
              {{ item.count }}
            </p>
            <p class="num" v-else>
              {{ item.percent }}%
            </p>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style lang="less">
.statistics .svg-icon2{
  width: 64px !important;
  height: 64px !important;
}
.statistics .card-content {
  margin-top: -10px;
}
.statistics .ant-card {
  height: 120px;
  width: 360px;
  margin: 0 5px 0 5px;
  background: #f0f7fd;
}
.statistics .state {
  background: #67c23a;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
}
.statistics {
  margin: 10px;
  display: flex;
  justify-content: center;
  padding: 32px;
  background: #fff;
  border-width: 1px; 
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
}
.statistics .cardboxb {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.statistics .iconbox-content {
  margin-left: 16px;
}
.statistics .sum {
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}
.statistics .num {
  text-align: center;
  font-size: 20px;
  margin-top: -8px;
}
</style>

<script>
import {count, globalParam,increased,wfCount,passRateOfWf,referenceCount} from '../utils/http'
export default {
  created(){
    this.sumb()
  },
  methods:{
    
    async sumb(){
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
      //获取各项总数
      const countsb = await count()
      if (countsb) {
        this.listb.forEach(item => {
          if (item.ename in countsb) {
            item.count = countsb[item.ename]
          }
        })
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
      }
      // 4.获取流程数
      let wfs = []
      if (this.globalParam && this.globalParam.QUERY_WFTEMPLATE_NAME) {
        wfs = this.globalParam.QUERY_WFTEMPLATE_NAME.split('|')
      }
      if (wfs.length > 0 && wfs[0] !== '') {
        this.wfTemplates = await wfCount(wfs)
        Object.keys(this.wfTemplates).forEach(key => {
          if (key !== 'TotalOfOngoing') {
            const proc = {}
            proc.type = key
            proc.value = this.wfTemplates[key]
            this.donutData.push(proc)
          } else {
            //this.ringItems[1].count = this.wfTemplates[key]
          }
        })
      }
      // 5.获取流程一次通过率
      let nodes = []
      if (this.globalParam && this.globalParam.QUERY_WFTEMPLATE_NODE_NAME) {
        nodes = this.globalParam.QUERY_WFTEMPLATE_NODE_NAME.split(';')
      }
      if (nodes.length > 0 && nodes[0] !== '') {
        const result = await passRateOfWf(nodes)
        if (result && result.rate) {
          this.listb[2].percent = Math.floor(result.rate * 100)
        }
      }
      // 6.获取借用率
      const refCounts = await referenceCount(this.refClasses)
      if (refCounts.PartRefRate) {
        this.listb[3].percent = Math.floor(refCounts.PartRefRate * 100)
      }
      if (refCounts.DocRefRate) {
        this.listb[4].percent = Math.floor(refCounts.DocRefRate * 100)
      }
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
   
      this.loading = false
    }
  },
  data() {
    return {
      itemper:'',
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
      listb: [
        {
          icon: "PrdInDesginSum",
          name: "产品数",
          count: 0,
          state: "设计中",
          ename:'PrdInDesign'
        },
        {
          icon: "ProcInRunningSum",
          name: "流程数",
          count: 0,
          state: "进行中",
          ename: 'WfProcInRunning'
        },
        {
         
          name: "一次通过率",
          percent: 0,
          state: "审核流程",      
        },
        {
        
          name: "借用率",
          percent: 0,
          state: "零件",
          
        },
        {
          name: "总借用率",
          percent: 0,
          state: "图纸",       
        },
      ],
    };
  },
};
</script>