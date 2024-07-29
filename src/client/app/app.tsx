import React, { useState } from "@rbxts/react";

export function App() {
	const [hovered, setHovered] = useState(false);

	return (
		<screengui>
			<textbutton
				Text={"Hello World!"}
				Size={new UDim2(0.2, 0, 0.2, 0)}
				Position={new UDim2(0.4, 0, 0.4, 0)}
				BackgroundColor3={
					hovered ? Color3.fromRGB(255, 0, 0) : Color3.fromRGB(0, 255, 0)
				}
				Event={{
					MouseEnter: () => setHovered(true),
					MouseLeave: () => setHovered(false),
				}}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
			</textbutton>
		</screengui>
	);
}
