"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import DynamicInputForm from '@/components/Writer/DynamicInput/DynamicInput';
import InputSelector from '@/components/Writer/InputSelector/InputSelector';
import MultiLangSelector from '@/components/Writer/MultiLangSelector.tsx';
import PageSpecs from '@/components/Writer/pageSpecs';
import NavBar from '@/components/navBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/types/inputListTypes';
import multiLangListCreator from '@/utils/multiLangListCreator';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface HomeProps {
  // Add any additional props if needed
}

const Home: React.FC<HomeProps> = () => {

  const { theme, setTheme } = useTheme();
  const [inputList, setInputList] = useState<any>([]);
  const [inputType, setInputType] = useState<string>('text');
  const [supportingLang, setSupportingLang] = useState<string[]>(["english"]);
  const [multiLang, setMultiLang] = useState<boolean>(false);
  const [multiLangInputList, setMultiLangInputList] = useState<any>([]);
  const [slug, setSlug] = useState<any>("");

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
      multiLangArr.push({ textType, type, language:el, id: `${id}${el}` })
    })
    const newobj={textType, type, id:id, multiLangText:multiLangArr }
    setMultiLangInputList([...multiLangInputList, newobj]);
  };

  // useEffect(()=>{
  //   multiLang===true &&  setMultiLangInputList(multiLangListCreator(inputList, supportingLang));
  //   // multiLang===false && setMultiLangInputList([]);
  // },[inputList, supportingLang, multiLang]);
  useEffect(()=>{
    console.log(multiLangInputList, "multiLang");
  },[multiLangInputList]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className="min-h-screen h-[300vh] custom-scrollbar-container">
      <div className="mt-[70px] px-[10px]">
        <PageSpecs {...{ supportingLang, setSupportingLang, slug, setSlug }} />
        <div className={`rounded-lg flex justify-start items-start py-4 px-1 w-[70%] relative ${inputList.length>0?"border shadow-2xl":"shadow-0"}`}>
          <div className='flex flex-col justify-start items-start w-[100%]'>
            <DynamicInputForm {...{multiLangInputList, setMultiLangInputList, multiLang, inputList, setInputList, inputType, setInputType }} />
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

        </div>
      </div>
    </main>
  );
};

export default Home;