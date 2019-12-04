import Vue from 'vue'

export default {
  state: {
    // authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJleGciOiJvTkFOVVNKRTAxTDdWSHgzWDJ4UFVTaHUvSjc5bUdLNC92NVlUYXFwTWc5VGwrNmM5Q1hEd0ZseUdiaDhBMm5PIiwiZXhwIjoxNTc1NTU4NzQ3LCJpYXQiOjE1NzQ5NTM5NDcsImZpYiI6IjFvU1Q5eVBJbjg5aFI5YWM4SnZDV1E9PSJ9.GymOaRDrhZOMYhlAEHkPaIqV_IycO9f6fiksyMmo38BegnOwP6ZpOnzP7KFdaBMLPYOMe1Ecr9FttsdVkqP0oA'
    // authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJleGciOiJZNGt1QlhaWWZMQlZGUGJGUGt3Qll5UFFIVk9OenFPS29QalUxMnJHZGJWVGwrNmM5Q1hEd0ZseUdiaDhBMm5PIiwiZXhwIjoxNTc1MzY4ODI1LCJpYXQiOjE1NzQ3NjQwMjUsImZpYiI6IlUydWtyN0pGaHl1S28wOC9zV3JFOEE9PSJ9.rSHf7suX_i3oUah2z1GohKEzHUrL-jUHkVHvTux1r_WITKLL7XJcy2nvwjXl7TyxHwK4K1APoVPRoo1ZX6pAgg'
    authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJleGciOiJvTkFOVVNKRTAxTDdWSHgzWDJ4UFVTaHUvSjc5bUdLNC92NVlUYXFwTWc5VGwrNmM5Q1hEd0ZseUdiaDhBMm5PIiwiZXhwIjoxNTc2MDY0ODgwLCJpYXQiOjE1NzU0NjAwODAsImZpYiI6IjFvU1Q5eVBJbjg5aFI5YWM4SnZDV1E9PSJ9.0tDyM9amy_u6UxrgC8E0ic1t7xjyF5Oa2YFJI0pz5TvXbLDSBD32C4k6AEGYRMI0xEalqF6ZyJDY76wK2ryE-g'
  },
  mutations: {
    set (state, payload) {
      Object.keys(payload).forEach((k) => {
        Vue.set(state, k, payload[k])
      })
    }
  }
}
