const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    cardCur: 0,
    userinfo:{},
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],

    
    iconList: [{
      id:0,
      icon: 'musicfill',
      color: 'red',
      badge: 120,
      name: '音乐'
    }, {
      id:1,
      icon: 'colorlens',
      color: 'orange',
      badge: 1,
      name: '美术'
    }, {
      icon: 'camerafill',
      color: 'yellow',
      badge: 0,
      name: '摄影'
    }, {
      icon: 'noticefill',
      color: 'orange',
      badge: 22,
      name: '跑步'
    }, {
      icon: 'appreciate',
      color: 'red',
      badge: 0,
      name: '球类'
    }, {
      icon: 'game',
      color: 'orange',
      badge: 0,
      name: '游戏'
    }, {
      icon: 'discoverfill',
      color: 'yellow',
      badge: 0,
      name: '美食'
    }, {
      icon: 'questionfill',
      color: 'pink',
      badge: 0,
      name: '学习'
    }, {
      icon: 'upstagefill',
      color: 'red',
      badge: 0,
      name: '竞赛'
    }, {
      icon: 'creative',
      color: 'orange',
      badge: 0,
      name: '讲座'
    }, {
      icon: 'community',
      color: 'red',
      badge: 0,
      name: '交流'
    }, {
      icon: 'discoverfill',
      color: 'pink',
      badge: 0,
      name: '公益'
    }, {
      icon: 'questionfill',
      color: 'red',
      badge: 0,
      name: '培训'
    }, {
      icon: 'clothesfill',
      color: 'orange',
      badge: 0,
      name: '美妆'
    }, {
      icon: 'brandfill',
      color: 'purple',
      badge: 0,
      name: '其他'
    }],
    gridCol:3,
    skin: false,
  },
  TapTest(e){
    console.log(e);
    if( e.currentTarget.id == 1)
      wx.redirectTo({
        url: '../activities/activities',
      })
    else console.log("111");
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.towerSwiper('swiperList');
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
    const userinfo = wx.getStorageSync("userinfo");
        var arr = Object.keys(userinfo);
        if(arr.length == 0) return;
        this.setData({
            userinfo
        })
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