"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import DynamicInputForm from '@/components/Writer/DynamicInput/DynamicInput';
import InputSelector from '@/components/Writer/InputSelector/InputSelector';
import PageSpecs from '@/components/Writer/pageSpecs';
import NavBar from '@/components/navBar';
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

  const handleAddInput = (obj: any): void => {
    setInputList((prevInputList) => [
      ...prevInputList,
      {...obj} as Input, // Explicitly cast to TextInput
    ]);
  };
  // const handleInputChange = (index: number, value: string): void => {
  //   setInputList((prevInputList) => {
  //     const updatedInputs = [...prevInputList];
  //     updatedInputs[index].text = value;
  //     return updatedInputs;
  //   });
  // };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <main className="min-h-screen h-[300vh] custom-scrollbar-container">
      <NavBar />
      <div className="mt-[70px] px-[10px]">
        <PageSpecs />
        <div className="border rounded-lg flex justify-start items-start flex-col py-4 px-1 w-[70%] shadow-2xl">
          <DynamicInputForm {...{ inputList, setInputList, inputType, setInputType }} />
          <InputSelector {...{ handleAddInput }} />
        </div>
      </div>
    </main>
  );
};

export default Home;