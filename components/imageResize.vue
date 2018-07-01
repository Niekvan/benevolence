<template>
  <img :src="imageLink">
</template>

<script>
export default {
  props: ['link', 'size'],
  computed: {
    imageLink() {
      return `//img2.storyblok.com/${this.size}/filters:format(webp)/${this.link.replace('//a.storyblok.com', '')}`
    }
  }
}
</script>
