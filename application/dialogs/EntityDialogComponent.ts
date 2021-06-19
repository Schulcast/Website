import { DialogComponent, DialogComponentConstructor, DialogDefault, PropertyValues } from '@3mo/model/library'
import { Entity, API } from 'sdk'

export const entityDialogComponent = (controller: string) => {
	return <T>(constructor: EntityDialogComponentConstructor<T>) => {
		constructor.controller = controller
	}
}

export interface EntityDialogComponentConstructor<T> extends DialogComponentConstructor<{ entity?: T }> {
	controller: string
}

export abstract class EntityDialogComponent<T extends Entity> extends DialogComponent<{ entity?: T }> {
	static controller: string
	['constructor']: EntityDialogComponentConstructor<T>

	protected readonly entity = this.parameters.entity ?? {} as T

	private get controller() {
		return this.constructor.controller
	}

	protected firstUpdated(props: PropertyValues) {
		super.firstUpdated(props)
		if (this.dialog) {
			this.dialog.primaryButtonText = 'Speichern'
			this.dialog.primaryButtonClicked = () => this.save()
			this.dialog.secondaryButtonText = this.parameters.entity?.id ? 'Löschen' : ''
			this.dialog.secondaryButtonClicked = () => this.delete()
		}
	}

	protected async save() {
		if (!this.parameters.entity?.id) {
			await API.post(this.controller, this.entity)
		} else {
			await API.put(`${this.controller}/${this.parameters.entity.id}`, this.entity)
		}
	}

	protected async delete() {
		if (!this.parameters.entity?.id) {
			return
		}

		await new DialogDefault({
			header: 'Bestätigung',
			content: 'Soll dieser Eintrag gelöscht werden?',
		}).confirm()

		await API.delete(`${this.controller}/${this.parameters.entity.id}`)
	}
}