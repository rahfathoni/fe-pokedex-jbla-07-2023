<template>
  <q-dialog ref="dialogRef" 
    @hide="onDialogHide" 
    transition-show="slide-up" 
    transition-hide="slide-down" 
    :maximized="$q.platform.is.mobile"
    >
    <q-card class="q-dialog-plugin" style="width: 1000px">
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
        <div class="text-h6 text-uppercase">[#{{ detail.id }}] {{ detail.name }}</div>
      </q-card-section>
        <!-- <div class="text-subtitle2">by John Doe</div> -->

      <q-card-section class="q-pt-none">
        under constraction
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useDialogPluginComponent } from "quasar";

export default {
  name: "PokemonDetailDesktopDialog",
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const store = useStore();
    const slide = ref(1);

    //COMPUTED
    const detail = computed(() => store.getters["main/getPokemonDetail"]);
    const detailPicture = computed(() => {
      const choosenPic = [
        detail.value.sprites.other['official-artwork'].front_default,
        detail.value.sprites.other.home.front_default,
        detail.value.sprites.other.dream_world.front_default,
        detail.value.sprites.front_default,
        detail.value.sprites.other['official-artwork'].front_shiny
      ]
      return choosenPic.filter((item) => item !== null);
    });

    // console.log(store.getters["main/getPokemonDetail"])

    return {
      dialogRef,
      detail,
      onDialogHide,
      slide,
      detailPicture,
    };
  }
};
</script>
