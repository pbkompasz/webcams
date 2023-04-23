import { defineStore } from 'pinia';
import type { AxiosResponse } from 'axios';

interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  description: string;
}

interface Webcam {
  name: string;
  status: boolean;
  location?: GeoLocation;
  m3u8Address?: string;
  mediaAddress?: string;
}

export const useWebcamStore = defineStore('webcam', {

  state: () => ({
    webcams: [{
      name: 'Budapest Center',
      status: false,
      location: {
        name: 'Budapest',
        lat: 47.501449887484796,
        lon: 19.039618179496333,
        description: 'Budapest Castle Hill Funicular',
      },
    }],
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
      console.log(this.webcams);
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
      const { crawlerClient: client } = await import('boot/axios');
      try {
        const resp = await client.get(`/stream?url=${url}`, {
        });
        return resp.data;
      } catch (error) {
        return {
          success: false,
          error: 'Error parseing website',
        };
      }
    },
    async isStream(url: URL | string) {
      const { crawlerClient: client } = await import('boot/axios');
      try {
        const resp = await client.get(`/parse?url=${url}`, {
        });
        return resp.data;
      } catch (error) {
        return {
          success: false,
          error: 'Website does not contain a webcam',
        };
      }
    },
    async saveWebcam(webcam: Webcam) {
      const { client } = await import('boot/axios');
      console.log(webcam);
      try {
        const resp = await client.post('/webcams', {
          webcam,
        });
        this.fetchWebcams();
        return resp.data;
      } catch (error) {
        console.log(error);
        return {
          error: true,
          errorMessage: 'Error saving webcam',
        };
      }
    },
  },

});
