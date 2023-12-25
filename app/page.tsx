"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import DynamicInputForm from '@/components/Writer/DynamicInput/DynamicInput';
import InputSelector from '@/components/Writer/InputSelector/InputSelector';
import MultiLangSelector from '@/components/Writer/MultiLangSelector.tsx';
import PageSpecs from '@/components/Writer/pageSpecs';
import NavBar from '@/components/navBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/types/inputListTypes';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface HomeProps {
  // Add any additional props if needed
}

const Home: React.FC<HomeProps> = () => {
  const { theme, setTheme } = useTheme();
  const [inputList, setInputList] = useState<Input[]>([]);
  const [inputType, setInputType] = useState<string>('text');
  const [supportingLang, setSupportingLang] = useState<string[]>(["english"]);
  const [multiLang, setMultiLang] = useState<boolean>(false);
  const [slug, setSlug] = useState<any>("");
  const handleAddInput = (obj: any): void => {
    setInputList((prevInputList) => [
      ...prevInputList,
      { ...obj, id: `${Math.random()}` } as Input, // Explicitly cast to TextInput
    ]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className="min-h-screen h-[300vh] custom-scrollbar-container">
      <NavBar />
      <div className="mt-[70px] px-[10px]">
        <PageSpecs {...{ supportingLang, setSupportingLang, slug, setSlug }} />
        <div className={`rounded-lg flex justify-start items-start py-4 px-1 w-[70%] relative ${inputList.length>0?"border shadow-2xl":"shadow-0"}`}>
          <div className='flex flex-col justify-start items-start w-[100%]'>
            <DynamicInputForm {...{ inputList, setInputList, inputType, setInputType }} />
            <InputSelector {...{ handleAddInput, inputList }} />
          </div>
          {
            inputList.length > 0 ? <div className='sticky top-[80px] right-[0px] flex flex-col'>
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