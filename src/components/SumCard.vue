<template>
    <div class="title">
      <a-row :gutter="10" class="count">
        <a-col :lg="4" :sm="8" :xs="12" v-for="(item,i) in list" :key=i>
          <a-card >
            <div class="cardbox">
              <div class="iconbox">
                <svg-icon :icon-class="item.icon"  class="svg-icon"/>
                <!-- <a-icon :type=item.icon :style="{ fontSize: '32px',color:'#346c9c'}"/> -->
              </div>
              <div class="iconbox-content">
                <p class="sum">
                  {{item.name}}
                </p>
                <p class="num">
                  {{item.num}}
                </p>
              </div> 
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
</template>

<style lang="less">
  .svg-icon{
    width: 32px !important;;
    height: 32px !important;
  };
  .count .ant-card {
    height: 120px;
  };
  .title{
    padding: 16px 10px 10px 10px;
  }
 
  .iconbox{
    width: 64px;
    height: 64px;
    background: #fef6ee;
    border-radius: 16px;
    text-align: center;
    padding-top: 16px;
  }
  .cardbox{
    display: flex;
    justify-content: center;
    margin-top: 14px;
  }
  .iconbox-content{
    margin-left: 16px;
  }
  .sum{
    text-align: center;
    font-size: 16px;
    color:#8a91a1;
    margin-top: 5px;
  }
  .num{
    text-align: center;
    font-size: 16px;
    margin-top: -8px;
  }
</style>

<script>
import {count} from '../utils/http'
export default {
  created(){
    this.sum()
  },
  methods:{
    async sum(){
      const counts = await count()
      if (counts) {
        this.list.forEach(item => {
          if (item.ename in counts) {
            item.num = counts[item.ename]
          }
        })
    }
  }},
  data(){
    return{
      list:[
        {
          icon:'PrdSum',
          name:'产品总数',
          num:0,
          ename:'Prd'
        },
        {
          icon:'PrtSum',
          name:'总零件数',
          num:0,
          ename:'Prt'
        },
        {
          icon:'ItemSum',
          name:'总物料数',
          num:0,
          ename:'Item'
        },
        {
          icon:'DrwSum',
          name:'总图纸数',
          num:0,
          ename:'Drw'
        },
        {
          icon:'CappSum',
          name:'总工艺数',
          num:0,
          ename:'Capp'
        },
        {
          icon:'DocSum',
          name:'总文档数',
          num:0,
          ename:'Doc'
        }
      ]
    }
  }
};
</script>