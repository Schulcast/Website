import { logo, Component, html } from '@3mo/model/library'

@logo
export class Logo extends Component {
	protected render() {
		return html`
			<style>
				:host {
					display: flex;
					justify-content: center;
					height: 100%
				}

				img {
					height: 100%
				}
			</style>
			<img src='/assets/logo.png' />
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'mo-logo': Logo
	}
}