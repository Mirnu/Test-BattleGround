import { Make } from "@rbxts/altmake";
import { Workspace } from "@rbxts/services";
import { ShakenStonesData } from "./ShakenStonesManager";

export class ShakenStonesFactory {
	public CreateStones(data: ShakenStonesData) {
		const lenght = this.getLengthCircle(data.Spread);
		const placeUnderPart = lenght / data.Quantity;
		const partAngle = 360 / data.Quantity;
		const parts: Part[] = [];

		for (let i = 0; i < data.Quantity; i++) {
			const part = this.createPart(
				partAngle * i,
				data.Spread,
				data.Epicenter,
				placeUnderPart,
			);
			part.CFrame = CFrame.lookAt(
				part.Position,
				data.Epicenter.sub(Vector3.yAxis.mul(2)),
			);
			parts.push(part);
			part.Material = Enum.Material.SmoothPlastic;
		}
		return parts;
	}

	private getLengthCircle(radius: number) {
		return 2 * math.pi * radius;
	}

	private createPart(
		angle: number,
		radius: number,
		epicenter: Vector3,
		place: number,
	) {
		const x = epicenter.X + radius * math.cos(angle);
		const z = epicenter.Z + radius * math.sin(angle);

		return Make("Part", {
			Anchored: true,
			CanCollide: false,
			Position: new Vector3(x, epicenter.Y, z),
			Size: new Vector3(
				place,
				radius * math.random() * 0.5,
				radius * math.random() * 0.5,
			),
			Parent: Workspace,
		});
	}
}
