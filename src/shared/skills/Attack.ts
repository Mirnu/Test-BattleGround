import { ReplicatedStorage } from "@rbxts/services";
import { SkillDecorator } from "@rbxts/wcs";
import { BindActionDecorator } from "shared/decoratos/BindActionDecorator";
import { DealingDamageHitBox } from "shared/modules/DealingDamageHitBox";
import { ShakenStonesManager } from "shared/modules/ShakenStones/ShakenStonesManager";
import { BaseSkill } from "./BaseSkill";

@SkillDecorator
@BindActionDecorator("Punch")
export class Attack extends BaseSkill {
	private readonly cooldown = 1;
	private readonly shakenStonesManager = new ShakenStonesManager();

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

		const hitBox = new DealingDamageHitBox(position, size, this.characterModel);
		hitBox.GetDamagedInHitBox().GiveDamageEveryone(10);
		this.shakenStonesManager.CreateStones({
			Epicenter: this.rootPart.Position.sub(Vector3.yAxis.mul(3.5)),
			Quantity: math.random(5, 10),
			Spread: math.random(5, 10),
		});
	}

	protected OnStartServer(): void {
		this.ApplyCooldown(this.cooldown);
		task.delay(0.3, () => this.attack());
	}
}
