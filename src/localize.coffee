module.exports =
  directive:
    ###
     * @param {element} el - The element the directive is bound to.
     * @param {object} binding - Vue binding properties.
     * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
    ###
    unbind: (el, binding, vnode) ->
      localize = vnode.context.$root.$options.localize
      # remove node from store
      localize.nodes.splice(localize.nodes.indexOf(
        localize.nodes.find((e) -> e.el == el)), 1)

    ###
     * @param {element} el - The element the directive is bound to.
     * @param {object} binding - Vue binding properties.
     * @param {vnode} vnode - The virtual node produced by Vue’s compiler.
    ###
    bind: (el, binding, vm) ->
      localize = vm.context.$root.$options.localize
      if !localize.nodes.find((e) -> e.el == el)
        # store localized node for updates
        localize.nodes.push
          el: el
          binding: binding
          vm: vm
      try

        # get localization tree
        # coffeelint: disable=max_line_length
        localization = localize.localizations[binding.value.t || localize.locale]
        # coffeelint: enable=max_line_length
        branches = binding.value.i.match(localize.$constants.regex.item)
        # not using forEach for hard escape
        for i of branches
          branch = branches[i]
          localization = localization[branch]
          if (localization == undefined)
            throw new Error("Cannot read property for \"#{ branch }\".")
        if binding.value.attr
          el.setAttribute(binding.value.attr, localization) # localize attribute
        else
          el.innerHTML = localization
          # find options for locale if exists
          options = localize.available.find(
            (loc) -> loc.locale == localize.locale)
          if options
            if options.orientation
              # change element display orientation
              el.setAttribute('dir', options.orientation)
            if options.font
              if options.font.family
                # https://www.w3schools.com/jsref/prop_style_fontfamily.asp
                el.style.fontFamily = options.font.family
              if options.font.size
                # https://www.w3schools.com/jsref/prop_style_fontsize.asp
                el.style.fontSize = options.font.size

      catch e

        # coffeelint: disable=max_line_length
        localize.$logger.warn(
          "Could not find localization for \"#{ binding.value.i }\" in #{binding.value.t || localize.locale}")
        # coffeelint: enable=max_line_length
        localize.$logger.error(e)
        if binding.value.attr
          el.setAttribute(binding.value.attr, localize.fallback)
        else
          el.innerHTML = localize.fallback
