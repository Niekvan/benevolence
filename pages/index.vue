<template>
  <section class="wrapper">
    <div class="row slide center">
      <div class="col" v-editable="story.content">
        <h1 class= "title">{{story.content.title}}</h1>
      </div>
    </div>
    <div class="row slide intro center">
      <div class="container">
        <div class="col" v-editable="story.content">
          <p>{{story.content.intro}}</p>
        </div>
      </div>
    </div>
    <div class="row projects">
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
  background: #000;
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

.information {
  // text-align: left;
}

p {
  font-size: $font-size-body-large;
  text-align: left;
  line-height: 3.3rem;
}
</style>
