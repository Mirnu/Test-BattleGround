import { SkillDecorator } from "@rbxts/wcs";
import { BindActionDecorator } from "shared/decoratos/BindActionDecorator";
import { BaseSkill } from "./BaseSkill";

@SkillDecorator
@BindActionDecorator("Red")
export class Red extends BaseSkill {
	private readonly cooldown = 5;

	protected OnStartServer(): void {
		this.ApplyCooldown(this.cooldown);
	}
}
