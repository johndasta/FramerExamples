require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"flipComponent":[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
"FlipComponent\n\nfrontLayer <layer>\nbackLayer <layer>\n\nflip()\nflipToFront()\nflipToBack()";
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.FlipComponent = (function(superClass) {
  var FlipDirection, States;

  extend(FlipComponent, superClass);

  States = {
    Front: "frontState",
    Back: "backState"
  };

  FlipDirection = {
    Right: "right",
    Left: "left",
    Top: "top",
    Bottom: "bottom"
  };

  function FlipComponent(options) {
    if (options == null) {
      options = {};
    }
    FlipComponent.__super__.constructor.apply(this, arguments);
    options = _.defaults(options, {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      flipDirection: FlipDirection.Right,
      curve: "spring(300, 50, 0)",
      autoFlip: true,
      perspective: 1000
    });
    this.width = options.width;
    this.height = options.height;
    if (options.front == null) {
      options.front = new Layer({
        backgroundColor: "white"
      });
    }
    if (options.back == null) {
      options.back = new Layer({
        backgroundColor: "white"
      });
    }
    this.front = options.front;
    this.back = options.back;
    this.perspective = options.perspective;
    this.style["-webkit-transform-style"] = "preserve-3d";
    this._state = States.Front;
    this.flipDirection = options.flipDirection;
    this.autoFlip = options.autoFlip;
    this.curve = options.curve;
    this.backgroundColor = null;
    this.clip = false;
    this.on(Events.Click, function() {
      if (this.autoFlip) {
        return this.flip();
      }
    });
    this.on("change:width", (function(_this) {
      return function() {
        _this._front.width = _this.width;
        return _this._back.width = _this.width;
      };
    })(this));
    this.on("change:height", (function(_this) {
      return function() {
        _this._front.height = _this.height;
        return _this._back.height = _this.height;
      };
    })(this));
  }

  FlipComponent.prototype.state = function() {
    return this._state;
  };

  FlipComponent.define("front", {
    get: function() {
      return this._front;
    },
    set: function(layer) {
      var ref;
      if ((ref = this._front) != null) {
        ref.destroy();
      }
      this._front = layer;
      this._front.point = {
        x: 0,
        y: 0
      };
      this._front.width = this.width;
      this._front.height = this.height;
      this._front.superLayer = this;
      return this._front.style.webkitBackfaceVisibility = "hidden";
    }
  });

  FlipComponent.define("back", {
    get: function() {
      return this._back;
    },
    set: function(layer) {
      var ref;
      if ((ref = this._back) != null) {
        ref.destroy();
      }
      this._back = layer;
      this._back.point = {
        x: 0,
        y: 0
      };
      this._back.width = this.width;
      this._back.height = this.height;
      this._back.superLayer = this;
      return this._back.style.webkitBackfaceVisibility = "hidden";
    }
  });

  FlipComponent.define("flipDirection", {
    get: function() {
      return this._flipDirection;
    },
    set: function(direction) {
      this._flipDirection = direction;
      this._back.rotationY = 0;
      this._back.rotationX = 0;
      this._front.rotationY = 0;
      this._front.rotationX = 0;
      if (this._state === States.Front) {
        if (direction === FlipDirection.Right) {
          return this._back.rotationY = 180;
        } else if (direction === FlipDirection.Left) {
          return this._back.rotationY = -180;
        } else if (direction === FlipDirection.Top) {
          return this._back.rotationX = 180;
        } else {
          return this._back.rotationX = -180;
        }
      } else {
        if (direction === FlipDirection.Right) {
          return this._front.rotationY = -180;
        } else if (direction === FlipDirection.Left) {
          return this._front.rotationY = 180;
        } else if (direction === FlipDirection.Top) {
          return this._front.rotationX = -180;
        } else {
          return this._front.rotationX = 180;
        }
      }
    }
  });

  FlipComponent.prototype.flip = function() {
    if (this._state === States.Front) {
      return this.flipToBack();
    } else {
      return this.flipToFront();
    }
  };

  FlipComponent.prototype.flipToFront = function() {
    var props;
    if (this._state === States.Back) {
      this._state = States.Front;
      props = {};
      if (this.flipDirection === FlipDirection.Right) {
        props.rotationY = 180;
      } else if (this.flipDirection === FlipDirection.Left) {
        props.rotationY = -180;
      } else if (this.flipDirection === FlipDirection.Top) {
        props.rotationX = 180;
      } else if (this.flipDirection === FlipDirection.Bottom) {
        props.rotationX = -180;
      }
      this._front.animate({
        properties: {
          rotationY: 0,
          rotationX: 0
        },
        curve: this.curve
      });
      return this._back.animate({
        properties: props,
        curve: this.curve
      });
    }
  };

  FlipComponent.prototype.flipToBack = function() {
    var props;
    if (this._state === States.Front) {
      this._state = States.Back;
      props = {};
      if (this.flipDirection === FlipDirection.Right) {
        props.rotationY = -180;
      } else if (this.flipDirection === FlipDirection.Left) {
        props.rotationY = 180;
      } else if (this.flipDirection === FlipDirection.Top) {
        props.rotationX = -180;
      } else if (this.flipDirection === FlipDirection.Bottom) {
        props.rotationX = 180;
      }
      this._front.animate({
        properties: props,
        curve: this.curve
      });
      return this._back.animate({
        properties: {
          rotationY: 0,
          rotationX: 0
        },
        curve: this.curve
      });
    }
  };

  return FlipComponent;

})(Layer);

},{}],"flipComponent":[function(require,module,exports){
"FlipComponent\n\nfrontLayer <layer>\nbackLayer <layer>\n\nflip()\nflipToFront()\nflipToBack()";
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.FlipComponent = (function(superClass) {
  var FlipDirection, States;

  extend(FlipComponent, superClass);

  States = {
    Front: "frontState",
    Back: "backState"
  };

  FlipDirection = {
    Right: "right",
    Left: "left",
    Top: "top",
    Bottom: "bottom"
  };

  function FlipComponent(options) {
    if (options == null) {
      options = {};
    }
    FlipComponent.__super__.constructor.apply(this, arguments);
    options = _.defaults(options, {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      flipDirection: FlipDirection.Right,
      curve: "spring(300, 50, 0)",
      autoFlip: true,
      perspective: 1000
    });
    this.width = options.width;
    this.height = options.height;
    if (options.front == null) {
      options.front = new Layer({
        backgroundColor: "white"
      });
    }
    if (options.back == null) {
      options.back = new Layer({
        backgroundColor: "#2dd7aa"
      });
    }
    this.front = options.front;
    this.back = options.back;
    this.perspective = options.perspective;
    this.style["-webkit-transform-style"] = "preserve-3d";
    this._state = States.Front;
    this.flipDirection = options.flipDirection;
    this.autoFlip = options.autoFlip;
    this.curve = options.curve;
    this.backgroundColor = null;
    this.clip = false;
    this.on(Events.Click, function() {
      if (this.autoFlip) {
        return this.flip();
      }
    });
    this.on("change:width", (function(_this) {
      return function() {
        _this._front.width = _this.width;
        return _this._back.width = _this.width;
      };
    })(this));
    this.on("change:height", (function(_this) {
      return function() {
        _this._front.height = _this.height;
        return _this._back.height = _this.height;
      };
    })(this));
  }

  FlipComponent.prototype.state = function() {
    return this._state;
  };

  FlipComponent.define("front", {
    get: function() {
      return this._front;
    },
    set: function(layer) {
      var ref;
      if ((ref = this._front) != null) {
        ref.destroy();
      }
      this._front = layer;
      this._front.point = {
        x: 0,
        y: 0
      };
      this._front.width = this.width;
      this._front.height = this.height;
      this._front.superLayer = this;
      return this._front.style.webkitBackfaceVisibility = "hidden";
    }
  });

  FlipComponent.define("back", {
    get: function() {
      return this._back;
    },
    set: function(layer) {
      var ref;
      if ((ref = this._back) != null) {
        ref.destroy();
      }
      this._back = layer;
      this._back.point = {
        x: 0,
        y: 0
      };
      this._back.width = this.width;
      this._back.height = this.height;
      this._back.superLayer = this;
      return this._back.style.webkitBackfaceVisibility = "hidden";
    }
  });

  FlipComponent.define("flipDirection", {
    get: function() {
      return this._flipDirection;
    },
    set: function(direction) {
      this._flipDirection = direction;
      this._back.rotationY = 0;
      this._back.rotationX = 0;
      this._front.rotationY = 0;
      this._front.rotationX = 0;
      if (this._state === States.Front) {
        if (direction === FlipDirection.Right) {
          return this._back.rotationY = 180;
        } else if (direction === FlipDirection.Left) {
          return this._back.rotationY = -180;
        } else if (direction === FlipDirection.Top) {
          return this._back.rotationX = 180;
        } else {
          return this._back.rotationX = -180;
        }
      } else {
        if (direction === FlipDirection.Right) {
          return this._front.rotationY = -180;
        } else if (direction === FlipDirection.Left) {
          return this._front.rotationY = 180;
        } else if (direction === FlipDirection.Top) {
          return this._front.rotationX = -180;
        } else {
          return this._front.rotationX = 180;
        }
      }
    }
  });

  FlipComponent.prototype.flip = function() {
    if (this._state === States.Front) {
      return this.flipToBack();
    } else {
      return this.flipToFront();
    }
  };

  FlipComponent.prototype.flipToFront = function() {
    var props;
    if (this._state === States.Back) {
      this._state = States.Front;
      props = {};
      if (this.flipDirection === FlipDirection.Right) {
        props.rotationY = 180;
      } else if (this.flipDirection === FlipDirection.Left) {
        props.rotationY = -180;
      } else if (this.flipDirection === FlipDirection.Top) {
        props.rotationX = 180;
      } else if (this.flipDirection === FlipDirection.Bottom) {
        props.rotationX = -180;
      }
      this._front.animate({
        properties: {
          rotationY: 0,
          rotationX: 0
        },
        curve: this.curve
      });
      return this._back.animate({
        properties: props,
        curve: this.curve
      });
    }
  };

  FlipComponent.prototype.flipToBack = function() {
    var props;
    if (this._state === States.Front) {
      this._state = States.Back;
      props = {};
      if (this.flipDirection === FlipDirection.Right) {
        props.rotationY = -180;
      } else if (this.flipDirection === FlipDirection.Left) {
        props.rotationY = 180;
      } else if (this.flipDirection === FlipDirection.Top) {
        props.rotationX = -180;
      } else if (this.flipDirection === FlipDirection.Bottom) {
        props.rotationX = 180;
      }
      this._front.animate({
        properties: props,
        curve: this.curve
      });
      return this._back.animate({
        properties: {
          rotationY: 0,
          rotationX: 0
        },
        curve: this.curve
      });
    }
  };

  return FlipComponent;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9HaWVsL0ZyYW1lciBMaXZlL0ZyYW1lckV4YW1wbGVzL0V4YW1wbGVzL21lbW9yeS1nYW1lLmZyYW1lci9tb2R1bGVzL2ZsaXBDb21wb25lbnQuanMiLCIvVXNlcnMvR2llbC9GcmFtZXIgTGl2ZS9GcmFtZXJFeGFtcGxlcy9FeGFtcGxlcy9tZW1vcnktZ2FtZS5mcmFtZXIvbW9kdWxlcy9mbGlwQ29tcG9uZW50LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLE9BQVAsQ0FDQztRQUFBLFVBQUEsRUFDQztVQUFBLFNBQUEsRUFBVyxDQUFYO1VBQ0EsU0FBQSxFQUFXLENBRFg7U0FERDtRQUdBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FIUjtPQURELEVBZkQ7O0VBRFc7Ozs7R0F2SXVCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS45LjNcblwiRmxpcENvbXBvbmVudFxcblxcbmZyb250TGF5ZXIgPGxheWVyPlxcbmJhY2tMYXllciA8bGF5ZXI+XFxuXFxuZmxpcCgpXFxuZmxpcFRvRnJvbnQoKVxcbmZsaXBUb0JhY2soKVwiO1xudmFyIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5leHBvcnRzLkZsaXBDb21wb25lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICB2YXIgRmxpcERpcmVjdGlvbiwgU3RhdGVzO1xuXG4gIGV4dGVuZChGbGlwQ29tcG9uZW50LCBzdXBlckNsYXNzKTtcblxuICBTdGF0ZXMgPSB7XG4gICAgRnJvbnQ6IFwiZnJvbnRTdGF0ZVwiLFxuICAgIEJhY2s6IFwiYmFja1N0YXRlXCJcbiAgfTtcblxuICBGbGlwRGlyZWN0aW9uID0ge1xuICAgIFJpZ2h0OiBcInJpZ2h0XCIsXG4gICAgTGVmdDogXCJsZWZ0XCIsXG4gICAgVG9wOiBcInRvcFwiLFxuICAgIEJvdHRvbTogXCJib3R0b21cIlxuICB9O1xuXG4gIGZ1bmN0aW9uIEZsaXBDb21wb25lbnQob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgRmxpcENvbXBvbmVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBvcHRpb25zID0gXy5kZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIGZsaXBEaXJlY3Rpb246IEZsaXBEaXJlY3Rpb24uUmlnaHQsXG4gICAgICBjdXJ2ZTogXCJzcHJpbmcoMzAwLCA1MCwgMClcIixcbiAgICAgIGF1dG9GbGlwOiB0cnVlLFxuICAgICAgcGVyc3BlY3RpdmU6IDEwMDBcbiAgICB9KTtcbiAgICB0aGlzLndpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgIGlmIChvcHRpb25zLmZyb250ID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMuZnJvbnQgPSBuZXcgTGF5ZXIoe1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmJhY2sgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucy5iYWNrID0gbmV3IExheWVyKHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmZyb250ID0gb3B0aW9ucy5mcm9udDtcbiAgICB0aGlzLmJhY2sgPSBvcHRpb25zLmJhY2s7XG4gICAgdGhpcy5wZXJzcGVjdGl2ZSA9IG9wdGlvbnMucGVyc3BlY3RpdmU7XG4gICAgdGhpcy5zdHlsZVtcIi13ZWJraXQtdHJhbnNmb3JtLXN0eWxlXCJdID0gXCJwcmVzZXJ2ZS0zZFwiO1xuICAgIHRoaXMuX3N0YXRlID0gU3RhdGVzLkZyb250O1xuICAgIHRoaXMuZmxpcERpcmVjdGlvbiA9IG9wdGlvbnMuZmxpcERpcmVjdGlvbjtcbiAgICB0aGlzLmF1dG9GbGlwID0gb3B0aW9ucy5hdXRvRmxpcDtcbiAgICB0aGlzLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IG51bGw7XG4gICAgdGhpcy5jbGlwID0gZmFsc2U7XG4gICAgdGhpcy5vbihFdmVudHMuQ2xpY2ssIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuYXV0b0ZsaXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxpcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oXCJjaGFuZ2U6d2lkdGhcIiwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLl9mcm9udC53aWR0aCA9IF90aGlzLndpZHRoO1xuICAgICAgICByZXR1cm4gX3RoaXMuX2JhY2sud2lkdGggPSBfdGhpcy53aWR0aDtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICAgIHRoaXMub24oXCJjaGFuZ2U6aGVpZ2h0XCIsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBfdGhpcy5fZnJvbnQuaGVpZ2h0ID0gX3RoaXMuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gX3RoaXMuX2JhY2suaGVpZ2h0ID0gX3RoaXMuaGVpZ2h0O1xuICAgICAgfTtcbiAgICB9KSh0aGlzKSk7XG4gIH1cblxuICBGbGlwQ29tcG9uZW50LnByb3RvdHlwZS5zdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgfTtcblxuICBGbGlwQ29tcG9uZW50LmRlZmluZShcImZyb250XCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2Zyb250O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihsYXllcikge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICgocmVmID0gdGhpcy5fZnJvbnQpICE9IG51bGwpIHtcbiAgICAgICAgcmVmLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Zyb250ID0gbGF5ZXI7XG4gICAgICB0aGlzLl9mcm9udC5wb2ludCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHRoaXMuX2Zyb250LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIHRoaXMuX2Zyb250LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5fZnJvbnQuc3VwZXJMYXllciA9IHRoaXM7XG4gICAgICByZXR1cm4gdGhpcy5fZnJvbnQuc3R5bGUud2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH0pO1xuXG4gIEZsaXBDb21wb25lbnQuZGVmaW5lKFwiYmFja1wiLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl9iYWNrO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihsYXllcikge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICgocmVmID0gdGhpcy5fYmFjaykgIT0gbnVsbCkge1xuICAgICAgICByZWYuZGVzdHJveSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYmFjayA9IGxheWVyO1xuICAgICAgdGhpcy5fYmFjay5wb2ludCA9IHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMFxuICAgICAgfTtcbiAgICAgIHRoaXMuX2JhY2sud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgdGhpcy5fYmFjay5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgIHRoaXMuX2JhY2suc3VwZXJMYXllciA9IHRoaXM7XG4gICAgICByZXR1cm4gdGhpcy5fYmFjay5zdHlsZS53ZWJraXRCYWNrZmFjZVZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgfSk7XG5cbiAgRmxpcENvbXBvbmVudC5kZWZpbmUoXCJmbGlwRGlyZWN0aW9uXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZsaXBEaXJlY3Rpb247XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgdGhpcy5fZmxpcERpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuX2JhY2sucm90YXRpb25ZID0gMDtcbiAgICAgIHRoaXMuX2JhY2sucm90YXRpb25YID0gMDtcbiAgICAgIHRoaXMuX2Zyb250LnJvdGF0aW9uWSA9IDA7XG4gICAgICB0aGlzLl9mcm9udC5yb3RhdGlvblggPSAwO1xuICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBTdGF0ZXMuRnJvbnQpIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5SaWdodCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrLnJvdGF0aW9uWSA9IDE4MDtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IEZsaXBEaXJlY3Rpb24uTGVmdCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrLnJvdGF0aW9uWSA9IC0xODA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBGbGlwRGlyZWN0aW9uLlRvcCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrLnJvdGF0aW9uWCA9IDE4MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYmFjay5yb3RhdGlvblggPSAtMTgwO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBGbGlwRGlyZWN0aW9uLlJpZ2h0KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2Zyb250LnJvdGF0aW9uWSA9IC0xODA7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBGbGlwRGlyZWN0aW9uLkxlZnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZnJvbnQucm90YXRpb25ZID0gMTgwO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5Ub3ApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZnJvbnQucm90YXRpb25YID0gLTE4MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZnJvbnQucm90YXRpb25YID0gMTgwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBGbGlwQ29tcG9uZW50LnByb3RvdHlwZS5mbGlwID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBTdGF0ZXMuRnJvbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmZsaXBUb0JhY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZmxpcFRvRnJvbnQoKTtcbiAgICB9XG4gIH07XG5cbiAgRmxpcENvbXBvbmVudC5wcm90b3R5cGUuZmxpcFRvRnJvbnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvcHM7XG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBTdGF0ZXMuQmFjaykge1xuICAgICAgdGhpcy5fc3RhdGUgPSBTdGF0ZXMuRnJvbnQ7XG4gICAgICBwcm9wcyA9IHt9O1xuICAgICAgaWYgKHRoaXMuZmxpcERpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5SaWdodCkge1xuICAgICAgICBwcm9wcy5yb3RhdGlvblkgPSAxODA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmxpcERpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5MZWZ0KSB7XG4gICAgICAgIHByb3BzLnJvdGF0aW9uWSA9IC0xODA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmxpcERpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5Ub3ApIHtcbiAgICAgICAgcHJvcHMucm90YXRpb25YID0gMTgwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmZsaXBEaXJlY3Rpb24gPT09IEZsaXBEaXJlY3Rpb24uQm90dG9tKSB7XG4gICAgICAgIHByb3BzLnJvdGF0aW9uWCA9IC0xODA7XG4gICAgICB9XG4gICAgICB0aGlzLl9mcm9udC5hbmltYXRlKHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHJvdGF0aW9uWTogMCxcbiAgICAgICAgICByb3RhdGlvblg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgY3VydmU6IHRoaXMuY3VydmVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMuX2JhY2suYW5pbWF0ZSh7XG4gICAgICAgIHByb3BlcnRpZXM6IHByb3BzLFxuICAgICAgICBjdXJ2ZTogdGhpcy5jdXJ2ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEZsaXBDb21wb25lbnQucHJvdG90eXBlLmZsaXBUb0JhY2sgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvcHM7XG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBTdGF0ZXMuRnJvbnQpIHtcbiAgICAgIHRoaXMuX3N0YXRlID0gU3RhdGVzLkJhY2s7XG4gICAgICBwcm9wcyA9IHt9O1xuICAgICAgaWYgKHRoaXMuZmxpcERpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5SaWdodCkge1xuICAgICAgICBwcm9wcy5yb3RhdGlvblkgPSAtMTgwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmZsaXBEaXJlY3Rpb24gPT09IEZsaXBEaXJlY3Rpb24uTGVmdCkge1xuICAgICAgICBwcm9wcy5yb3RhdGlvblkgPSAxODA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmxpcERpcmVjdGlvbiA9PT0gRmxpcERpcmVjdGlvbi5Ub3ApIHtcbiAgICAgICAgcHJvcHMucm90YXRpb25YID0gLTE4MDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5mbGlwRGlyZWN0aW9uID09PSBGbGlwRGlyZWN0aW9uLkJvdHRvbSkge1xuICAgICAgICBwcm9wcy5yb3RhdGlvblggPSAxODA7XG4gICAgICB9XG4gICAgICB0aGlzLl9mcm9udC5hbmltYXRlKHtcbiAgICAgICAgcHJvcGVydGllczogcHJvcHMsXG4gICAgICAgIGN1cnZlOiB0aGlzLmN1cnZlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLl9iYWNrLmFuaW1hdGUoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgcm90YXRpb25ZOiAwLFxuICAgICAgICAgIHJvdGF0aW9uWDogMFxuICAgICAgICB9LFxuICAgICAgICBjdXJ2ZTogdGhpcy5jdXJ2ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBGbGlwQ29tcG9uZW50O1xuXG59KShMYXllcik7XG4iLCIjIFV0aWxzID0gcmVxdWlyZSBcIi4uL1V0aWxzXCJcbiMge0xheWVyfSA9IHJlcXVpcmUgXCIuLi9MYXllclwiXG4jIHtFdmVudHN9ID0gcmVxdWlyZSBcIi4uL0V2ZW50c1wiXG5cblwiXCJcIlxuRmxpcENvbXBvbmVudFxuXG5mcm9udExheWVyIDxsYXllcj5cbmJhY2tMYXllciA8bGF5ZXI+XG5cbmZsaXAoKVxuZmxpcFRvRnJvbnQoKVxuZmxpcFRvQmFjaygpXG5cIlwiXCJcblxuY2xhc3MgZXhwb3J0cy5GbGlwQ29tcG9uZW50IGV4dGVuZHMgTGF5ZXJcblxuXHRTdGF0ZXMgPVxuXHRcdEZyb250OiBcImZyb250U3RhdGVcIlxuXHRcdEJhY2s6ICBcImJhY2tTdGF0ZVwiXG5cdFx0XG5cdEZsaXBEaXJlY3Rpb24gPVxuXHRcdFJpZ2h0Olx0XCJyaWdodFwiXG5cdFx0TGVmdDpcdFwibGVmdFwiXG5cdFx0VG9wOlx0XCJ0b3BcIlxuXHRcdEJvdHRvbTogXCJib3R0b21cIlxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRzdXBlclxuXHRcdG9wdGlvbnMgPSBfLmRlZmF1bHRzIG9wdGlvbnMsIFxuXHRcdFx0eDogMFxuXHRcdFx0eTogMFxuXHRcdFx0d2lkdGg6IDEwMFxuXHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdGZsaXBEaXJlY3Rpb246IEZsaXBEaXJlY3Rpb24uUmlnaHRcblx0XHRcdGN1cnZlOiBcInNwcmluZygzMDAsIDUwLCAwKVwiXG5cdFx0XHRhdXRvRmxpcDogdHJ1ZVxuXHRcdFx0cGVyc3BlY3RpdmU6IDEwMDBcblxuXHRcdEB3aWR0aCA9IG9wdGlvbnMud2lkdGhcblx0XHRAaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHRcblxuXHRcdG9wdGlvbnMuZnJvbnQgPz0gbmV3IExheWVyKGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiKVxuXHRcdG9wdGlvbnMuYmFjayAgPz0gbmV3IExheWVyKGJhY2tncm91bmRDb2xvcjogXCIjMmRkN2FhXCIpXG5cblx0XHRAZnJvbnQgPSBvcHRpb25zLmZyb250XG5cdFx0QGJhY2sgPSBvcHRpb25zLmJhY2tcblxuXHRcdEBwZXJzcGVjdGl2ZSA9IG9wdGlvbnMucGVyc3BlY3RpdmVcblx0XHRAc3R5bGVbXCItd2Via2l0LXRyYW5zZm9ybS1zdHlsZVwiXSA9IFwicHJlc2VydmUtM2RcIlxuXHRcdEBfc3RhdGUgPSBTdGF0ZXMuRnJvbnRcblxuXHRcdEBmbGlwRGlyZWN0aW9uID0gb3B0aW9ucy5mbGlwRGlyZWN0aW9uXG5cblx0XHRAYXV0b0ZsaXAgPSBvcHRpb25zLmF1dG9GbGlwXG5cdFx0QGN1cnZlID0gb3B0aW9ucy5jdXJ2ZVxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QGNsaXAgPSBmYWxzZVxuXG5cdFx0QG9uIEV2ZW50cy5DbGljaywgLT5cblx0XHRcdGlmIEBhdXRvRmxpcFxuXHRcdFx0XHRAZmxpcCgpXG5cblx0XHRAb24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdEBfZnJvbnQud2lkdGggPSBAd2lkdGhcblx0XHRcdEBfYmFjay53aWR0aCA9IEB3aWR0aFxuXHRcdEBvbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdEBfZnJvbnQuaGVpZ2h0ID0gQGhlaWdodFxuXHRcdFx0QF9iYWNrLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cdHN0YXRlOiAtPiByZXR1cm4gQF9zdGF0ZVxuXG5cdEBkZWZpbmUgXCJmcm9udFwiLFxuXHRcdGdldDogLT4gQF9mcm9udFxuXHRcdHNldDogKGxheWVyKSAtPlxuXHRcdFx0QF9mcm9udD8uZGVzdHJveSgpXG5cdFx0XHRAX2Zyb250ID0gbGF5ZXJcblx0XHRcdEBfZnJvbnQucG9pbnQgPSB7eDowLCB5OjB9XG5cdFx0XHRAX2Zyb250LndpZHRoID0gQHdpZHRoXG5cdFx0XHRAX2Zyb250LmhlaWdodCA9IEBoZWlnaHRcblx0XHRcdEBfZnJvbnQuc3VwZXJMYXllciA9IEBcblx0XHRcdEBfZnJvbnQuc3R5bGUud2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5ID0gXCJoaWRkZW5cIlxuXG5cdEBkZWZpbmUgXCJiYWNrXCIsXG5cdFx0Z2V0OiAtPiBAX2JhY2tcblx0XHRzZXQ6IChsYXllcikgLT5cblx0XHRcdEBfYmFjaz8uZGVzdHJveSgpXG5cdFx0XHRAX2JhY2sgPSBsYXllclxuXHRcdFx0QF9iYWNrLnBvaW50ID0ge3g6MCwgeTowfVxuXHRcdFx0QF9iYWNrLndpZHRoID0gQHdpZHRoXG5cdFx0XHRAX2JhY2suaGVpZ2h0ID0gQGhlaWdodFxuXHRcdFx0QF9iYWNrLnN1cGVyTGF5ZXIgPSBAXG5cdFx0XHRAX2JhY2suc3R5bGUud2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5ID0gXCJoaWRkZW5cIlxuIFx0XG5cdEBkZWZpbmUgXCJmbGlwRGlyZWN0aW9uXCIsXG5cdFx0Z2V0OiAtPiBAX2ZsaXBEaXJlY3Rpb25cblx0XHRzZXQ6IChkaXJlY3Rpb24pIC0+XG5cdFx0XHRAX2ZsaXBEaXJlY3Rpb24gPSBkaXJlY3Rpb25cblx0XHRcdEBfYmFjay5yb3RhdGlvblkgPSAwXG5cdFx0XHRAX2JhY2sucm90YXRpb25YID0gMFxuXHRcdFx0QF9mcm9udC5yb3RhdGlvblkgPSAwXG5cdFx0XHRAX2Zyb250LnJvdGF0aW9uWCA9IDBcblx0XHRcdGlmIEBfc3RhdGUgPT0gU3RhdGVzLkZyb250XG5cdFx0XHRcdGlmIGRpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLlJpZ2h0XG5cdFx0XHRcdFx0QF9iYWNrLnJvdGF0aW9uWSA9IDE4MFxuXHRcdFx0XHRlbHNlIGlmIGRpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLkxlZnRcblx0XHRcdFx0XHRAX2JhY2sucm90YXRpb25ZID0gLTE4MFxuXHRcdFx0XHRlbHNlIGlmIGRpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLlRvcFxuXHRcdFx0XHRcdEBfYmFjay5yb3RhdGlvblggPSAxODBcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdEBfYmFjay5yb3RhdGlvblggPSAtMTgwXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGlmIGRpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLlJpZ2h0XG5cdFx0XHRcdFx0QF9mcm9udC5yb3RhdGlvblkgPSAtMTgwXG5cdFx0XHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uTGVmdFxuXHRcdFx0XHRcdEBfZnJvbnQucm90YXRpb25ZID0gMTgwXG5cdFx0XHRcdGVsc2UgaWYgZGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uVG9wXG5cdFx0XHRcdFx0QF9mcm9udC5yb3RhdGlvblggPSAtMTgwXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRAX2Zyb250LnJvdGF0aW9uWCA9IDE4MFxuXG5cblx0ZmxpcDogLT5cblx0XHRpZiBAX3N0YXRlID09IFN0YXRlcy5Gcm9udFxuXHRcdFx0QGZsaXBUb0JhY2soKVxuXHRcdGVsc2Vcblx0XHRcdEBmbGlwVG9Gcm9udCgpXG5cdFx0XG5cdGZsaXBUb0Zyb250OiAtPlxuXHRcdGlmIEBfc3RhdGUgPT0gU3RhdGVzLkJhY2tcblx0XHRcdEBfc3RhdGUgPSBTdGF0ZXMuRnJvbnRcblx0XHRcdHByb3BzID0ge31cblx0XHRcdGlmIEBmbGlwRGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uUmlnaHRcblx0XHRcdFx0cHJvcHMucm90YXRpb25ZID0gMTgwXG5cdFx0XHRlbHNlIGlmIEBmbGlwRGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uTGVmdFxuXHRcdFx0XHRwcm9wcy5yb3RhdGlvblkgPSAtMTgwXG5cdFx0XHRlbHNlIGlmIEBmbGlwRGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uVG9wXG5cdFx0XHRcdHByb3BzLnJvdGF0aW9uWCA9IDE4MFxuXHRcdFx0ZWxzZSBpZiBAZmxpcERpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLkJvdHRvbVxuXHRcdFx0XHRwcm9wcy5yb3RhdGlvblggPSAtMTgwXG5cdFx0XHRAX2Zyb250LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRyb3RhdGlvblk6IDBcblx0XHRcdFx0XHRyb3RhdGlvblg6IDBcblx0XHRcdFx0Y3VydmU6IEBjdXJ2ZVxuXHRcdFx0QF9iYWNrLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRwcm9wc1xuXHRcdFx0XHRjdXJ2ZTogQGN1cnZlXG5cdFxuXHRmbGlwVG9CYWNrOiAtPlxuXHRcdGlmIEBfc3RhdGUgPT0gU3RhdGVzLkZyb250XG5cdFx0XHRAX3N0YXRlID0gU3RhdGVzLkJhY2tcblx0XHRcdHByb3BzID0ge31cblx0XHRcdGlmIEBmbGlwRGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uUmlnaHRcblx0XHRcdFx0cHJvcHMucm90YXRpb25ZID0gLTE4MFxuXHRcdFx0ZWxzZSBpZiBAZmxpcERpcmVjdGlvbiA9PSBGbGlwRGlyZWN0aW9uLkxlZnRcblx0XHRcdFx0cHJvcHMucm90YXRpb25ZID0gMTgwXG5cdFx0XHRlbHNlIGlmIEBmbGlwRGlyZWN0aW9uID09IEZsaXBEaXJlY3Rpb24uVG9wXG5cdFx0XHRcdHByb3BzLnJvdGF0aW9uWCA9IC0xODBcblx0XHRcdGVsc2UgaWYgQGZsaXBEaXJlY3Rpb24gPT0gRmxpcERpcmVjdGlvbi5Cb3R0b21cblx0XHRcdFx0cHJvcHMucm90YXRpb25YID0gMTgwXG5cdFx0XHRAX2Zyb250LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRwcm9wc1xuXHRcdFx0XHRjdXJ2ZTogQGN1cnZlXG5cdFx0XHRAX2JhY2suYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdHJvdGF0aW9uWTogMFxuXHRcdFx0XHRcdHJvdGF0aW9uWDogMFxuXHRcdFx0XHRjdXJ2ZTogQGN1cnZlIl19