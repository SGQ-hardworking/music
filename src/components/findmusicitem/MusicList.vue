<template>
  <div class="musiclist">
    <button>{{cat}}</button>
    <p>
      热门标签：
      <span :key="item" v-for="item in hottags" @click="getlist(item)">
        {{item}}
        <span class="line">|</span>
      </span>
    </p>
    <div class="w">
         <ul >
      <li :key="item[index]" v-for="(item,index) in playlists"
       @click="getmusiclist(playlists[index].id,playlists[index].coverImgUrl,playlists[index].name,playlists[index].playCount,playlists[index].trackCount,playlists[index].trancNumberUpdateTime)">
        <div class="playcount">
            <span>{{parseInt(item.playCount/10000)}}万</span>
        </div>
        <img :src="playlists[index].coverImgUrl" alt="歌单图片" />
        <p>{{item.name}}</p>
      </li>
    </ul>
    </div>
   
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MusicList",
  data() {
    return {
      hottags: [
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "另类/独立",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
      playlists: null,
      cat: "全部歌单",
    };
  },
//   computed: {
//       num() {
//           return this.playcount = parseInt(this.playlists[index].playcount/10000)
//       }
//   },
  created() {
    // axios
    // .get('/playlist/catlist')
    // .then(res=>{
    //     console.log(res);
    //    })
    axios
      .get("/top/playlist?limit=1000", {
        params: {
          cat: this.cat,
          cookie: this.$store.state.cookie,
          token: this.$store.state.token
        },
      })
      .then((res) => {
        console.log(res);
        this.playlists = res.data.playlists;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
      //获取从服务器请求的歌单
    getlist(item) {
      this.cat = item;
      axios
        .get("/top/playlist?limit=1000", {
          params: {
            cat: this.cat,
            token: this.$store.state.token
          },
        })
        .then((res) => {
          console.log(res);
          this.playlists = res.data.playlists;
        });
    },
    getmusiclist(id,coverImgUrl,name,playcount,tracknumber,time) {
      // 通过命名路由来传递参数
      this.$router.push({
       name: "musiclistdetail",
       params: {
         id: id,
         picUrl: coverImgUrl,
         name: name,
         tracknumber:tracknumber,
         playcount: playcount,
         time: time

       }
      })
     
    }
  },

  
};
</script>

<style lang="scss" scoped>
button {
  background-color: #fff;
  border: 1px solid #e1e1e2;
  border-radius: 3px;
  font-size: 14px;
  color: #333;
  margin: 10px 0 5px 0;
  &:hover {
    background-color: #f5f5f7;
  }
}
p {
  color: #333;
  font-size: 12px;
  span {
    color: #666;
    cursor: pointer;
    &:hover {
      color: #333;
    }
    .line {
      padding: 0 15px;
      color: #d4ccd4;
    }
  }
}
.w {
    width: 100%;
}
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
 
  li {
      position: relative;
      list-style: none;
       width: 178px;
       margin: 15px 0; 
       .playcount {
           position: absolute;
            top: 0;
           right: 0;
           width: 100%;
           text-align: right;
           padding: 5px;
           color: #fff;
           font-size: 12px;
           background-color: rgba($color: #000000, $alpha: 0.3);
           z-index: 1;
       }
     }
  img {
    width: 178px;
    height: 178px;
  }
  p {
      font-size: 14px;
      margin: 10px 0 ;
       }
}
</style>