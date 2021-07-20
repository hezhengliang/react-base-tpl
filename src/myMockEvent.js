function myApply(context){
  context = context || window
  let fn = Symbol('fn')
  context[fn] = this
  const args = [...arguments[1]]
  let result
  result = context[fn](...args)
  delete context[fn]
  return result
}

function myCall(context){
  context = context || window
  let fn = Symbol('fn')
  context[fn] = this
  if(arguments[1]){
    result = context[fn](...arguments[1])
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}

function myBind(context){
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }

  // 获取参数
  let args = [...arguments].slice(1),
    fn = this;

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
}