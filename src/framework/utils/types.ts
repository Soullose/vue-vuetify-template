import type Vue from 'vue';

export type InstallPlugin = (vue: typeof Vue) => any;
