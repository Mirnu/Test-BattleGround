import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

@Service()
class PlayerService implements OnStart {
	public onStart(): void {
		Players.PlayerAdded.Connect((player) => {
			player.CharacterAppearanceLoaded.Connect((char) => {
				for (const item of char.GetDescendants()) {
					if (item.IsA("Accessory")) {
						item.Destroy();
					}
				}
			});
		});
	}
}
