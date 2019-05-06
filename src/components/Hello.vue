<template>
  <div class="hallo">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
      
      <mu-card class="kotak-people" v-for="post of posts" :key="post.id.value">
        <mu-row>
          <mu-col span="2">
            <div class="img-profile">
              <img :src="post.picture.large">
            </div>
          </mu-col>
          <mu-col span="10">
            <mu-row class="identitas">
              <mu-col span="12" class="title-name"> {{post.name.title}} {{post.name.first}} {{post.name.last}}</mu-col>
              <mu-col span="12">Registered Date: {{post.registered.date | moment("LL")}}</mu-col>
            </mu-row>
          </mu-col>
        </mu-row>
      </mu-card>
      <div class="loding" v-if="loadingData">
        <scale-loader :size="size" :color="color"></scale-loader>
      </div>
    </div>
    <div class="limit-data">
      <h1>{{this.message}}</h1>
    </div>
  </div>
</template>

<script>
import {HTTP} from '@/url/url-common.js'
import { ClipLoader } from 'vue-spinner/dist/vue-spinner.min.js'
import { ScaleLoader } from 'vue-spinner/dist/vue-spinner.min.js'
export default {
  name: 'hello',
  data () {
    return {
      busy: false,
      arrPage: 1,
      errors: [],
      posts: [],
      post2:[],
      message:'',
      size: '50px',
      color: '#ff7701',
      loadingData: false
    }
  },
  components :{
    ClipLoader, ScaleLoader
  },
  mounted () {
    HTTP.get(`?page=1&results=1`)
      .then(response => {
      this.posts = response.data.results
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    loadMore () {
      this.arrPage += 1
      this.busy = true
      if(this.arrPage === 21){
        this.busy = true 
        this.loadingData = false
        this.message = 'You have reach the limit'
      }else{
        this.loadingData = true
        HTTP.get('?page='+this.arrPage+'&results=1')
        .then(response => {
          this.posts.push(response.data.results[0])
          this.busy = false
          this.loadingData = false
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
     
    }
  }
}
</script>
<style scoped>
.hallo{
  margin: 10px 0px;
}
.kotak-people {
  margin: 10px 0;
  height: 120px;
  padding: 10px;
}
.img-profile{
  width: 100px;
  position: relative;
  overflow: hidden;
  height: 100px;
}
.img-profile img{
  width: 100%;
  position: absolute;
  height: 100%;
}
.identitas{
  text-align: right;
  padding: 30px 0px;
}
.title-name{
  text-transform: capitalize;
}
.loding {
  margin-top: 10px;
  padding: 20px;
}
.limit-data{
    text-align: center;
}
.limit-data h1 {
  font-size: 14px;
  color: #9c9c9c;
}
</style>
