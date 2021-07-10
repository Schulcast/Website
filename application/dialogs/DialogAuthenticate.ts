import { component, DialogComponent, html, state } from '@3mo/model/library'
import { LocalStorageEntry } from '@3mo/model/helpers'
import { Member, API } from 'sdk'

// TODO: handle through MoDeL's DialogAuthenticator

@component('sc-dialog-authenticate')
export class DialogAuthenticate extends DialogComponent {
	private static authenticatedMemberEntry = new LocalStorageEntry<Member | undefined>('Schulcast.AuthenticatedMember', undefined)

	static get authenticatedMember() {
		return this.authenticatedMemberEntry.value
	}

	static get isAuthenticated() {
		return !!this.authenticatedMember
	}

	static unauthenticate = () => {
		DialogAuthenticate.authenticatedMemberEntry.value = undefined
	}

	@state() private username = ''
	@state() private password = ''

	protected render() {
		return html`
			<mo-dialog header='Einloggen' primaryButtonText='Einloggen'>
				<mo-flex gap='var(--mo-thickness-m)'>
					<mo-field-text label='Spitzname' required @change=${(e: CustomEvent<string>) => this.username = e.detail}></mo-field-text>
					<mo-field-password label='Passwort' required @change=${(e: CustomEvent<string>) => this.password = e.detail}></mo-field-password>
				</mo-flex>
			</mo-dialog>
		`
	}

	protected primaryButtonAction = async () => {
		DialogAuthenticate.authenticatedMemberEntry.value = await API.get<Member>(`member/authenticate?nickname=${this.username}&password=${this.password}`)
	}
}