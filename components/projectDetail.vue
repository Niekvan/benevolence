<template>
  <div class="project row" v-editable="project">
    <p class="designer col-2">{{project.designer}}</p>
    <div class="links col-10">
      <p class="link" v-editable="singleProject" v-for="(singleProject, index) in project.projects" :key="singleProject._uid">
        <nuxt-link :to="`/${singleProject.link.cached_url}`">{{singleProject.title}}</nuxt-link>
        <span v-if="index === project.projects.length - 1">.</span>
        <span v-else class="comma">,</span>
        <img-resize class="image-cover" :link="singleProject.cover_image" size="600x0" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:['project'],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .project {
    text-align: left;
    position: relative;
    padding-bottom: 1rem;

    div {
      &.links {
        position: relative;
        display: inline-block;
      }
    }
    p {
      display: inline-block;

      &.designer {
        // font-size: $font-size-body;
        font-weight: 200;
        text-transform: capitalize;
        text-align: left;
      }

      &.link {
        // font-size: 2rem;
        color: $color-type-primary;
        text-decoration: none;

        img {
          position: absolute;
          top: 0;
          transform: translate(-1rem, calc(-50% + 1.5rem));
          display: none;
          z-index: 2;
        }

        span {
          line-height: 0.8em;
        }

        .comma {
          margin-right: 6px;
        }

        a {
          display: inline-block;
          position: relative;
          color: inherit;
          text-decoration: inherit;
          z-index: 1;

          &:hover {
            cursor: pointer;
            z-index: 3;
            &:after {
              bottom: calc(40% - #{$height-line-link}/2);
            }
            ~ img.image-cover {
              display: block;
            }
          }
          &:after {
            position: absolute;
            left: 0;
            bottom: 0;
            content: '';
            width: 100%;
            height: $height-line-link;
            transition: all 0.3s;
            background: $color-type-primary;
          }
        }
      }
    }
  }
</style>
