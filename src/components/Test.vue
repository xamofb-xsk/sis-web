<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      prop="id"
      label="课程名称"
      width="120"
    >
    </el-table-column>
    <el-table-column
      label="讲师"
      width="120"
      prop="tname"
    >
    </el-table-column>
    <el-table-column
      label="课时"
      width="120"
      prop="course_type"
    >
    </el-table-column>
    <el-table-column
      label="地点"
      width="120"
      prop="local"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Test",
  data () {
    return {
      tableData: [{
        id: '2016-05-02',
        tname: '王小虎',
        local: '上海市普陀区金沙江路 1518 弄',
        course_type: 'aaa'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped>

</style>
