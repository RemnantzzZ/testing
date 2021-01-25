<template>
  <div>
    <sum-card></sum-card>
    <table-card></table-card>
    <sum-cardb></sum-cardb>
    <echarts-add></echarts-add>
  </div>
</template>
<script>
import EchartsAdd from '@/components/EchartsAdd.vue'
import SumCard from '@/components/SumCard.vue'
import SumCardb from '@/components/SumCardb.vue'
import TableCard from '@/components/TableCard.vue'
  export default{
  components: { SumCard, SumCardb, EchartsAdd, TableCard },

  }
</script>