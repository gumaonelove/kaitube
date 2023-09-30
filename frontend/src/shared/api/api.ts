import axios from 'axios';

const baseUrl = 'https://tat-asr.api.tatarby.tugantel.tatar';

export const $api = axios.create({
    baseURL: baseUrl,
});
