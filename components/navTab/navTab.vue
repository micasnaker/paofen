<template>
	<view class="navTabBox">
		<!-- 标题数量小于5 -->
		<view class="shortTab" >
			<!-- 导航栏 -->
			<view class='navTab'>
				<view v-for="(item,index) in tabBars" :key="index" class='navTabItem' :class="index===tabClick?'click':''" @click='navClick(index)'>{{item.name}}</view>
			</view>
			<!-- 下划线 -->
			<view class="underlineBox" :style='"transform:translateX("+isLeft+"px);width:"+isWidth+"px"'>
				<view class="underline"></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'navTab',
		props: {
			tabBars: {
				type: Array,
				default: []
			}

		},
		data() {
			return {
				tabClick: 0, //导航栏被点击
				isLeft: 0, //导航栏下划线位置
				isWidth: 0, //每个导航栏占位
				toView: '',
				isLongWidth: 0
			};
		},
		created() {
			var that = this
			// 获取设备宽度
			uni.getSystemInfo({
				success(e) {
					that.isWidth = e.windowWidth / that.tabBars.length//宽度除以导航标题个数=一个导航所占宽度
					//that.isLongWidth = e.windowWidth / 5
				}
			})
			this.toView = 'id0'
		},
		methods: {
			// 导航栏点击
			navClick(index) {
				this.$parent.currentTab = index //设置swiper的第几页
				this.tabClick = index //设置导航点击了哪一个
				this.isLeft = index * this.isWidth //设置下划线位置
			}
		}
	}
</script>

<style lang="scss">
	.navTabBox {
		width: 100vw;
		color: #687c99;
		position: fixed;
		z-index: 1000;

		.click {
			color: #4286de;
		}

		.longTab {
			width: 100%;
			background-color: #ec706b;

			.longItem {
				width: 20%;
				height: 50upx;
				display: inline-block;
				line-height: 40upx;
				text-align: center;
			}

			.underlineBox {
				height: 3px;
				width: 20%;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;

				.underline {
					width: 84upx;
					height: 4px;
					background-color: #4286de;
				}
			}
		}

		.shortTab {
			width: 100%;

			.navTab {
				display: flex;
				width: 100%;
				height: 90upx;
				position: relative;

				.navTabItem {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					font-size: 36upx;
				}
			}

			.underlineBox {
				height: 3px;
				display: flex;
				align-content: center;
				justify-content: center;
				transition: .5s;

				.underline {
					width: 84upx;
					height: 3px;
					background-color: #4286de;
				}
			}
		}
	}
</style>
