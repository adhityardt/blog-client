<template>
  <div>
    <div class="header">
      <h2>{{blogOwner}}'s Blog</h2>
    </div>

    <div class="row">
      <div class="leftcolumn">
        <div v-for="( article,index ) in articleList" :key="index" class="card">
          <button @click="setKey(article.key)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
            Edit
          </button>
          <button @click="deleteArticle(article.key)" type="button" class="btn btn-primary">
            Delete
          </button>
          <h2>{{article.article.title}}</h2>
          <h5>Author: {{article.article.author}}</h5>
          <!-- <h5>Title description, Dec 7, 2017</h5> -->
          <!-- <div class="fakeimg" style="height:200px;">Image</div> -->
          <p>{{article.article.content}}</p>
          <div id="exampleModalLong" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">UPDATE ARTICLE</h4>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>Title:</label>
                    <input type="text" class="form-control" v-model="newTitle">
                  </div>
                  <div class="form-group">
                    <label>Content:</label>
                    <textarea class="form-control" rows="4" cols="50" v-model="newContent"></textarea>
                  </div>
                  <button type="submit" class="btn btn-warning" @click="updateArticle()" data-dismiss="modal">UPDATE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height:100px;">Image</div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>
        <div class="card">
          <h3>Friend's Post</h3>
          <div class="modal fade">Image</div><br>
          <div class="modal fade">Image</div><br>
          <div class="modal fade">Image</div>
        </div>
        <div class="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <h2>Writing is an exploration. You start from nothing and learn as you go.</h2>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {db} from '../firebase.js'
export default {
  name: 'TemplateMainPage',
  data () {
    return {
      newTitle: '',
      newContent: '',
      edittedKey: '',
      blogOwner: localStorage.getItem('user'),
      articleList: this.$store.state.articleList
    }
  },
  methods: {
    showArticles () {
      this.$store.dispatch('getArticles')
    },
    setKey (key) {
      this.edittedKey = key
    },
    updateArticle (key) {
      db.ref('/Articles/' + localStorage.getItem('id') + '/' + this.edittedKey).update ({
        title: this.newTitle,
        content: this.newContent
      })
      window.location.reload()
    },
    deleteArticle (key) {
      db.ref('/Articles/' + localStorage.getItem('id') + '/' + key).remove()
      window.location.reload()
    }
  },
  created () {
    this.showArticles()
  }
}
</script>

<style>
* {
    box-sizing: border-box;
}

/* Add a gray background color with some padding */
body {
    font-family: Arial;
    padding: 20px;
    background: #f1f1f1;
}

/* Header/Blog Title */
.header {
    padding: 30px;
    font-size: 40px;
    text-align: center;
    background: white;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {   
    float: left;
    width: 75%;
}

/* Right column */
.rightcolumn {
    float: left;
    width: 25%;
    padding-left: 20px;
}

/* Fake image */
.fakeimg {
    background-color: #aaa;
    width: 100%;
    padding: 20px;
}

/* Add a card effect for articles */
.card {
     background-color: white;
     padding: 20px;
     margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* Footer */
.footer {
    padding: 20px;
    text-align: center;
    background: #ddd;
    margin-top: 20px;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
    .leftcolumn, .rightcolumn {   
        width: 100%;
        padding: 0;
    }
}
</style>
