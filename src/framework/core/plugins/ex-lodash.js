import _ from 'lodash';

// 定义类
function defineClass(constructor, prototypes, statics) {
  constructor.prototype = prototypes;
  constructor.prototype.constructor = constructor;
  _.extend(constructor, statics);
  return constructor;
}

// 定义子类
function defineSubclass(superClass, constructor, methods, statics) {
  constructor.prototype = Object.create(superClass.prototype);
  constructor.prototype.constructor = constructor;

  _.extend(constructor.prototype, methods);
  constructor.prototype.__super__ = superClass.prototype;
  _.extend(constructor, statics);

  return constructor;
}

// Object属性定义工厂方法
var PropertiesBuilder = defineClass(
  function (object) {
    this.object = object;
    this.descriptors = {};
  },
  {
    build: function () {
      Object.defineProperties(this.object, this.descriptors);
    },

    define: function (name, getter, setter, options) {
      this.descriptors[name] = _.extend(
        {
          enumerable: false,
          get: getter,
          set: setter
        },
        options
      );
      return this;
    }
  }
);

// Object属性定义函数
function defineProperties(object) {
  return new PropertiesBuilder(object);
}

export { _, defineClass, defineProperties, defineSubclass };
