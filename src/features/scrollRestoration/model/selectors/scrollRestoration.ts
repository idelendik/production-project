import { StateSchema } from "app/providers/StoreProvider";
import { createSelector } from "@reduxjs/toolkit";

export const getScroll = (state: StateSchema) => state.scrollRestoration;

export const getScrollByPathTest = (state: StateSchema, path: string) => state.scrollRestoration.scroll[path];

export const getScrollByPath = createSelector(
    getScroll,
    (state: StateSchema, path: string) => path,
    (scrollRestoration, path) => scrollRestoration.scroll[path] || 0,
)