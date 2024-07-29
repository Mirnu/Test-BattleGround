import { RunService } from "@rbxts/services";
import { SkillDecorator } from "@rbxts/wcs";
import { BindActionDecorator } from "shared/decoratos/BindActionDecorator";
import { BaseSkill } from "./BaseSkill";

@SkillDecorator
@BindActionDecorator("Dash")
export class Dash extends BaseSkill {
	private readonly cooldown = 2;
	private connection?: RBXScriptConnection;

	protected override OnStartClient(): void {
		this.connection = this.dash();
		const track = this.animator.LoadAnimation(this.animations.Dash);
		track.Play();
		track.Ended.Connect(() => track.Destroy());
		task.delay(0.3, () => this.connection?.Disconnect());
	}

	protected override OnStartServer(): void {
		this.ApplyCooldown(this.cooldown);
	}

	private dash() {
		return RunService.Heartbeat.Connect(() => {
			this.rootPart.CFrame = this.rootPart.CFrame.add(
				this.rootPart.CFrame.LookVector.mul(2),
			);
		});
	}
}
