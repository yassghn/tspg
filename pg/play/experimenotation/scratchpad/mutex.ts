/**
 * mutex.ts
 */

function simple() {

	/**
	 * simple mutex lock
	 */

	const _objState = {
		x: 1,
		y: 2
	}

	const _mutex = { inUse: false }

	function _mutexLockPoll(lambda: (...params:any) => any, ...props: any) {
		const clear = setInterval(() => {
			if (!_mutex.inUse) {
				clearInterval(clear)
				return lambda(...props)
			}
		})
	}

	function _opBehindMutexLock(lambda: (...params:any) => any, ...props: any) {
		_mutex.inUse = true
		const ret = lambda(...props)
		_mutex.inUse = false
		return ret
	}

	function _mutexLockGet() {
		const func = () => {
			const state = { ..._objState }
			return state
		}
		if (!_mutex.inUse) {
			return _opBehindMutexLock(func)
		} else {
			return _mutexLockPoll(_opBehindMutexLock(func))
		}
	}

	function _mutexLockSet(value: any) {
		const func = (value: any) => {
			_objState.x = value.x
			_objState.y = value.y
		}
		if (!_mutex.inUse) {
			_opBehindMutexLock(func, value)
		} else {
			_mutexLockPoll(_opBehindMutexLock(func, value))
		}
	}

	function _getObjState() {
		return _mutexLockGet()
	}

	function _setObjState(newState: any) {
		_mutexLockSet(newState)
	}

	const indeterminateAccessObject = {
		get objState() {
			return _getObjState()
		},

		set objState(newState: any) {
			_setObjState(newState)
		}
	}

	console.log(indeterminateAccessObject.objState)
	indeterminateAccessObject.objState = { x: 5, y: 6 }
	console.log(indeterminateAccessObject.objState)

	const multiAccess = {
		func1: () => {
			const state = { ...indeterminateAccessObject.objState }
			state.x += 1
			state.y += 1
			indeterminateAccessObject.objState = state
		},

		func2: () => {
			const state = { ...indeterminateAccessObject.objState }
			state.x *= 2
			state.y *= 2
			indeterminateAccessObject.objState = state
		},

		func3: () => {
			const state = { ...indeterminateAccessObject.objState }
			state.x %= 3
			state.y %= 3
			indeterminateAccessObject.objState = state
		}
	}

	function testMultiAccess() {
		const times = 50
		const clearArr: NodeJS.Timeout[] = []
		for (let i = 0; i < times; i++) {
			const func1clear = setInterval(() => {
				console.log('---func1 start---')
				multiAccess.func1()
				console.log(indeterminateAccessObject.objState)
				console.log('---func1 end---')
			}, 600)
			clearArr.push(func1clear)

			const func2clear = setInterval(() => {
				console.log('---func2 start---')
				multiAccess.func2()
				console.log(indeterminateAccessObject.objState)
				console.log('---func2 end---')
			}, 900)
			clearArr.push(func2clear)

			const func3clear = setInterval(() => {
				console.log('---func3 start---')
				multiAccess.func3()
				console.log(indeterminateAccessObject.objState)
				console.log('---func3 end---')
			}, 300)
			clearArr.push(func3clear)
		}

		setTimeout(() => {
			clearArr.forEach((clear) => {
				clearInterval(clear)
			})
		}, 10000)
	}

	testMultiAccess()
}

export { simple }