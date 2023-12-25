function multiLangListCreator(inputList: any, supportingLang: any) {
    const new_arr: any[] = [];
    inputList.forEach((e: any) => {
        // Modify e or create a new object if needed
        const multiLangArr: any = [];
        supportingLang.forEach((el: any) => {
            multiLangArr.push({ ...e, language:el, id: `${e.id}${el}` })
        });
        // Add the modified element to the new array
        new_arr.push({ ...e, multiLangText: multiLangArr });
    });
    return new_arr;
}

export default multiLangListCreator;