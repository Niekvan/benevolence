<template>
  <section class="col-12">
    <div class="row">
      <div class="col-12 info">
        <h5>Info:</h5>
        <p v-editable="data">{{data.info}}</p>
      </div>
      <div class="col-12 dates">
        <h5>Dates:</h5>
        <ul>
          <li v-editable="date" v-for="date in data.dates" :key="date._uid">{{dateFormat(date.date_start)}} - {{dateFormat(date.date_end)}} {{date.place}}
            <span class="info" v-if="date.info"><br>{{date.info}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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

    p {
      font-size: $font-size-body;
      line-height: $font-size-body + 0.25*($font-size-body);
    }

    .dates, .info {
      margin-top: 2rem;
    }

    ul {
      list-style: none;
      padding-left: 0;
      font-size: $font-size-base * 1.5;

      li {
        .info {
          padding-left: 0.5rem;
          font-style: italic;
        }
      }
    }
  }
</style>
