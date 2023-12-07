import unidecode from "unidecode"

export const convertToSlug = (text: string): string => {
    // text => in ra trong tìm kiếm
    const unidecodeText = unidecode(text.trim());
    const slug:string = unidecodeText.replace(/\s+/g,"-"); // Thay thế nhiều khoảng trắng thay = dấu -
    return slug;
}