<template>
  <section class="col-12">
    <div class="row">
      <div class="col-12 info">
        <h4>Info:</h4>
        <p v-editable="data">{{data.info}}</p>
      </div>
      <div class="col-12 dates">
        <h4>Dates:</h4>
        <ul>
          <li v-editable="date" v-for="date in data.dates" :key="date._uid">{{dateFormat(date.date_start)}} - {{dateFormat(date.date_end)}} {{date.place}}
            <span class="info" v-if="date.info"><br>{{date.info}}</span>
          </li>
        </ul>
      </div>
      <div class="col-12 partners">
        <h4>Our partners:</h4>
        <slick ref="slick" :options="slickOptions">
          <div v-for="image in data.logos" :key="image._uid" class="logo_wrapper">
            <div class="logo">
              <img :src="image.image" />
            </div>
          </div>
        </slick>
      </div>
    </div>
  </section>
</template>

<script>
import '~/node_modules/slick-carousel/slick/slick.css'
export default {
  data () {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToscroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        speed: 5000,
        arrows: false,
        pauseOnHover: false,
        mobileFirst: true
      },
    }
  },
  props: ['data'],
  methods: {
    dateFormat(date) {
      return this.$moment(date).format('DD-MM-YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
  section {
    text-align: left;

    .dates, .info {
      margin-top: 2rem;
    }

    p {
      @include smaller;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        @include smaller;
        .info {
          padding-left: 0.5rem;
          font-style: italic;
        }
      }
    }
    
    .partners {
      padding-top: 2rem;

      .logo_wrapper {
        height: 50pt;
        box-sizing: border-box;
        margin-top: 2rem;
      }

      .logo {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        
        img {
          display: block;
          max-height: 50pt;
          width: 100%;
          filter: grayscale(100%)invert(100%);
        }
      }
    }
  }
</style>
