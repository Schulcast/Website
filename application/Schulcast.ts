import { Application, application, component, css, html, property } from '@3mo/model/library'
import { LocalizationHelper, ThemeHelper } from '@3mo/model/helpers'
import { Color } from '@3mo/model/types'
import { Logo } from '@3mo/model/components'
import * as Pages from './pages'

@application
@component('sc-application')
export class Schulcast extends Application {
	constructor() {
		super()
		ThemeHelper.Accent.value = new Color([204, 14, 0])
		LocalizationHelper.Language.value = 'de'
		Logo.source = '/assets/logo.png'
	}

	static get styles() {
		return css`
			${super.styles}

			mo-icon-button[icon=menu] {
				display: none;
			}

			#flexPages a {
				display: flex;
				color: var(--mo-color-accessible);
				font-size: var(--mo-font-size-m);
			}

			:host {
				--footer-height: 40px;
				--player-height: 0px;
			}

			:host([playing]) {
				--player-height: 80px;
			}

			mo-top-app-bar {
				padding-bottom: calc(var(--footer-height) + var(--player-height));
			}

			sc-player {
				bottom: var(--footer-height);
			}

			@media (max-width: 768px) {
				mo-icon-button[icon=menu] {
					display: block;
				}

				#flexPages {
					display: none;
				}

				:host {
					--footer-height: 0px;
				}

				sc-footer {
					display: none;
				}
			}
		`
	}

	@property({ type: Boolean, reflect: true }) playing = false

	protected render() {
		return html`
			${super.render()}
			<sc-player @sourceChange=${(e: CustomEvent<string | undefined>) => this.playing = !!e.detail}></sc-player>
			<sc-footer></sc-footer>
		`
	}

	get drawerTemplate() {
		return html`
			<mo-drawer-list>
				<mo-drawer-item icon='home' .component=${new Pages.PageHome}>Startseite</mo-drawer-item>
				<mo-drawer-item icon='group' .component=${new Pages.PageTeam}>Team</mo-drawer-item>
				<mo-drawer-item icon='info' .component=${new Pages.PageImprint}>Impressum</mo-drawer-item>
			</mo-drawer-list>
		`
	}

	get drawerFooterTemplate() {
		return html`
			<mo-flex gap='20px'>
				<sc-social-media></sc-social-media>
				<sc-copyright></sc-copyright>
			</mo-flex>
		`
	}

	get topAppBarActionItemsTemplate() {
		return html`
			<mo-flex id='flexPages' direction='horizontal' gap='var(--mo-thickness-xl)' alignItems='center'>
				<a href='' @click=${() => new Pages.PageHome().navigate()}>Startseite</a>
				<a href='' @click=${() => new Pages.PageTeam().navigate()}>Team</a>
			</mo-flex>
		`
	}
}