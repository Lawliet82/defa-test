<template>
  <div id="app">
    <modal></modal>
    <studentsList></studentsList>
    <search></search>
  <!--   <component
      v-for="(block, key) in pageBlocks"
      :key="key"
      :is="allow(block.name)"
      :content="block.content"
      ></component>
  -->

  </div>
</template>

<script>
import modal from './components/modal'
import studentsList from './components/studentsList'
import search from './components/search'

export default {
  name: 'app',
  components: {
    modal,
    studentsList,
    search
  }
}
</script>

<style lang="scss" src='./assets/scss/main.scss'></style>