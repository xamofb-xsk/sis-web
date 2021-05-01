<template>
 <el-main>
   <el-button @click="load"></el-button>
 </el-main>
</template>

<script>
export default {
  name: "Test",
  data () {
    return {

    }
  },
  methods:{
    load(){
      this.$axios.post('/api/test/', {username: 1})
        .then((res)=>{
          console.log(res)
          // this.course[1] = res.data['class_two']
        })
    }
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>

</style>
