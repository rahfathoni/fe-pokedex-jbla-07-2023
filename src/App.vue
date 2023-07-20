<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy bg-red" bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-img
          :src="require('@/assets/pokedex.png')"
          height="40px"
          width="220px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header class="flex flex-center"> 
          <q-img width="60%" :src="require('@/assets/pokemon-word.png')" alt="pokeball" />
        </q-item-label>
        <!-- <q-item clickable tag="a" target="_blank" href="https://quasar.dev"> -->
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" color="red" />
          </q-item-section>
          <q-item-section>
            <q-item-label>HOME</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/"> -->
        <q-item clickable to="/favorite">
          <q-item-section avatar>
            <q-icon name="star" style="color: #FFC300" />
          </q-item-section>
          <q-item-section>
            <q-item-label>FAVORITE</q-item-label>
            <q-item-label caption>Your favorite Pokemon.</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view class="bg-white q-mx-xl" />
    </q-page-container>

    <q-footer
      class="footer row wrap justify-center items-start content-start q-py-sm glossy bg-red"
    >
      <div class="text-grey-2" style="font-size: 15px">
        © Copyright 2023. POKEDEX rights reserved
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LayoutDefault',
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style>
.footer {
  position: absolute;
  font-size: 12px;
  padding: 8px;
  bottom: 0;
  width: 100%;
  border-top: 0.3px solid black;
}
</style>