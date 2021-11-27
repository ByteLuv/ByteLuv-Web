import {TypeElement} from "@idraw/types";
import {TypeElemDesc} from "@idraw/types/src/lib/element";

export interface LuvLetter {
  id: number
  uid: number
  content: {
    width: number,
    height: number,
    data: TypeElement<keyof TypeElemDesc>[]
  }
}