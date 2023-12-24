function textTypeGenerator(type: string){
  if(type==="text"){
    return ["bold", "italic", "striken", "small", "background", "cursive"];
  } else if(type === "quote"){
    return ["bold", "italic", "striken", "small", "cursive"];
  } else if(type === "link"){
    return ["bold", "italic", "small", "cursive", "background", "underlined"];
  } else {
    return [];
  }
}

export default textTypeGenerator;