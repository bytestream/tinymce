define(
  'ephox.alloy.behaviour.toggling.ToggleApis',

  [
    'ephox.boulder.api.Objects',
    'ephox.sugar.api.properties.Attr',
    'ephox.sugar.api.properties.Class'
  ],

  function (Objects, Attr, Class) {
     var pressedAttributes = {
      'menuitemcheckbox': 'aria-checked'
    };

    // var getAriaAttribute = function (component, toggleInfo) {
    //   var role = Attr.get(component.element(), 'role');
    //   return Objects.readOptFrom(pressedAttributes, role).getOrThunk(toggleInfo.aria()['aria-pressed-attr']);
    // };

    var updateAriaState = function (component, toggleInfo) {
      var pressed = Class.has(component.element(), toggleInfo.toggleClass());

      var ariaInfo = toggleInfo.aria();
      ariaInfo.update()(component, ariaInfo, pressed);

      // var attr = getAriaAttribute(component, toggleInfo);

      // Attr.set(component.element(), attr, pressed);
      // toggleInfo.aria()['aria-expanded-attr']().each(function (attr) {
      //   Attr.set(component.element(), attr, pressed);
      // });
    };

    var toggle = function (component, toggleInfo) {
      Class.toggle(component.element(), toggleInfo.toggleClass());
      updateAriaState(component, toggleInfo);
    };

    var select = function (component, toggleInfo) {
      Class.add(component.element(), toggleInfo.toggleClass());
      updateAriaState(component, toggleInfo);
    };

    var deselect = function (component, toggleInfo) {
      Class.remove(component.element(), toggleInfo.toggleClass());
      updateAriaState(component, toggleInfo);
    };

    var isSelected = function (component, toggleInfo) {
      return Class.has(component.element(), toggleInfo.toggleClass());
    };

    var onLoad = function (component, toggleInfo) {
      // var attr = getAriaAttribute(component, toggleInfo);
      // FIX:
      var attr = 'aria-pressed';

      // Only overwrite if it doesn't have a current value.
      if (! Attr.has(component.element(), attr)) {
        var api = toggleInfo.selected() ? select : deselect;
        api(component, toggleInfo);
      }
    };

    return {
      onLoad: onLoad,
      toggle: toggle,
      isSelected: isSelected,
      select: select,
      deselect: deselect
    };
  }
);