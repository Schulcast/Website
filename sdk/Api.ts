// eslint-disable-next-line import/no-internal-modules
import { DialogAuthenticate } from 'application/dialogs'

export class API {
	static get url() {
		return 'http://api.schulcast.de'
		return 'http://localhost:5000'
	}

	static GET<T = any>(route: string) {
		return this.fetch('GET', route) as Promise<T>
	}

	static POST<T = any>(route: string, data: unknown) {
		return this.fetch('POST', route, JSON.stringify(data)) as Promise<T>
	}

	static POST_FILE<T = any>(route: string, fileList: FileList) {
		const form = new FormData()
		form.set('formFile', fileList[0], fileList[0].name)
		return this.fetch<T>('POST', route, form)
	}

	static PUT<T = any>(route: string, data: unknown) {
		return this.fetch<T>('PUT', route, JSON.stringify(data))
	}

	static DELETE<T = any>(route: string) {
		return this.fetch<T>('DELETE', route)
	}

	private static async fetch<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body: BodyInit | null = null): Promise<T | undefined> {
		const token = DialogAuthenticate.AuthenticatedMember?.token

		const headers: HeadersInit = {
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		}

		const isForm = body instanceof FormData
		if (isForm === false) {
			headers['Content-Type'] = 'application/json'
		}

		const url = `${this.url}/${route}`
		const response = await fetch(url, {
			method: method,
			credentials: 'omit',
			headers: headers,
			referrer: 'no-referrer',
			body: body
		})

		if (response.status >= 400)
			throw new Error(`${response.statusText}. ${await response.text()}`)

		if (method === 'DELETE')
			return undefined

		return await response.json() as T
	}
}