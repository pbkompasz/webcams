<template>
  <q-page class="q-pa-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" icon="home" to="/" />
      <q-breadcrumbs-el label="Webcams" />
    </q-breadcrumbs>

    <div class="row justify-between items-center">
      <div class="title">Browse Webcams</div>
      <q-card v-if="crawlerStatus === 'active'" flat bordered class="q-pa-md">
        <!-- TODO -->
        Crawl status: {{ crawlerData.webcamsFound }}/{{ crawlerData.websitesTried }}
        <q-btn label="View stats" color="primary" @click="showCrawlerStatsDialog = true"></q-btn>
      </q-card>
      <q-btn-dropdown color="primary" label="Add camera">
        <q-list>
          <q-item clickable v-close-popup @click="addCamera('manual')">
            <q-item-section>
              <q-item-label>Manual</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="addCamera('crawl')">
            <q-item-section>
              <q-item-label>Crawl</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <q-tabs v-model="tab" indicator-color="purple" dense align="justify"
      class="q-mt-md bg-primary text-white shadow-2"
      :breakpoint="0">
      <!-- TODO event_list -> Two icons with _ inbetween -->
      <q-tab name="pane" icon="check_box_outline_blank" label="Pane view" />
      <q-tab name="list" icon="list" label="List view" />
      <q-tab name="map" icon="map" label="Maps view" />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel name="pane" class="panel row">
        <div v-if="webcams.length === 0" class="text-h4">
          No webcams
        </div>
        <div v-for="webcam in webcams" :key="webcam" style="height: 325px"
          class="col-3 q-ma-md q-pa-sm pane row justify-between content-start">
          <div class="column col-6" style="min-height: 100px;">
            <div class="text-h5">{{ webcam?.name }}</div>
            <div class="text-subtitle2">{{  webcam.description }}</div>
          </div>
          <div class="column col-6" style="text-align: right;">
            <div class="text-subtitle2">{{ webcam?.location?.name }}</div>
            <div class="text-subtitle2" color="green">
              {{  webcam.status ? 'Online' : 'Offline' }}
            </div>
            <!-- <div class="text-subtitle2">Date fetched</div>
            <div class="text-subtitle2">Manual or fetched</div> -->
          </div>
          <br>
          <q-img class="col-12" src="https://i.ytimg.com/vi/CJV8EQK6NHs/hqdefault.jpg"
            style="margin-top: auto;"
          >
          </q-img>
        </div>
      </q-tab-panel>
      <q-tab-panel name="list" class="q-pa-none panel">
        <q-layout view="hHh Lpr lff" container style="height: 700px"
          class="shadow-2 rounded-borders">
          <q-drawer side="right" v-model="drawerRight" show-if-above bordered
            :width="300" :breakpoint="600"
            :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
            <div class="q-pa-md">
              <q-img class="col-12" src="https://i.ytimg.com/vi/CJV8EQK6NHs/hqdefault.jpg">
              </q-img>
            </div>
          </q-drawer>
          <q-page-container>
            <q-page padding>
              <div class="column">
                <div v-if="webcams.length === 0" class="text-h4">
                  No webcams
                </div>
                <q-card v-for="webcam in webcams" :key="webcam.name"
                  @click="drawerRight = !drawerRight"
                  style="cursor: pointer;" class="q-ma-md q-pa-md" flat bordered>
                  <q-card-section horizontal>

                    <q-card-section class="row justify-between full-width">
                      <div>
                        {{ webcam.name }}
                        {{ webcam.description }}
                      </div>
                      <div>
                        {{ webcam.status ? 'Online' : 'Offline' }}
                      </div>
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn flat>
                      {{ webcam?.location?.name }}
                      {{ webcam?.location?.lat.toFixed(4) }},
                      {{ webcam?.location?.lon.toFixed(4) }}
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </div>
              <div></div>
            </q-page>
          </q-page-container>
        </q-layout>
      </q-tab-panel>
      <q-tab-panel name="map" class="q-pa-none panel div">
        <WebcamMap class="col-6" :webcams="webcams"></WebcamMap>
        <div class="col-6"></div>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="showDialog" @hide="updateWebcams">
      <q-card v-if="dialogType == 'manual'" class="card column">

        <q-card-section class="">
          Manual
        </q-card-section>

        <q-card-section class="q-pt-none row items-baseline q-mb-xl">
          <q-input color="purple-12" v-model="webcam.url" label="URL"
            :rules="[val => validateUrl(val) || 'Provide a valid URL']" class="col-9">
            <template v-slot:prepend>
              <q-icon name="link" />
            </template>
          </q-input>
          <q-btn flat color="primary" label="Parse" class="col-3" @click="parseWebsite"
            :loading="websiteVerification"
          />
          <div class="jsmpeg" :data-url="videoSrc"></div>
          <div class="row full-width">
            <div class="col-6 q-px-md">
              <q-input v-model="webcam.name" label="Name" />
              <q-input v-model="webcam.description" label="Description" />
            </div>
            <div class="col-6 q-px-md">
              <q-input v-model="webcam.location.name" label="Location" />
              <q-input v-model="webcam.location.lat" label="Latitude" />
              <q-input v-model="webcam.location.lon" label="Longitude" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" >
          <q-btn v-close-popup flat color="primary" label="Add" @click="saveWebcam"
            :disable="!valid" />
          <q-btn v-close-popup flat color="grey" label="Cancel" />
        </q-card-actions>
      </q-card>

      <q-card v-else class="card column">
        <q-card-section class="col-4">
          <div class="text-h5">
            Crawl
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none col-6">
          <q-input color="purple-12" v-model="region" label="Region" class="col-9" disable>
            <template v-slot:prepend>
              <q-icon name="map" />
            </template>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="col-1">
          <q-btn v-close-popup flat color="primary" label="Start"
            @click="startCrawler()" />
          <q-btn v-close-popup flat color="grey" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showCrawlerStatsDialog">
      <q-card class="card">

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import WebcamMap from 'src/components/WebcamMap.vue';
import { useWebcamStore } from 'src/stores/webcam';
import { onMounted, ref } from 'vue';
import { QAjaxBar, useQuasar } from 'quasar';
import type { Ref } from 'vue';
import { loadScript } from "vue-plugin-load-script";

loadScript("https://raw.githubusercontent.com/phoboslab/jsmpeg/master/jsmpeg.min.js")
  .then((JSMpeg) => {
    // Script is loaded, do something
    console.log(JSMpeg);
  })
  .catch((error) => {
    console.log(error);
    // Failed to fetch script
  });

const $q = useQuasar();

const webcamStore = useWebcamStore();
const webcams = ref([]);

const tab = ref('list');
const showDialog = ref(false);
const dialogType = ref('manual');

const addCamera = (type: 'manual' | 'crawl') => {
  dialogType.value = type;
  showDialog.value = true;
};

const updateWebcams = async () => {
  await webcamStore.fetchWebcams();
  webcams.value = webcamStore.getWebcams;
};

const drawerRight = ref(false);
onMounted(async () => {
  await updateWebcams();
});

// Manual add
const webcam = ref({
  url: null,
  name: null,
  description: null,
  status: false,
  location: {
    name: null,
    lat: null,
    lon: null,
  },
});
const valid = ref(false);
const websiteVerification = ref(false);
const validateUrl = (val: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(val);
  } catch (error) {
    return false;
  }
  return true;
};

const videoSrc = ref();
const parseWebsite = async () => {
  if (webcam.value.url) {
    websiteVerification.value = true;
    const [
      isStream,
      streamData,
    ] = await Promise.all([
      webcamStore.isStream(new URL(webcam.value.url)),
      webcamStore.parseWebsite(new URL(webcam.value.url)),
    ]);
    console.log(streamData);
    if (isStream || streamData?.m3u8Address) {
      $q.notify({
        message: 'Found stream',
        position: 'top',
      });
      if (streamData?.mediaAddress) {
        const blob = await fetch(streamData.mediaAddress).then((r) => r.blob());
        console.log(streamData.mediaAddress);
        videoSrc.value = streamData.mediaAddress;
      }
      webcam.value.name = streamData.title;
      valid.value = true;
    } else {
      $q.notify({
        message: 'Stream not found',
        type: 'warning',
        position: 'top',
      });
    }
    websiteVerification.value = false;
  }
};

const saveWebcam = async () => {
  await webcamStore.saveWebcam(webcam.value);
  webcam.value = {
    url: null,
    name: null,
    description: null,
    status: false,
    location: {
      name: null,
      lat: null,
      lon: null,
    },
  };
};

// Crawler
const region = ref('');
const crawlerStatus: Ref<'active' | 'inactive'> = ref('inactive');
const crawlerData = ref({
  websitesTried: 0,
  webcamsFound: 0,
});

// Crawler stats
const showCrawlerStatsDialog = ref(false);
const crawlerFollowUrl = ref('');
const startCrawler = async () => {
  const {
    follow,
    error,
    errorMessage,
  } = await webcamStore.crawlWebcams();
  if (error) {
    $q.notify({
      message: errorMessage,
      type: 'negative',
      position: 'top',
    });
    return;
  }
  crawlerFollowUrl.value = follow;
  crawlerStatus.value = 'active';
};

</script>

<style lang="scss" scoped>
.panel {
  border: solid grey 1px;
  min-height: 500px;
}

.pane {
  border: solid grey 1px;
  min-width: 200px;
  max-height: 325px;
}

.title {
  font-size: 3em;
  ;
}

.card {
  width: 50%;
  height: 50%;
}
</style>
