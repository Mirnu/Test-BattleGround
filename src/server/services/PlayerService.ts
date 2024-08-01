import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { CharacterRig } from "shared/types/CharacterRig";

@Service()
class PlayerService implements OnStart {
	public onStart(): void {
		Players.PlayerAdded.Connect((player) => {
			player.CharacterAppearanceLoaded.Connect((char) => {
				const character = char as CharacterRig;
				const humanoid = character.Humanoid;
				humanoid.RemoveAccessories();
			});
		});
	}
}
