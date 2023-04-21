<template>
  <q-page class="q-pa-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Breadcrumbs" />
    </q-breadcrumbs>

    <div class="row justify-between">
      <div class="title">Browse Webcams</div>
      <div v-if="crawlerStatus === 'active'">
        <!-- TODO -->
        Crawl status 12/4343
        <q-btn label="View stats"></q-btn>
      </div>
      <q-btn-dropdown color="primary" label="Add camera">
        <q-list>
          <q-item clickable v-close-popup @click="addCamera('manual')" >
            <q-item-section>
              <q-item-label>Manual</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="addCamera('crawl')" >
            <q-item-section>
              <q-item-label>Crawl</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <q-tabs v-model="tab" indicator-color="purple" dense
      align="justify" class="q-mt-md bg-primary text-white shadow-2"
      :breakpoint="0">
      <!-- TODO event_list -> Two icons with _ inbetween -->
      <q-tab name="pane" icon="check_box_outline_blank" label="Panes" />
      <q-tab name="list" icon="list" label="List" />
      <q-tab name="map" icon="map" label="Maps" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="pane" class="panel row">
        <div
          v-for="webcam in webcams" :key="webcam"
          class="col-3 q-ma-md q-pa-sm pane row justify-between content-start">
          <div class="column col-6">
            <div class="text-h5">Name</div>
            <div class="text-subtitle2">Description</div>
          </div>
          <div class="column col-6" style="text-align: right;">
            <div class="text-subtitle2">Location</div>
            <div class="text-subtitle2" color="green">Active</div>
            <div class="text-subtitle2">Date fetched</div>
          </div>
          <br>
          <video class="col-12">
            <source  src="http://techslides.com/demos/sample-videos/small.ogv">
          </video>
        </div>
      </q-tab-panel>
      <q-tab-panel name="list" class="q-pa-none panel">
        <q-layout view="hHh Lpr lff" container style="height: 700px"
          class="shadow-2 rounded-borders">
          <q-drawer
          side="right"
          v-model="drawerRight"
          show-if-above
          bordered
          :width="200"
          :breakpoint="600"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        >
            <div class="q-pa-sm" style="position: fixed;">
              <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
            </div>
        </q-drawer>
           <q-page-container>
        <q-page padding>
          <div class="column">
            <q-card v-for="webcam in webcams" :key="webcam" @click="drawerRight = !drawerRight"
              style="cursor: pointer;" class="q-ma-md q-pa-md" flat bordered>
              <q-card-section horizontal>
        <q-img
          class="col-5"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
        />

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nam amet possimus, maxime quo odit quibusdam,
          laudantium, numquam
          illo earum commodi dolores! Consectetur atque eveniet minus vel quasi minima odio earum.
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>
          5:30PM
        </q-btn>
        <q-btn flat>
          7:00PM
        </q-btn>
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions>
            </q-card>
          </div>
          <div></div>
        </q-page>
      </q-page-container>
        </q-layout>
      </q-tab-panel>
      <q-tab-panel name="map" class="q-pa-none">
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="showDialog">
      <q-card v-if="dialogType == 'manual'" class="card column">

        <q-card-section class="col-4">
          Manual
        </q-card-section>

        <q-card-section class="q-pt-none col-6">
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="col-1">
          <q-btn v-close-popup flat color="primary" label="Add" />
          <q-btn v-close-popup flat color="grey" label="Cancel"/>
        </q-card-actions>
      </q-card>

      <q-card v-else class="card column">
        <q-card-section class="col-4">
          Crawl
        </q-card-section>

        <q-card-section class="q-pt-none col-6">
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="col-1">
          <q-btn v-close-popup flat color="primary" label="Start" />
          <q-btn v-close-popup flat color="grey" label="Cancel"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { useWebcamStore } from 'src/stores/webcam';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const webcamStore = useWebcamStore();
const webcams = ref([1, 2, 3, 4, 5, 6, 7]);
const crawlerStatus: Ref<'active' | 'inactive'> = ref('inactive');

onMounted(() => {
  // webcams.value = webcamStore.getWebcams;
  console.log(webcams.value);
});

const tab = ref('pane');
const showDialog = ref(false);
const dialogType = ref('manual');

const addCamera = (type: 'manual' | 'crawl') => {
  dialogType.value = type;
  showDialog.value = true;
};

const drawerRight = ref(false);

</script>

<style lang="scss" scoped>

.panel {
  border: solid grey 1px;
  min-height: 500px;
}
.pane {
  border: solid grey 1px;
}
.title {
  font-size: 3em;;
}

.card {
  width: 50%;
  height: 50%;
}
</style>
