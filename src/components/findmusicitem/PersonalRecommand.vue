<template>
  <div class="personalrecommand">
    <div class="lists">
      <p>推荐歌单</p>
      <span  @click= "getmore" class="more">更多></span>
    </div>
    <div class="recommand">
      <ul>
        <li 
        :key="item.name" 
        v-for="(item,index) in info" 
        @click="getmusiclist(info[index].id,info[index].picUrl,info[index].name,info[index].playCount,info[index].trackCount,info[index].trancNumberUpdateTime)">
          <img :src="info[index].picUrl" />
          <span class="mask">{{item.copywriter}}</span>
          <span class="des">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import MusicListDetail from '@/components/findmusicitem/personalrecommandchild/MusicListDetail'

export default {
  name: "PersonalRecommand",
  data() {
    return {
      info:null,
    };
  },
  created() {
    axios
    //获取推荐歌单
      .get("/personalized?limit=10", {
        params: {
         cookie: this.$store.state.cookie,
         token: this.$store.state.token
        }
      })
      .then(res => {
       
        this.info = res.data.result;
      })
      .catch(err => console.log(err));
  },
  methods: {
    getmore() {
       this.$router.push('/findmusic/musiclist')
    },
    getmusiclist(id,picUrl,name,playcount,tracknumber,time) {
      // 通过命名路由来传递参数
      this.$router.push({
       name: "musiclistdetail",
       params: {
         id: id,
         picUrl: picUrl,
         name: name,
         tracknumber:tracknumber,
         playcount: playcount,
         time: time

       }
      })
     
    }
  },
  components: {
    MusicListDetail
  }
};
</script>

<style lang="scss" scoped>
.lists {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e2;
  padding: 10px 0;
  p {
    margin: 0;
    color: #333;
  }
  .more {
    margin-top: 5px;
    font-size: 12px;
    color:#666;
    cursor: pointer;
    &:hover {
      color:#444
    }

  }
}
.recommand {
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    margin-top: 10px;
    li {
      position: relative;
      list-style: none;
      padding-bottom: 75px;
      cursor: pointer;
      img {
        width: 140px;
        height: 140px;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);
        padding: 5px;
        box-sizing: border-box;

        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        display: none;

        color: #fff;
        font-size: 12px;
        line-height: 20px;
        z-index: 1;
      }

      .des {
        position: absolute;
        top: 142px;
        left: 0;
        font-size: 13px;
        padding: 7px 0;
        color: #333;
        &:hover {
          color: #111;
        }
      }
    }
  }
}
.recommand ul li:hover .mask{
  display: block;
}
</style>