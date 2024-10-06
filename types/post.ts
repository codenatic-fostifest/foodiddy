import { DocumentPickerAsset } from "expo-document-picker";

export interface PostFormType {
    title : string;
    image : DocumentPickerAsset | null;
    ingr : string;
    prep : string;
    userId : undefined | string;
}