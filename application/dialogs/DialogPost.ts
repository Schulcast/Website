import { property, html, component } from '@3mo/model/library'
import { entityDialogComponent, EntityDialogComponent } from './EntityDialogComponent'
import { API, Member, Post } from 'sdk'

@entityDialogComponent('blog')
@component('sc-dialog-post')
export class DialogPost extends EntityDialogComponent<Post> {
	@property({ type: Array }) members = new Array<Member>()

	protected async initialized() {
		this.members = await API.get<Array<Member>>('member').then(members => this.members = members ?? [])
	}

	private get header() {
		return this.entity.id
			? `Blogeintrag #${this.entity.id}`
			: 'Neuer Blogeintrag'
	}

	protected render() {
		return html`
			<mo-dialog header=${this.header} size='medium'>
				<mo-flex gap='var(--mo-thickness-m)'>
					<mo-field-text label='Titel' required
						value=${this.entity.title}
						@change=${(e: CustomEvent<string>) => this.entity.title = e.detail}
					></mo-field-text>

					<mo-field-select label='Verfasser'
						value=${this.entity.memberId}
						@change=${(e: CustomEvent<number>) => this.entity.memberId = e.detail}
					>
						${this.members.map(member => html`
							<mo-option value=${String(member.id)} ?selected=${member.id === this.entity.memberId}>
								${member.nickname}
							</mo-option>
						`)}
					</mo-field-select>

					<mo-text-area label='Inhalt' rows='11' required
						value=${this.entity.content}
						@change=${(e: CustomEvent<string>) => this.entity.content = e.detail}
					></mo-text-area>
				</mo-flex>
			</mo-dialog>
		`
	}
}