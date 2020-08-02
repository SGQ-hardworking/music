<template>
  <div id="app">
    <topbar></topbar>
    <leftbar></leftbar>
    <audio  :src="this.$store.state.musicUrl" controls autoplay></audio>
  </div>
</template>

<script>
import Topbar from "@/views/Topbar"
import Leftbar from "@/components/leftbar/Leftbar"

export default {
  components: {
    Topbar,
    Leftbar
  },
  created() {
    
  }
}
</script>
<style lang="scss"> 
#app {
position: relative;
 width: 1022px;
 height: 550px;
 margin: 10px auto;
}
audio {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 1022px;
  height: 50px;
}


</style>
