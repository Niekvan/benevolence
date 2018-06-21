<template>
  <div class="project container">
    <p class="designer">{{project.designer}}</p>
    <div class="project-titles">
      <!-- <nuxt-link></nuxt-link> -->
    </div>
  </div>
</template>

<script>
export default {
  props:['project']
}
</script>

<style lang="scss" scoped>
  .project {
    text-align: left;
    p, div {
      display: inline-block;
      &.designer {
        font-size: 2rem;
      }

      &.project-title {
        font-size: 2rem;
        text-decoration: underline;
      }
    }
    .project-titles {
      margin-left: 2rem;
    }
  }
</style>
