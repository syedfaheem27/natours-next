"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillTemplate = void 0;
const placeholders_1 = require("../01-node-farm/types/placeholders");
const fillTemplate = (baseTemplate, x) => {
    let output = baseTemplate.replaceAll(`{%${placeholders_1.placeholder.id}%}`, String(x.id));
    output = output.replaceAll(`{%${placeholders_1.placeholder.name}%}`, x.productName);
    output = output.replaceAll(`{%${placeholders_1.placeholder.image}%}`, x.image);
    output = output.replaceAll(`{%${placeholders_1.placeholder.country}%}`, x.from);
    output = output.replaceAll(`{%${placeholders_1.placeholder.quantity}%}`, x.quantity);
    output = output.replaceAll(`{%${placeholders_1.placeholder.price}%}`, x.price);
    output = output.replaceAll(`{%${placeholders_1.placeholder.nutrients}%}`, x.nutrients);
    output = output.replaceAll(`{%${placeholders_1.placeholder.description}%}`, x.description);
    if (!x.organic)
        output = output.replace(`{%${placeholders_1.placeholder.in_organic}%}`, "not-organic");
    return output;
};
exports.fillTemplate = fillTemplate;
