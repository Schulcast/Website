import { Component, css, component, html } from '@3mo/model/library'

@component('mo-swiper-slide')
export class SwiperSlide extends Component {
	static get styles() {
		return css`
			:host {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 100%;
				background-size: cover !important;
				background-repeat: no-repeat !important;
				background-position: center !important;
			}
		`
	}

	protected render = () => html`<slot></slot>`
}

declare global {
	interface HTMLElementTagNameMap {
		'mo-swiper-slide': SwiperSlide
	}
}