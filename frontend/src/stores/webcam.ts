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
      const { client } = await import('boot/axios');
      const resp: AxiosResponse = await client.get('/webcams?format=json');
      this.webcams = resp.data;
      return resp.data;
    },
    async crawlWebcams(opts?: any) {
      const { client } = await import('boot/axios');
      try {
        const resp: AxiosResponse = await client.post('/crawl', opts);
        return resp.data;
      } catch (error) {
        console.log(error);
        return {
          errorMessage: 'Failed to start crawl job',
          error: true,
        };
      }
    },
    async parseWebsite(url: URL | string) {
      // if (!url.isValid())
      //   throw new Error("URL not valid");
      const { client } = await import('boot/axios');
      try {
        const resp = await client.post(`/webcams`, {
          url,
        });
        return {
          type: resp.data.type,
          noWebcams: resp.data.noWebcams,
          webcams: resp.data.webcams,
        };
      } catch (error) {
        return {
          success: false,
          error: 'Error parseing website',
        };
      }
    },
  },

});
