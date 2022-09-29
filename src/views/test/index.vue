 <template>
   <p>{{data}}</p>  
 </template>
 
 <<script>
 export default {
    data() {
        return {
            date: ""
        }
    },
 
mounted(){
   this.getDate()
},

methods:{
 //获取当前日期的方法
   getDate() {
     var time = new Date()
     console.log(time);
  
     var y = time.getFullYear()    //年
     var m = (time.getMonth() + 1).toString().padStart(2, '0')  //月
     var d = time.getDate().toString().padStart(2, '0')    //日
     var h = time.getHours().toString().padStart(2, '0')    //时
     var mm = time.getMinutes().toString().padStart(2, '0')   //分
     var s = time.getSeconds().toString().padStart(2, '0')     //秒
 
     this.date = `${y}-${m}-${d}`
  }
 
}
 }
 </script>
