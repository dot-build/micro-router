# uRouter

## A micro router written in ES6

See test.js to a runnable example

```js
import { Router } from 'urouter/Router';

let router = new Router();

// first define some rules
router.when('patt3rn', patternHandler);
router.when(/^foo|bar$/, foobarHandler);
router.when(matcherFn, otherHandler);

// later on, match values against the routes:

router.match('foo');		//	=> calls foobarHandler('foo')
router.match('bar');		//	=> calls foobarHandler('bar')
router.match('patt3rn');	//	=> calls patternHandler('patt3rn')
router.match('whatever');	//	=> calls matcherFn('whatever') ? otherHandler('whatever')

```