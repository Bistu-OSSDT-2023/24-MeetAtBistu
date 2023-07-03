const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    cardCur: 0,
    UserProfile:{},
    toggleDelay: false,
    swiperList: [{
      id: '校训',
      type: 'image',
      url:'https://img0.baidu.com/it/u=597137486,1073746299&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=399'
      //url:'https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558__340.jpg'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: '1',
      type: 'image',
      url:'https://img1.baidu.com/it/u=2027105550,3696655084&fm=253&fmt=auto?w=475&h=356'
      //url:'https://cdn.pixabay.com/photo/2020/01/21/20/27/theater-4783908_960_720.jpg'
        //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: '2',
      type: 'image',
      url:'https://img1.baidu.com/it/u=2532522990,4039901975&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: '3',
      type: 'image',
      url:'https://img1.baidu.com/it/u=4237788929,2643213441&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=427'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: '4',
      type: 'image',
      url:'https://img1.baidu.com/it/u=4155771574,1506698019&fm=253&fmt=auto&app=120&f=JPEG?w=641&h=481'
      //url:'https://images.pexels.com/photos/2956376/pexels-photo-2956376.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
     //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: '5',
      type: 'image',
      url:'https://img0.baidu.com/it/u=1280531071,1235015118&fm=253&fmt=auto&app=138&f=JPEG?w=700&h=341'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: '6',
      type: 'image',
      url:'https://img1.baidu.com/it/u=4040199802,2791476159&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
      //url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],

    
    iconList: [{
      id:'演出',
      icon: 'musicfill',
      color: 'red',
      badge: 0,
      name: '演出'
    }, {
      id:'出游',
      icon: 'colorlens',
      color: 'orange',
      badge: 0,
      name: '出游'
    }, {
      id:'电影',
      icon: 'camerafill',
      color: 'yellow',
      badge: 0,
      name: '电影'
    }, {
      id:'跑步',
      icon: 'play_forward_fill',
      color: 'olive',
      badge: 0,
      name: '跑步'
    }, {
      id:'球类',
      icon: 'medalfill',
      color: 'green',
      badge: 0,
      name: '球类'
    }, {
      id:'游戏',
      icon: 'emojifill',
      color: 'cyan',
      badge: 0,
      name: '游戏'
    }, {
      id:'美食',
      icon: 'discoverfill',
      color: 'blue',
      badge: 0,
      name: '美食'
    }, {
      id:'学习',
      icon: 'questionfill',
      color: 'purple',
      badge: 0,
      name: '学习'
    }, {
      id:'竞赛',
      icon: 'upstagefill',
      color: 'mauve',
      badge: 0,
      name: '竞赛'
    }, {
      id:'讲座',
      icon: 'voicefill',
      color: 'pink',
      badge: 0,
      name: '讲座'
    }, {
      id:'奶茶会',
      icon: 'group_fill',
      color: 'brown',
      badge: 0,
      name: '奶茶会'
    }, {
      id:'公益',
      icon: 'discoverfill',
      color: 'red',
      badge: 0,
      name: '公益'
    }, {
      id:'游泳',
      icon: 'choicenessfill',
      color: 'orange',
      badge: 0,
      name: '游泳'
    }, {
      id:'游泳',
      icon: 'goodsfill',
      color: 'yellow',
      badge: 0,
      name: '购物'
    }, {
      id:'其它',
      icon: 'brandfill',
      color: 'purple',
      badge: 0,
      name: '其它'
    }],
    gridCol:3,
    skin: false,
  },
  findActivity(e){
    app.globalData['target_act'] = e.currentTarget.id;
    
    wx.navigateTo({
      url: '../activities/activities',
    })
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
/*
  im_findActivity(e) {
    app.globalData['target_act'] = e.currentTarget.id;
    console.log(app.globalData['target_act']);
    wx.reLaunch({
      url: '../activities/activities',
    })    
  },
*/

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.towerSwiper('swiperList');
    var tempList = this.data.iconList;
    db.collection('acti').where({}).get().then(res => {
      res.data.forEach((value1, index) => {
        this.data.iconList.forEach((value2, index) => {
          if (value1.hdlx == value2.id) {
            tempList[index].badge++;
            //break;
          }
        })
      })
      this.setData({
        iconList : tempList
      })
    })
    this.toggleDelay();
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
    
    const UserProfile = wx.getStorageSync("UserProfile");
        var arr = Object.keys(UserProfile);
        if(arr.length == 0) return;
        this.setData({
            UserProfile
        })
    
  },

  toggleDelay() {
    var that = this;
    that.setData({
      toggleDelay: true
    })
    setTimeout(function() {
      that.setData({
        toggleDelay: false
      })
    }, 1800)
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