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
<!--          <h2 class="title"><i class="iconfont icon-gerenzhongxin1"></i> 个人资料</h2>-->
          <el-row :gutter="20" class="reset-size1">
            <el-col :sm="8" :xs="24" class="col-align-c">
              <p :style="fontStyle"><i style="margin-right: 5px"></i>ID：Suenaga</p>
                <h3 v-html="intro" :style="fontStyle" ></h3>
                <!--              <p><i class="iconfont icon-sex" style="margin-right: 5px"></i>性别：男</p>-->
<!--              <p><i class="iconfont icon-nianling" style="margin-right: 5px"></i>年龄：21</p>-->
<!--              <p><i class="iconfont icon-xueli" style="margin-right: 5px"></i>学历：本科(大三在读~)</p>-->
<!--              <p><i class="iconfont icon-qq1" style="margin-right: 5px"></i>QQ：814243247</p>-->
<!--              <p><i class="iconfont icon-shengao" style="margin-right: 5px"></i>身高：180cm</p>-->
<!--              <p><i class="iconfont icon-icon1" style="margin-right: 5px"></i>体重：65kg</p>-->
<!--              <p><i class="iconfont icon-shouye" style="margin-right: 5px"></i>血型：O型</p>-->
            </el-col>
            <el-col :sm="16" :xs="24" class="col-l-4">
<!--              <p><i style="margin-right: 5px"></i>出生日期：2002-03-31</p>-->
<!--              <p><i class="iconfont icon-email" style="margin-right: 5px"></i>邮箱：<a href="mailto:814243247@qq.com">814243247@qq.com</a></p>-->
<!--                <p><i class="iconfont icon-zhuanye1" style="margin-right: 5px"></i>投喂：<img src="https://myblog-zhou.oss-cn-beijing.aliyuncs.com/mm_facetoface_collect_qrcode_1701531271755.png" height="100"></p>-->
            </el-col>
          </el-row>
        </div>
      </section>
<!--&lt;!&ndash;      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#skills'" id="skills">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="wrap">&ndash;&gt;-->
<!--&lt;!&ndash;          <h2 class="title"><i class="iconfont icon-zhuanye"></i> 掌握的技能</h2>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-row :gutter="40" class="row scrollable">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="iconfont icon-java"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                    <h3>Java</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>熟练掌握Java,并发编程,JavaWeb组件Servlet,Filter,Listener，熟悉Tomcat,mybatis,Maven,Springboot,SpringMVC</p>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="iconfont icon-jichuxinxi"></i>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                <h3>数据库</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                <p>熟悉Mysql,Redis</p>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="iconfont icon-houtaiguanli"></i>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                <h3>服务端</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                <p>熟悉Linux,Nginx,熟悉Node.js,分布式框架Spring Cloud等</p>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="iconfont icon-shujujiegou-01"></i>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                <h3>计算机基础</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                <p>熟练掌握数据结构，算法，熟悉计算机网络,计算机组成原理等相关知识</p>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="iconfont icon-yingyu2"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                    <h3>中间件</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>Nginx,Docker容器,RabbitMQ</p>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-col :sm="8" :xs="24" class="center-fixed">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-icon">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="iconfont icon-nianling"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="skills-title">&ndash;&gt;-->
<!--&lt;!&ndash;                    <h3>前端</h3>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p>熟悉Html,Css,Js</p>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-row>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </section>&ndash;&gt;-->
<!--      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#works'" id="works">-->
<!--        <div class="wrap">-->
<!--&lt;!&ndash;          <h2 class="title"><i class="iconfont icon-zuopin1"></i>个人作品</h2>&ndash;&gt;-->
<!--          <el-row :gutter="30">-->
<!--            <el-col :xs="24" :sm="12" :lg="8" v-for="work in workList" :key="work.id">-->
<!--              <div class="works-item">-->
<!--                <el-card class="works-item-front">-->
<!--                  <el-image :src="work.pic_url"/>-->
<!--                  <p>{{work.name}}</p>-->
<!--                </el-card>-->
<!--                <el-card class="works-item-back">-->
<!--                  <p>{{work.desp}}</p>-->
<!--                </el-card>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--      </section>-->
<!--      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#hobbys'" id="hobbys">-->
<!--          <h2 class="title"><i class="iconfont icon-xingquaihao"></i>我的爱好</h2>-->
<!--          <div class="row">-->
<!--            <el-carousel :interval="2000" :type="cardOpen? 'card':''" height="350px">-->
<!--              <el-carousel-item v-for="hobby in hobbyList" :key="hobby.id">-->
<!--                <el-card class="hobby">-->
<!--                  <el-image style="width: 100%" :src="hobby.pic_url"></el-image>-->
<!--                  <h3 class="tit">{{hobby.name}}</h3>-->
<!--                  <p>{{hobby.desp}}</p>-->
<!--                </el-card>-->
<!--              </el-carousel-item>-->
<!--            </el-carousel>-->
<!--        </div>-->
<!--      </section>-->
<!--      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#summary'" id="summary">-->
<!--        <div class="wrap">-->
<!--          <h2 class="title"><i class="iconfont icon-ziwopingjia"></i>关于我</h2>-->
<!--          <div class="row">-->
<!--            <ul>-->
<!--              <li>现实主义者~</li>-->
<!--              <li>喜欢音乐,探寻内心,展望未来~</li>-->
<!--              <li></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
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
      introduceList: [
        // {
        //   id: 0,
        //   title: '资料',
        //   name: '#info',
        //   icon:'iconfont icon-zhuanye1'
        // },
        // {
        //   id: 1,
        //   title: '技能',
        //   name: '#skills',
        //   icon:'iconfont icon-jinengliang-xian'
        // },
        // {
        //   id: 2,
        //   title: '关于',
        //   name: '#works',
        //   icon:'iconfont icon-zuopin'
        // },
      ],
      // workList:[
      //   {
      //     id:0,
      //     name:'过去...',
      //     desp:'左边是我,右边是我哥',
      //     pic_url:'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/IMG_20221214_123420.jpg'
      //   },
      //   {
      //     id:1,
      //     name:'现在',
      //     desp:'hhh',
      //     pic_url:'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/OIP%20%282%29.jpeg'
      //   },
      //   {
      //     id:2,
      //     name:'未来...',
      //     desp:'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/p289937580.jpg',
      //     pic_url:'https://myblog-zhou.oss-cn-beijing.aliyuncs.com/p289937518.jpg',
      //   },
      //
      // ],
      // hobbyList:[
      //   {
      //     id: 0,
      //     name:'网球',
      //     pic_url:'http://hikari.top/images/ab058900-9c31-4818-9f51-61a60f64f63c.jpeg',
      //     desp:'网球是从大一开始学的一项运动，也是大学坚持最久的运动之一，技术一般般，但水平不高的比赛还是可以上场的，希望工作之后还有时间继续打球'
      //   },
      //   {
      //     id: 1,
      //     name:'跑步',
      //     pic_url:'http://hikari.top/images/a7e5f1a4-bd29-4e80-aa9f-793342014120.jpeg',
      //     desp:'跑步是从大一那年的冬天开始的，最长的记录是19年跑完了半程马拉松的21.0975km，这是一项不管我年龄多大都想坚持下去的运动'
      //   },
      //   {
      //     id: 2,
      //     name:'二次元',
      //     pic_url:'http://hikari.top/images/10985f8b-91aa-429a-a515-5b1e9a5db40f.jpeg',
      //     desp:'海贼，火影，网球王子，柯南，妖尾，进击的巨人......，从初中开始，基本上把长篇都看遍啦，二次元给我的生活天机了不少乐趣'
      //   },
      //   {
      //     id: 3,
      //     name:'日语',
      //     pic_url:'http://hikari.top/images/8429f6ed-7094-453e-96ab-b574cdfa2514.jpeg',
      //     desp:'喜欢看动漫和听日语歌，所以就自然开始喜欢日语了，现在还只会基础，希望之后能有时间好好学学过N2吧'
      //   },
      //   {
      //     id: 4,
      //     name:'听音乐',
      //     pic_url:'http://hikari.top/images/1b9c534a-f097-4281-a15f-17727f364c27.jpeg',
      //     desp:'这个不用多说，各种各样的音乐我都喜欢，而且喜欢边学习边听，哈哈'
      //   },
      //   {
      //     id: 5,
      //     name:'看电影',
      //     pic_url:'http://hikari.top/images/33705908-8614-4a9d-a6f6-39fe406a2c1b.jpeg',
      //     desp:'比较喜欢科幻片，虽然因为没钱，没在电影院没看过几部，但这也算一个爱好吧'
      //   },
      //   {
      //     id: 6,
      //     name:'骑车',
      //     pic_url:'http://hikari.top/images/b05702ea-673b-46ff-8f03-17db351c3845.jpeg',
      //     desp:'虽然我大学才雪会骑车，但看着别人出去远距离骑行也是挺羡慕的，希望有时间可以去试试'
      //   },
      //   {
      //     id: 7,
      //     name:'旅游',
      //     pic_url:'http://hikari.top/images/420f8f32-eff3-4062-85d0-92d8b68f62eb.jpeg',
      //     desp:'这只能算一个美好的愿望，等我有钱了，要去各种各样的地方玩，体验不一样的生活'
      //   },
      // ],
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