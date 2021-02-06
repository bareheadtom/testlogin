//app.js
App({
  data:{
    code:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //wx.setStorageSync('url', "https://localhost:8080/");
        //wx.setStorageSync('url', "https://124.70.211.169:8080/");
        wx.setStorageSync('url', "https://api.jianlisenlin.com:8080/");
        
        wx.request({  
          url: wx.getStorageSync('url')+'codeKeys/' + res.code,
          //url: 'http://124.70.211.169:8080/codeKeys/' + res.code,
          
          method:"POST",
          data:{
            'code':res.code
          },
          success(res){
            console.log("hahahha")
            console.log(res) // res:{'code':'','msg':'','obj':''}
            console.log(res.data.obj)
            wx.setStorageSync('code', res.data.obj)
          }
        })
      }
    })

    var code=wx.getStorageSync('code')
    console.log("aaaaaa")
    console.log("code"+code)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    code:null
  }
})