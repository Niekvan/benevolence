<template>
  <section>
    <Menu />
    <div class="container">
      <div class="row">
        <div class="col-12 col-xl-10">
          <h1 class="title">{{story.content.title}}</h1>
        </div>
      </div>
      <div class="row project-details" v-editable="story.content">
        <div class="col-12 col-md-3 designer">
          <p>{{story.content.designer}}</p>
        </div>
        <div class="col-12 col-md-7 intro">
          <p>{{story.content.intro}}</p>
        </div>
      </div>
      <div class="row cover-image">
        <div class="col-12">
          <img-resize :size="size" :link="story.content.coverImage" />
        </div>
      </div>
      <div class="row project-images">
        <div class="col-12 col-md-6" :class="image.component === 'textProject' ? 'text-project':'image-project'" v-for="image in story.content.images" :key="image._uid" :data-modifier="image.component">
          <div v-if="image.component === 'imageProject'">
              <img-resize v-parallax="-0.2" :size="sizeSmall" :link="image.image"/>
          </div>
          <div v-if="image.component === 'textProject'">
              <p v-parallax="0">{{image.text}}</p>
          </div>
        </div>
      </div>
      <div class="row pagination">
        <div class="col-6 prev">
          <nuxt-link :to="`/${this.projects[prev].full_slug}`">Previous project</nuxt-link>
        </div>
        <div class="col-6 next">
          <nuxt-link :to="`/${this.projects[next].full_slug}`">Next project</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      viewportWidth: 0,
    }
  },
  computed: {
    size() {
      return "1200x0"
    },
    sizeSmall() {
      return "700x0"
    },
    projects() {
      this.$store.state.projects
        return this.$store.state.projects
    },
    currentProject() {
      this.projects
        return this.projects.findIndex(x => x.slug === this.$route.params.project)
    },
    next() {
      this.currentProject
        if (this.currentProject === this.projects.length - 1) {
          return 0
        } else {
          return this.currentProject + 1
        }
    },
    prev() {
        if (this.currentProject === 0) {
          return this.projects.length - 1
        } else {
          return this.currentProject - 1
        }
    },
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', function () {
      window.location.reload()
    })
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi.get(`cdn/stories/projects/${context.params.project}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res})
    })
  }
}
</script>

<style lang="scss" scoped>
  
  p {
    font-size: 1.5rem;
    line-height: calc(1.5rem + 0.25*1.5rem);
  }

  .title {
    @include media-breakpoint-up(md) {
      position: absolute;
      opacity: 0.3;
      padding-top: 5.5rem;
    }
    
    h1 {
      position: relative;
      z-index: 10;
      font-size: 5rem;
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
        font-size: 9.5rem;
      }
    }
  }

  .project-details {
    position: relative;
    z-index: 1;
    
    padding-bottom: 2rem;
    @include media-breakpoint-up(md) {
      display: flex;
      align-items: flex-end;
      margin-top: 5rem;
      padding-top: 8rem;
      padding-bottom: 8rem;
    }
  }

  .cover-image {
    img {
      max-width: 100%;
    }
  }

  .project-images {
    position: relative;
    margin-top: 3rem;

    @include media-breakpoint-up(md) {
      margin-top: 10rem;
    }

    .text-project {
      z-index: 5;
    }

    .image-project {
      z-index: 1;
    }


    img {
      width: 100%;
    }
  }

  .pagination {
    position: relative;
    z-index: 999;
    padding-top: 5rem;
    padding-bottom: 5rem;
    a {
      color: $color-type-primary;
      font-size: $font-size-body;
    }
    .next {
      text-align: right;
    }
  }
</style>
