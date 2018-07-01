<template>
  <div class="menu">
    <div class="trigger" @click="trigger = !trigger"></div>
    <ul class="menu-animate" :class="{ active: trigger }">
      <li><nuxt-link to="/#home">Home</nuxt-link></li>
      <li><nuxt-link to="/#projects">Projects</nuxt-link></li>
      <li><nuxt-link to="/#about">About</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () { 
    return {
      trigger: false
    }
  }
}
</script>


<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  .trigger {
    position: relative;
    top: $font-size-body;
    left: $font-size-body;
    width: $font-size-body;
    height: $font-size-body;
    
    &:after, &:before {
      content: '';
      width: 3px;
      height: $font-size-body;
      background: $color-type-accent;

      position: absolute;
      top: 0;

      transition: transform 0.3s;
    }
    &:after {
      right: 0;
    }
    &:before {
      left: 0;
    }

    &:hover {
      cursor: pointer;

      &:before {
        transform: translateX(#{$font-size-body/2})rotate(90deg);
      }
      &:after {
        transform: translateX(calc(-#{$font-size-body/2} + 3px));
      }
    }
  }

  ul {
    list-style-type: none;
    padding: 1rem 0;
    width: 0;
    display: flex;
    justify-content: space-between;
    background: $color-light;
    overflow: hidden;

    margin-top: -$font-size-body;

    transition: all 0.3s;

    a {
      color: $color-type-primary;
    }

    &.active {
      width: 100%;
      box-sizing: border-box;
      padding: 1rem 5rem;
    }
  }
}
</style>
