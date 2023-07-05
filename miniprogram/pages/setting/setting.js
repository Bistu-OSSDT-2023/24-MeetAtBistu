// pages/setting/setting.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const db = wx.cloud.database();
const app = getApp();
const users = db.collection('users');
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

    /**
     * 页面的初始数据
     */
    data: {
        touch:0,
        oldnj:"",
        oldxy:"",
        oldzy:"",
        activeNames: ['1'],
        userinfo:{},  
        xh:app.userInfo['xh'],
        nj:app.userInfo['nj'],
        xy:app.userInfo['xy'],
        zy:app.userInfo['zy'],
        nl:app.userInfo['nl'],
        lxfs:app.userInfo['lxfs'],
        zwms:app.userInfo['zwms'],
        njbottom: false,
        xybottom: false,
        grades: ['2015','2016','2017','2018','2019','2020'],
        permmsion:true,
        disabled:true,
        zwmsdisable:true,
        msg:"修改信息",
        flag:1,
        xhError:"",
        lxfsError:"",
        nlError:"",
        num: 0,
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
    },
    
    modifyBtn(e) {
       var openid = app.userInfo["_openid"]
        var id = app.userInfo["_id"]
      
        
        db.collection('users').where({_openid : openid}).get({}).then(res => {
               //如果查询成功的话  
                this.setData({
                    oldnj:res.data[0].nj,
                    oldxy:res.data[0].xy,
                    oldzy:res.data[0].zy
                })
               if(this.data['msg'] == "修改信息") 
                    this.setData({
                        flag:res.data[0].num
                    })

            if (res.data[0].num == 0) {
                if(this.data['msg'] == "修改信息")
                    Toast('您目前只能修改自我描述');
                  this.setData({
                    disabled:true,
                    zwmsdisable: false,
                    msg:"保存提交",
                    touch:1
                });
                  
              } else{
                     if(this.data['msg'] == "修改信息")
                         Toast('您只有一次修改机会(自我描述不在此限制范围)');
                    this.setData({
                        disabled:false,
                        zwmsdisable: false,
                        msg:"保存提交",
                        touch:1
                    });
                    if(this.data['oldnj'] != this.data['nj']|| this.data['oldxy'] != this.data['xy'] || this.data['oldzy'] != this.data['zy'])
                        this.setData({
                            flag: 0
                        })
                    
                }
                
                  if (this.data.permmsion != false)             
                  {   

                        wx.cloud.callFunction({
                        name:'updateSetting',
                        data:{
                              collection : 'users',
                              doc : id,
                              data : {
                                  xh: this.data.xh,
                                  nj: this.data.nj,
                                  xy: this.data.xy,
                                  zy: this.data.zy,
                                  nl: this.data.nl,
                                  lxfs: this.data.lxfs,
                                  zwms: this.data.zwms,
                                  num: this.data.flag
                              }
                          }
                      }).then((res)=>{
                      
                    db.collection('users').where({
                        _id : app.userInfo["_id"]
                    }).get().then((res)=>{
                        app.userInfo = Object.assign(app.userInfo, res.data[0]);
                        if(this.data['nj'] == "" || this.data['xh'] == ""|| this.data['lxfs'] == ""|| this.data['xy'] == ""|| this.data['zy'] == ""|| this.data['nl'] == "") {
                            Toast.fail('必填不能为空');
                            return
                        }
                        else if(this.data['xhError'] != ""|| this.data['lxfsError'] != ""||this.data['nlError'] != "")
                        {
                            Toast.fail('请正确填写信息');
                            return
                        }
                            this.setData({
                                permmsion:false,
                                xh:app.users['xh'],
                                nj:app.users['nj'],
                                xy:app.users['xy'],
                                zy:app.users['zy'],
                                nl:app.users['nl'],
                                lxfs:app.users['lxfs'],
                                zwms:app.users['zwms'],
                                num:app.users['num']
                            })
                            
                            
                            Toast.success('修改信息成功!');
                           
                    });            
                })
            }
        /*    wx.reLaunch({
              url: '/pages/setting/setting',
          });*/
                this.setData({
                    permmsion:true
                });  
                

    })
},
mode2(){
  wx.reLaunch({
    url: '/pages/setting/setting',
})
},
    onCancel() {          //隐藏选择器
        this.setData({njbottom: false,xybottom: false})  
    },
    onConfirm(event) {    //点击选择器确认键   
        if(event.currentTarget.id == 'njpopup'){
            this.setData({
                njbottom: false,    
                nj: event.detail.value,
            });
        }
        else if(event.currentTarget.id == 'xypopup'){
            const { value, index } = event.detail;
            this.setData({
                xybottom:false,
                xy:value[0],
                zy:value[1],
            });
        }

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
    showBottom(event){      //显示选择器
        if(event.currentTarget.id == 'nj')
            this.setData({njbottom: true})  
        else if(event.currentTarget.id == 'xy')
            this.setData({xybottom: true})   
    },
    cancelBtn(){
        this.setData({
            disabled:true,
            zwmsdisable:true,
            permmsion:false,
            msg:"修改信息",
        })
        wx.reLaunch({
          url: '../setting/setting',
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const userinfo=wx.getStorageSync("userinfo");
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
        // this.setData({
        //     //userinfo:app.userInfo
        // });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getTabBar().init();
        const userinfo=wx.getStorageSync("userinfo");
        // this.setData({userinfo});
        
        this.setData({userinfo,
            xh:app.userInfo['xh'],
            nj:app.userInfo['nj'],
            xy:app.userInfo['xy'],
            zy:app.userInfo['zy'],
            nl:app.userInfo['nl'],
            lxfs:app.userInfo['lxfs'],
            zwms:app.userInfo['zwms'],
        });
        
    },
    onChange(event) {
        // event.detail 为当前输入的值
        if(event.currentTarget.id == 'xypopup'){
            const { picker, value, index } = event.detail;
            picker.setColumnValues(1, majors[value[0]]);          
        }
        switch(event.currentTarget.id){
            case "xh": this.setData({
                xh:event.detail
            });break;
            case 'nj': this.setData({
                nj:event.detail
            });break;
            case 'xy': this.setData({
                xy:event.detail
            });break;
            case 'zy': this.setData({
                zy:event.detail
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