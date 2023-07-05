//app.js
App({
 
    onLaunch: function() {
      wx.login({
        success: function (res) {
          // 获取code
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              // 获取到用户信息
              var userInfo = res.userInfo;
              wx.cloud.callFunction({
                name:'test',
                data:{
                  gender,
                  avatarUrl,
                  nickName
                },
                success:res=>{
                  console.log("成功")
                },
                avatarUrl:userInfo.avatarUrl,
                gender:userInfo.gender,
                nickName:userInfo.nickName
                
              })
            }
          })
          
        }
      })
      if (wx.cloud) {
        wx.cloud.init({
          traceUser: true,
          //env:'dsh1999',
        })
      }
      this.globalData = {
        "permission":false,
        target_act:-1, //表示 -1我的
        target_id:null
      },
      this.act_type = [
        '演出',
        '出游',
        '电影',
        '跑步',
        '球类',
        '游戏',
        '美食',
        '学习',
        '竞赛',
        '讲座',
        '奶茶会',
        '公益',
        '游泳',
        '购物',
        '其它',
      ],
        
      
      this.userInfo = {}
    }  
  })

 