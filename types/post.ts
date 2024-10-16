import { DocumentPickerAsset } from "expo-document-picker";

export interface PostFormType {
    title : string;
    img : DocumentPickerAsset | null;
    ingr : string;
    prep : string;
    sum : string;
}

export interface PostParseType {
    title : string;
    img : DocumentPickerAsset;
    ingr : string[];
    prep : string[];
    id? : string;
    user_id? : string;
    sum : string;
}