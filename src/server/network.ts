import { GlobalEvents, GlobalFunctions } from "shared/network";

export const Events = GlobalEvents.createServer({
	middleware: {
		punch: [
			(nextProcess, event) => {
				print("Loaded middleware for", event.name);
				return async (player, ...args) => {
					if (math.random() < 50 / 100) {
						return nextProcess(player, ...args);
					}
				};
			},
		],
	},
});
export const Functions = GlobalFunctions.createServer({});
