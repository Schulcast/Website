import { component, Component, html, property } from '@3mo/model'
import { API } from 'sdk'

@component('sc-thumbnail')
export class Thumbnail extends Component {
	@property({ type: Number }) fileId = 0

	protected render = () => html`
		<style>
			:host {
				--thumbnail-size: 150px;
				border-radius: 50%;
				width: var(--thumbnail-size);
				height: var(--thumbnail-size);
				margin: 0 15px;
				background-size: cover;
				background-color: var(--mo-color-gray-transparent);
				background-image: ${this.fileUrl};
			}
		</style>
	`

	private get fileUrl() {
		return this.fileId > 0 ? `url(${`${API.url}/file/${this.fileId}`})` : ''
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'sc-thumbnail': Thumbnail
	}
}