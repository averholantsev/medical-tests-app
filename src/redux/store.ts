import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { models, IRootModel } from '../models';

type IFullModel = ExtraModelsFromLoading<IRootModel>;
export const store = init<IRootModel, IFullModel>({
  models,
  plugins: [loadingPlugin()],
});

export type IStore = typeof store;
export type IDispatch = RematchDispatch<IRootModel>;
export type IRootState = RematchRootState<IRootModel, IFullModel>;
