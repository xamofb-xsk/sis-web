<template>
  <div>
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="yigong" label="义工时" width="140">

        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
name: "litteredbook",
  data() {
   const item = {
     yigong: '',
   };
   return {
     tableData: Array.fill(item)
   }
  }
}
</script>

<style scoped>

</style>
