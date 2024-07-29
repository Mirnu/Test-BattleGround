import { Constructor } from "@flamework/core/out/utility";
import { Skill } from "@rbxts/wcs";
import { actions } from "shared/constants/actions";

export const BindableSkills = new Map<actions, Constructor<Skill>>();

export function BindActionDecorator(action: actions) {
	return (ctor: Constructor<Skill>) => {
		BindableSkills.set(action, ctor);
	};
}
