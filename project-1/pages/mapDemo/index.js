Page({
  data: {
    count : 0,
    moveSpeed : 0.0002,
    location: {
      latitude: '',
      longitude: '',
      speed: '',
      accuracy: '' 
    },

    markers: [],

    polyline: [{
      points: [],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },

  onLoad() {
    var that = this
    this.getLocationInfo()
  },

/**
 * 获取当前位置参数
 */
  getLocationInfo() {
    var that = this

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('消息请求成功')

        that.setData({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy
          }
        })

        var positionArr = {
            latitude: res.latitude + that.data.moveSpeed * that.data.count,
            longitude: res.longitude,
        }
        /**
         * 用点连成线
         */
        var points = that.data.polyline[0].points
        points.push(positionArr)
        
        var polyline = [{
          points: points,
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }]
        that.setData({
          polyline: polyline
        })

        /**
         * 将每一次的点, 记录下来
         */
        var markers = that.data.markers
        var markersItem = {
            iconPath: "/pages/resources/location.png",
            id: that.data.count,
            latitude: res.latitude + that.data.moveSpeed * that.data.count,
            longitude: res.longitude,
            width: 30,
            height: 30
        }
        markers.push(markersItem)

        that.setData({
          markers: markers
        })

      }
    })
  },
  
  /**
   * 记录足迹, 每隔5秒, 更新位置信息
   */
  vartureMove() {
    var that = this
    locationTimer = setInterval(function () {
      that.getLocationInfo()
      var count = that.data.count + 1
      that.setData({
        count: count
      })
    }, 5000)
  },

  realyMove() {
    var that = this
    locationTimer = setInterval(function () {
      that.getLocationInfo()
      that.setData({
        count: 0
      })
    }, 5000)
  },

  stopMove(){
    wx.showToast({
      title: '停止获取位置信息',
    })
    clearInterval(locationTimer)
  },

  addPosition(){
    this.getLocationInfo()
  },
  /**
   * 点击某次标记
   */
  markertap(e) {
    console.log(e.markerId)

  }
})

var locationTimer