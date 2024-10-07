import { DocumentPickerAsset } from "expo-document-picker";

export interface PostFormType {
    title : string;
    img : DocumentPickerAsset | null;
    ingr : string;
    prep : string;
}