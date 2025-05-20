/**
 * experimental.ts
 */

function struct() {
	console.log('exerimentalStruct')

	const _lambprops = {
		do: (...props: any) => {
			console.log('_lambprops.do()')
			console.log(props)
		},
		lambdo: (lambda: any, ...props: any) => {
			console.log('_lambprops.lambdo()')
			lambda(...props)
		}
	}

	const _lambdaprops = {
		lambdado: (lambda: any, ...props: any) => {
			console.log('_lambdaprops.lambdado()')
			lambda(...props)
		}
	}

	const _lambdalinkprops = {
		lambdalinkdo: (lambda: any, ...props: any) => {
			console.log('_lambdalinkprops.lambdalinkdo()')
			lambda(...props)
		}
	}

	const _lambdalinkerprops = {
		lambdalinkerdo: (lambda: any, ...props: any) => {
			console.log('_lambdalinkerprops.lambdalinkerdo()')
			lambda(...props)
		}
	}

	const lamb = function (lambda: any, ...props: any) {
		const _self = { ..._lambprops }
		_self.lambdo(lambda, ...props)
		_self.do()
		//console.dir(_self)

		const da = function (lambda: any, ...props: any[]) {
			const _self = { ..._lambdaprops }
			console.dir(_self)
			_self.lambdado(lambda, ...props)
			//console.dir(_self)

			const link = function (lambda: any, ...props: any[]) {
				const _self = { ..._lambdalinkprops }
				_self.lambdalinkdo(lambda, ...props)
				//console.dir(_self)

				const er = function (lambda: any, ...props: any[]) {
					const _self = { ..._lambdalinkerprops }
					_self.lambdalinkerdo(lambda, ...props)
					//console.dir(_self)
					return _self
				}

				return er(lambda, ...props)
			}

			return link(lambda, ...props)
		}

		return da(lambda, ...props)
	}

	const _lprops = null
	const _l = () => console.log('_l()')

	console.dir(lamb)
	console.dir(lamb(_l, _lprops))
}

export { struct }