<template>
  <div class="q-pt-md q-pb-lg">
    <div class="text-center">
      <div class="text-center">
        <q-img :width="$q.platform.is.mobile ? '50%' : '30%'" :src="require('@/assets/gotta-catch-them-all.png')" />
      </div>
    </div>
    <div class="fit row inline wrap justify-around items-start content-start">
      <q-card
        v-for="(item, index) in pokemonList"
        :key="'id' + index"
        v-ripple
        class="col-4 q-mx-md q-mt-lg cursor-pointer q-hoverable"
        :style="'border: 2px solid blue;' + ($q.platform.is.mobile ? 'width: 100px' : 'width: 150px')"
      >
        <!-- @click="redirect(item)" -->
        <q-img :src="
          item.sprites.other['official-artwork'].front_default ? item.sprites.other['official-artwork'].front_default : 
          item.sprites.other.home.front_default" 
          :alt="item.name"
        />
        <q-item class="bg-grey-6">
          <q-item-section>
            <q-item-label class="text-subtitle2 text-center text-uppercase">#{{item.order}} - {{ item.name }}</q-item-label>
            <!-- <q-item-label caption>Subhead</q-item-label> -->
          </q-item-section>
        </q-item>

      </q-card>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: 'HomeView',
  setup() {
    const store = useStore();

    //BEFORE MOUNTED
    onBeforeMount(async () => {
      const data = store.getters["main/getPokemonList"];
      const stateOffset = store.getters["main/getOffset"];
      if (data && data.length === 0) {
        await store.dispatch("main/inquiryListPokemon", {
          offset: stateOffset
        });
      }
    });

    //COMPUTED
    const pokemonList = computed(() => store.getters["main/getPokemonList"]);
  
    return {
      pokemonList
    };
  }
}
</script>
