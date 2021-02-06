// pages/index/index.js
const gen_url = require("../../utils/gen_url.js");
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  //登录请求
  testTap:function(){
    var code=wx.getStorageSync('code')
    //var code="c3b2f2de3577540d9680e17c24a339c4"
    console.log("code:"+code)
    console.log("getStorageSyc",wx.getStorageSync('url'))
    wx.request({  
      url: wx.getStorageSync('url')+'codeKeys/' + code,
      //url: 'http://124.70.211.169:8080/codeKeys/' + code,
      
      method:"GET",
      data:{
        'code':code
      },
      success(res){
        console.log(res) // res:{'code':'','msg':'','obj':''}
        console.log(res.data.obj)
        wx.setStorageSync('obj', res.data.obj)
      }
    })
  },
  //其他接口请求 测试接口
  testTap2:function(){
    var obj=wx.getStorageSync("obj")
    wx,wx.setStorageSync('secretKey', obj.secretKey)
    console.log("accesskey",obj.accessKey)
    var dataDictParam = {
      accessKey:obj.accessKey,
      nonce:1000*Math.random(),
      timestamp:Date.parse(new Date())/1000,
      objKey:"67bc6c0bbe3ecf65737c51831d936459.jpg"
      // 其它参数
    };
    var dataDict = {
      
      //url:"https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/377adab44aed2e73d0ce19648c01a18b87d6fa5.jpg",
      // course_name:"心理辅导6",
      // id:21,
      // price:600,
      // tutor_ref:3,
      // key:["特色大纲","规划内容","交流方式","服务流程","时间安排"],
      // val:["心理医生6","我们可开始内容部分6","钉钉会议6","整套服务6","预约5"]
      //school:1
      // user_ref:1,
      // award_name:"一等奖",
      // img_url:"http1"
      
      // objKey:"67bc6c0bbe3ecf65737c51831d936459.jpg",
      page:0,
      pageSize:10,
      // user_stu_ref:21,
      // user_ref:16,
      // id:3,
      // edu_from:"2015-09-25 08:39:47",
      //user_ref:1

    };
    var url_parametersParam = gen_url.gen_url(dataDictParam);
    console.log("param:"+url_parametersParam);
    var url_parameters = gen_url.gen_url(dataDict);
    console.log("post:"+url_parameters);
    wx.request({
      //url: "http://124.70.211.169:8080" + '/enterprise/queryEnterpriseByAttribute?'+url_parametersParam,
      //url: "http://124.70.211.169:8080" + '/enterprise/updateGeneralRules',
      //url: "http://124.70.211.169:8080" + '/userResume/getUserResumesBackGround',
      url: wx.getStorageSync('url') + 'course/queryTutorCourse?'+url_parametersParam,
      //url: "http://localhost:8080" + '/userResume/getUserResumes2?'+url_parametersParam,
      method: 'POST',
      data: JSON.stringify(dataDict),
      success(res){
        console.log("接口")
        console.log(res)
      }  
    })
//     wx.uploadFile({
//       url: wx.getStorageSync('url') + '/pic?'+url_parametersParam,
//       filePath: "list.jpg",
//       name: 'file',
//       header: {
//         'content-type': 'multipart/form-data'
//        },
//       formData: {
//         method:'POST',
//         accessKey:dataDictParam.accessKey,
//         nonce:dataDictParam.nonce,
//         timestamp:dataDictParam.timestamp
//       },
//     success: function (res) {
//       //问题二：wx.uploadFile返回的是[字符串]，需要自己转为JSON格式,wx.request返回的才是对象,可以直接去拿
//       var data = JSON.parse(res.data)　　
//       //console.log('上传成功'+data.headerImageUrl)
//       console.log('上传成功'+data.msg)
//       //问题一解释：wx.uploadFile拥有自己的this，这里我们需要通过外部var _this = this 把this带进来
      
//     console.log('刷新成功')
//     },
//     fail:function(err){
//     console.log(err)
//     }
// })

//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//   success: function (res) {
//         var tempPaths = res.tempFilePaths
//         console.log("tempPaths:"+tempPaths)
//         wx.uploadFile({
//                 url: wx.getStorageSync('url') + 'pic?'+url_parametersParam,
//                 filePath: tempPaths[0],
//                 name: 'file',
//                 method:'POST',
//                 header: {
//                   'content-type': 'multipart/form-data'
//                  },
//                 formData: {
                  
                  
//                 },
//         success: function (res) {
//             //问题二：wx.uploadFile返回的是[字符串]，需要自己转为JSON格式,wx.request返回的才是对象,可以直接去拿
//             console.log(res)
//             var data = JSON.parse(res.data)　　
//             //console.log('上传成功'+data.headerImageUrl)
//             console.log('res'+data)
//             console.log('res'+data.code+" "+data.msg+" "+data.obj+" "+data.costTime)
//             //问题一解释：wx.uploadFile拥有自己的this，这里我们需要通过外部var _this = this 把this带进来
            
//           console.log('刷新成功')
//   },
//   fail:function(err){
//          console.log(err)
//        }
// })
// }
// })

    // var dataDict = {
    //   accessKey:obj.accessKey,
    //   nonce:1000*Math.random(),
    //   timestamp:Date.parse(new Date())/1000,
    //   // 其它参数
    //   page:1,
    //   pageSize:10,
    // };
    // var url_parameters = gen_url.gen_url(dataDict);
    // console.log(url_parameters)
    // wx.request({
    //   url: "http://localhost:8080" + '/switchRole?'+url_parameters,
    //   method: 'POST',
    //   data: JSON.stringify(dataDict),
    //   success(res){
    //     console.log("switchRole")
    //     console.log(res)
    //   }  
    // })

  },
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})