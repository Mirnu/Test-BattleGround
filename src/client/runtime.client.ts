import { Flamework } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";
import { actions_keycode } from "shared/constants/actions";
import { BindableSkills } from "shared/decoratos/BindActionDecorator";

Flamework.addPaths("src/shared");
Flamework.addPaths("src/client");

Flamework.ignite();

const Client = CreateClient();
Client.Start();

function getCurrentWCS_Character() {
	const characterModel = Players.LocalPlayer.Character;
	if (!characterModel) return;

	return Character.GetCharacterFromInstance(characterModel);
}

UserInputService.InputBegan.Connect((input, gameProcessed) => {
	if (gameProcessed) return;
	const action =
		actions_keycode.get(input.KeyCode) ??
		actions_keycode.get(input.UserInputType);
	if (!action) return;
	const skillCtor = BindableSkills.get(action);
	if (!skillCtor) return;
	const skill = getCurrentWCS_Character()?.GetSkillFromConstructor(skillCtor);
	skill?.Start();
});
