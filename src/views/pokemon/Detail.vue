<template>
  <q-dialog 
    ref="dialogRef" 
    @hide="onDialogHide" 
    transition-show="slide-up" 
    transition-hide="slide-down" 
    :maximized="$q.platform.is.mobile"
    >
    <q-card class="q-dialog-plugin" style="width: 1000px; border: 2px solid blue; border-radius: 8px;">
      <q-bar style="border-bottom: 2px solid blue; background-color: yellow" class="glossy" >
        <q-space />
        <q-btn dense flat text-color="blue" size="15px" icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-carousel
        animated
        v-model="slide"
        arrows
        control-color="blue"
        thumbnails
        swipeable
      >
        <q-carousel-slide 
          v-for="(item, index) in detailPicture" 
          :key="index" 
          :name="index" 
          :img-src="item" 
          :alt="`Slide ${index + 1}`" 
        />
      </q-carousel>
      <q-card-section class="q-pt-sm" style="text-align: center;">
        <div class="text-h6 text-uppercase">[#{{ pokemonData.id }}] {{ pokemonData.name }}</div>
        <div>
          <q-chip 
            v-for="(item, index) in detailTypes"
            :key="index" 
            :name="item"
            :style="{
              'background-color': findColorType(item).bg,
              'border' : '1px solid blue'
            }" 
            :text-color="findColorType(item).text"
            class="text-weight-bold glossy"
            :ripple="false"
          >
            {{item.toUpperCase()}}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        other detail under constraction
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
// import { useStore } from "vuex";
import { useDialogPluginComponent } from "quasar";
import { typeColor } from '@/utils.js';

export default {
  name: "PokemonDetailDesktopDialog",
  emits: [...useDialogPluginComponent.emits],
  props: {
    pokemonData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    // const store = useStore();

    const slide = ref(1);
    const detailPicture = ref([
      props.pokemonData.sprites.other['official-artwork'].front_default,
      props.pokemonData.sprites.other.home.front_default,
      props.pokemonData.sprites.other.dream_world.front_default,
      props.pokemonData.sprites.front_default,
      props.pokemonData.sprites.other['official-artwork'].front_shiny
    ].filter((item) => item !== null));
    const detailTypes = computed(() => {
      return props.pokemonData.types.map((item) => item.type.name);
    })

    const findColorType = (item) => {
      return typeColor(item)
    }

    console.log('check prop =>',props.pokemonData)

    return {
      dialogRef,
      onDialogHide,
      slide,
      detailPicture,
      detailTypes,
      findColorType
    };
  }
};
</script>
