import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { App } from "./app";

const root = createRoot(new Instance("Folder"));
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as ScreenGui;

//root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>);
