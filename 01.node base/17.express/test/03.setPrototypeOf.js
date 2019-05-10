let proto = Object.create(null)

proto.get = function (path) {
  console.log('get path: ', path)
}
proto.say = function () {
  console.log('say hello');
}
function Router () {
  function router (req, res, next) {

  }
  Object.setPrototypeOf(router, proto) // router的原型对象指向了proto这个对象,就具有了这个对象的属性和方法
  router.stack = [];
  return router;
}

let router = Router();
router.stack.push(1)
router.stack.push(2)
router.stack.push(3)

router.get('liuzhicheng')
router.say()
console.log(router.stack);

