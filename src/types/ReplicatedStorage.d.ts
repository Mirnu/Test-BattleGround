interface ReplicatedStorage extends Instance {
	Prefabs: Folder & {
		Animations: Folder & {
			Dash: Animation;
			Attack: Animation;
		};
		Items_for_skills: Folder & {
			Ball: Part;
		};
	};

	TS: Folder & {
		movesets: Folder;
		skills: Folder;
		statusEffects: Folder;
	};
}
