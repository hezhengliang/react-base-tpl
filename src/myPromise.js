const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECTED = 'rejected'
function myPromise(fn){
  let self = this
  self._value = null
  self._resolveCallbacks = []
  self._rejectCallbacks = []
  self._status = PENDING

  function resolve(value){
    if(self._status === PENDIND){
      setTimeout( () => {
        self._status = RESOVLE
        self._value = value
        self._resolveCallbacks.forEach( cb => {
          cb(value)
        })
      }, 0)
    }
  }

  function rejected(err) {
    if(self._status === PENDING){
      setTimeout(() => {
        self._stauts = REJECTED
        self._value = err
        self._rejectCallbacks.forEach( cb => {
          cb(err)
        })
      }, 0)
    }
  }

  try {
    fn(resolve, rejected)
  } catch(e) {
    rejected(e)
  }
}

myPromise.prototype.then = function(onResolved, onRejected){
  typeof onResolved === 'function' ? onResolved : function(value) { return value}
  typeof onRejected === 'function' ? onRejected : function(value) { return value}

  let self = this
  if(self._status === PENDING) {
    self._resolveCallbacks.push(onResolved)
    self._rejectCallbacks.push(onRejected)
  }
  if(self._status === RESOLVED) {
    onResolved(self.value)
  }
  if(self._status === REJECTED) {
    onRejected(self.value)
  }
}