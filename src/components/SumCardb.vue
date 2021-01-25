<template>
  <div class="statistics">
    <a-card v-for="(item, i) in list" :key="i">
      <div class="card-content">
        <span class="state">{{ item.state }}</span>
        <div class="cardboxb">
          <a-progress v-if="'percent' in item" 
          type="circle"
          :percent="item.percent"
          :width="64"
          strokeColor="#667898"
          ></a-progress>
          <a-icon v-else
            :type="item.icon"
            :style="{ fontSize: '64px', color: '#346c9c' }"
          />
          <div class="iconbox-content">
            <p class="sum">
              {{ item.name }}
            </p>
            <p class="num">
              {{ item.num }}
            </p>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<style lang="less">
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
export default {
  data() {
    return {
      list: [
        {
          icon: "code-sandbox",
          name: "产品数",
          num: "12",
          state: "设计中",
        },
        {
          icon: "file-sync",
          name: "流程数",
          num: "3",
          state: "进行中",
        },
        {
          icon: "radar-chart",
          name: "一次通过率",
          percent: 0,
          state: "审核流程",
          num:"0%"
        },
        {
          icon: "picture",
          name: "借用率",
          percent: 0,
          state: "零件",
          num:"0%"
        },
        {
          icon: "file-pdf",
          name: "总借用率",
          percent: 1,
          state: "图纸",
          num:"1%"
        },
      ],
    };
  },
};
</script>