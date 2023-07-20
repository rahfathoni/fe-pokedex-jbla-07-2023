<template>
  <q-dialog ref="dialogRef" 
    @hide="onDialogHide" 
    transition-show="slide-up" 
    transition-hide="slide-down" 
    :maximized="$q.platform.is.mobile"
    >
    <q-card class="q-dialog-plugin" style="width: 1000px">
      <q-bar>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section
        class="fit row inline wrap justify-center items-start content-start q-pt-md q-pb-none q-px-lg"
        horizontal
      >
      Under Construction
      <!-- {{detail}} -->
        <!-- <q-card-section class="q-pt-md q-pb-none">
          <div class="text-h4 q-mb-sm">{{ playerDetail.name }}</div>
          <div
            v-for="(item, index) in playerDetail.data"
            :key="'id' + index"
            class="fit row inline wrap justify-start items-start content-start"
            style="font-size: 15px"
          >
            <div class="col-5 q-mb-sm">{{ item.field }}</div>
            <div class="col-1">:</div>
            <div class="col-6 text-weight-medium">
              {{ item.value }}
            </div>
          </div>
        </q-card-section> -->

        <!-- <q-card-section class="col-4 flex flex-center">
          <q-img class="rounded-borders" src="../../../assets/noimage.png" />
        </q-card-section> -->
      </q-card-section>
      <q-separator class="q-pt-none bg-color-red-v1" inset />
      <!-- <q-card-section class="q-pt-sm q-pb-lg">
        <div style="font-size: 10px" class="text-right">
          Last updated : {{ playerDetail.lastUpdated }}
        </div>
      </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useDialogPluginComponent } from "quasar";

export default {
  name: "PokemonDetailDesktopDialog",
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const store = useStore();

    //COMPUTED
    const detail = computed(() => store.getters["main/getPokemonDetail"]);

    return {
      dialogRef,
      detail,
      onDialogHide,
    };
  },
};
</script>
