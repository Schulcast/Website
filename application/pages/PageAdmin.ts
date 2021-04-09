import { component, html, internalProperty, PageComponent, property, route } from '@3mo/model/library'
import { API, Slide, Task, Post, Member } from 'sdk'
import { DialogAuthenticate, DialogPost, DialogMember, DialogSlide, DialogTask } from '../dialogs'

const enum Tab {
	Slides = 'slides',
	Tasks = 'tasks',
	Members = 'members',
	Posts = 'posts',
}

@route('/admin')
@component('sc-page-admin')
export class PageAdmin extends PageComponent {
	@property({ type: Array }) slides = new Array<Slide>()
	@property({ type: Array }) tasks = new Array<Task>()
	@property({ type: Array }) posts = new Array<Post>()
	@property({ type: Array }) members = new Array<Member>()

	@internalProperty() private tab = Tab.Posts

	protected initialized() {
		this.fetchSlides()
		this.fetchTasks()
		this.fetchMembers()
		this.fetchPosts()
	}

	private fetchSlides = async () => this.slides = await API.GET('slide') ?? []
	private fetchTasks = async () => this.tasks = await API.GET('task') ?? []
	private fetchMembers = async () => this.members = await API.GET('member') ?? []
	private fetchPosts = async () => this.posts = await API.GET('blog') ?? []

	private authenticate = async () => {
		await new DialogAuthenticate().confirm()
		await this.requestUpdate()
	}

	private unauthenticate() {
		DialogAuthenticate.unauthenticate()
		new PageAdmin().navigate()
	}

	protected render() {
		return html`
			<mo-page header='Admin Center' fullHeight>
				<style>
					h2 {
						text-align: center;
					}

					mo-card {
						font-size: var(--mo-font-size-xl);
					}
				</style>

				<mo-tab-bar slot='topAppBarDetails' value=${this.tab} @navigate=${(e: CustomEvent<Tab>) => this.tab = e.detail}>
					<mo-tab value=${Tab.Posts}>Blogeinträge</mo-tab>
					<mo-tab value=${Tab.Members}>Mitglieder</mo-tab>
					<mo-tab value=${Tab.Slides} ?hidden=${DialogAuthenticate.AuthenticatedMember?.role !== 'Admin'}>Slideshow</mo-tab>
					<mo-tab value=${Tab.Tasks} ?hidden=${DialogAuthenticate.AuthenticatedMember?.role !== 'Admin'}>Aufgabengruppen</mo-tab>
				</mo-tab-bar>

				<mo-grid
					?hidden=${!DialogAuthenticate.isAuthenticated}
					width='100%'
					columns='repeat(auto-fit, minmax(225px, 1fr))'
					columnGap='var(--mo-thickness-m)'
					rowGap='var(--mo-thickness-m)'
				>
					${this.currentTabCards}
				</mo-grid>

				<mo-fab position='absolute' right='16px' bottom='85px' extended icon='add'
					?hidden=${!DialogAuthenticate.isAuthenticated}
					label=${this.currentTabAction}
					@click=${this.openDialog}
				></mo-fab>

				<mo-fab position='absolute' right='16px' bottom='16px' extended
					label=${DialogAuthenticate.isAuthenticated ? 'Ausloggen' : 'Einloggen'}
					icon=${DialogAuthenticate.isAuthenticated ? 'logout' : 'login'}
					@click=${DialogAuthenticate.isAuthenticated ? this.unauthenticate : this.authenticate}
				></mo-fab>
			</mo-page>
		`
	}

	private get currentTabCards() {
		switch (this.tab) {
			case Tab.Slides:
				return this.slides.map(slide => html`<mo-card @click=${() => this.openSlideDialog(slide)}>${slide.description}</mo-card>`)
			case Tab.Tasks:
				return this.tasks.map(task => html`<mo-card @click=${() => this.openTaskDialog(task)}>${task.title}</mo-card>`)
			case Tab.Members:
				return this.members.map(member => html`<mo-card @click=${() => this.openMemberDialog(member)}>${member.nickname}</mo-card>`)
			case Tab.Posts:
				return this.posts.map(post => html`<mo-card @click=${() => this.openPostDialog(post)}>${post.title}</mo-card>`)
		}
	}

	private get currentTabAction() {
		switch (this.tab) {
			case Tab.Slides:
				return 'Neue Slide'
			case Tab.Tasks:
				return 'Neue Aufgabengruppe'
			case Tab.Members:
				return 'Neuer Mitglied'
			case Tab.Posts:
				return 'Neuer Blogeintrag'
		}
	}

	private get openDialog() {
		switch (this.tab) {
			case Tab.Slides:
				return () => this.openSlideDialog()
			case Tab.Tasks:
				return () => this.openTaskDialog()
			case Tab.Members:
				return () => this.openMemberDialog()
			case Tab.Posts:
				return () => this.openPostDialog()
		}
	}

	private openSlideDialog = async (slide?: Slide) => {
		await new DialogSlide({ entity: slide }).open()
		await this.fetchSlides()
	}

	private openTaskDialog = async (task?: Task) => {
		await new DialogTask({ entity: task }).open()
		await this.fetchTasks()
	}

	private openMemberDialog = async (member?: Member) => {
		await new DialogMember({ entity: member }).open()
		await this.fetchMembers()
	}

	private openPostDialog = async (post?: Post) => {
		await new DialogPost({ entity: post }).open()
		await this.fetchPosts()
	}
}