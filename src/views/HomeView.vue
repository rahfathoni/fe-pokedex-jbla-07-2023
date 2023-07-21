<template>
  <div class="q-pt-md q-pb-lg scrolling-component" ref="scrollComponent">
    <div class="text-center">
      <div class="text-center">
        <q-img class="q-mr-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball1" />
        <q-img :width="$q.platform.is.mobile ? '50%' : '30%'" :src="require('@/assets/gotta-catch-them-all.png')" />
        <q-img  class="q-ml-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball2" />
      </div>
    </div>
    <div class="fit row inline wrap justify-around items-start content-start">
      <q-card
        v-for="(item, index) in pokemonList"
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
        <q-item class="bg-grey-6">
          <q-item-section>
            <q-item-label class="text-subtitle2 text-center text-uppercase">[#{{item.id}}] {{ item.name }}</q-item-label>
            <!-- <q-item-label caption>Subhead</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, computed, ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import PokemonDetailComponent from  "./pokemon/Detail.vue"

export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const scrollComponent = ref(null)

    //BEFORE MOUNTED
    onBeforeMount(async () => {
      window.addEventListener("scroll", handleScroll)
      const data = store.getters["main/getPokemonList"];
      const stateOffset = store.getters["main/getOffset"];
      if (data && data.length === 0) {
        await store.dispatch("main/inquiryListPokemon", {
          offset: stateOffset
        });
      }
    });
    
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll)
    })

    //COMPUTED
    const pokemonList = computed(() => store.getters["main/getPokemonList"]);
    const loading = computed(() => store.getters["main/getLoading"]);

    const loadMorePosts = async () => {
      const stateOffset = store.getters["main/getOffset"];
      if (!loading.value) {
        await store.dispatch("main/inquiryListPokemon", {
          offset: stateOffset
        });
      }
    }
    const handleScroll = () => {
      if (!store.getters["main/getEndData"]) {
        let element = scrollComponent.value
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          loadMorePosts()
        }
      }
    }
    const detailDialog = async (item) => {
      $q.dialog({
        component: PokemonDetailComponent,
        componentProps: {
          pokemonData: item,
        }
      }).onOk(() => {});
    }

    return {
      pokemonList,
      loadMorePosts,
      scrollComponent,
      detailDialog
    };
  }
}
</script>
