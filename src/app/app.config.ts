import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

const _tailwindColors = [
  'to-red-600/30',
  'to-orange-600/30',
  'to-amber-600/30',
  'to-yellow-600/30',
  'to-lime-600/30',
  'to-green-600/30',
  'to-emerald-600/30',
  'to-teal-600/30',
  'to-cyan-600/30',
  'to-sky-600/30',
  'to-blue-600/30',
  'to-indigo-600/30',
  'to-violet-600/30',
  'to-purple-600/30',
  'to-fuchsia-600/30',
  'to-pink-600/30',
  'to-rose-600/30'
];

const _tw = [
  'bg-red-500','bg-orange-500','bg-amber-500','bg-yellow-500','bg-lime-500','bg-green-500','bg-emerald-500',
  'bg-teal-500','bg-cyan-500','bg-sky-500','bg-blue-500','bg-indigo-500','bg-violet-500','bg-purple-500',
  'bg-fuchsia-500','bg-pink-500','bg-rose-500'
];
