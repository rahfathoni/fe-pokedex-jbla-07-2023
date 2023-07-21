<template>
  <div class="q-pt-md q-pb-lg scrolling-component" ref="scrollComponent">
    <div class="text-center">
      <div class="text-center">
        <q-img class="q-mr-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball1" />
        <q-img :width="$q.platform.is.mobile ? '50%' : '30%'" :src="require('@/assets/gotta-catch-them-all.png')" />
        <q-img  class="q-ml-lg" :width="$q.platform.is.mobile ? '15%' : '10%'" :src="require('@/assets/pokeball.png')" alt="pokeball2" />
      </div>
    </div>
    <div class="fit row justify-start items-start content-start q-mb-none q-pb-none q-mt-md">
      <div class="col-md-5 col-xs-12">
        <q-select 
          v-model="typeFilter" 
          hide-bottom-space 
          rounded 
          outlined 
          bottom-slots 
          :options="optionType" 
          label="Choose Type..."
          @update:model-value="inputFilterType"
        >
          <template v-slot:append>
            <q-icon v-if="typeFilter" name="close" @click.stop.prevent="clearInputType" class="cursor-pointer" />
          </template>
        </q-select>
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
import { onBeforeMount, computed, ref, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import PokemonDetailComponent from  "./pokemon/Detail.vue"

export default {
  name: 'HomeView',
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const scrollComponent = ref(null);
    const typeFilter = ref(null);

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
    const optionType = computed(() => store.getters["main/getOptionType"]);

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
    const inputFilterType = async () => {
      if (typeFilter.value) {
        await store.dispatch("main/inquiryPokemonByType", {
            type: typeFilter.value
        });
      }
    }
    const clearInputType = async () => {
      typeFilter.value = '';
      await store.dispatch("main/inquiryListPokemon", {
        offset: 0,
        afterType: true
      }); 
    }

    return {
      pokemonList,
      loadMorePosts,
      scrollComponent,
      detailDialog,
      typeFilter,
      optionType,
      inputFilterType,
      clearInputType
    };
  }
}
</script>
