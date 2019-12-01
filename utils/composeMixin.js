export default (ctor, mixin, merge = false) => {
  if (ctor.options) {
    if (!ctor.options.mixins) {
      ctor.options.mixins = []
    }
    if (merge) {
      ctor.options.mixins.push(mixin)
    } else {
      ctor.options.mixins = [mixin]
    }
  } else {
    if (!ctor.mixins) { ctor.mixins = [] }
    if (merge) {
      ctor.mixins.push(mixin)
    } else {
      ctor.mixins = [mixin]
    }
  }
  return ctor
}
