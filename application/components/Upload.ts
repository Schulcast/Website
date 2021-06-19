import { Component, component, html, property } from '@3mo/model/library'
import { API } from 'sdk'

@component('sc-upload')
export class Upload<T = undefined> extends Component {
	@property() folder?: string

	protected render() {
		return html`
			<style>
				:host {
					display: none;
				}
			</style>
			<input name='formFile' type='file'>
		`
	}

	private get inputElement() {
		return this.shadowRoot.querySelector('input') as HTMLInputElement
	}

	get files() {
		return this.inputElement.files as FileList
	}

	open() {
		this.inputElement.click()
	}

	upload = async () => {
		if (this.folder && this.inputElement.value !== '') {
			const response = await API.postFile(`file/${this.folder}`, this.files)
			this.inputElement.value = ''
			return response as T
		}

		return undefined
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'sc-upload': Upload
	}
}