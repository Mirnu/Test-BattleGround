import { Workspace } from "@rbxts/services";
import { CharacterRig } from "../types/CharacterRig";

export class DealingDamageHitBox {
	constructor(
		private readonly cframe: CFrame,
		private size: Vector3,
		private owner?: CharacterRig,
	) {}

	public GetDamagedInHitBox() {
		const partsInHitbox = Workspace.GetPartBoundsInBox(this.cframe, this.size);

		const hitCharacters = new Set(
			partsInHitbox
				.map((part) => part.FindFirstAncestorOfClass("Model"))
				.filterUndefined(),
		) as Set<CharacterRig>;
		this.owner && hitCharacters.delete(this.owner);
		return new ContainerDamaigedCharacters([...hitCharacters]);
	}
}

export class ContainerDamaigedCharacters {
	constructor(private readonly characters: CharacterRig[]) {}

	public GiveDamageEveryone(damage: number) {
		for (const character of this.characters) {
			character.Humanoid.TakeDamage(damage);
		}
	}
}
