<template>
<el-main>
  <el-card class="box-card">
    <h1>{{article.headline}}</h1>
    <span>{{article.source}}</span>
    <time>{{article.postDateTime}}</time>
    <!-- TODO: 若Article可能来源于用户, 则此处存在XSS攻击 -->
    <p v-html="content" align="left"></p>
  </el-card>
</el-main>
</template>

<script>
import qs from 'qs'
export default ({
  name: 'Article',
  data () {
    return{
      content:'',
      article:{},
      metaTitle: "新闻动态, 相关资讯",
      metaDataList: [
        {
          name: 'keyWords',
          content: 'anworld, 安宁疗护资讯, 安宁疗护相关新闻, anworld工作室'
        },
        {
          name: 'description',
          content: '安宁疗护相关资讯. 我们提供安宁疗护相关的最新资讯, 紧跟安宁疗护发展进程.'
        }
      ],
    }
  },
  metaInfo () {
    return {
      title: this.metaTitle,
      meta: this.metaDataList,
    }
  },
  created() {
    // this.article = this.$bus["RTF-Article"] ? JSON.parse(this.$bus["RTF-Article"]):{};
    // 判断是用query还是路径参数传递id
    if(this.$route.params.id){
      this.getArticle(this.$route.params.id)
    }else if (this.$route.query.id){
      this.getArticle(this.$route.query.id)
    }else if (this.$route.query.article){
      this.getArticle(JSON.parse(this.$route.query.article).id)
    }
  },

  methods: {
    getArticle(id){
      this.$axios.post('/api/article/getArticleById',
        qs.stringify({articleId: id}))
        .then(res=>{
          console.log(res)
          this.article = res.data.data
          this.content = this.article.content;
          this.metaTitle = this.article.headline;
          this.metaDataList[1].content = this.simpleContent(this.content);
        });
    },
    simpleContent(content) {
      // console.log(content)
      var simpleContent = content.replace(/<.*?>/g, '');
      if(simpleContent.length > 250) {
        return simpleContent.substr(0, 250) + '......'
      }
      else return simpleContent
    }
  },
 
})
</script>


<style>
  .el-main {
    display: flex;
    justify-content: center;
  }
  .box-card {
    width: 70%
  }

</style>
