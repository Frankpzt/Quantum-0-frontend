import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../interfaces/redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// trigger the action
export const useAppDispatch = () => useDispatch<AppDispatch>();
// retrieve the state from the container
// useSelector((state) => state.customization);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
