<template>
  <div>
    <a-dropdown @visibleChange="handleCommand">
      
      <a-menu slot="dropdown">
        <a-menu-item 
          v-for="(item, index) in langs"
          :key="index"
          :command="item.lang"
          :disabled="lang === item.lang"
        >
          {{ item.text }}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import eventBus from '@/utils/event-bus'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'I18n',
  data() {
    return {
      langs: [
        {
          lang: 'zh-CN',
          text: '简体中文'
        },
        {
          lang: 'zh-TW',
          text: '繁體中文'
        },
        {
          lang: 'en-US',
          text: 'English'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['lang'])
  },
  methods: {
    ...mapActions('app', ['setLang']),
    handleCommand(command) {
      this.$i18n.locale = command
      this.setLang(command)
      eventBus.$emit('updateChart')
      document.title = this.$t('projectName')

      //刷新页面修改标题栏，但是代价太大
      //location.reload()
    }
  }
}
</script>

<style scoped>
.i18n {
  outline: none;
}
</style>
