/**
 * mutex.ts
 */

function simple() {

	/**
	 * simple mutex lock
	 */

	var _objState = {
		x: 1,
		y: 2
	}

	const _mutex = { inUse: false }

	const _state = { count: 0 }

	function _mutexLockPoll(lambda: (...params: any) => any, ...props: any) {
		_state.count++
		const clear = setInterval(() => {
			if (!_mutex.inUse) {
				clearInterval(clear)
				return lambda(...props)
			}
		})
	}

	function _opBehindMutexLock(lambda: (...params: any) => any, ...props: any) {
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
		const func = (val: any) => {
			_objState.x = val.x
			_objState.y = val.y
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
		},

		getObjState: () => {
			return _getObjState()
		},

		setObjState: (val: any) => {
			_setObjState(val)
		}
	}

	console.log(indeterminateAccessObject.objState)
	indeterminateAccessObject.objState = { x: 5, y: 6 }
	console.log(indeterminateAccessObject.objState)

	const multiAccess = {
		func1: () => {
			const state = { ...indeterminateAccessObject.objState }
			const state2 = { ...indeterminateAccessObject.getObjState() }
			state.x += 1
			state.y += 1
			indeterminateAccessObject.objState = state
			state2.x += 1
			state2.y += 1
			indeterminateAccessObject.setObjState(state2)
		},

		func2: () => {
			const state = { ...indeterminateAccessObject.objState }
			const state2 = { ...indeterminateAccessObject.getObjState() }
			for (let i = 0; i < 1000; i++) {
				state.x -= 2
				state.y -= 2
				indeterminateAccessObject.objState = state
				state2.x -= 2
				state2.y -= 2
				indeterminateAccessObject.setObjState(state2)
			}
		},

		func3: () => {
			const state = { ...indeterminateAccessObject.objState }
			const state2 = { ...indeterminateAccessObject.getObjState() }
			state.x %= 3
			state.y %= 3
			indeterminateAccessObject.objState = state
			state2.x %= 3
			state2.y %= 3
			indeterminateAccessObject.setObjState(state2)
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
			}, 3)
			clearArr.push(func1clear)

			const func2clear = setInterval(() => {
				console.log('---func2 start---')
				multiAccess.func2()
				console.log(indeterminateAccessObject.objState)
				console.log('---func2 end---')
			}, 1)
			clearArr.push(func2clear)

			const func3clear = setInterval(() => {
				console.log('---func3 start---')
				multiAccess.func3()
				console.log(indeterminateAccessObject.objState)
				console.log('---func3 end---')
			}, 100)
			clearArr.push(func3clear)
		}

		setTimeout(() => {
			console.log(_state.count)
			clearArr.forEach((clear) => {
				clearInterval(clear)
			})
		}, 10000)
	}

	testMultiAccess()
}

function simple2() {
	const _objState = {
		x: 0,
		y: 0
	}

	function addUp() {
		console.log('addup start')
		for (let i = 0; i < 1000; i++) {
			console.log('++++++++++++++++++')
			_objState.x++
			_objState.y++
		}
		console.log('addup done')
	}

	function addDown() {
		console.log('adddown start')
		for (let i = 0; i < 1000; i++) {
			console.log('----------------------')
			_objState.x--
			_objState.y--
		}
		console.log('adddown done')
	}

	/**
	 * concurrency problem setup
	 *
	 * not guaranteed which function, addup or addown, will run first
	 */
	setTimeout(() => {
		addUp()
		console.log(_objState)
	}, 3)
	console.log('inbetween')
	setTimeout(() => {
		addDown()
		console.log(_objState)
	})

	console.log(_objState)
}

export { simple, simple2 }