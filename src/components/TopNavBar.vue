<template>
  <div>
    <div class="topnav">
      <a class="active" @click="doLogout" style="cursor:pointer">Log Out</a>
      <a data-toggle="modal" data-target="#myModal" style="cursor:pointer" class="post">
        <span class="glyphicon glyphicon-send"></span>Post</a>
      <!-- <a class="active" @click="newArticle">Post Article</a> -->
    </div>
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">

        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">POST ARTICLE</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Title:</label>
              <input type="text" class="form-control" v-model="title">
            </div>
            <div class="form-group">
              <label>Content:</label>
              <textarea class="form-control" rows="4" cols="50" v-model="content"></textarea>
            </div>
            <button type="submit" class="btn btn-warning" @click="postArticle()" data-dismiss="modal">POST</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase.js'
export default {
  name: 'TopNavBar',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    doLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      this.$store.commit('clearArticleList', [])
      this.$router.push({name:'home'})
    },
    postArticle(){
      let articleContent = {
        title: this.title,
        content: this.content
      }
      this.$store.commit('setArticle', articleContent)
      // this.$store.commit('clearArticleList', [])
      this.$store.dispatch('postArticle')
      // this.$store.dispatch('getArticles')
    }
    
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.topnav a.post {
  float: left;
  background-color: #4CAF50;
  color: white;
}
</style>
