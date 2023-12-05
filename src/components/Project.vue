<template>
  <el-container>
    <el-row :gutter="10">
<!--      <el-col :span="24">-->
<!--        <h2 style="color: white;background-color: rgba(0,0,0,0.15)">完整项目</h2>-->
<!--      </el-col>-->
      <!--      <el-col :span="24">-->
      <div class="animate__animated animate__fadeInLeft"
           v-for="(project) in projectList" :key="project.id">
        <a :href="project.url" style="text-decoration: none" target="_blank">
          <el-card class="project">
            <el-image class="image" lazy :src="project.pic_url"></el-image>
            <div class="pro-info">
              <h3>{{project.title}}</h3>
              <p class="info">{{project.content}}</p>
              <div class="proTech">
                <p class="tech">{{project.techs}}</p>
              </div>
            </div>
          </el-card>
        </a>
      </div>
      <!--      </el-col>-->
      <el-col v-if="demoList.length > 0" :span="24">
        <h2 style="color: white;background-color: rgba(0,0,0,0.15)">小练习</h2>
      </el-col>
      <el-row class="demo-container" :gutter="20">
        <el-col :xs="24" :sm="12" :lg="6" v-for="(project) in demoList" :key="project.id">
          <a :href="project.url" style="text-decoration: none;" target="_blank">
            <el-card shadow="hover"
                     :style="'background-image: url('+project.pic_url+');'"
                     class="animate__animated animate__fadeInLeft demo">
              <div class="pro-info">
                <h3>{{project.title}}</h3>
                <p class="info">{{project.content}}</p>
                <div class="proTech">
                  <p class="tech">{{project.techs}}</p>
                </div>
              </div>
            </el-card>
          </a>
        </el-col>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      projectList: [],
      demoList: []
    }
  },
  created() {
    this.getProjectList()
  },
  methods: {
    async getProjectList() {
      const {data: res} = await this.$blog.get('/projects')
      if (res.code === 200) {
        this.demoList = res.data.filter(item => {
          return item.type === 1
        })
        this.projectList = res.data.filter(item => {
          return item.type === 0
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

  .demo-container {
    width: 80% !important;
    margin: 0 auto !important;

    .demo {
      width: 100% !important;
      color: white;
      background-size: cover;
      background-repeat: no-repeat;

      .pro-info {
        transform: translateY(160px);
        transition: .6s;
        background-color: rgba(44, 62, 80, 0.4);
        width: 100%;
      }
    }
  }


  .demo:hover {
    .pro-info {
      transform: translateY(0);
      transition: .6s;
    }
  }

  .el-card {
    width: 80%;
    margin: 15px auto;
    padding: 0;
    background-repeat: round;
  }

  .el-card /deep/ .el-card__body {
    display: flex;
    height: 220px;
    padding: 0;
    margin: 0;
  }

  .el-card:hover {
    cursor: pointer;
  }

  .el-image {
    width: 50%;
    height: 100%;
    clip-path: polygon(0 0, 92% 0%, 100% 100%, 0% 100%);
  }

  .el-card:hover .el-image {
    -webkit-transform: scale(1.1);
    transition: all .6s;
  }


  .project {
    .pro-info {
      margin-top: 15px;
      margin-left: 30px;
      margin-right: 20px;
      width: 60%;

      .proTech {
        display: flex;
        flex-wrap: wrap;
        font-size: small;

        .tech {
          margin: 5px;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .el-card {
      width: 95%;
      margin: 10px auto;
      padding: 0;
    }

    .el-image {
      width: 100%;
      height: 100%;
      clip-path: none;
    }

    .el-card /deep/ .el-card__body {
      height: auto;
      flex-direction: column;

      .image {
        width: 100%;
        height: auto;
        flex-shrink: 0;
      }
    }

    .demo-container {
      width: 100% !important;
      margin: 0 auto !important;

      .demo {
        width: 100%;
        background-size: contain;
        .pro-info {
          margin-top: 160px;
          color: black;
          transform: translateY(0);
          transition: .6s;
          background-color: rgba(255, 255, 255, 0.6);
          width: 100%;
          padding-left: 15px;
          padding-right: 15px;
        }
      }
    }

    .project {
      .pro-info {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 10px;
      }
    }
  }
</style>
