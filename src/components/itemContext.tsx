import { createContext } from "react";
import { Video } from "../interfaces";

interface IitemCxt {
  item: Video | null,
  name: String,
}

const ItemContext = createContext<IitemCxt>({item: null, name: ''});

export default ItemContext;