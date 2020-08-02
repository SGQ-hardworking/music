<template>
  <!-- 点击歌单，进入音乐详情页面 -->
  <div class="musiclistdetail">
    <div class="top">
      <div class="left">
        <img :src="picUrl" alt="封面" />
      </div>

      <div class="right">
        <div class="right-left">
          <div class="list">歌单</div>
          <span class="title">{{name}}</span>
        </div>

        <div class="right-right">
          <div class="number">
            歌曲数
           <p>{{tracknumber}}</p>
          </div> 
         <span class="line"></span>
          <div>
            播放量
            <p>  {{count}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <ul>
        <li v-for="item of tracks">{{item.name}}</li>
    </ul>-->

    <ul class="nav">
      <li
        :key="item"
        v-for="(item,index) of navbar"
        :class="{active: currentindex==index}"
        @click="navclick(index)"
      >{{item}}</li>
      <input type="text" placeholder="搜索歌单音乐"/>
    </ul>
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>操作</th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        :key="item.id"
         v-for="(item,index) in tracks"
         :class="{activelist:currentlist == index}"
          @click="geturl(item.id,index)">
          <td class="count">{{index+1}}</td>
          <td></td>
          <td>{{item.name}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <!-- <audio class="w" :src="musicurl" controls autoplay></audio> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MusicListDetail",
  created() {
    //获取歌单详情
    axios
      .get("/playlist/detail", {
        params: {
          id: this.id,
          cookie: this.$store.state.cookie,
          token: this.$store.state.token
        }
      })
      .then(res => {
        console.log(res.data.playlist.tracks);
        this.tracks = res.data.playlist.tracks;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      currentindex: 0,
      navbar: ["歌曲列表", "评论", "收藏者"],
      tracks: null,
      id: this.$route.params.id,
      picUrl: this.$route.params.picUrl,
      name: this.$route.params.name,
      tracknumber: this.$route.params.tracknumber,
      playcount: this.$route.params.playcount,
      time: this.$route.params.time,
      // musicurl: null,
      currentlist: null
    };
  },
  computed: {
      count() {
          return this.playcount = parseInt(this.playcount/10000)  + '万'
      }
  },
  methods: {
    geturl(musicid) {
      console.log(musicid);
      axios
        .get("/song/url", {
          params: {
            id: musicid,
            cookie: this.$store.state.cookie,
            token: this.$store.state.token
          }
        })
        .then(res => {
          console.log(res.data.data[0].url);
          this.$store.state.musicUrl = res.data.data[0].url;
        })
        .catch(err => {
          console.log(err);
        });
    },
    navclick(index) {
      this.currentindex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  .right {
      display: flex;
      justify-content: space-between;
      padding: 0 30px;
    .list {
      color: #e03f40;
      font-size: 14px;
      height: 16px;
      line-height: 16px;
      width: 50px;
      text-align: center;
    border: 1px solid #e03f40;
      margin-right: 5px;
      margin-top: 2px;
    }
  }
  .title {
    font-weight: 400;
    font-size: 22px;
  }
}
.right-left {
    flex: 3;
    display: flex;
    justify-content: flex-start;
    
}
.line {
    border-right:1px solid #999999;
    height: 25px;
    margin:0 8px;
}
.right-right {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  flex: 1;
  color: #999999;
  text-align: right;
     p {
         margin: 0;
         padding: 0;
  }
}
img {
  width: 198px;
  height: 198px;
}
audio {
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 50px;
  color: #e83c3c;
  transform: translateX(-50%);
}
.nav {
  display: flex;
  justify-content: space-around;
  li {
    list-style: none;
    font-size: 16px;
    padding: 5px 0;
  }
}
.active {
  border-bottom: 4px solid #c62f2f;
  color: #c62f2f;
}
table {
    width: 100%;
    border-collapse: collapse;
}
th {
  font-weight: normal;
  border: 1px solid #e1e1e2;
  padding: 10px;
}
tr {
    text-align: left;
    color: #666;
    font-size: 14px;
    &:hover {
        background-color: #ebeced;
    }
}
td {
  padding: 10px;
}
.count {
  text-align: right;
}
input {
  border: 1px solid #e1e1e2;
  border-radius: 20px;
  outline: none;
  padding: 5px 10px;
  color: 14px;
}
</style>