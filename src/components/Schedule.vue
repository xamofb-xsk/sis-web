<template>
  <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">

        <table>
          <thead>
          <tr>
            <th>时间</th>
            <th v-for="(weekNum, weekIndex) in classTableData.courses.length" :key="weekIndex"> {{'周' + digital2Chinese(weekIndex, 'week')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
            <td>
              <p>{{'第' + digital2Chinese(lessonIndex+1) + "节"}}</p>
              <p class="period">{{ lesson }}</p>
            </td>

            <td v-for="(course, courseIndex) in classTableData.courses" :key="courseIndex">
              {{classTableData.courses[courseIndex][lessonIndex] || '-'}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
import {mapGetters} from 'vuex';
export default {
name: "Schedule",
  data() {
  return {
    classTableData: {
      lessons: [
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00'
      ],
      courses: [
        // ["1", "1", "1", "1", "1", "1", "1"],
        // ["2", "2", "2", "2", "2", "2", "2"],
        // ["3", "3", "3", "3", "3", "3", "3"],
        // ["4", "4", "4", "4", "4", "4", "4"],
        // ["5", "5", "5", "5", "5", "5", "5"],
        // ["6", "6", "6", "6", "6", "6", "6"],
        // ["7", "7", "7", "7", "7", "7", "7"],
        // ["7", "7", "7", "7", "7", "7", "7"],
      ]


    },
    username: JSON.parse(sessionStorage.getItem('loginUserInfo')),


  };
  },
  computed:{
    ...mapGetters(["loginUserInfo"])
  }
,
  methods: {
  load(){
    this.$axios.post('/api/schedule/', {username: this.username})
        .then((res)=>{
          console.log(res)
          this.classTableData.courses = res.data['class_sc']
          // this.class_one = res.data['class_one']
          // console.log('class_one' + this.class_one)
          // console.log(this.courses)
          // this.course[1] = res.data['class_two']
        })
  },
    digital2Chinese(num, identifier) {
      const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八'];
      return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
    }

},
  mounted() {
    this.load()
}
}
</script>
<style lang="scss" scoped>
.class-table {
.table-wrapper {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.tabel-container {
  margin: 7px;

table {
  table-layout: fixed;
  width: 100%;

thead {
  background-color: #67a1ff;
th {
  color: #fff;
  line-height: 17px;
  font-weight: normal;
}
}
tbody {
  background-color: #eaf2ff;
td {
  color: #677998;
  line-height: 12px;
}
}
th,
td {
  width: 60px;
  padding: 12px 2px;
  font-size: 12px;
  text-align: center;
}

tr td:first-child {
  color: #333;
.period {
  font-size: 8px;
}
}
}
}
}
</style>
