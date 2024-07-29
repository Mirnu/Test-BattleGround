export type actions = "Red" | "Punch" | "Dash";

export const actions_keycode = new Map<
	Enum.KeyCode | Enum.UserInputType,
	actions
>([
	[Enum.KeyCode.F, "Red"],
	[Enum.UserInputType.MouseButton1, "Punch"],
	[Enum.KeyCode.Q, "Dash"],
]);
