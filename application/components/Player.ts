import { component, Component, html, property, event, query } from '@3mo/model'

/**
 * @fires sourceChange
 */
@component('sc-player')
export class Player extends Component {
	static get instance() { return MoDeL.application.shadowRoot.querySelector('sc-player') as Player }

	@event() private readonly sourceChange!: EventDispatcher<string | undefined>

	@query('audio') private readonly audioElement!: HTMLAudioElement
	@query('source') private readonly sourceElement!: HTMLSourceElement

	static get play() {
		return this.instance.play
	}

	@property() header?: string
	@property({
		reflect: true,
		observer: function (this: Player) {
			if (this.source) {
				this.sourceElement.src = this.source
				this.audioElement.load()
				this.audioElement.play()
			}
			this.sourceChange.dispatch(this.source)
		}
	}) source?: string


	play = (src: string, title?: string) => {
		this.source = src
		this.header = title
	}

	protected render() {
		return html`
			<style>
				:host {
					display: none;
					position: fixed;
					width: 100%;
					border-top: 1px solid var(--mo-color-gray-transparent);
					height: 80px;
					right: 0;
					left: 0;
				}

				:host([source]) {
					display: initial;
				}

				audio {
					width: 100%;
					height: 40px;
					background: var(--mo-color-background);
				}

				h2 {
					margin: 0;
					padding: 7.5px 0 2.5px 0;
					text-align: center;
				}

				div {
					background: var(--mo-color-background)
				}
			</style>
			<div>
				<h2>${this.header}</h2>
				<audio controls>
					<source type='audio/mpeg'>
				</audio>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'sc-player': Player
	}
}