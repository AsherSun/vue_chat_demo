<template>
  <div class="login">
    <div
      :class="item"
      v-for="(item, index) in list_1"
      :key="index"
      @click="clickMe($event)">{{`${item}_${index}`}}
    </div>
    <div
      length="index"
      :id="item" v-for="(item, index) in list_2"
      :key="item"
      @click="clickMe($event)">{{`${item}_${index}`}}>{{`#_${item}_${index}`}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    clickMe (e) {
      this.$alert()
      this.$utils.dom(e.target).addClass('asher').siblings().removeClass('asher')
      // this.$utils.dom('.login-box').removeClass('asher')
      // this.$utils.dom('#box_1').addClass()
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this.$utils.dom('#box_1')
    })
  },
  data () {
    return {
      list_1: ['login-box', 'login-box', 'login-box', 'login-box', 'login-box', 'login-box ', 'login-box'],
      list_2: ['box_1', 'box_2', 'box_3', 'box_4']
    }
  }
}
</script>

<style lang="scss">
.login {
  $blue: #18757e;
  $w: 375px;
  div {
    width: $w;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    background-color: $blue;
  }
}
</style>
