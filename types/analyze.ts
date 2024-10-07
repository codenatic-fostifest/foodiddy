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
    dietLables : string[];
    healthLabels : string[];
    cautions : string[];
    totalNutrients : Nutrients
}