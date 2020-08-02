<template>
    <div class="findmusic">
        <ul>
            <li :key="item.id"
             v-for="(item,index) in musicItems"
              @click="itemClick(index)" 
              :class="current==index?'active':''"
              >
             
              {{item.name}}
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import PersonalReconmmand from '@/components/findmusicitem/PersonalRecommand'
import MusicList from '@/components/findmusicitem/MusicList'

export default {
    name: "FindMusic",
    data() {
        return{
            musicItems:[
                {
                    id: 1,
                    name: "个性推荐",
                    url: "/findmusic/personalrecommand"

                },
                {
                    id: 2,
                    name: '歌单',
                    url: "/findmusic/musiclist"

                },
                {
                    id: 3,
                    name: '主播电台',
                    url: ""

                },
                {
                    id: 4,
                    name: '排行榜',
                    url: ""

                },
                {
                    id: 5,
                    name: '歌手',
                    url: ""

                },
                {
                    id: 6,
                    name: '最新音乐',
                    url: ""

                }
            ],
            current: 0,
           
        }
        
    },
    watch:{
        "$route.path"(to){
            console.log(to);
            this.current = this.musicItems.findIndex(it=>{
                return it.url == to
            })
        }
    },
    methods: {
        itemClick(index) {
            this.current = index
             this.$router.push(this.musicItems[index].url)
        }
       
    },
    components: {
        PersonalReconmmand,
        MusicList
    }
}
</script>

<style lang="scss" scoped>
.findmusic {
    ul {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #e1e1e2;
        margin:8px 0px;
        li {
            list-style-type: none;
            text-align: center;
            font-size: 16px;
            height: 20px;
            line-height: 20px;
            padding: 3px 0 8px;
             
            &:hover {
                color: #c62f2f;
            }
        }
    }
    
}
.active {
    color: #c62f2f;
    border-bottom: 2px solid #c62f2f;
    }
</style>