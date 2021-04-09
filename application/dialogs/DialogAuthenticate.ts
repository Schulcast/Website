import { component, DialogComponent, html, internalProperty } from '@3mo/model/library'
import { LocalStorageEntry } from '@3mo/model/helpers'
import { Member, API } from 'sdk'

// TODO: handle through MoDeL's DialogAuthenticator

@component('sc-dialog-authenticate')
export class DialogAuthenticate extends DialogComponent {
	private static AuthenticatedMemberEntry = new LocalStorageEntry<Member | undefined>('Schulcast.AuthenticatedMember', undefined)

	static get AuthenticatedMember() {
		return this.AuthenticatedMemberEntry.value
	}

	static get isAuthenticated() {
		return !!this.AuthenticatedMember
	}

	static unauthenticate = () => {
		DialogAuthenticate.AuthenticatedMemberEntry.value = undefined
	}

	@internalProperty() private username = ''
	@internalProperty() private password = ''

	protected render() {
		return html`
			<mo-dialog header='Einloggen' primaryButtonText='Einloggen' .primaryButtonClicked=${this.authenticate}>
				<mo-flex gap='var(--mo-thickness-m)'>
					<mo-field-text label='Spitzname' required @change=${(e: CustomEvent<string>) => this.username = e.detail}></mo-field-text>
					<mo-field-password label='Passwort' required @change=${(e: CustomEvent<string>) => this.password = e.detail}></mo-field-password>
				</mo-flex>
			</mo-dialog>
		`
	}

	private authenticate = async () => {
		DialogAuthenticate.AuthenticatedMemberEntry.value = await API.GET<Member>(`member/authenticate?nickname=${this.username}&password=${this.password}`)
	}
}