<template>
  <div class="q-pt-md q-pb-lg">
    <div class="text-center">
      <div class="text-center">
        <q-img class="q-mr-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball1" />
        <q-img :width="$q.platform.is.mobile ? '50%' : '30%'" :src="require('@/assets/gotta-catch-them-all.png')" />
        <q-img  class="q-ml-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball2" />
      </div>
    </div>
    <h4 class="text-weight-bold q-mb-none text-red"> Favorite </h4>
    <q-separator size="3px" color="blue" />
    <div class="fit row inline wrap justify-around items-start content-start">
      <q-card
        v-for="(item, index) in favoriteList"
        :key="'id' + index"
        v-ripple
        class="col-4 q-mx-md q-mt-lg cursor-pointer q-hoverable"
        :style="'border: 2px solid blue;' + ($q.platform.is.mobile ? 'width: 100px' : 'width: 150px')"
        @click="detailDialog(item)"
      >
        <q-img :src="
          item.sprites.other['official-artwork'].front_default ? item.sprites.other['official-artwork'].front_default : 
          item.sprites.other.home.front_default" 
          :alt="item.name"
        />
        <q-item class="bg-yellow glossy">
          <q-item-section>
            <q-item-label class="text-subtitle2 text-weight-bold text-center text-uppercase">[#{{item.id}}] {{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import PokemonDetailComponent from  "./pokemon/Detail.vue"


export default {
  name: 'FavoriteView',
  setup() {
    const store = useStore();
    const $q = useQuasar();

    //COMPUTED
    const favoriteList = computed(() => store.getters["main/getFavPokemonList"]);

    const detailDialog = async (item) => {
      $q.dialog({
        component: PokemonDetailComponent,
        componentProps: {
          pokemonData: item,
        }
      }).onOk(() => {});
    }

    return {
      favoriteList,
      detailDialog
    };
  }
}
</script>
