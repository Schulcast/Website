import { component, Component, html } from '@3mo/model/library'

@component('sc-social-media')
export class SocialMedia extends Component {
	protected render = () => html`
		<style>
			img {
				height: 25px;
			}
		</style>
		<mo-flex direction='horizontal' alignItems='center' justifyContent='center' gap='var(--mo-thickness-xl)'>
			<a href='https://open.spotify.com/show/2vLWX9pfqDNU1hsWj6NnrY' target='_blank'>
				<img src='/assets/spotify.png' />
			</a>
			<a href='https://podcasts.apple.com/de/podcast/schulcast/id1485165971' target='_blank'>
				<img src='/assets/itunes.png' />
			</a>
			<a href='https://www.youtube.com/channel/UCtow4J8YJPGjppfiBnmHicQ' target='_blank'>
				<img src='/assets/youtube.png' />
			</a>
			<a href='https://twitter.com/schulcast' target='_blank'>
				<img src='/assets/twitter.svg' />
			</a>
			<a href='https://www.instagram.com/schulcast/' target='_blank'>
				<img src='/assets/instagram.svg' />
			</a>
		</mo-flex>
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'sc-social-media': SocialMedia
	}
}