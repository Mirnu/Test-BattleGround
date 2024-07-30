import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { Message, SkillDecorator } from "@rbxts/wcs";
import { BindActionDecorator } from "shared/decoratos/BindActionDecorator";
import { GetHumanoidByPartInCharacter } from "shared/utils/character-utils";
import { BaseSkill } from "./BaseSkill";

@SkillDecorator
@BindActionDecorator("Red")
export class Red extends BaseSkill {
	private readonly cooldown = 5;
	private readonly damage = 10;

	protected OnStartServer(): void {
		this.ApplyCooldown(this.cooldown);
		const [worked, cframe] = this.getCameraCframe().await();
		if (!worked) return;

		const ball = this.createBall();
		cframe && this.runBall(ball, cframe.LookVector);
		ball.Touched.Connect((otherPart) => {
			const humanoid = GetHumanoidByPartInCharacter(otherPart);
			humanoid?.TakeDamage(this.damage);
		});
	}

	@Message({
		Type: "Request",
		Destination: "Client",
	})
	protected async getCameraCframe() {
		return Workspace.CurrentCamera?.CFrame;
	}

	private runBall(ball: Part, cameraLookVector: Vector3) {
		task.wait(3);
		for (const particle of ball.GetChildren() as ParticleEmitter[]) {
			particle.Enabled = true;
		}
		const destitanation = this.rootPart.CFrame.add(cameraLookVector.mul(100));
		const tweenInfo = new TweenInfo(5, Enum.EasingStyle.Quad);
		const tween = TweenService.Create(ball, tweenInfo, {
			CFrame: destitanation,
		});
		tween.Play();
		tween.Completed.Connect(() => {
			ball.Destroy();
			tween.Destroy();
		});
	}

	private createBall() {
		const ball = ReplicatedStorage.Prefabs.Items_for_skills.Ball.Clone();
		ball.Parent = Workspace;
		ball.CFrame = this.rootPart.CFrame.add(
			this.rootPart.CFrame.LookVector.mul(3),
		);
		ball.CanCollide = false;
		return ball;
	}
}
