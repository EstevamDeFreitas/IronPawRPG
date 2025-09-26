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
  'to-rose-600/30',

  'to-red-500/40',
  'to-orange-500/40',
  'to-amber-500/40',
  'to-yellow-500/40',
  'to-lime-500/40',
  'to-green-500/40',
  'to-emerald-500/40',
  'to-teal-500/40',
  'to-cyan-500/40',
  'to-sky-500/40',
  'to-blue-500/40',
  'to-indigo-500/40',
  'to-violet-500/40',
  'to-purple-500/40',
  'to-fuchsia-500/40',
  'to-pink-500/40',
  'to-rose-500/40',

  'bg-red-500/40',
  'bg-orange-500/40',
  'bg-amber-500/40',
  'bg-yellow-500/40',
  'bg-lime-500/40',
  'bg-green-500/40',
  'bg-emerald-500/40',
  'bg-teal-500/40',
  'bg-cyan-500/40',
  'bg-sky-500/40',
  'bg-blue-500/40',
  'bg-indigo-500/40',
  'bg-violet-500/40',
  'bg-purple-500/40',
  'bg-fuchsia-500/40',
  'bg-pink-500/40',
  'bg-rose-500/40',
  'bg-zinc-500/40',

  'from-zinc-900',
  'via-zinc-900',
  'from-zinc-800',
  'via-zinc-800',
  'to-zinc-900',
  'to-zinc-800',

  'text-red-500',
  'text-amber-500',
  'text-black',
];

const _tw = [
  'bg-red-500','bg-orange-500','bg-amber-500','bg-yellow-500','bg-lime-500','bg-green-500','bg-emerald-500',
  'bg-teal-500','bg-cyan-500','bg-sky-500','bg-blue-500','bg-indigo-500','bg-violet-500','bg-purple-500',
  'bg-fuchsia-500','bg-pink-500','bg-rose-500'
];

const _tw800 = [
  'bg-red-800','bg-orange-800','bg-amber-800','bg-yellow-800','bg-lime-800','bg-green-800','bg-emerald-800',
  'bg-teal-800','bg-cyan-800','bg-sky-800','bg-blue-800','bg-indigo-800','bg-violet-800','bg-purple-800',
  'bg-fuchsia-800','bg-pink-800','bg-rose-800'
];
