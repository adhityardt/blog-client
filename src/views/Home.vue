<template>
  <div class="home">
    <TemplateSignup/>
    <router-view/>
  </div>
</template>

<script>
import TemplateSignup from '@/components/TemplateSignup.vue'
import { db } from '../firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      student: '',
      dataStudents: []
    }
  },
  components: {
    TemplateSignup
  },
  beforeCreate () {
    if(localStorage.getItem('token')){
      this.$router.push({name:'mainpage'})
    }
  },
  mounted () {
    db.ref('/users').on('value', (snapshot) => {
      // this.student = snapshot.val()
      snapshot.forEach(snap => {
        let studentData = {
          name: snap.val().name,
          key: snap.key
        }
        this.dataStudents.push(studentData)
      })
    })
  }
}
</script>
