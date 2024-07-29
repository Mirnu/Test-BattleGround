import { Flamework } from "@flamework/core";
import { CreateServer } from "@rbxts/wcs";

Flamework.addPaths("src/shared");
Flamework.addPaths("src/server");

Flamework.ignite();

const Server = CreateServer();

Server.Start();

import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import base from "shared/movesets/base";

Players.PlayerAdded.Connect((Player) => {
	Player.CharacterAdded.Connect((CharacterModel) => {
		const WCS_Character = new Character(CharacterModel);

		WCS_Character.ApplySkillsFromMoveset(base);

		const humanoid = CharacterModel.WaitForChild("Humanoid") as Humanoid;
		humanoid.Died.Once(() => WCS_Character.Destroy());
	});
});
