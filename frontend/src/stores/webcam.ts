import { defineStore } from 'pinia';
import type { AxiosResponse } from 'axios';

interface Webcam {
  name: string;
  live: boolean;
  location?: Location;
}

export const useWebcamStore = defineStore('webcam', {

  state: () => ({
    webcams: [],
  }),

  getters: {
    getWebcams(state) {
      return Array.from(state.webcams.values());
    },
  },

  actions: {
    addWebcam(webcam: Webcam) {
      throw new Error('Not implemented');
    },
    async fetchWebcams() {
      try {
        const { client } = await import('boot/axios');
        const resp: AxiosResponse = await client.get('/vehicle');
        this.webcams = resp.data.webcams;
      } catch (error) {
        console.log(error);
      }
    },
  },

});
