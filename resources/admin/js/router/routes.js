function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

export default [
  {
    path: '/admin',
    component: { template: `<router-view></router-view>` },
    children: [
      { path: '', name: 'home', component: page('home.vue') },

      { path: 'login', name: 'login', component: page('auth/login.vue') },
      { path: 'password/reset', name: 'password.request', component: page('auth/password/email.vue') },
      { path: 'password/reset/:token', name: 'password.reset', component: page('auth/password/reset.vue') },

      {
        path: 'settings',
        component: page('settings/index.vue'),
        children: [
          { path: '', redirect: { name: 'settings.profile' } },
          { path: 'profile', name: 'settings.profile', component: page('settings/profile.vue') },
          { path: 'password', name: 'settings.password', component: page('settings/password.vue') }
        ]
      },

      { path: '*', component: page('errors/404.vue') }
    ]
  }
]
