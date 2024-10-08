import { PostFormType, PostParseType } from "./post";

interface NutrientFormat {
    label : string;
    quantity : number;
    unit : string;
}

interface Nutrients {
    ENERC_KCAL : NutrientFormat;
    FAT : NutrientFormat;
    CHOCDF : NutrientFormat;
    SUGAR : NutrientFormat;
    PROCNT : NutrientFormat;
    CHOLE : NutrientFormat;
    NA : NutrientFormat
}

export interface AnalyzedType {
    dietLabels : string[];
    healthLabels : string[];
    cautions : string[];
    totalNutrients : Nutrients
}

export interface AnalysisResultType {
    post : PostParseType;
    analysResult : AnalyzedType;
}