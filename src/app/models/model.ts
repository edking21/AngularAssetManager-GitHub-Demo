export class Model {
  modelName: string;
  modelId: number;
  makeId: number;

  constructor(modelName: string, modelId: number, makeId: number) {
    this.modelName = modelName;
    this.modelId = modelId;
    this.makeId = makeId;
  }
}
