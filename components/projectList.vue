<template>
  <section>
    <project-detail v-for="project in projects" :project="project" :key="project._uid" />
  </section>
</template>

<script>
export default {
  props: ['projects']
}
</script>

<style lang="scss" scoped>

</style>
