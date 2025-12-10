const userinfo = uni.getStorageSync('userinfo') || {};  // 兜底空对象
console.log("请求时的用户信息:",userinfo)
// const accountInfo = wx.getAccountInfoSync()
// var envVersion = accountInfo.miniProgram.envVersion

let BASE_URL = "http://192.168.149.44:7071"; 
// console.log('api.js文件打印当前环境：', envVersion, BASE_URL)

export const myRequest = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await uni.request({
                url: BASE_URL + options.url,
                method: options.methods || "GET",
                data: options.data || {},
                dataType: options.dataType || "json",
                timeout: 300000, //5分钟

				header: {
				  'token': userinfo.token || ''  
				}
            });
			// if(!uni.getStorageSync('token')){
			// 	uni.navigateTo({
			// 		url:'/pages/login/login'
			// 	})
			// 	uni.showToast({
			// 		title:'请先登录',
			// 		duration:1500
			// 	})
			// }
            
            // if (res.data.code == 401) {
            //     // 验证token是否有效
            //     if (uni.getStorageSync('tel')) {
            //         let tokenRes = await authTokenAndTel()
            //         if (tokenRes == "newToken") {
            //             // 重新执行校验不通过的接口
            //             if (options.url.includes("token")) {
            //                 let newToken = uni.getStorageSync("tk")
            //                 const updatedUrl = replaceTokenInUrl(options.url, newToken);
            //                 let newObj = Object.assign({}, options, {
            //                     url: updatedUrl
            //                 })
            //                 // 递归调用并返回结果
            //                 const retryResult = await myRequest(newObj);
            //                 resolve(retryResult);
            //                 return;
            //             }
            //         }
            //     } else {
            //         wxLogin()
            //         reject(res);
            //         return;
            //     }
            // }
            
            resolve(res);
        } catch (err) {
            console.log("fail:", err);
            uni.showToast({
                title: "当前网络不畅，请稍后再试！"
            });
            reject(err);
        }
    });
};
/**
 * 替换URL中的token参数值
 * @param {string} url - 原始URL
 * @param {string} newToken - 新的token值
 * @returns {string} 替换后的URL
 */
// function replaceTokenInUrl(url, newToken) {
// 	// 使用正则表达式匹配token参数
// 	// 这个正则表达式可以处理:
// 	// 1. token在参数开头(?token=)
// 	// 2. token在参数中间(&token=)
// 	// 3. token在参数末尾(&token=)
// 	const regex = /([?&])token=[^&]*/;

// 	// 替换token值
// 	if (regex.test(url)) {
// 		// 如果URL中已存在token参数，则替换它的值
// 		return url.replace(regex, `$1token=${newToken}`);
// 	} else {
// 		// 如果URL中没有token参数，则添加它
// 		const separator = url.includes('?') ? '&' : '?';
// 		return `${url}${separator}token=${newToken}`;
// 	}
// }


export const myDownload = (options) => {
	uni.showLoading({
		title: '加载中'
	});
	uni.downloadFile({
		url: BASE_URL + options.url,
		header: {
			'token': getApp().globalData.userToken
		},
		success: (data) => {
			if (data.statusCode === 200) {
				uni.saveFile({
					tempFilePath: data.tempFilePath,
					success: function(res) {
						setTimeout(() => {
							uni.hideLoading();
					
							uni.openDocument({
								showMenu: true,
								filePath: res.savedFilePath,
								success: function(res) {}
							});
						}, 3000)
					}
				});
			}
		},
		fail: (err) => {
			// console.log(err);
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				mask: true,
				title: '失败请重新下载',
			});
		},
	});

}

export function post(url = '/', data = {}) {
	return myRequest({
		url,
		data,
		methods: "post"
	});
}

export function get(url = '/', data = {}) {
	return myRequest({
		url,
		data,
		methods: "get"
	});
}

export function put(url = '/', data = {}) {
	return myRequest({
		url,
		data,
		methods: "put"
	});
}

export {
	BASE_URL,
	// STREAM_URL
}