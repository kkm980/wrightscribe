'use client'

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import PageSpecs from "../(childrenPages)/components/Writer/pageSpecs";
import DynamicInputForm from "../(childrenPages)/components/Writer/DynamicInput/DynamicInput";
import MultiLangSelector from "../(childrenPages)/components/Writer/MultiLangSelector.tsx";
import { Button } from "../(childrenPages)/components/ui/button";
import InputSelector from "../(childrenPages)/components/Writer/InputSelector/InputSelector";

export default function PostPage({
    params,
  }: {
    params: {
      slug: string
    }
  })  {
    const { theme, setTheme } = useTheme();
    const [supportingLang, setSupportingLang] = useState<string[]>(["english"]);
    const [multiLang, setMultiLang] = useState<boolean>(false);
    const [multiLangInputList, setMultiLangInputList] = useState<any>([]);
    const [slug, setSlug] = useState<any>("");
    const [defaultLangChoice, setDefaultLangChoice] = useState<string>("english");
  
    // function is called whenever user creates a new field
    const handleAddInput = (obj: any): void => {
      // const newInputArr=[...inputList];
      // const multiLangArr: any = [];
      //     supportingLang.forEach((el: any) => {
      //         multiLangArr.push({ ...e, language:el, id: `${e.id}${el}` })
      //     });
      // setInputList((prevInputList:any) => [
      //   ...prevInputList,
      //   { ...obj, id: `${Math.random()}` } as Input, // Explicitly cast to TextInput
      // ]);
      const {textType, type} = obj;
      const id=`${Math.random()}`;
      const multiLangArr:any=[];
      supportingLang.forEach((el:any)=>{
        multiLangArr.push({ textType, type, language:el, id: `${Math.random()}${el}` })
      })
      const newobj={textType, type, id:`${Math.random()}lang`, multiLangText:multiLangArr }
      setMultiLangInputList([...multiLangInputList, newobj]);
    };
  
    // useEffect(()=>{
      // const updatedArr = arr.map((element) => {
      //   // Remove objects in multiLangText array with language not in supportingLang array
      //   element.multiLangText = element.multiLangText.filter((langObj) =>
      //     supportingLang.includes(langObj.language)
      //   );
    
      //   // Add objects for languages in supportingLang array and not in multiLangText array
      //   supportingLang.forEach((lang) => {
      //     if (!element.multiLangText.some((langObj) => langObj.language === lang)) {
      //       element.multiLangText.push({
      //         id: `${Math.random()}`,
      //         language: lang,
      //         textType: ['', ''], // replace with actual values
      //         type: '', // replace with actual value
      //         text: '', // replace with actual value
      //       });
      //     }
      //   });
    
      //   return element;
      // });
    
      // return updatedArr;
    // };
    // },[supportingLang]);
  
    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  
    const deleteLangInMultiLangArr = (lang: string) => {
      // const updatedArr = multiLangInputList.map((element: any) => {
      //   // Remove objects in multiLangText array with language not in supportingLang array
      //   element.multiLangText = element.multiLangText.filter((langObj: any) =>
      //     langObj.language != lang
      //   );
      //   return element;
      // });
      // const updatedMultiLangTextArr = [...]
  
      // setMultiLangInputList(updatedArr);
    }
  
    const addLangInMultiLangArr = (lang: string) => {
        const updatedArr = multiLangInputList.map((element: any) => {
          const langExists = element.multiLangText.some(
            (obj: any) => obj.language === lang
          );
          if (langExists) {
            element.multiLangText.forEach((obj: any) => {
              if (obj.language === lang) {
                delete obj.show;
              }
            });
          } else{
            element.multiLangText.push({
            ...Object.entries(element.multiLangText[0] || {}).reduce(
              (acc: any, [key, value]) => {
                if (!["text", "href", "link", "show", "language", "id"].includes(key)) {
                  acc[key] = value;
                }
                return acc;
              },
              { id: `${Math.random()}`, language: lang }
            ),
          });
          }
          
        
          return element;
        });
    
        setMultiLangInputList(updatedArr);
      }
  
    const potentialDeleteLangInMultiLangArr = (lang: string) => {
      const updatedArr = multiLangInputList.map((element: any) => {
        const langExists = element.multiLangText.some(
          (obj: any) => obj.language === lang
        );
    
        if (langExists) {
          element.multiLangText.forEach((obj: any) => {
            if (obj.language === lang) {
              obj.show = false;
            }
          });
        }
    
        return element;
      });
    
      
      // console.log(updatedArr);
  
      setMultiLangInputList(updatedArr);
    }
    useEffect(()=>{
      console.log(multiLangInputList, "multi")
    },[multiLangInputList])
   
    return (
      <main className="min-h-screen h-[300vh] custom-scrollbar-container">
        <div>{params.slug}</div>
        <div className="mt-[70px] px-[10px]">
          <PageSpecs {...{defaultLangChoice, setDefaultLangChoice,setSupportingLang, supportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr, slug, setSlug }} />
          <div className={`rounded-lg flex justify-start items-start py-4 px-1 w-[70%] relative ${multiLangInputList.length>0?"border shadow-2xl":"shadow-0"}`}>
            <div className='flex flex-col justify-start items-start w-[100%]'>
              <DynamicInputForm {...{multiLangInputList, setMultiLangInputList, multiLang }} />
              <InputSelector {...{ handleAddInput, multiLangInputList }} />
            </div>
            {
              multiLangInputList.length > 0 ? <div className='sticky top-[80px] right-[0px] flex flex-col'>
                <MultiLangSelector {...{multiLang, setMultiLang}}/>
                <Button variant="save" className='mb-2'>Save</Button>
                <Button variant="copy" className='mb-2'>Clone</Button>
                <Button variant="delete" className='mb-2'>Delete</Button>
                
              </div>
                : <></>
            }
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
         
          
        </div>
          </div>
        </div>
      </main>
    );
  };
  