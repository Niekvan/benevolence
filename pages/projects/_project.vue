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
        <div class="col-12 col-md-6 element" :class="image.component === 'textProject' ? 'text-project':'image-project'" v-for="image in story.content.images" :key="image._uid" :data-modifier="image.component">
          <div v-if="image.component === 'imageProject'">
            <!-- <div class="col-12 col-md-6"> -->
              <img-resize :size="sizeSmall" :link="image.image"/>
            <!-- </div> -->
          </div>
          <div v-if="image.component === 'textProject'">
            <!-- <div class="col-12 col-md-6"> -->
              <p>{{image.text}}</p>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let basicScroll
if (process.browser) {
  basicScroll = require('basicscroll')
}

export default {
  data() {
    return {
      viewportWidth: 0,
      start: false,
      instances: []
    }
  },
  computed: {
    size() {
      return "1200x0"
    },
    sizeSmall() {
      return "700x0"
    },
  },
  methods: {
    getWidth(event) {
      this.viewportWidth = document.documentElement.clientWidth;
      if(this.viewportWidth > 786 && this.start === false) {
        this.startAnimation()
      } else if (this.viewportWidth <= 786) {
        this.stopAnimation()
      }
    },
    startAnimation() {
      this.start = true
      document.querySelectorAll('.element').forEach((elem, i) => {
        const direction = elem.getAttribute('data-modifier') === 'imageProject' ? {from: '0', to: '-100px'} : {from: '0', to: '200px'}
        this.instances.push(basicScroll.create({
        elem: elem,
        from: 'middle-bottom',
        to: 'bottom-top',
        direct: true,
        props: {
          '--ty': direction
        }
      }))
      })
      this.instances.forEach(instance => instance.start())
    },
    stopAnimation() {
      this.start = false
      this.instances.forEach(instance => instance.destroy())
    }
  },
  mounted () {
    this.$storyblok.init()
    this.$storyblok.on('change', function () {
      window.location.reload()
    })
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWidth)
      this.getWidth()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWidth)
  },
  asyncData(context) {
    let version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    return context.app.$storyapi.get(`cdn/stories/projects/${context.params.project}`, {
      version: version
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
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

    .element {
      transform: translateY(var(--ty));
      will-change: transform;
      padding-bottom: 3rem;

      &.text-project {
        z-index: 5;
      }

      &.image-project {
        z-index: 1;
      }
    }


    img {
      width: 100%;
    }
  }
</style>
