/* eslint-disable */
// @ts-nocheck
const path = require('path')
const MoDeLWebpackConfigFactory = require('@3mo/model/build/WebpackConfig.ts')
const CopyPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (_, arguments) => MoDeLWebpackConfigFactory(arguments.mode, {
	cache: false,
	entry: './application/index.ts',
	context: path.resolve(__dirname),
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		clientLogLevel: 'silent',
	}
}, [
	new FaviconsWebpackPlugin({
		logo: 'assets/schulcast.svg',
		manifest: './manifest.json'
	}),
	new CopyPlugin({
		patterns: [
			{
				from: 'assets',
				to: 'assets',
			},
			{
				from: 'google937689a1c2f60163.html',
				to: ''
			},
			{
				from: 'googleb9e726f97108c589.html',
				to: ''
			}
		]
	})
])
// TODO: SEO meta
// <meta name="description" content="Schulcast macht Podcasts und YouTube-Videos für Schüler*innen, Lehrer*innen, Pädagogen, Medieninteressierte und Menschen wie dich. Du bereitest dich gerade auf dein Abitur in Hamburg vor? Der Schulcast der Beruflichen Schule St. Pauli unterstützt dich mit Videos und Podcasts zu abiturrelevanten Themen. Aktuell berichten wir über  den Roman „Vor dem Fest“ von Saša Stanišić im Rahmen der Deutsch Abitur-Aufgabe 2 'Fürstenfelde erzählen'. Der Schulcast wurde 2018 von Schülern und Lehrern gegründet, um Geschichten rund um das Thema Schule und mehr zu erzählen.">