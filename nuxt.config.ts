const THEME_INIT_SCRIPT = `
(function () {
  var id = localStorage.getItem('theme-id');
  if (id) document.documentElement.setAttribute('data-theme', id);
  var hex = localStorage.getItem('theme-custom-color');
  if (hex) {
    var r = parseInt(hex.slice(1,3),16)/255;
    var g = parseInt(hex.slice(3,5),16)/255;
    var b = parseInt(hex.slice(5,7),16)/255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b), l=(max+min)/2, s=0, h=0;
    if (max !== min) {
      s = l > 0.5 ? (max-min)/(2-max-min) : (max-min)/(max+min);
      if (max===r) h=((g-b)/(max-min))%6;
      else if (max===g) h=(b-r)/(max-min)+2;
      else h=(r-g)/(max-min)+4;
      h=Math.round(h*60); if(h<0) h+=360;
    }
    s=Math.round(s*100); l=Math.round(l*100);
    var el = document.documentElement;
    el.style.setProperty('--color-primary-h', String(h));
    el.style.setProperty('--color-primary-s', s+'%');
    el.style.setProperty('--color-primary-l', l+'%');
  }
})();
`;

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      script: [{ innerHTML: THEME_INIT_SCRIPT, tagPriority: 'critical' }]
    }
  },

  devtools: { enabled: true },
  srcDir: 'app/',
  serverDir: 'server/',

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/a11y',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    'pinia-plugin-persistedstate/nuxt'
  ],

  site: {
    url: 'https://example.com',
    name: 'Nuxt Boilerplate',
    description: 'A scalable Nuxt boilerplate.'
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  sitemap: {
    zeroRuntime: true
  },

  ogImage: {
    enabled: false
  },

  hints: {
    devtools: true,
    features: {
      lazyLoad: { logs: false, devtools: true }
    }
  },

  css: ['@/assets/scss/main.scss'],

  components: [
    { path: '~/components/shared', prefix: 'App' },
    { path: '~/features', pattern: '**/components/**/*.vue', pathPrefix: false }
  ],

  imports: {
    dirs: ['composables', 'stores', 'features/*/composables', 'features/*/stores']
  },

  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English' }],
    strategy: 'no_prefix'
  },

  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedIndexedAccess: true,
        noImplicitOverride: true,
        allowUnreachableCode: false
      }
    }
  },

  vite: {
    optimizeDeps: {
      include: ['pinia-orm', 'pinia-orm/decorators']
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    }
  }
});
