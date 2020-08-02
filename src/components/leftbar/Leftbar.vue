<template>
  <div class="middle">
    <div class="leftbar">
      <dl>
        <dt>推荐</dt>
        <dd class="current">
          <router-link to="/findmusic">发现音乐</router-link>
        </dd>
        <dd>
          <router-link to="/personalfm">私人FM</router-link>
        </dd>
        <dd>
          <router-link to="/looklive">LOOK直播</router-link>
        </dd>
        <dd>
          <router-link to="/video">视频</router-link>
        </dd>
        <dd>
          <router-link to="/friends">朋友</router-link>
        </dd>
        <dt>我的音乐</dt>
        <dd :key="item" v-for="item in mymusics">{{item}}</dd>
        <dt>创建的歌单</dt>
        <dd :key="item" v-for="item in creatlists">{{item}}</dd>
        
      </dl>
    </div>
    <div class="rightbar">
        <router-view></router-view>
    </div>
  </div>
</template>


<script>
import FindMusic from "@/views/FindMusic";
import Friends from "@/views/Friends";
import LookLive from "@/views/LookLive";
import PersonalFM from "@/views/PersonalFM";
import Video from "@/views/Video";

export default {
    data() {
        return{
            mymusics: ["我的音乐云盘","我的电台","我的收藏"],
            creatlists: []
        }
    },
  mounted() {
    const dds = document.querySelectorAll("dd");
    for (let i = 0; i < dds.length; i++) {
      dds[i].addEventListener("click", function () {
        for (let i = 0; i < dds.length; i++) {
          dds[i].className = "";
        }
        this.className = 'current'
      });
    }
  },
  components: {
    FindMusic,
    Friends,
    LookLive,
    PersonalFM,
    Video,
  },
};
</script>

<style lang="scss" scoped>
.middle {
  display: flex;
  justify-content: flex-start;
}
.leftbar {
  box-sizing: border-box;
  flex: 1;
  height: 500px;
  background-color: #f5f5f7;

  color: #5c5c5c;

  dl {
    margin: 0;
  }
  dt {
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    padding: 10px;
  }
  dd {
    box-sizing: border-box;
    width: 100%;
    margin-left: 0;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    border-left: 3px solid transparent;
    color: #5c5c5c;
    font-size: 14px;
    &:hover {
      background-color: #e6e7ea;
    }
    a {
      text-decoration: none;
      color: #5c5c5c;
      font-size: 14px;
      padding: 5px 10px;
      &:hover {
        color: #000000;
      }
    }
  }
}
.rightbar {
  flex: 4;
  padding: 0 30px;
  background-color: #fafafa;
  height: 500px;
  overflow: scroll;
}
dl .current {
  border-left: 3px solid #c62f2f;
  background-color: #e6e7ea;
}
</style>
