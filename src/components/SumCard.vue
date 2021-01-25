<template>
    <div class="title">
      <a-row :gutter="10" class="count">
        <a-col :span="4" v-for="(item,i) in list" :key=i>
          <a-card >
            <div class="cardbox">
              <div class="iconbox">
                <a-icon :type=item.icon :style="{ fontSize: '32px',color:'#346c9c'}"/>
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
export default {
  data(){
    return{
      list:[
        {
          icon:'code-sandbox',
          name:'产品总数',
          num:'7'
        },
        {
          icon:'share-alt',
          name:'总零件数',
          num:'17'
        },
        {
          icon:'radar-chart',
          name:'总物料数',
          num:'0'
        },
        {
          icon:'picture',
          name:'总图纸数',
          num:'52'
        },
        {
          icon:'file-pdf',
          name:'总工艺数',
          num:'1'
        },
        {
          icon:'file',
          name:'总文档数',
          num:'63'
        }
      ]
    }
  }
};
</script>