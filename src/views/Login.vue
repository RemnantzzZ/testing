<template>
  <a-form  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
    <a-form-item label="USERNAME">
      <a-input
        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        v-model="ruleForm.username"
      />
    </a-form-item>
    <a-form-item label="PASSWORD">
      <a-input
        v-decorator="['note', { rules: [{ required: true, message: 'Please input your note!' }] }]"
        v-model="ruleForm.password"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" @click="submitForm()">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {login,domainJudgment} from '../utils/http'
import {  mapActions } from 'vuex'
export default {
  data() {
    return {
      loading:false,
      ruleForm:{
        username:'',
        password:''
      }
    };
  },
  methods: {
    ...mapActions('app', ['setUserInfo', 'setUserName', 'setDomains']),
    async submitForm() {
          this.loading = true
          const requester = {
            Domain: 'LKanban',
            UsedProp: '',
            Name: this.ruleForm.username,
            Pwd: this.ruleForm.password
          }
          try {
            const data = await login(requester)
            if (data) {
              this.setUserInfo(data)
              this.setUserName(this.ruleForm.username)
              const response = await domainJudgment()
              if (response) {
                const domains = response.Domains
                if (domains && domains.length > 0) {
                  this.setDomains(domains)
                }
                this.$router.push({
                  path: '/'
                })
              }
            } else {
              this.$refs[formName].resetFields()
            }
          } catch (error) {
            console.log(error)
          }
          this.loading = false
    
    }
  },
};
</script>