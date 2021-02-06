const md5 = require("./md5.js");
function gen_url(data_dict){
	//传入对象 ,返回对象的属性数组
  var data_list = getKeySort(Object.keys(data_dict)); 
	// 输入排序过后的key=value 值数组,用  "&" 字符拼接为字符串
	var sign = "";
	for (var key in data_list) {
		sign += data_list[key]+"="+ data_dict[data_list[key]] + "&";
	}
	var url_var = sign
	// sign = sign.substring(0,sign.length - 1);
	sign = sign + "secretKey="+wx.getStorageSync('secretKey')
	sign = md5.hexMD5(sign).toLowerCase()
	url_var += "sign=" + sign
	// return {sign:sign,url_var:url_var}
	return url_var
}

module.exports = {
  gen_url:gen_url
}


 
/**
 * 传入数组
 * 按字母顺序,升序
 * 冒泡排序
 */
function getKeySort(strArr){
	var count = 0;
	var compareInt = 0;
	for (var i = 0; i < strArr.length; i++) {
		for (var j = 0; j < strArr.length - 1 - i; j++) {
			compareToIndexValue(strArr,compareInt,j);
			count ++ ;
		}	
	}
	return strArr;
}
 
/**
 *  根据首字母 排序,如果首字母相同则根据第二个字母排序...直到排出大小
 */
function compareToIndexValue(arr,int,arrIndex){
	if(arr[arrIndex].substring(int,int+1) == arr[arrIndex + 1].substring(int,int+1)) compareToIndexValue(arr,int+1,arrIndex);//如果第一位相等,则继续比较第二个字符
	else if(arr[arrIndex].substring(int,int+1).toLowerCase() > arr[arrIndex + 1].substring(int,int+1).toLowerCase()) {
		var temp = arr[arrIndex + 1];
		arr[arrIndex + 1] = arr[arrIndex];
		arr[arrIndex] = temp
	}/*else if(arr[arrIndex].substring(int,int+1) < arr[arrIndex + 1].substring(int,int+1)) return;*/
	return;
}
 
/**
 * 输入排序过后的key=value 值数组,用  "&" 字符拼接为字符串
 */
function getKeyValueSortStr(data_list,data_dict){
	var sign = "";
	for (var key in data_list) {
		sign += data_list[key] + "&";
	}
	return sign.substring(0,sign.length - 1);//移除最后一个 & 符号
}