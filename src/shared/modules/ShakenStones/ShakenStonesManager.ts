import { TweenService } from "@rbxts/services";
import { ShakenStonesFactory } from "./ShakenStonesFactory";

export interface ShakenStonesData {
	Epicenter: Vector3;
	Spread: number;
	Quantity: number;
}

export class ShakenStonesManager {
	private readonly shakenStonesFactory!: ShakenStonesFactory;

	constructor() {
		this.shakenStonesFactory = new ShakenStonesFactory();
	}

	public CreateStones(data: ShakenStonesData) {
		const stones = this.shakenStonesFactory.CreateStones(data);
		task.delay(2, () => {
			for (const stone of stones) {
				const tween = TweenService.Create(stone, new TweenInfo(2), {
					Position: stone.Position.sub(Vector3.yAxis.mul(5)),
					Transparency: 1,
				});
				tween.Play();
				tween.Completed.Connect(() => {
					stone.Destroy();
					tween.Destroy();
				});
			}
		});
	}
}
