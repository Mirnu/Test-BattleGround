export function GetHumanoidByPartInCharacter(part: BasePart) {
	return part
		.FindFirstAncestorOfClass("Model")
		?.FindFirstChildOfClass("Humanoid");
}
