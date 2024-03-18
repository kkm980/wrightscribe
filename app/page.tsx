"use client"

import { ModeToggle } from '@/components/ThemeToggler'
import DynamicInputForm from '@/components/Writer/DynamicInput/DynamicInput';
import InputSelector from '@/components/Writer/InputSelector/InputSelector';
import MultiLangSelector from '@/components/Writer/MultiLangSelector.tsx';
import PageSpecs from '@/components/Writer/pageSpecs';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { decrement, increment, reset, addName, setSupportingLangs, setLoading, setMultiLangInputListStore } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/Writer/RichText/RichText';
import RichTextEditorBox from '@/components/Writer/RichText';

interface HomeProps {
  // Add any additional props if needed
}

const Home: React.FC<HomeProps> = () => {

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [supportingLang, setSupportingLang] = useState<string[]>(["english"]);
  const [multiLang, setMultiLang] = useState<boolean>(false);
  const [multiLangInputList, setMultiLangInputList] = useState<any>([]);
  const [slug, setSlug] = useState<any>("");
  const [defaultLangChoice, setDefaultLangChoice] = useState<string>("english");
  // const [loading, setLoading] = useState(true);

  const count = useAppSelector((state) => state.counterReducer.count);
  const name = useAppSelector((state) => state.counterReducer.name);
  const supportingLangs = useAppSelector((state) => state.counterReducer.supportingLangs);
  const loading = useAppSelector((state) => state.counterReducer.loading);
  const multiLangInputListStore = useAppSelector((state) => state.counterReducer.multiLangInputListStore);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const x = localStorage.getItem("wright_scribe_persistent_data");
    if (x) {
      const supportingLang_local = JSON.parse(x)?.current_page_data?.supportingLang;
      if (supportingLang_local) {
        // setSupportingLang(supportingLang_local);
        supportingLang_local?.includes("english") ? setSupportingLang(supportingLang_local) : setSupportingLang([...supportingLang_local, "english"]);
      }


      const multiLangInputList_local = JSON.parse(x)?.current_page_data?.multiLangInputList;
      if (multiLangInputList_local) {
        setMultiLangInputList(multiLangInputList_local);
      }
    }
  }, []);

  // setting localStorage on any state changes
  useEffect(() => {
    const localObj = JSON.parse(localStorage.getItem("wright_scribe_persistent_data") || '{}');
    supportingLang.length > 1 &&
      localStorage.setItem("wright_scribe_persistent_data", JSON.stringify({
        ...localObj,
        current_page_data: {
          ...localObj.current_page_data,
          supportingLang: [...supportingLang]
        }
      }));
  }, [supportingLang]);

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
    const { textType, type } = obj;
    const id = `${Math.random()}`;
    const multiLangArr: any = [];
    supportingLang.forEach((el: any) => {
      multiLangArr.push({ textType, type, language: el, id: `${Math.random()}${el}` })
    })
    const newobj = { textType, type, id: `${Math.random()}lang`, multiLangText: multiLangArr }
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
    let updatedArr = multiLangInputList?.map((element: any) => {
      const langExists = element.multiLangText.some(
        (obj: any) => obj.language === lang
      );
      let newElArr:any=[];
      if (langExists) {
        element.multiLangText.map((obj: any) => {
          if (obj.language === lang) {
            obj.show=true;
            newElArr.push({...obj , show: true})
          }
          else{
            newElArr.push({...obj});
          }
        });
      }
      else {
        element.multiLangText.push({
          ...Object.entries(element.multiLangText[0] || {}).reduce(
            (acc: any, [key, value]) => {
              if (!["text", "href", "link", "language", "id"].includes(key)) {
                acc[key] = value;
              }
              return {...acc, show: true};
            },
            { id: `${Math.random()}`, language: lang, show: true }
          ),
        });
      }
      return !langExists?element:{...element, multiLangText:newElArr};
    });
    setMultiLangInputList(updatedArr);
  }

  const potentialDeleteLangInMultiLangArr = (lang: string) => {
    const updatedArr = multiLangInputList?.map((element: any) => {
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

    setMultiLangInputList(updatedArr);
  }
  useEffect(() => {
    const localObj = JSON.parse(localStorage.getItem("wright_scribe_persistent_data") || '{}');
    multiLangInputList?.length != 0 &&
      localStorage.setItem("wright_scribe_persistent_data", JSON.stringify({
        ...localObj,
        current_page_data: {
          ...localObj.current_page_data,
          multiLangInputList: [...multiLangInputList]
        }
      }));
      console.log(multiLangInputList);
  }, [multiLangInputList]);

  const loadingStates = [
    {
      text: "Alright",
    },
    {
      text: "Writing",
    },
    {
      text: "Scribing",
    },
    {
      text: "Writing your right scribes as WrightScribe",
    }
  ];
  useEffect(()=>{
    // dispatch(setLoading(true));
    setTimeout(()=>{
      dispatch(setLoading(false));
    },3000)
  },[]) 
  
  function migrate(){
    if(slug.length>=4){
      dispatch(setMultiLangInputListStore({...multiLangInputListStore, [slug]:[...multiLangInputList]}));
      router.push(`/${slug}`);
    }
  }
  return (
    <main className="min-h-screen h-[300vh] custom-scrollbar-container">
      <Loader loadingStates={loadingStates} loading={loading} duration={600} loop={false} />
      <div className="mt-[70px] px-[10px]">
        <PageSpecs {...{ defaultLangChoice, setDefaultLangChoice, setSupportingLang, supportingLang, addLangInMultiLangArr, potentialDeleteLangInMultiLangArr, slug, setSlug, migrate }} />
        <div className={`rounded-lg flex justify-start items-start py-4 px-1 w-[50%] relative ${multiLangInputList?.length > 0 ? "border shadow-2xl" : "shadow-0"}`}>
          <div className='flex flex-col justify-start items-start w-[100%]'>
            <DynamicInputForm {...{ multiLangInputList, setMultiLangInputList, multiLang }} />
            <InputSelector {...{ handleAddInput, multiLangInputList }} />
          </div>
          {
            multiLangInputList?.length > 0 ? <div className='absolute -top-[60px] right-[0px] flex'>
              <MultiLangSelector {...{ multiLang, setMultiLang }} />
              <Button variant="save" className='ml-2'>Save</Button>
              <Button variant="copy" className='ml-2'>Clone</Button>
              <Button variant="delete" className='ml-2'>Delete</Button>

            </div>
              : <></>
          }
          {/* <div style={{ marginBottom: "4rem", textAlign: "center" }}>
            <h4 style={{ marginBottom: 16 }}>{count}</h4>
            <h4 style={{ marginBottom: 16 }}>{name}</h4>
            <h4 style={{ marginBottom: 16 }}>{supportingLangs.length}..</h4>
            <button onClick={() => dispatch(increment())}>increment</button>
            <button
              onClick={() => {
                dispatch(decrement());
                dispatch(addName("shyam"));
                dispatch(setSupportingLangs("alpha"));
              }}
              style={{ marginInline: 16 }}
            >
              decrement
            </button>
            <button onClick={() => dispatch(reset())}>reset</button>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Home;