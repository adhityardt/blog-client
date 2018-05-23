import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './firebase.js'
import { storage } from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleList: [],
    articleTitle: '',
    articleContent: ''
  },
  mutations: {
    pushArticleList (state, payload) {
      state.articleList.push(payload)
    },
    clearArticleList (state,payload) {
      console.log('masuk clear article list')
      state.articleList = payload
    },
    setArticle (state, payload) {
      state.articleTitle = payload.title
      state.articleContent = payload.content
    }
  },
  actions: {
    getArticles({commit}) {
      let authorId = localStorage.getItem('id')
      db.ref('/Articles/' + authorId).on('value', (snapshot) => {
        snapshot.forEach(snap => {
          let articles = {
            key: snap.key,
            article: snap.val()
          }
          commit('pushArticleList', articles)
        })
      })
    },
    postArticle ({commit,state}) {
      let authorId = localStorage.getItem('id')
      db.ref('/Articles/' + authorId).push({
        title: state.articleTitle,
        content: state.articleContent,
        author: localStorage.getItem('user'),
        authorId: authorId
      })
      window.location.reload()
    }
  }
})
