import { fruit } from "../01-node-farm/types/fruit";
import { placeholder } from "../01-node-farm/types/placeholders";

export const fillTemplate = (baseTemplate: string, x: fruit): string => {
  let output = baseTemplate.replaceAll(`{%${placeholder.id}%}`, String(x.id));
  output = output.replaceAll(`{%${placeholder.name}%}`, x.productName);
  output = output.replaceAll(`{%${placeholder.image}%}`, x.image);
  output = output.replaceAll(`{%${placeholder.country}%}`, x.from);
  output = output.replaceAll(`{%${placeholder.quantity}%}`, x.quantity);
  output = output.replaceAll(`{%${placeholder.price}%}`, x.price);
  output = output.replaceAll(`{%${placeholder.nutrients}%}`, x.nutrients);
  output = output.replaceAll(`{%${placeholder.description}%}`, x.description);

  if (!x.organic)
    output = output.replace(`{%${placeholder.in_organic}%}`, "not-organic");

  return output;
};
