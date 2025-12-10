<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getPushClientId({
			    success: res => {
			      console.log("res:", res);
			      console.log("res.cid的值为", res.cid);
				  uni.showToast({
				  	title:res.cid,
					icon:'none',
					duration:5000
				  })
			    },
			    fail: err => {  // 新增：打印失败信息
			      console.error("获取clientid失败：", err); 
				  uni.showToast({
				  	title:'错误',
					icon:'none',
					duration:5000
				  })
			    }
			  })
			uni.onPushMessage(res=>{
				console.log('第二个res的值为',res);
				uni.createPushMessage({
					title:'系统管理员',
					content:res.data.name
				})
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
