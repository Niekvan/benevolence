<template>
  <section class="wrapper">
    <div class="row slide">
      <div class="col">
        <h1 class= "title">{{story.content.title}}</h1>
      </div>
    </div>
    <div class="row slide intro">
        <div class="col">
          <p>{{story.content.intro}}</p>
        </div>
    </div>
    <div class="row projects">
      <project-detail v-for="project in story.content.projects" :key="project._uid" :project="project" />
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      story: { content: {} }
    }
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', function () {
      window.location.reload()
    })
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories/home', {
      version: 'draft'
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

.title {
  font-size: 13rem;
  text-transform: uppercase;
  z-index: 999;
}

.intro {
  padding: 0 17.5rem;
  background: #000;
}

.slide {
  position: flex;
  align-items: center;
  justify-content: center;
}

.projects {
  min-height: 100vh;
}

p {
  font-size: 3rem;
  text-align: left;
  line-height: 3.3rem;
}
</style>
