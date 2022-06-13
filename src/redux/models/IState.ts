import { IAnimal } from "../../models/IAnimal";

export interface IState {
  animals: IValue;
}

interface IValue {
  value: IAnimal[];
}
