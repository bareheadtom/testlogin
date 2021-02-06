import md5 from './md5'
import { encode, decode } from './querystring'
let app = getApp();
let rest;

/**
 *  一个方法 , 用于检测 app.js的ready方法是否已经执行完成
 *  小程序启动后 , app.js的 onload方法 和onreay方法和页面的
 *  onload onready是一起执行的, 而如果在页面的onload 或者ready方法里调用一个
 *  需要登录的接口的话 , 需要app.js里的ready方法执行完才可以获取到登录凭证
 *  所以可以调用此方法来等待app.js里的ready方法执行完毕
 *  调用示例 : 
 *    //使用await的写法
 *    await  awaitAppReady();
 *    console.log('这行代码会在app.js的ready获取登录凭证结束后执行')
 *    //使用then的写法
 *    awaitAppReady.then(()=>{
 *      console.log('这行代码会在app.js的ready获取登录凭证结束后执行')
 *    })
 */
export const awaitAppReady = () => {
  return new Promise((resolve, reject) => {
    if (app.appReady) {
      resolve()
    } else {
      app.appReadyCallback = () => {
        resolve()
      }
    }
  })
}

/**
 * 定义一个类 , export 指的是es6的对外暴露模块的指令 , 
 * 具体可以通过这个链接了解
 * @link https://es6.ruanyifeng.com/#docs/module
 */
export default class REST {
  /**
   * 类的构造方法 
   * 详情可以通过 https://es6.ruanyifeng.com/#docs/class 了解
   */
  constructor() {
    this._accessKey = wx.getStorageSync('accessKey')
    this._secreKey = wx.getStorageSync('secreKey')
    this.basePath = app.globalData.appUrl
  }

  /**
   *  获取REST这个类的一个实例 这个是模仿java的单例模式
   *  具体的可以找后端了解下单例模式
   */
  static getInstance() {
    if (rest === undefined) {
      rest = new REST()
    }
    return rest;
  }

  /**
   * 不管是get方法 还是post方法都需要签名 ,所以写一个公共的方法用于请求数据 ,不然代码里面签名的逻辑得写多遍
   * @param {string}} url  接口地址
   * @param {string} method  请求的方式  GET , POST , PUT , DELETE ..
   * @param {json} query  query参数 就是地址后面的参数 比如list.php?page=1&pagesize=10 ,直接传 { page:1,pagesize:10} 即可
   * @param {json} data  post的参数
   */
  Request(url, method = "POST", query = {}, data = {}) {
    let timestamp = new Date().getTime(); //签名时需要的时间戳
    let nonce = Math.random().toString(36).slice(-8) //签名的时候需要的随机字符串
    let signParams = {} // 一个变量临时存放需要签名的参数

    /**
     *  将三个对象属性拷贝到一个对象 , 
     *  现在虽然后端同学说post的数据不需要签名 , 但是对于正常的逻辑来说
     *  post的数据应该是需要签名的才对 , 所以写了这个
     */
    signParams = Object.assign(signParams, query, (method === 'GET' ? data : {}), {
      nonce,
      timestamp,
      accessKey: this._accessKey
    })


    let tmp = {};// 一个临时变量
    let keys = Object.keys(signParams).sort();//获取要签名的对象 , 将键值排序

    /**
     *  循环排序后的键的数组 , 取出值然后塞到tmp里面去
     */
    for (let x in keys) {
      tmp[keys[x]] = signParams[keys[x]];
    }
    console.log('keys', tmp);
    signParams = tmp; //舍弃tmp
    signParams.secretKey = this._secreKey; //追加签名参数 , secretKey
    /**
     * 先用querystring的encode方法将 {a :1,b:2} 转为  a=1&b=2的形式
     * 再调用md5 获取参数的md5值
     */
    let signStr = md5(encode(signParams));
    delete signParams['secretKey'];//因为不需要将secretKey传给后端 ,所以此处删掉secretKey参数
    signParams.sign = signStr;//将签名接口放进请求参数
    console.log('signStr', signStr, signParams);
    url += `?${encode(signParams)}` //获取签名后的url参数
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data: method === 'POST' && Object.keys(data).length > 0 ? encode(data) : {},
        success: ({ statusCode, data }) => {
          if (statusCode === 200) {
            resolve(data)
          } else {
            reject(`${statusCode}:${data.error}`)
          }
          console.log('res----', data);

        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  GET(url, query) {
    this.Request(this.basePath + url, 'GET', query, {})
  }

  POST(url, data, query = {}) {
    return this.Request(this.basePath + url, 'POST', query, data)
  }

  UPLOAD(url, files) {
    wx.uploadFile({
      filePath: 'filePath',
      name: 'name',
      url: 'url',
    })
  }
}