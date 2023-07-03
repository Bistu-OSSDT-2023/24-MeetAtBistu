// pages/login/login.js
const db = wx.cloud.database();
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Img:"https://images.pexels.com/photos/3662824/pexels-photo-3662824.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        btninfo:"微信用户实名登录",
        //permission:false,
        UserProfile:{},
        list: [{
          name: 'shake',
          color: 'mauve'
        },]

    },
    toggle(e) {
        
        var anmiaton = e.currentTarget.dataset.class;
        var that = this;
        that.setData({
          animation: anmiaton
        })
        setTimeout(function() {
          that.setData({
            animation: ''
          })
        }, 1000)
      },

    handleUserProfile:function(e){
      // 用户先授权登录 获得openid  再根据id去数据库查询 若查询结果不存在则转去完善用户信息 存在则继续现在开始
      //console.log(e.detail.UserProfile.avatarUrl);
      const {UserProfile} = e.detail;
      wx.setStorageSync('UserProfile', UserProfile);
      app.globalData['userPhoto'] = e.detail.UserProfile.avatarUrl;
      app.globalData['nickName'] = e.detail.UserProfile.nickName;
      app.globalData['gender'] = e.detail.UserProfile.gender;

      
      

      wx.cloud.callFunction({
        name:'login',
        data:{}
      }).then((res)=>{
        db.collection('users').where({
          _openid : res.result.openid
        }).get().then((res)=>{
          if (res.data.length == 0) {
            wx.reLaunch({
            url: '../register/register',
            });
            return
          } else 
            {
              
              if (this.data.UserProfile.length != 0) {
                app.globalData["permission"] = true
              }

              if (app.globalData["permission"] == true) {
                app.UserProfile = Object.assign(app.UserProfile, res.data[0]);
                wx.reLaunch({
                  url: '../index/index',
                })
                return;
              }
               
               this.setData({
                Img:app.globalData['userPhoto'],
                btninfo:app.globalData['nickName'] + " 现在开始",
                //permission:true
                })
                app.globalData["permission"] = true
            }

            
            
        })
      })

        

        
        // if(this.data.permission == true) {
        //     wx.reLaunch({
        //       url: '../index/index',
        //     })
        // }
        // this.setData({
        //     Img:UserProfile.avatarUrl,
        //     btninfo:UserProfile.nickName + " 现在开始",
        //     permission:true
        // })
        // app.UserProfile['userPhoto'] = UserProfile.avatarUrl;
        // app.UserProfile['nickName'] = UserProfile.nickName;
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
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
        const UserProfile = wx.getStorageSync("UserProfile");
        var arr = Object.keys(UserProfile);
        if(arr.length == 0) return;
        this.setData({
            UserProfile
        })
        if(app.globalData['permission'] == true) {
            wx.reLaunch({
              url: '../index/index',
            })
        }
        this.setData({
            Img:UserProfile.avatarUrl,
            btninfo:UserProfile.nickName + " 现在开始"
        })
        app.globalData['permission'] = false;
        
        
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