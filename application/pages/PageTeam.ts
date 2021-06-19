
import { component, html, PageComponent, property, route } from '@3mo/model/library'
import { API, Member } from 'sdk'
import { DialogMemberData } from '../dialogs'

@route('/team')
@component('sc-page-team')
export class PageTeam extends PageComponent {
	@property({ type: Array }) members = new Array<Member>()

	protected async initialized() {
		this.members = await API.get('member') ?? []
	}

	protected render() {
		return html`
			<mo-page header='Team'>
				<style>
					:host {
						line-height: 175%;
					}
				</style>
				<h2>Wir sind Schulcast</h2>
				Schulcast macht Podcasts und YouTube-Videos für Schüler*innen, Lehrer*innen, Pädagogen, Medieninteressierte und Menschen wie dich.
				<br />
				Du bereitest dich z.B. gerade auf das Abitur in Hamburg vor? Der Schulcast der Beruflichen Schule St. Pauli unterstützt dich mit Videos und Podcasts zu abiturrelevanten Themen. Aktuell berichten wir über  den Roman „Vor dem Fest“ von Saša Stanišić im Rahmen der Deutsch Abitur-Aufgabe 2 'Fürstenfelde erzählen'.
				<br />
				Der Schulcast wurde 2018 von Schülern und Lehrern gegründet, um Geschichten rund um das Thema Schule und mehr zu erzählen.

				<h2>Unsere Mitglieder</h2>
				<mo-grid
					columns='repeat(auto-fill, minmax(180px, 1fr))'
					columnGap='var(--mo-thickness-m)'
					rowGap='var(--mo-thickness-m)'
				>
					${this.members.map(member => html`
						<sc-member .member=${member} @click=${() => new DialogMemberData({ member: member }).open()}></sc-member>
					`)}
				</mo-grid>
			</mo-page>
		`
	}
}