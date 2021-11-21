import { Component, component, html } from '@3mo/model'
import { PageImprint } from '../pages'

@component('sc-footer')
export class Footer extends Component {
	protected render() {
		return html`
			<style>
				:host {
					position: fixed;
					width: 100%;
					border-top: 1px solid var(--mo-color-gray-transparent);
					height: 40px;
					bottom: 0;
					right: 0;
					left: 0;
				}

				img {
					height: 25px;
				}

				a {
					cursor: pointer;
				}
			</style>
			<mo-flex padding='0 5px' width='calc(100% - 10px)' height='100%' direction='horizontal' alignItems='center' justifyContent='space-between'>
				<mo-div>
					<a @click=${() => new PageImprint().navigate()}>Impressum</a>
				</mo-div>

				<sc-copyright></sc-copyright>

				<sc-social-media></sc-social-media>
			</mo-flex>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'sc-footer': Footer
	}
}