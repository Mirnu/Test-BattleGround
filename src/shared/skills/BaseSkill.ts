import { CharacterRigR15 } from "@rbxts/promise-character";
import { ReplicatedStorage } from "@rbxts/services";
import { Skill } from "@rbxts/wcs";

export abstract class BaseSkill extends Skill<[string]> {
	protected characterModel = this.Character.Instance as CharacterRigR15;
	protected animator = this.characterModel.Humanoid.Animator;
	protected rootPart = this.characterModel.HumanoidRootPart;
	protected animations = ReplicatedStorage.Prefabs.Animations;
}
