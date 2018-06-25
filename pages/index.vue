<template>
  <section class="wrapper">
    <div class="row slide center overflow">
      <img-resize :link="randomImage.image" :size="size" class="random-image" :style="placement" />
      <div class="col-12">
        <h1 class="title" v-editable="story.content">{{story.content.title}}</h1>
      </div>
    </div>
    <div class="row slide intro center">
      <div class="container">
        <div class="col-12" v-editable="story.content">
          <p>{{story.content.intro}}</p>
        </div>
      </div>
    </div>
    <div class="projects">
      <div class="container">
        <h4>Projects:</h4>
        <project-list :projects="story.content.projects" />
      </div>
    </div>
    <div class="row slide">
      <div class="container information">
        <info-list :data="story.content.information[0]" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} },
      trigger: 0,
    }
  },
  computed: {
    imageList() {
      return this.story.content.images
    },
    randomImage() {
      return this.imageList[this.trigger]
    },
    placement() {
      return { top: `${this.randomImage.top}%`, left: `${this.randomImage.left}%` }
    },
    size() {
      return "400x0"
    }
  },
  methods: {
    counter() {
      let trigger = this.trigger
      setInterval(() => {
        this.trigger++
        if(this.trigger > this.imageList.length - 1) {
          this.trigger = 0
        }
      },3000)
    }
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', function () {
      window.location.reload()
    })
    this.counter()
  },
  asyncData (context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'
    return context.app.$storyapi.get('cdn/stories/home', {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style lang='scss' scoped>
.row {
  margin: 0;
  text-align: center;
}
.overflow {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.random-image {
  position: absolute;
}

.title {
  font-size: 3rem;
  text-transform: uppercase;
  z-index: 999;
  @include media-breakpoint-up(sm) {
    font-size: 5rem;
  }
  @include media-breakpoint-up(md) {
    font-size: 6.4rem;
  }
  @include media-breakpoint-up(lg) {
    font-size: 8.8rem;
  }
  @include media-breakpoint-up(xl) {
    font-size: 10.7rem;
  }
}

.intro {
  background: #000;
  padding: 2rem 0;
}

.center {
  position: flex;
  align-items: center;
  justify-content: center;
}

.projects {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 5rem 0;
  h4 {
    margin-bottom: 3rem;
  }
}
</style>
