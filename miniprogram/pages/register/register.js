// pages/register/register.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();

const majors = {
  计算机学院: ['计算机科学与技术','大数据','网络工程','软件工程','计类实验'],
  土木工程学院: ['土木工程', '铁道工程', '道路桥梁与渡河工程', '城市地下空间','其他'],
  信息管理学院: ['信息管理与信息系统','信息安全','审计学','电子商务','大数据管理与应用'],
  机电工程学院: ['机电系统智能感知与控制','机器人技术','智能制造','智能制造',' 智能与新能源汽车技术'],
  自动化学院: ['自动化专业','电气工程及自动化专业','智能科学与技术专业','人工智能专业'],
  公共管理与传媒学院: ['行政管理专业','行政管理专业（电子政务）','传播学专业','网络与新媒体专业'],
  经济管理学院:[],
  马克思主义学院:[],
  外国语学院:[],
  理学院:[],
  国际交流学院:[],
  其他:['其他']
};
Page({
  exit:()=>{
    wx.switchTab({
      url: '/pages/setting/setting',
      success: (result) => {
        console.log("ko");
      },
    })
  },
    /**
     * 页面的初始数据
     */
    data: {
        xh:"",
        nj:"请选择年级",
        xy:"",
        zy:"",
        nl:"",
        lxfs:"",
        zwms:"",
        photo:"",
        xhError:"",
        lxfsError:"",
        nlError:"",
        popup: {
            bottom: false,
        },
        grade: {
          bottom: false,
      },
        columns: [
            {
              values: Object.keys(majors),
              className: 'column1',
            },
            {
              values: majors['信息科学与技术学院'],
              className: 'column2',
            },
          ],
          grades: ['2015','2016','2017','2018','2019','2020','2021','2022','2023'],
      },

      toggle(type, popup) {
        this.setData({
          [`popup.${type}`]: popup
        });
      },
      gtoggle(type, grade) {
        this.setData({
          [`grade.${type}`]: grade
        });
      },

      showBottom() {
        this.toggle('bottom', true);
      },
      showGradeBottom(){
        this.gtoggle('bottom', true);
      },

      onClickIcon(){
        Toast('请根据提示如实填写');
      },
      onConfirm(event) {
        if(event.currentTarget.id == 'xy'){
            const { value, index } = event.detail;
            this.setData({
                xy:value[0],
                zy:value[1],
            });
            this.toggle('bottom', false);
          }
        else if(event.currentTarget.id == 'nj'){
          const { picker, value, index } = event.detail;
            this.setData({
                nj:value
            });
            this.gtoggle('bottom', false);
          }     
        },

      onCancel() {
        this.toggle('bottom', false);
        this.gtoggle('bottom', false);
      },

      commitInfo:function(){
          for(let key in this.data){
            if(this.data[key] == "" && key != "zwms" && key!="xhError" && key!="lxfsError" && key!="nlError") {
                Toast.fail('必填不能为空');
                return
            }
            else if((key == "xh" &&  this.data['xhError'] != "")||(key == "lxfs" &&  this.data['lxfsError'] != "")||(key == "nl" &&  this.data['nlError'] != ""))
            {
                Toast.fail('请正确填写信息');
                return
            }
          }

          for(let key in this.data){
              app.userInfo[key]=this.data[key];
          }
          app.userInfo['avatarUrl']=app.globalData['userPhoto'];
          app.userInfo['nickName']=app.globalData['nickName'];

          

          db.collection('users').add({
            data:{
                nickName: app.userInfo['nickName'],
                avatarUrl: app.userInfo['avatarUrl'],
                xh: app.userInfo['xh'],
                nj: app.userInfo['nj'],
                xy: app.userInfo['xy'],
                zy: app.userInfo['zy'],
                nl: app.userInfo['nl'],
                lxfs: app.userInfo['lxfs'],
                zwms: app.userInfo['zwms'],
                num : 1
            }
          }).then((res)=>{
              db.collection('users').doc(res._id).get().then((res)=>{
                  app.userInfo = Object.assign(app.userInfo, res.data);
              });
              Toast.success('注册成功!');
              //app.globalData["permission"] = true;
              
          })
            
        },

      onDectError(e) {
        switch(e.currentTarget.id){
            case "xh":{
                if (!(/(20)\d{8}/.test(e.detail.value))) {
                  this.setData({
                    xhError : "学号格式错误,请检查"
                   });             
                } else{
                  this.setData({
                     xhError : ""
                  });  
                }
            }break;
            case "lxfs":{
                if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(e.detail.value))) {
                  this.setData({
                    lxfsError : "手机号格式错误,请检查"
                   });             
                } else{
                  this.setData({
                     lxfsError : ""
                  });  
                }
            }break;
            case "nl":{
              if (!(/^[1-9]\d?/.test(e.detail.value))) {
                this.setData({
                  nlError : "年龄格式错误,请检查"
                 });             
              } else{
                this.setData({
                   nlError : ""
                });  
              }
          }break;
        }
      },
      onChange(event) {
        // event.detail 为当前输入的值
        if(event.currentTarget.id == 'xy'){
            const { picker, value, index } = event.detail;
            picker.setColumnValues(1, majors[value[0]]);          
        }
        switch(event.currentTarget.id){           
            case "xh": this.setData({
                xh:event.detail
            }); break;
            case 'nj': this.setData({
                nj:event.detail
            });break;
            case 'nl': this.setData({
                nl:event.detail
            });break;
            case 'lxfs': this.setData({
                lxfs:event.detail
            });break;
            case 'zwms': this.setData({
                zwms:event.detail
            });break;

        }
        //console.log(event);
      },


     

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            photo: app.globalData['userPhoto']
        })
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