<template>
  <div class="about">
    <!-- <h1>This is an about page</h1>
    <div v-for="(teacher,index) in dataTeachers" :key="index">
      <h3>{{teacher.name}}</h3>
      <button type="submit" @click="deleteTeacher(teacher.key)"> Delete</button>
      <input type="submit" class="btn btn-default" @click="updateTeacher(teacher.key)">
    </div>
    <div>
      <input type="text" v-model="newTeacher">
      <input type="submit" class="btn btn-default" @click="addTeacher">
    </div>
    <h3>Input new teacher name</h3>
    <input type="text" v-model="editedTeacher"> -->
    <h1>Welcome To Your Personal Blog <br></h1>
    <p>This blog engine is created to save your article before it get posted to the real blog</p>
  </div>
</template>

<script>
import { db } from '../firebase'
export default {
  name: 'About',
  data () {
    return {
      teacher: '',
      newTeacher: '',
      editedTeacher: '',
      dataTeachers: []
    }
  },
  methods: {
    addTeacher () {
      db.ref('/teachers/002').set({
        name: this.newTeacher
      })
      this.dataTeachers = []
      this.getDatas()
    },
    updateTeacher (key) {
      db.ref('/teachers/'+ key).update ({
        name: this.editedTeacher
      })
      this.dataTeachers = []
      this.getDatas()
    },
    deleteTeacher (key) {
      db.ref('/teachers/'+ key).remove()
      this.dataTeachers = []
      this.getDatas()
    },
    getDatas() {
      db.ref('/teachers').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        let teacherData = {
          name: snap.val().name,
          key: snap.key
        }
        this.dataTeachers.push(teacherData)
      })
    })
    }
  },
  mounted () {
    db.ref('/teachers').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        let teacherData = {
          name: snap.val().name,
          key: snap.key
        }
        this.dataTeachers.push(teacherData)
      })
    })
  }
}
</script>

<style>

</style>
