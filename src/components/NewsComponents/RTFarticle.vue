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
        });
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
