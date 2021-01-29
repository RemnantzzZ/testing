
import axios from 'axios'
import qs from 'qs'

import xhr from './xhr'

export function count() {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'Count',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {}
    }
  })
}

export function increased(data) {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'Increased',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {
        Values: data
      }
    }
  })
}

export function globalParam() {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'LKGlobalParam',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {}
    }
  })
}

export function wfCount(data) {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'WfCount',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {
        Values: data
      }
    }
  })
}

export function passRateOfWf(data) {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'LKPassRateOfWf',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {
        Values: data
      }
    }
  })
}

export function referenceCount(data) {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'ReferenceCount',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {
        Values: data
      }
    }
  })
}

export function supportModule() {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'LKSupportModule',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {}
    }
  })
}

export function login(data){
  return xhr({
    url: '/auth/token',
    method: 'post',
    data
  })
}

export function domainJudgment() {
  return xhr({
    url: '/api/event',
    method: 'post',
    data: {
      Application: 'LKanban',
      Behavior: 'Analyze',
      Method: 'DomainJudgment',
      SecurityContext: {
        DynamicSecurityFlag: false
      },
      PARAMETERS: {
        Values: [
          {
            Domain: 'WorkFlow',
            Behavior: 'WFMgrBehavior',
            Method: 'ViewFirstPage'
          },
          {
            Domain: 'ProjectManagement',
            Behavior: 'PMMgrBehavior',
            Method: 'LeaderKanBan'
          },
          {
            Domain: 'ProjectManagement',
            Behavior: 'PMMgrBehavior',
            Method: 'PMKanBan'
          }
        ]
      }
    }
  })
}

/**export function get(url,params={}){
  return new Promise((resolve, reject) => {
    service.get(url,{
      params:params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post(url,params){
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(params)).then(res => {
      resolve(res.data)
    }).catch(err =>{
      reject(err)
    })
  })
}
**/



