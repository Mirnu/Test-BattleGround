import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { SkillDecorator } from "@rbxts/wcs";
import { BindActionDecorator } from "shared/decoratos/BindActionDecorator";
import { BaseSkill } from "./BaseSkill";

@SkillDecorator
@BindActionDecorator("Punch")
export class Attack extends BaseSkill {
	private readonly cooldown = 1;

	protected OnStartClient(): void {
		const track = this.animator.LoadAnimation(
			ReplicatedStorage.Prefabs.Animations.Attack,
		);
		track.Play();
		track.Ended.Connect(() => track.Destroy());
	}

	private attack() {
		const size = new Vector3(4, 6, 6);
		const position = this.rootPart.CFrame.add(
			this.rootPart.CFrame.LookVector.mul(3),
		).mul(new CFrame(0, 0, -size.Z / 2));

		const partsInHitbox = Workspace.GetPartBoundsInBox(position, size);

		const hitCharacters = new Set(
			partsInHitbox
				.map((part) => part.FindFirstAncestorOfClass("Model"))
				.filterUndefined(),
		);
		hitCharacters.delete(this.characterModel);

		for (const parent of hitCharacters) {
			const humanoid = parent.FindFirstChildOfClass("Humanoid");
			humanoid?.TakeDamage(10);
		}
	}

	protected OnStartServer(): void {
		this.ApplyCooldown(this.cooldown);
		task.delay(0.3, () => this.attack());
	}
}
