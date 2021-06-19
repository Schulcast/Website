
import { component, homePage, html, nothing, PageComponent, property, route } from '@3mo/model/library'
import { API, FeedItem, Slide } from 'sdk'

@homePage
@route('/home')
@component('sc-page-home')
export class PageHome extends PageComponent {
	@property({ type: Array }) feed = new Array<FeedItem>()
	@property({ type: Array }) slides = new Array<Slide>()

	protected initialized() {
		this.fetchFeed()
		this.fetchSlides()
	}

	private readonly fetchSlides = async () => this.slides = await API.get('slide') ?? []
	private readonly fetchFeed = async () => this.feed = await API.get('feed') ?? []

	protected render() {
		const slides = this.slides.length === 0 ? nothing : html`
			<mo-swiper height='500px'>
				${this.slides.map(slide => html`
					<mo-swiper-slide background=${`url("http://api.schulcast.de/file/${slide.id}")`}>
						<div style='font-size: var(--mo-font-size-xl); text-align: center; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;'>${slide.description}</div>
					</mo-swiper-slide>
				`)}
			</mo-swiper>
		`
		return html`
			<mo-page header='Startseite'>
				<style>
					h2 {
						font: 400 24px/1.3333333333 Roboto;
						text-transform: uppercase;
						margin-top: 32px;
						margin-bottom: 16px;
						text-align: center;
					}
				</style>
				${slides}
				<h2>Zuletzt veröffentlicht</h2>
				<mo-grid
					columns='repeat(auto-fit, minmax(250px, 1fr))'
					columnGap='var(--mo-thickness-m)'
					rowGap='1em'
				>
					${this.feed.map(feedItem => html`<sc-card-feed-item .feedItem=${feedItem}></sc-card-feed-item>`)}
				</mo-grid>
			</mo-page>
		`
	}
}