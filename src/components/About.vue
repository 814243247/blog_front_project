<template>
  <div class="box">
    <aside class="animate__animated sidebar">
      <div class="avatar">
        <img src="https://myblog-zhou.oss-cn-beijing.aliyuncs.com/OIP%20%282%29%281%29.jpeg" title="Suenaga">
      </div>
      <nav class="nav">
        <a v-for="intro in introduceList" @click="showSection(intro.name)" :key="intro.id"><i :class="intro.icon" style="margin-right: 10px"></i> {{intro.title}}</a>
      </nav>
    </aside>
    <main>
      <section class="animate__animated animate__fadeInRight" v-if="showSectionId == '#info'" id="info" :style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }">

          <div class="wrap">
          <el-row :gutter="20" class="reset-size1">
            <el-col :sm="8" :xs="24" class="col-align-c">
              <p :style="fontStyle"><i style="margin-right: 5px"></i>ID：Suenaga</p>
                <h3 v-html="intro" :style="fontStyle" ></h3>
            </el-col>
            <el-col :sm="16" :xs="24" class="col-l-4">

            </el-col>
          </el-row>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      intro: "",
      fontStyle: {
          fontWeight: "bold",
          textShadow: "2px 2px 5px #000080"
      },
      screenWidth: document.documentElement.clientWidth,  //实时屏幕宽度,
      showSectionId: '#info',
      introduceList: []

    }
  },
  computed:{
    cardOpen(){
      return this.screenWidth >= 748;
    }
  },
  created() {
    window.addEventListener('resize', this.screenAdapter)
  },
  mounted() {
      let str = "I've seen things you people wouldn't believe.\n" +
          "Attack ships on fire off the shoulder of Orion.\n" +
          "I've watched c-beams glitter in the dark near the Tannhauser Gate.\n" +
          "All those ... moments will be lost in time, like tears...in rain.Time to die.........　";
      let idx = 0;
      let that = this
      let timer = setTimeout( function fn() {
          // console.log(this.intro)
          that.intro = that.intro+ str.substring(idx,idx+1)
          idx++
          if (idx>str.length){
              that.intro = ''
              idx = 0
          }
          setTimeout(fn,100)
      },2000)

      this.screenWidth =  document.documentElement.clientWidth
  },
    methods: {
    showSection(name) {
      this.showSectionId = name
    },
    // 屏幕尺寸变化的监听函数
    screenAdapter(){
      this.screenWidth = document.documentElement.clientWidth;
    }
  }
}
</script>

<style scoped lang="less">
  body {
    height: 100vh;
    overflow: hidden;
  }

  .box {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    width: 250px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background: rgba(75, 75, 75, 0.9);

    nav {
      margin: 0;
      display: flex;
      list-style: none;
      flex-direction: column;

      a {
        font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
        list-style: none;
        box-sizing: border-box;
        text-decoration: none;
        color: #fff;
        padding: 1em;
        display: block;
        text-align: center;
        transition: background .3s, box-shadow .3s;
      }

      a:hover {
        background: rgba(60, 60, 60, 1);
      }
    }

    .avatar {
      width: 140px;
      height: 140px;
      margin: 1em auto;
      margin-top: 5em;
      background: #fff;
      border-radius: 100%;
      border: #fff 5px solid;
      transition: transform 0.5s;

      img {
        width: 100%;
        border-radius: 50%;
        /*transition: .6s;*/
      }

      img:hover {
        transform: rotate(360deg);
        transition: all 1.5s;
      }
    }
  }

  main {
    color: #353535;
    font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
    box-sizing: border-box;
    margin-left: 250px;

    section {
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      background-color: rgba(255, 255, 255, 0.8);
      border: 3px dashed rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      padding: 20px;
      .title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i{
          font-size: larger;
          margin-right: 10px;
        }
      }
      a{
        text-decoration: none;
      }
    }

    section:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-right: 20px solid rgba(0, 0, 0, 0.3);
      border-top: 20px solid transparent;
      border-bottom: 20px solid transparent;
      top: 50%;
      transform: translateY(-50%);
      left: -20px;
    }

    #info {
      .warp {
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    #skills {
      .center-fixed {
        text-align: center;
        display: flex;
        flex-direction: column;

        .skills-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          background: #fff;
          border-radius: 100%;
          box-shadow: 0 5px rgba(0, 0, 0, 0.3);

          i {
            font-size: 50px;
            line-height: 100px;
            transition: all 1s;
          }

          .fa-html5 {
            content: "\f13b";
          }
        }

        .skills-icon:hover {
          i {
            transform: rotate(180deg);
            transition: all 1s;
          }
        }

      }

    }
    #works{
      .el-card /deep/ .el-card__body{
        padding: 0;
      }

      .works-item{
        margin-bottom: 20px;
        position: relative;
        .works-item-front,.works-item-back{
          background-color: white;
          text-align: center;
          border-radius: 5px;
          box-shadow: 0 0 5px 0 #ccc;
          border: 1px solid #5d5d5d;
          transition: all 1s;
          backface-visibility: hidden;
          width: 100%;
          height: 100%;
        }
        .works-item-front{
          .el-image{
            max-width: 100%;
            max-height: 180px;
            border-radius: 5px 5px 0 0;
          }
          p{
            margin-top: 2px;
            margin-bottom: 2px;
            color: #303133;
          }
        }
        .works-item-back{
          box-sizing: border-box;
          padding: 20px;
          position: absolute;
          top: 0;
          background: rgba(255, 255, 255, 0.8);
          transform: rotateY(180deg);
        }
      }
      .works-item:hover {
       .works-item-back{
          transform: rotateY(0deg);
        }
        .works-item-front{
          transform: rotateY(180deg);
        }
      }
    }

    #hobbys{
      .el-card /deep/ .el-card__body{
        padding: 0;
        height: 350px;
      }
      .hobby{
        opacity: 0.9;
        background-color: rgba(255,255,255,0.9);
        box-shadow: none;
        margin-bottom: 20px;
        border-radius: 20px;
        .el-image{
          width: 100%;
          max-height: 200px;
        }
        .tit{
          margin: 0 auto;
          line-height: 20px;
          text-align: center;
        }
        p{
          margin: 0;
          padding: 20px;
          font-size: medium;
        }
      }
    }
    #summary{
      ul{
        li{
          line-height: 50px;
          border-bottom: 2px dashed #63a35c;
          background-color: rgba(0,0,0,0.1);
          margin-bottom: 20px;
          border-radius: 9999px;
          list-style-type: circle;
        }
      }
    }
  }


  @media screen and (max-width: 768px){
    .sidebar{
      position: relative;
      top: 0;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      .avatar{
        margin: 1rem auto;
        width: 100px;
        height: 100px;
      }
      nav{
        background-color: rgba(255,255,255,0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }
    }
    main{
      margin: 0 auto;
      width: 100%;
      text-align: center;
      section{
        border-radius: 0;
        border: none;
      }
      #summary{
        ul{
          li{
            border-radius: 0;
            border-bottom: none;
            background-color: transparent;
            text-align: left;
          }
        }
      }
    }
  }

</style>